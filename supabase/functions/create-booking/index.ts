import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders, jsonResponse, errorResponse } from '../_shared/auth.ts'
import { notifyAdminNewBooking } from '../_shared/email.ts'

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders() })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    )

    const { client_name, client_email, details, requested_date, requested_time } = await req.json()

    // Validate required fields
    if (!client_name?.trim() || !client_email?.trim() || !requested_date || !requested_time) {
      return errorResponse('Missing required fields: client_name, client_email, requested_date, requested_time')
    }

    // Basic email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(client_email)) {
      return errorResponse('Invalid email address')
    }

    // Check booking is enabled
    const { data: settings } = await supabase
      .from('consulting_settings')
      .select('*')
      .single()

    if (!settings?.booking_enabled) {
      return errorResponse('Booking is currently disabled', 403)
    }

    // Check date is not blocked
    const { data: blocked } = await supabase
      .from('blocked_dates')
      .select('id')
      .eq('date', requested_date)
      .maybeSingle()

    if (blocked) {
      return errorResponse('This date is not available')
    }

    // Check slot is not already taken
    const { data: existing } = await supabase
      .from('bookings')
      .select('id')
      .eq('requested_date', requested_date)
      .eq('requested_time', requested_time)
      .not('status', 'in', '("rejected","cancelled")')
      .maybeSingle()

    if (existing) {
      return errorResponse('This time slot is already booked')
    }

    // Insert booking with current price snapshot
    const { data: booking, error } = await supabase
      .from('bookings')
      .insert({
        client_name: client_name.trim(),
        client_email: client_email.trim().toLowerCase(),
        details: (details || '').trim(),
        requested_date,
        requested_time,
        price_cents: settings.price_cents,
        currency: settings.currency,
      })
      .select()
      .single()

    if (error) {
      console.error('Insert error:', error)
      // Handle unique constraint violation (race condition)
      if (error.code === '23505') {
        return errorResponse('This time slot was just booked. Please choose another.', 409)
      }
      return errorResponse('Failed to create booking', 500)
    }

    // Notify admin (don't fail the request if email fails)
    await notifyAdminNewBooking(booking).catch(console.error)

    return jsonResponse({ id: booking.id, status: booking.status })
  } catch (err) {
    console.error('Unexpected error:', err)
    return errorResponse('Internal server error', 500)
  }
})

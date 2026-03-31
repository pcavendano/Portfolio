import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { validateAdmin, corsHeaders, jsonResponse, errorResponse } from '../_shared/auth.ts'
import { notifyClientRejected } from '../_shared/email.ts'

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders() })
  }

  if (!await validateAdmin(req)) {
    return errorResponse('Unauthorized', 401)
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    )

    const { booking_id, reason } = await req.json()
    if (!booking_id) return errorResponse('Missing booking_id')

    const { data: booking, error: fetchErr } = await supabase
      .from('bookings')
      .select('*')
      .eq('id', booking_id)
      .single()

    if (fetchErr || !booking) return errorResponse('Booking not found', 404)
    if (booking.status === 'paid' || booking.status === 'completed') {
      return errorResponse(`Cannot reject a ${booking.status} booking`)
    }

    const { error: updateErr } = await supabase
      .from('bookings')
      .update({
        status: 'rejected',
        admin_notes: reason || '',
      })
      .eq('id', booking_id)

    if (updateErr) return errorResponse('Failed to update booking', 500)

    await notifyClientRejected({
      client_name: booking.client_name,
      client_email: booking.client_email,
      requested_date: booking.requested_date,
      requested_time: booking.requested_time,
      reason,
    }).catch(console.error)

    return jsonResponse({ status: 'rejected' })
  } catch (err) {
    console.error('Unexpected error:', err)
    return errorResponse('Internal server error', 500)
  }
})

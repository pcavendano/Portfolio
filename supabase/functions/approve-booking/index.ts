import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { validateAdmin, corsHeaders, jsonResponse, errorResponse } from '../_shared/auth.ts'
import { notifyClientApproved } from '../_shared/email.ts'

const STRIPE_SECRET_KEY = Deno.env.get('STRIPE_SECRET_KEY') || ''
const SITE_URL = 'https://pcavendano.com'

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

    const { booking_id } = await req.json()
    if (!booking_id) return errorResponse('Missing booking_id')

    // Get booking
    const { data: booking, error: fetchErr } = await supabase
      .from('bookings')
      .select('*')
      .eq('id', booking_id)
      .single()

    if (fetchErr || !booking) return errorResponse('Booking not found', 404)
    if (booking.status !== 'pending') return errorResponse(`Cannot approve a ${booking.status} booking`)

    // Create Stripe Checkout Session
    const priceDisplay = `$${(booking.price_cents / 100).toFixed(2)} ${booking.currency.toUpperCase()}`
    const stripeRes = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${STRIPE_SECRET_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        'mode': 'payment',
        'customer_email': booking.client_email,
        'line_items[0][price_data][currency]': booking.currency,
        'line_items[0][price_data][unit_amount]': String(booking.price_cents),
        'line_items[0][price_data][product_data][name]': `Consulting Session — ${booking.requested_date}`,
        'line_items[0][price_data][product_data][description]': `${booking.session_duration_min || 60} minute session with Pedro Contreras`,
        'line_items[0][quantity]': '1',
        'metadata[booking_id]': booking.id,
        'success_url': `${SITE_URL}/consulting/status/${booking.id}?payment=success`,
        'cancel_url': `${SITE_URL}/consulting/status/${booking.id}?payment=cancelled`,
        'expires_at': String(Math.floor(Date.now() / 1000) + 86400), // 24h
      }),
    })

    if (!stripeRes.ok) {
      const stripeErr = await stripeRes.text()
      console.error('Stripe error:', stripeErr)
      return errorResponse('Failed to create payment session', 500)
    }

    const session = await stripeRes.json()

    // Update booking status
    const { error: updateErr } = await supabase
      .from('bookings')
      .update({
        status: 'approved',
        stripe_checkout_session_id: session.id,
      })
      .eq('id', booking_id)

    if (updateErr) {
      console.error('Update error:', updateErr)
      return errorResponse('Failed to update booking', 500)
    }

    // Email client with payment link
    await notifyClientApproved({
      client_name: booking.client_name,
      client_email: booking.client_email,
      requested_date: booking.requested_date,
      requested_time: booking.requested_time,
      checkout_url: session.url,
      price_display: priceDisplay,
    }).catch(console.error)

    return jsonResponse({ status: 'approved', checkout_url: session.url })
  } catch (err) {
    console.error('Unexpected error:', err)
    return errorResponse('Internal server error', 500)
  }
})

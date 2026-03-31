import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { notifyClientPaymentConfirmed, sendEmail, ADMIN_EMAIL } from '../_shared/email.ts'

const STRIPE_WEBHOOK_SECRET = Deno.env.get('STRIPE_WEBHOOK_SECRET') || ''
const STRIPE_SECRET_KEY = Deno.env.get('STRIPE_SECRET_KEY') || ''

// Verify Stripe webhook signature
async function verifyStripeSignature(
  payload: string,
  signature: string,
  secret: string,
): Promise<boolean> {
  const parts = signature.split(',').reduce(
    (acc, part) => {
      const [key, val] = part.split('=')
      if (key === 't') acc.timestamp = val
      if (key === 'v1') acc.signatures.push(val)
      return acc
    },
    { timestamp: '', signatures: [] as string[] },
  )

  if (!parts.timestamp || parts.signatures.length === 0) return false

  // Check timestamp is within 5 minutes
  const age = Math.floor(Date.now() / 1000) - Number(parts.timestamp)
  if (age > 300) return false

  const signedPayload = `${parts.timestamp}.${payload}`
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  )
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(signedPayload))
  const expected = Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')

  return parts.signatures.includes(expected)
}

Deno.serve(async (req) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  try {
    const body = await req.text()
    const signature = req.headers.get('stripe-signature') || ''

    if (STRIPE_WEBHOOK_SECRET && !await verifyStripeSignature(body, signature, STRIPE_WEBHOOK_SECRET)) {
      return new Response('Invalid signature', { status: 400 })
    }

    const event = JSON.parse(body)

    if (event.type !== 'checkout.session.completed') {
      return new Response('OK', { status: 200 })
    }

    const session = event.data.object
    const bookingId = session.metadata?.booking_id
    if (!bookingId) {
      console.error('No booking_id in session metadata')
      return new Response('OK', { status: 200 })
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    )

    // Get booking (check it hasn't already been marked paid)
    const { data: booking } = await supabase
      .from('bookings')
      .select('*')
      .eq('id', bookingId)
      .single()

    if (!booking) {
      console.error('Booking not found:', bookingId)
      return new Response('OK', { status: 200 })
    }

    // Idempotent: if already paid, skip
    if (booking.payment_status === 'paid') {
      return new Response('OK', { status: 200 })
    }

    // Update booking
    await supabase
      .from('bookings')
      .update({
        status: 'paid',
        payment_status: 'paid',
        stripe_payment_intent_id: session.payment_intent,
      })
      .eq('id', bookingId)

    // Notify client
    await notifyClientPaymentConfirmed({
      client_name: booking.client_name,
      client_email: booking.client_email,
      requested_date: booking.requested_date,
      requested_time: booking.requested_time,
    }).catch(console.error)

    // Notify admin
    await sendEmail({
      to: ADMIN_EMAIL,
      subject: `Payment received — ${booking.client_name}`,
      html: `<p>Payment confirmed for ${booking.client_name}'s session on ${booking.requested_date} at ${booking.requested_time}.</p>`,
    }).catch(console.error)

    return new Response('OK', { status: 200 })
  } catch (err) {
    console.error('Webhook error:', err)
    return new Response('Internal error', { status: 500 })
  }
})

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY') || ''
const FROM_EMAIL = 'consulting@pcavendano.com'
const ADMIN_EMAIL = 'pcavendano@le1101.com'
const SITE_URL = 'https://pcavendano.com'

interface EmailOptions {
  to: string
  subject: string
  html: string
}

export async function sendEmail({ to, subject, html }: EmailOptions): Promise<boolean> {
  if (!RESEND_API_KEY) {
    console.error('RESEND_API_KEY not set')
    return false
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ from: FROM_EMAIL, to, subject, html }),
    })
    return res.ok
  } catch (err) {
    console.error('Email send failed:', err)
    return false
  }
}

export async function notifyAdminNewBooking(booking: {
  id: string
  client_name: string
  client_email: string
  requested_date: string
  requested_time: string
  details: string
}) {
  await sendEmail({
    to: ADMIN_EMAIL,
    subject: `New consulting request from ${booking.client_name}`,
    html: `
      <h2>New Consulting Request</h2>
      <p><strong>Client:</strong> ${booking.client_name} (${booking.client_email})</p>
      <p><strong>Date:</strong> ${booking.requested_date} at ${booking.requested_time}</p>
      <p><strong>Details:</strong></p>
      <p>${booking.details || 'No details provided'}</p>
      <br>
      <p><a href="${SITE_URL}/admin">Review in Admin Panel</a></p>
    `,
  })
}

export async function notifyClientApproved(booking: {
  client_name: string
  client_email: string
  requested_date: string
  requested_time: string
  checkout_url: string
  price_display: string
}) {
  await sendEmail({
    to: booking.client_email,
    subject: 'Your consulting session has been approved',
    html: `
      <h2>Booking Approved</h2>
      <p>Hi ${booking.client_name},</p>
      <p>Your consulting session has been approved:</p>
      <p><strong>Date:</strong> ${booking.requested_date} at ${booking.requested_time}</p>
      <p><strong>Price:</strong> ${booking.price_display}</p>
      <br>
      <p>Please complete your payment to confirm the booking:</p>
      <p><a href="${booking.checkout_url}" style="display:inline-block;padding:12px 24px;background:#25d0ab;color:#000;text-decoration:none;border-radius:4px;font-weight:bold;">Pay Now</a></p>
      <br>
      <p>— Pedro Contreras</p>
    `,
  })
}

export async function notifyClientRejected(booking: {
  client_name: string
  client_email: string
  requested_date: string
  requested_time: string
  reason?: string
}) {
  await sendEmail({
    to: booking.client_email,
    subject: 'Update on your consulting request',
    html: `
      <h2>Booking Update</h2>
      <p>Hi ${booking.client_name},</p>
      <p>Unfortunately, I'm unable to accommodate the consulting session you requested for ${booking.requested_date} at ${booking.requested_time}.</p>
      ${booking.reason ? `<p><strong>Reason:</strong> ${booking.reason}</p>` : ''}
      <p>Feel free to submit a new request for a different time, or reach out directly.</p>
      <br>
      <p>— Pedro Contreras</p>
    `,
  })
}

export async function notifyClientPaymentConfirmed(booking: {
  client_name: string
  client_email: string
  requested_date: string
  requested_time: string
}) {
  await sendEmail({
    to: booking.client_email,
    subject: 'Payment confirmed — consulting session booked',
    html: `
      <h2>Payment Confirmed</h2>
      <p>Hi ${booking.client_name},</p>
      <p>Your payment has been received. Your consulting session is confirmed:</p>
      <p><strong>Date:</strong> ${booking.requested_date} at ${booking.requested_time}</p>
      <p>I'll reach out before the session with meeting details.</p>
      <br>
      <p>— Pedro Contreras</p>
    `,
  })
}

export { ADMIN_EMAIL, SITE_URL }

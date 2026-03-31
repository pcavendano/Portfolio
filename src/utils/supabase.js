import { createClient } from '@supabase/supabase-js'

// TODO: Replace with your Supabase project credentials
const SUPABASE_URL = 'https://YOUR_PROJECT_ID.supabase.co'
const SUPABASE_ANON_KEY = 'YOUR_ANON_KEY'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

const FUNCTIONS_URL = `${SUPABASE_URL}/functions/v1`

// ── Public helpers ──────────────────────────────

export async function getSettings() {
  const { data, error } = await supabase
    .from('consulting_settings')
    .select('*')
    .single()
  if (error) throw error
  return data
}

export async function getBookedSlots() {
  const { data, error } = await supabase
    .from('bookings')
    .select('requested_date, requested_time, status')
    .not('status', 'in', '("rejected","cancelled")')
  if (error) throw error
  return data || []
}

export async function getBlockedDates() {
  const { data, error } = await supabase
    .from('blocked_dates')
    .select('date, reason')
  if (error) throw error
  return data || []
}

export async function submitBooking({ client_name, client_email, details, requested_date, requested_time }) {
  const res = await fetch(`${FUNCTIONS_URL}/create-booking`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    },
    body: JSON.stringify({ client_name, client_email, details, requested_date, requested_time }),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || 'Failed to submit booking')
  return data
}

export async function getBookingStatus(bookingId) {
  const { data, error } = await supabase
    .from('bookings')
    .select('id, status, payment_status, requested_date, requested_time, price_cents, currency, stripe_checkout_session_id')
    .eq('id', bookingId)
    .single()
  if (error) throw error
  return data
}

// ── Admin helpers (require GitHub PAT) ──────────

function adminHeaders(githubToken) {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    'x-github-token': githubToken,
  }
}

export async function adminListBookings(githubToken, status) {
  const url = new URL(`${FUNCTIONS_URL}/admin-bookings`)
  if (status) url.searchParams.set('status', status)
  const res = await fetch(url, {
    headers: adminHeaders(githubToken),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || 'Failed to fetch bookings')
  return data
}

export async function adminApproveBooking(githubToken, bookingId) {
  const res = await fetch(`${FUNCTIONS_URL}/approve-booking`, {
    method: 'POST',
    headers: adminHeaders(githubToken),
    body: JSON.stringify({ booking_id: bookingId }),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || 'Failed to approve booking')
  return data
}

export async function adminRejectBooking(githubToken, bookingId, reason) {
  const res = await fetch(`${FUNCTIONS_URL}/reject-booking`, {
    method: 'POST',
    headers: adminHeaders(githubToken),
    body: JSON.stringify({ booking_id: bookingId, reason }),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || 'Failed to reject booking')
  return data
}

export async function adminUpdateSettings(githubToken, updates) {
  const res = await fetch(`${FUNCTIONS_URL}/update-settings`, {
    method: 'POST',
    headers: adminHeaders(githubToken),
    body: JSON.stringify(updates),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || 'Failed to update settings')
  return data
}

// ── Formatting helpers ──────────────────────────

export function formatPrice(cents, currency = 'usd') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.toUpperCase(),
  }).format(cents / 100)
}

export function formatTime(time) {
  const [h, m] = time.split(':').map(Number)
  const period = h >= 12 ? 'PM' : 'AM'
  const hour = h % 12 || 12
  return `${hour}:${String(m).padStart(2, '0')} ${period}`
}

export function formatDate(dateStr) {
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })
}

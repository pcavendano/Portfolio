import { useState, useEffect } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { getBookingStatus, formatPrice, formatTime, formatDate } from '../utils/supabase'

const STATUS_LABELS = {
  pending: { text: 'Pending Review', color: 'text-orange' },
  approved: { text: 'Approved — Awaiting Payment', color: 'text-green' },
  rejected: { text: 'Not Available', color: 'text-red' },
  paid: { text: 'Confirmed & Paid', color: 'text-green' },
  completed: { text: 'Completed', color: 'text-dim' },
  cancelled: { text: 'Cancelled', color: 'text-red' },
}

const ConsultingStatus = () => {
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const [booking, setBooking] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const paymentResult = searchParams.get('payment')

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getBookingStatus(id)
        setBooking(data)
      } catch (err) {
        setError('Booking not found or invalid ID.')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id])

  if (loading) {
    return (
      <div className="consulting-status">
        <p className="text-dim">Loading booking status...</p>
        <span className="cursor" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="consulting-status">
        <h1>Booking Status</h1>
        <p className="text-red">{error}</p>
        <p className="text-dim">
          Check your booking ID or <a href="/consulting">submit a new request</a>.
        </p>
      </div>
    )
  }

  const statusInfo = STATUS_LABELS[booking.status] || { text: booking.status, color: 'text-dim' }

  return (
    <div className="consulting-status">
      <a href="/consulting" className="blog-back">{'< back to consulting'}</a>

      <h1>Booking Status</h1>

      {paymentResult === 'success' && (
        <div className="status-banner status-banner-success">
          <span className="text-green">Payment successful!</span>
          <span className="text-dim"> Your session is confirmed.</span>
        </div>
      )}

      {paymentResult === 'cancelled' && (
        <div className="status-banner status-banner-warn">
          <span className="text-orange">Payment was cancelled.</span>
          <span className="text-dim"> You can try again using the button below.</span>
        </div>
      )}

      <div className="terminal-output">
        <div className="terminal-line">
          <span className="text-green">$ </span>
          <span>booking-status {id.slice(0, 8)}...</span>
        </div>
        <div className="terminal-line">&nbsp;</div>

        <div className="terminal-line">
          <span className="text-dim">status:   </span>
          <span className={statusInfo.color}>{statusInfo.text}</span>
        </div>
        <div className="terminal-line">
          <span className="text-dim">date:     </span>
          <span>{formatDate(booking.requested_date)}</span>
        </div>
        <div className="terminal-line">
          <span className="text-dim">time:     </span>
          <span>{formatTime(booking.requested_time)}</span>
        </div>
        <div className="terminal-line">
          <span className="text-dim">price:    </span>
          <span>{formatPrice(booking.price_cents, booking.currency)}</span>
        </div>
        <div className="terminal-line">
          <span className="text-dim">payment:  </span>
          <span className={booking.payment_status === 'paid' ? 'text-green' : 'text-orange'}>
            {booking.payment_status}
          </span>
        </div>
      </div>

      {booking.status === 'approved' && booking.stripe_checkout_session_id && (
        <div className="consulting-pay-section">
          <p className="text-dim">Your booking has been approved. Complete payment to confirm your session.</p>
          <a
            href={`https://checkout.stripe.com/c/pay/${booking.stripe_checkout_session_id}`}
            className="pay-btn"
            target="_blank"
            rel="noopener noreferrer"
          >
            Pay {formatPrice(booking.price_cents, booking.currency)}
          </a>
        </div>
      )}

      {booking.status === 'pending' && (
        <p className="text-dim" style={{ marginTop: '1rem' }}>
          Your request is being reviewed. You will receive an email when it is approved.
        </p>
      )}

      {booking.status === 'rejected' && (
        <p className="text-dim" style={{ marginTop: '1rem' }}>
          This time slot was not available. <a href="/consulting">Submit a new request</a> for a different time.
        </p>
      )}

      <div className="cursor-line">
        <span className="prompt" />
        <span className="cursor" />
      </div>
    </div>
  )
}

export default ConsultingStatus

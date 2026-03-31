import { useState, useEffect, useCallback } from 'react'
import { getToken } from '../utils/github'
import {
  adminListBookings,
  adminApproveBooking,
  adminRejectBooking,
  adminUpdateSettings,
  getSettings,
  formatPrice,
  formatTime,
  formatDate,
} from '../utils/supabase'

const STATUS_COLORS = {
  pending: 'text-orange',
  approved: 'text-blue',
  paid: 'text-green',
  completed: 'text-dim',
  rejected: 'text-red',
  cancelled: 'text-red',
}

const DAY_LABELS = ['', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

const AdminConsulting = () => {
  const [settings, setSettings] = useState(null)
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [statusMsg, setStatusMsg] = useState('')
  const [filter, setFilter] = useState('all')
  const [actionLoading, setActionLoading] = useState(null) // booking id being acted on
  const [rejectId, setRejectId] = useState(null)
  const [rejectReason, setRejectReason] = useState('')

  // Settings editor
  const [editingSettings, setEditingSettings] = useState(false)
  const [editPrice, setEditPrice] = useState('')
  const [editDuration, setEditDuration] = useState('')
  const [editStartHour, setEditStartHour] = useState('')
  const [editEndHour, setEditEndHour] = useState('')
  const [editDescription, setEditDescription] = useState('')
  const [editEnabled, setEditEnabled] = useState(true)
  const [savingSettings, setSavingSettings] = useState(false)

  const token = getToken()

  const fetchData = useCallback(async () => {
    try {
      const [s, b] = await Promise.all([
        getSettings(),
        adminListBookings(token),
      ])
      setSettings(s)
      setBookings(b)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [token])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const handleApprove = async (id) => {
    setActionLoading(id)
    setStatusMsg('')
    try {
      await adminApproveBooking(token, id)
      setStatusMsg('Booking approved — payment link sent to client.')
      await fetchData()
    } catch (err) {
      setError(err.message)
    }
    setActionLoading(null)
  }

  const handleReject = async () => {
    if (!rejectId) return
    setActionLoading(rejectId)
    setStatusMsg('')
    try {
      await adminRejectBooking(token, rejectId, rejectReason)
      setStatusMsg('Booking rejected — client notified.')
      setRejectId(null)
      setRejectReason('')
      await fetchData()
    } catch (err) {
      setError(err.message)
    }
    setActionLoading(null)
  }

  const openSettingsEditor = () => {
    if (!settings) return
    setEditPrice((settings.price_cents / 100).toFixed(2))
    setEditDuration(String(settings.session_duration_min))
    setEditStartHour(String(settings.available_start_hour))
    setEditEndHour(String(settings.available_end_hour))
    setEditDescription(settings.description)
    setEditEnabled(settings.booking_enabled)
    setEditingSettings(true)
  }

  const handleSaveSettings = async () => {
    setSavingSettings(true)
    setStatusMsg('')
    try {
      await adminUpdateSettings(token, {
        price_cents: Math.round(parseFloat(editPrice) * 100),
        session_duration_min: parseInt(editDuration, 10),
        available_start_hour: parseInt(editStartHour, 10),
        available_end_hour: parseInt(editEndHour, 10),
        description: editDescription,
        booking_enabled: editEnabled,
      })
      setStatusMsg('Settings saved.')
      setEditingSettings(false)
      await fetchData()
    } catch (err) {
      setError(err.message)
    }
    setSavingSettings(false)
  }

  const filteredBookings = filter === 'all'
    ? bookings
    : bookings.filter((b) => b.status === filter)

  const pendingCount = bookings.filter((b) => b.status === 'pending').length

  if (loading) return <p className="text-dim">Loading consulting data...</p>

  return (
    <div className="admin-section">
      {error && <p className="text-red" style={{ marginBottom: '1rem' }}>{error}</p>}
      {statusMsg && <p className="text-green" style={{ marginBottom: '1rem' }}>{statusMsg}</p>}

      {/* Settings */}
      <div className="admin-section-header">
        <h2 className="section-comment">Consulting Settings</h2>
        {!editingSettings && (
          <button onClick={openSettingsEditor} className="admin-btn admin-btn-small">edit</button>
        )}
      </div>

      {editingSettings ? (
        <div className="consulting-settings-editor">
          <div className="editor-fields">
            <div className="editor-row">
              <div className="editor-field">
                <label className="text-green">price ($)</label>
                <input
                  type="number"
                  step="0.01"
                  value={editPrice}
                  onChange={(e) => setEditPrice(e.target.value)}
                  className="admin-input"
                />
              </div>
              <div className="editor-field">
                <label className="text-green">duration (min)</label>
                <input
                  type="number"
                  value={editDuration}
                  onChange={(e) => setEditDuration(e.target.value)}
                  className="admin-input"
                />
              </div>
              <div className="editor-field">
                <label className="text-green">enabled</label>
                <button
                  onClick={() => setEditEnabled(!editEnabled)}
                  className={`admin-btn ${editEnabled ? 'btn-published' : 'btn-draft'}`}
                >
                  {editEnabled ? 'enabled' : 'disabled'}
                </button>
              </div>
            </div>
            <div className="editor-row">
              <div className="editor-field">
                <label className="text-green">start hour</label>
                <input
                  type="number"
                  min="0"
                  max="23"
                  value={editStartHour}
                  onChange={(e) => setEditStartHour(e.target.value)}
                  className="admin-input"
                />
              </div>
              <div className="editor-field">
                <label className="text-green">end hour</label>
                <input
                  type="number"
                  min="0"
                  max="23"
                  value={editEndHour}
                  onChange={(e) => setEditEndHour(e.target.value)}
                  className="admin-input"
                />
              </div>
            </div>
            <div className="editor-field">
              <label className="text-green">description</label>
              <textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                className="editor-textarea"
                rows={3}
              />
            </div>
          </div>
          <div className="editor-actions">
            <button onClick={handleSaveSettings} disabled={savingSettings} className="admin-btn btn-save">
              {savingSettings ? 'saving...' : 'save settings'}
            </button>
            <button onClick={() => setEditingSettings(false)} className="admin-btn">cancel</button>
          </div>
        </div>
      ) : settings && (
        <div className="admin-info" style={{ marginBottom: '2rem' }}>
          <div className="contact-row">
            <span className="text-green">price</span>
            <span>{formatPrice(settings.price_cents, settings.currency)}</span>
          </div>
          <div className="contact-row">
            <span className="text-green">duration</span>
            <span>{settings.session_duration_min} min</span>
          </div>
          <div className="contact-row">
            <span className="text-green">hours</span>
            <span>{settings.available_start_hour}:00 – {settings.available_end_hour}:00 ({settings.timezone})</span>
          </div>
          <div className="contact-row">
            <span className="text-green">days</span>
            <span>{settings.available_days.map(d => DAY_LABELS[d]).join(', ')}</span>
          </div>
          <div className="contact-row">
            <span className="text-green">status</span>
            <span className={settings.booking_enabled ? 'text-green' : 'text-red'}>
              {settings.booking_enabled ? 'enabled' : 'disabled'}
            </span>
          </div>
        </div>
      )}

      {/* Bookings */}
      <div className="admin-section-header">
        <h2 className="section-comment">
          Bookings ({filteredBookings.length})
          {pendingCount > 0 && <span className="text-orange"> — {pendingCount} pending</span>}
        </h2>
      </div>

      <div className="booking-filters">
        {['all', 'pending', 'approved', 'paid', 'completed', 'rejected'].map((f) => (
          <button
            key={f}
            className={`admin-btn admin-btn-small ${filter === f ? 'btn-published' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Reject modal */}
      {rejectId && (
        <div className="reject-form">
          <p className="text-dim">Reason for rejection (optional):</p>
          <div className="admin-form">
            <input
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              className="admin-input"
              placeholder="e.g., Schedule conflict"
              autoFocus
            />
            <button onClick={handleReject} className="admin-btn btn-danger">reject</button>
            <button onClick={() => { setRejectId(null); setRejectReason('') }} className="admin-btn">cancel</button>
          </div>
        </div>
      )}

      {filteredBookings.length === 0 ? (
        <p className="text-dim" style={{ marginTop: '1rem' }}>No {filter === 'all' ? '' : filter} bookings.</p>
      ) : (
        <div className="admin-table" style={{ marginTop: '1rem' }}>
          <div className="admin-table-header booking-row-grid">
            <span>STATUS</span>
            <span>CLIENT</span>
            <span>DATE/TIME</span>
            <span>PRICE</span>
            <span>ACTIONS</span>
          </div>
          {filteredBookings.map((b) => (
            <div key={b.id} className="admin-table-row booking-row-grid">
              <span className={STATUS_COLORS[b.status] || 'text-dim'}>{b.status}</span>
              <span title={b.client_email}>
                {b.client_name}
                <br />
                <span className="text-dim" style={{ fontSize: '0.75rem' }}>{b.client_email}</span>
              </span>
              <span>
                {formatDate(b.requested_date)}
                <br />
                <span className="text-dim">{formatTime(b.requested_time)}</span>
              </span>
              <span>
                {formatPrice(b.price_cents, b.currency)}
                <br />
                <span className={b.payment_status === 'paid' ? 'text-green' : 'text-dim'} style={{ fontSize: '0.75rem' }}>
                  {b.payment_status}
                </span>
              </span>
              <div className="admin-actions">
                {b.status === 'pending' && (
                  <>
                    <button
                      onClick={() => handleApprove(b.id)}
                      disabled={actionLoading === b.id}
                      className="admin-btn admin-btn-small btn-save"
                    >
                      {actionLoading === b.id ? '...' : 'approve'}
                    </button>
                    <button
                      onClick={() => setRejectId(b.id)}
                      className="admin-btn admin-btn-small btn-danger"
                    >
                      reject
                    </button>
                  </>
                )}
                {b.status === 'approved' && (
                  <button
                    onClick={() => setRejectId(b.id)}
                    className="admin-btn admin-btn-small btn-danger"
                  >
                    cancel
                  </button>
                )}
                {b.details && (
                  <details className="booking-details">
                    <summary className="admin-btn admin-btn-small">details</summary>
                    <p className="text-dim" style={{ marginTop: '0.5rem', whiteSpace: 'pre-wrap' }}>{b.details}</p>
                  </details>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AdminConsulting

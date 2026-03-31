import { useState, useEffect, useRef } from 'react'
import ConsultingCalendar from '../components/ConsultingCalendar'
import ConsultingTimeSlots from '../components/ConsultingTimeSlots'
import {
  getSettings,
  getBookedSlots,
  getBlockedDates,
  submitBooking,
  formatPrice,
  formatTime,
  formatDate,
} from '../utils/supabase'

const Consulting = () => {
  // Data state
  const [settings, setSettings] = useState(null)
  const [bookedSlots, setBookedSlots] = useState([])
  const [blockedDates, setBlockedDates] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Booking flow state
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState(null)
  const [step, setStep] = useState(0) // 0=calendar, 1=time, 2=form, 3=submitting, 4=done
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [details, setDetails] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [bookingResult, setBookingResult] = useState(null)
  const [submitError, setSubmitError] = useState(null)

  // Terminal output lines
  const [lines, setLines] = useState([])
  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    const load = async () => {
      try {
        const [s, slots, blocked] = await Promise.all([
          getSettings(),
          getBookedSlots(),
          getBlockedDates(),
        ])
        setSettings(s)
        setBookedSlots(slots)
        setBlockedDates(blocked)
      } catch (err) {
        setError('Failed to load booking data. Please try again later.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [lines, step])

  useEffect(() => {
    inputRef.current?.focus()
  }, [step])

  const addLine = (line) => setLines((prev) => [...prev, line])

  const handleDateSelect = (date) => {
    setSelectedDate(date)
    setSelectedTime(null)
    setStep(1)
    addLine({ type: 'cmd', text: `select-date ${date}` })
    addLine({ type: 'info', text: `Selected ${formatDate(date)}. Choose a time slot:` })
  }

  const handleTimeSelect = (time) => {
    setSelectedTime(time)
    setStep(2)
    addLine({ type: 'cmd', text: `select-time ${formatTime(time)}` })
    addLine({ type: 'info', text: `Session: ${formatDate(selectedDate)} at ${formatTime(time)}` })
    addLine({ type: 'info', text: `Price: ${formatPrice(settings.price_cents, settings.currency)} | Duration: ${settings.session_duration_min} min` })
    addLine({ type: 'blank' })
    addLine({ type: 'info', text: 'Please provide your details:' })
  }

  const handleFormSubmit = async () => {
    if (!name.trim() || !email.trim()) {
      setSubmitError('Name and email are required')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setSubmitError('Invalid email address')
      return
    }

    setSubmitting(true)
    setSubmitError(null)
    setStep(3)
    addLine({ type: 'prompt', label: 'name', value: name })
    addLine({ type: 'prompt', label: 'email', value: email })
    addLine({ type: 'prompt', label: 'details', value: details || '(none)' })
    addLine({ type: 'blank' })
    addLine({ type: 'info', text: 'Submitting booking request...' })

    try {
      const result = await submitBooking({
        client_name: name.trim(),
        client_email: email.trim(),
        details: details.trim(),
        requested_date: selectedDate,
        requested_time: selectedTime,
      })
      setBookingResult(result)
      setStep(4)
      addLine({ type: 'success', text: 'Booking request submitted!' })
      addLine({ type: 'info', text: `You will receive an email at ${email} when your request is reviewed.` })
      addLine({ type: 'blank' })
      addLine({ type: 'info', text: `Booking ID: ${result.id}` })
      addLine({ type: 'info', text: `Check status: /consulting/status/${result.id}` })
    } catch (err) {
      setSubmitError(err.message)
      setStep(2)
      addLine({ type: 'error', text: `Error: ${err.message}` })
    } finally {
      setSubmitting(false)
    }
  }

  const handleKeyDown = (e, field) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (field === 'name' && name.trim()) {
        inputRef.current = null
        setStep(2.1)
        setTimeout(() => inputRef.current?.focus(), 0)
      } else if (field === 'email' && email.trim()) {
        inputRef.current = null
        setStep(2.2)
        setTimeout(() => inputRef.current?.focus(), 0)
      } else if (field === 'details') {
        handleFormSubmit()
      }
    }
  }

  if (loading) {
    return (
      <div className="consulting">
        <p className="text-dim">Loading consulting data...</p>
        <span className="cursor" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="consulting">
        <h1>Consulting</h1>
        <p className="text-red">{error}</p>
        <p className="text-dim">Contact me directly at pcavendano@le1101.com</p>
      </div>
    )
  }

  if (!settings?.booking_enabled) {
    return (
      <div className="consulting">
        <h1>Consulting</h1>
        <p className="text-dim">Booking is currently unavailable. Check back soon or reach out directly.</p>
      </div>
    )
  }

  return (
    <div className="consulting">
      <h1>Consulting</h1>
      <p className="text-dim">{settings.description}</p>

      <div className="consulting-meta">
        <span className="text-green">{formatPrice(settings.price_cents, settings.currency)}</span>
        <span className="text-dim"> | </span>
        <span>{settings.session_duration_min} min session</span>
        <span className="text-dim"> | </span>
        <span className="text-dim">Mon–Fri, {settings.available_start_hour}:00–{settings.available_end_hour}:00 ({settings.timezone})</span>
      </div>

      <section className="consulting-section">
        <h2 className="section-comment">Select a Date</h2>
        <ConsultingCalendar
          availableDays={settings.available_days}
          blockedDates={blockedDates}
          bookedSlots={bookedSlots}
          settings={settings}
          selectedDate={selectedDate}
          onSelectDate={handleDateSelect}
        />
      </section>

      {step >= 1 && selectedDate && (
        <section className="consulting-section">
          <h2 className="section-comment">Select a Time</h2>
          <ConsultingTimeSlots
            date={selectedDate}
            settings={settings}
            bookedSlots={bookedSlots}
            selectedTime={selectedTime}
            onSelectTime={handleTimeSelect}
          />
        </section>
      )}

      {step >= 2 && (
        <section className="consulting-section">
          <h2 className="section-comment">Your Details</h2>
          <div className="terminal-output" onClick={() => inputRef.current?.focus()}>
            {lines.map((line, i) => (
              <div key={i} className="terminal-line">
                {line.type === 'cmd' && <><span className="text-green">$ </span><span>{line.text}</span></>}
                {line.type === 'info' && <span className="text-dim">{line.text}</span>}
                {line.type === 'prompt' && <><span className="text-green">{line.label}: </span><span>{line.value}</span></>}
                {line.type === 'success' && <span className="text-green">{line.text}</span>}
                {line.type === 'error' && <span className="text-red">{line.text}</span>}
                {line.type === 'blank' && <>&nbsp;</>}
              </div>
            ))}

            {step === 4 && (
              <div className="terminal-line">
                <a href={`/consulting/status/${bookingResult?.id}`} className="text-blue">
                  → View booking status
                </a>
              </div>
            )}

            {step >= 2 && step < 3 && (
              <>
                {step === 2 && (
                  <div className="terminal-input-line">
                    <span className="text-green">name: </span>
                    <input
                      ref={inputRef}
                      type="text"
                      className="terminal-input"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      onKeyDown={(e) => handleKeyDown(e, 'name')}
                      placeholder="Your name"
                    />
                  </div>
                )}
                {step === 2.1 && (
                  <>
                    <div className="terminal-line">
                      <span className="text-green">name: </span><span>{name}</span>
                    </div>
                    <div className="terminal-input-line">
                      <span className="text-green">email: </span>
                      <input
                        ref={inputRef}
                        type="email"
                        className="terminal-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onKeyDown={(e) => handleKeyDown(e, 'email')}
                        placeholder="your@email.com"
                      />
                    </div>
                  </>
                )}
                {step === 2.2 && (
                  <>
                    <div className="terminal-line">
                      <span className="text-green">name: </span><span>{name}</span>
                    </div>
                    <div className="terminal-line">
                      <span className="text-green">email: </span><span>{email}</span>
                    </div>
                    <div className="terminal-input-line">
                      <span className="text-green">details: </span>
                      <textarea
                        ref={inputRef}
                        className="terminal-input terminal-textarea"
                        value={details}
                        onChange={(e) => setDetails(e.target.value)}
                        onKeyDown={(e) => handleKeyDown(e, 'details')}
                        placeholder="What do you need help with? (Enter to submit, Shift+Enter for newline)"
                      />
                    </div>
                    <div className="send-hint">
                      <span className="text-dim">press </span>
                      <span className="text-green">Enter</span>
                      <span className="text-dim"> to submit</span>
                    </div>
                  </>
                )}
              </>
            )}

            {step === 3 && (
              <div className="terminal-line">
                <span className="text-dim">Processing</span>
                <span className="cursor" />
              </div>
            )}

            {submitError && (
              <div className="terminal-line">
                <span className="text-red">{submitError}</span>
              </div>
            )}

            <div ref={bottomRef} />
          </div>
        </section>
      )}

      {step < 2 && (
        <div className="cursor-line">
          <span className="prompt" />
          <span className="cursor" />
        </div>
      )}
    </div>
  )
}

export default Consulting

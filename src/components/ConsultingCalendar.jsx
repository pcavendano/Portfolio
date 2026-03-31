import { useState, useMemo } from 'react'

const DAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']
const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

// Convert JS day (0=Sun) to ISO day (1=Mon..7=Sun)
const toIsoDay = (jsDay) => (jsDay === 0 ? 7 : jsDay)

const ConsultingCalendar = ({ availableDays, blockedDates, bookedSlots, settings, selectedDate, onSelectDate }) => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const [viewYear, setViewYear] = useState(today.getFullYear())
  const [viewMonth, setViewMonth] = useState(today.getMonth())

  // Build sets for fast lookup
  const blockedSet = useMemo(
    () => new Set(blockedDates.map((b) => b.date)),
    [blockedDates],
  )

  // Count booked slots per date to detect fully booked days
  const bookedCountByDate = useMemo(() => {
    const counts = {}
    for (const slot of bookedSlots) {
      counts[slot.requested_date] = (counts[slot.requested_date] || 0) + 1
    }
    return counts
  }, [bookedSlots])

  const slotsPerDay = useMemo(() => {
    if (!settings) return 8
    return settings.available_end_hour - settings.available_start_hour
  }, [settings])

  const availableDaySet = useMemo(
    () => new Set(availableDays || [1, 2, 3, 4, 5]),
    [availableDays],
  )

  // Build calendar grid
  const firstDay = new Date(viewYear, viewMonth, 1)
  const startIso = toIsoDay(firstDay.getDay())
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate()
  const emptyCells = startIso - 1

  const prevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11)
      setViewYear(viewYear - 1)
    } else {
      setViewMonth(viewMonth - 1)
    }
  }

  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0)
      setViewYear(viewYear + 1)
    } else {
      setViewMonth(viewMonth + 1)
    }
  }

  // Don't allow navigating before current month
  const canGoPrev = viewYear > today.getFullYear() || (viewYear === today.getFullYear() && viewMonth > today.getMonth())

  const getDayStatus = (day) => {
    const date = new Date(viewYear, viewMonth, day)
    const dateStr = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    const isoDay = toIsoDay(date.getDay())

    if (date < today) return 'past'
    if (blockedSet.has(dateStr)) return 'blocked'
    if (!availableDaySet.has(isoDay)) return 'unavailable'
    if ((bookedCountByDate[dateStr] || 0) >= slotsPerDay) return 'full'
    return 'available'
  }

  return (
    <div className="cal">
      <div className="cal-header">
        <button className="cal-nav" onClick={prevMonth} disabled={!canGoPrev}>
          {'<'}
        </button>
        <span className="cal-title">
          {MONTH_NAMES[viewMonth]} {viewYear}
        </span>
        <button className="cal-nav" onClick={nextMonth}>
          {'>'}
        </button>
      </div>

      <div className="cal-grid">
        {DAYS.map((d) => (
          <span key={d} className="cal-day-label">{d}</span>
        ))}

        {Array.from({ length: emptyCells }).map((_, i) => (
          <span key={`e-${i}`} className="cal-cell cal-empty" />
        ))}

        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
          const status = getDayStatus(day)
          const dateStr = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
          const isSelected = selectedDate === dateStr
          const isToday = date => {
            const d = new Date(viewYear, viewMonth, day)
            return d.getTime() === today.getTime()
          }

          return (
            <button
              key={day}
              className={[
                'cal-cell',
                `cal-${status}`,
                isSelected && 'cal-selected',
                new Date(viewYear, viewMonth, day).getTime() === today.getTime() && 'cal-today',
              ].filter(Boolean).join(' ')}
              disabled={status !== 'available'}
              onClick={() => onSelectDate(dateStr)}
            >
              {String(day).padStart(2, '\u00A0')}
            </button>
          )
        })}
      </div>

      <div className="cal-legend">
        <span><span className="cal-dot cal-dot-available" /> available</span>
        <span><span className="cal-dot cal-dot-full" /> fully booked</span>
        <span><span className="cal-dot cal-dot-blocked" /> unavailable</span>
      </div>
    </div>
  )
}

export default ConsultingCalendar

import { useMemo } from 'react'
import { formatTime } from '../utils/supabase'

const ConsultingTimeSlots = ({ date, settings, bookedSlots, selectedTime, onSelectTime }) => {
  const slots = useMemo(() => {
    if (!settings || !date) return []

    const { available_start_hour, available_end_hour } = settings
    const all = []

    for (let h = available_start_hour; h < available_end_hour; h++) {
      const time = `${String(h).padStart(2, '0')}:00`
      all.push(time)
    }

    // Filter out booked slots for this date
    const bookedTimes = new Set(
      bookedSlots
        .filter((s) => s.requested_date === date)
        .map((s) => s.requested_time.slice(0, 5)), // normalize "14:00:00" → "14:00"
    )

    return all.map((time) => ({
      time,
      available: !bookedTimes.has(time),
    }))
  }, [date, settings, bookedSlots])

  if (!date) return null

  const availableCount = slots.filter((s) => s.available).length

  return (
    <div className="time-slots">
      <p className="text-dim">
        Available slots for {date} ({availableCount} open):
      </p>
      <div className="time-grid">
        {slots.map(({ time, available }) => (
          <button
            key={time}
            className={[
              'time-slot',
              !available && 'time-slot-booked',
              selectedTime === time && 'time-slot-selected',
            ].filter(Boolean).join(' ')}
            disabled={!available}
            onClick={() => onSelectTime(time)}
          >
            {formatTime(time)}
          </button>
        ))}
      </div>
    </div>
  )
}

export default ConsultingTimeSlots

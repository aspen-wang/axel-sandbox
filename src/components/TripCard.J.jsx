'use client'

// ─── Variant J: Calendar Card ─────────────────────────────────────
// Looks like a calendar/planner entry. Top strip with month/date range
// styled like a calendar header. Left border colored by priority.
// Body: title, travelers, notes. Bottom: checklist as compact badges.
// Budget right-aligned, countdown badge top-right.

const DEFAULT_TRIP = {
  title: 'Seattle → Tokyo',
  tripType: 'flight+hotel',
  dates: 'Jun 10 - 20, 2026',
  travelers: 2,
  status: 'planning',
  budget: 2400,
  notes: 'Anniversary trip, want ocean view hotel',
  tags: ['anniversary', 'beach', 'international'],
  priority: 'high',
  createdAt: 'Mar 1, 2026',
  daysUntil: 98,
  checklist: [
    { label: 'Book flights', done: false },
    { label: 'Reserve hotel', done: false },
    { label: 'Get travel insurance', done: false },
    { label: 'Pack bags', done: false },
  ],
}

const PRIORITY_BORDER = {
  high: '#EF508D',
  medium: '#FB7A29',
  low: '#444',
}

// ─── Skeleton ───────────────────────────────────────────────────────
function Skeleton() {
  return (
    <div
      className="animate-pulse rounded-[12px] overflow-hidden"
      style={{ backgroundColor: '#111', border: '1px solid #222' }}
    >
      <div className="h-[36px] bg-[#1a1a1a]" />
      <div style={{ padding: '12px 14px', borderLeft: '3px solid #222' }}>
        <div className="h-[14px] w-[150px] bg-[#222] rounded mb-[8px]" />
        <div className="h-[10px] w-[100px] bg-[#1a1a1a] rounded mb-[8px]" />
        <div className="h-[20px] w-full bg-[#1a1a1a] rounded mb-[10px]" />
        <div className="flex mb-[10px]" style={{ gap: '4px' }}>
          <div className="h-[20px] w-[70px] bg-[#222] rounded-[4px]" />
          <div className="h-[20px] w-[70px] bg-[#222] rounded-[4px]" />
          <div className="h-[20px] w-[70px] bg-[#222] rounded-[4px]" />
        </div>
        <div className="flex justify-end">
          <div className="h-[12px] w-[60px] bg-[#222] rounded" />
        </div>
      </div>
    </div>
  )
}

// ─── Parse date range for calendar header ────────────────────────────
function parseDateRange(dates) {
  // e.g. "Jun 10 - 20, 2026" -> { month: "JUN", range: "10 - 20", year: "2026" }
  if (!dates) return { month: '', range: '', year: '' }
  const match = dates.match(/^(\w+)\s+(.+?),?\s*(\d{4})$/)
  if (match) {
    return { month: match[1].toUpperCase(), range: match[2], year: match[3] }
  }
  return { month: '', range: dates, year: '' }
}

// ─── Main Component ─────────────────────────────────────────────────
export default function TripCard({ trip = DEFAULT_TRIP, loading = false, onClick }) {
  if (loading) return <Skeleton />

  const borderColor = PRIORITY_BORDER[trip.priority] || '#444'
  const checklist = trip.checklist || []
  const { month, range, year } = parseDateRange(trip.dates)

  return (
    <button
      onClick={onClick}
      className="w-full text-left rounded-[12px] overflow-hidden hover:border-[#333] transition-colors"
      style={{ backgroundColor: '#111', border: '1px solid #222' }}
    >
      {/* Calendar header strip */}
      <div
        className="flex items-center justify-between relative"
        style={{
          backgroundColor: '#1a1a1a',
          padding: '8px 14px',
          borderBottom: '1px solid #222',
        }}
      >
        <div className="flex items-baseline">
          <span
            className="font-['Lato',sans-serif] font-semibold text-[13px] leading-[1] mr-[6px]"
            style={{ color: borderColor }}
          >
            {month}
          </span>
          <span className="font-['Lato',sans-serif] text-[12px] text-[#888] leading-[1] mr-[4px]">
            {range}
          </span>
          <span className="font-['Lato',sans-serif] text-[11px] text-[#555] leading-[1]">
            {year}
          </span>
        </div>
        {/* Countdown badge */}
        {trip.daysUntil != null && (
          <span
            className="font-['Lato',sans-serif] text-[10px] font-semibold leading-[1] rounded-[4px]"
            style={{ backgroundColor: '#222', color: '#fff', padding: '3px 6px' }}
          >
            {trip.daysUntil}d
          </span>
        )}
      </div>

      {/* Body with left border */}
      <div style={{ padding: '12px 14px', borderLeft: `3px solid ${borderColor}` }}>
        {/* Title */}
        <p className="font-['Lato',sans-serif] font-semibold text-[14px] text-white leading-[1.3] mb-[2px]">
          {trip.title}
        </p>

        {/* Travelers + trip type */}
        <p className="font-['Lato',sans-serif] text-[11px] text-[#888] leading-[1.3] mb-[8px]">
          {trip.travelers && <>{trip.travelers} traveler{trip.travelers !== 1 ? 's' : ''}</>}
          {trip.tripType && <> &middot; {trip.tripType.replace('+', ' + ')}</>}
        </p>

        {/* Notes */}
        {trip.notes && (
          <p
            className="font-['Lato',sans-serif] text-[11px] leading-[1.4] mb-[10px]"
            style={{ color: '#aaa' }}
          >
            {trip.notes}
          </p>
        )}

        {/* Checklist as compact inline badges */}
        {checklist.length > 0 && (
          <div className="flex flex-wrap mb-[10px]" style={{ gap: '4px' }}>
            {checklist.map((item, i) => (
              <span
                key={i}
                className="font-['Lato',sans-serif] text-[10px] font-medium leading-[1] rounded-[4px]"
                style={{
                  backgroundColor: item.done ? 'rgba(79, 198, 96, 0.15)' : '#222',
                  color: item.done ? '#4FC660' : '#666',
                  padding: '4px 8px',
                }}
              >
                {item.done ? '\u2713 ' : ''}{item.label}
              </span>
            ))}
          </div>
        )}

        {/* Budget row */}
        <div className="flex items-center justify-end">
          {trip.budget && (
            <span
              className="font-['Lato',sans-serif] font-semibold text-[14px] leading-[1]"
              style={{ color: '#4FC660' }}
            >
              ${trip.budget.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </button>
  )
}

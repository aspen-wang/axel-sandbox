'use client'

// ─── Variant I: Polaroid Style ────────────────────────────────────
// Card looks like a polaroid photo frame. Top section is a gradient
// placeholder "photo" area with destination icon. Bottom darker area
// has title, dates, notes. Tags as colored chips. Budget bottom-right.
// "Written Mar 1" date in tiny footer text.

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

const TAG_COLORS = ['#EF508D', '#0090FF', '#FB7A29', '#4FC660', '#888']

// ─── Skeleton ───────────────────────────────────────────────────────
function Skeleton() {
  return (
    <div
      className="animate-pulse rounded-[12px] overflow-hidden"
      style={{ backgroundColor: '#111', border: '1px solid #222' }}
    >
      {/* Photo placeholder */}
      <div style={{ height: '100px', backgroundColor: '#1a1a1a' }} />
      {/* Body */}
      <div style={{ padding: '12px 14px 14px' }}>
        <div className="h-[14px] w-[140px] bg-[#222] rounded mb-[6px]" />
        <div className="h-[10px] w-[100px] bg-[#1a1a1a] rounded mb-[10px]" />
        <div className="h-[24px] w-full bg-[#1a1a1a] rounded mb-[10px]" />
        <div className="flex mb-[10px]" style={{ gap: '6px' }}>
          <div className="h-[18px] w-[60px] bg-[#222] rounded-full" />
          <div className="h-[18px] w-[50px] bg-[#222] rounded-full" />
        </div>
        <div className="flex justify-between">
          <div className="h-[9px] w-[70px] bg-[#1a1a1a] rounded" />
          <div className="h-[12px] w-[50px] bg-[#222] rounded" />
        </div>
      </div>
    </div>
  )
}

// ─── Destination Icon (globe) ───────────────────────────────────────
function DestinationIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.3 }}>
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  )
}

// ─── Main Component ─────────────────────────────────────────────────
export default function TripCard({ trip = DEFAULT_TRIP, loading = false, onClick }) {
  if (loading) return <Skeleton />

  const tags = trip.tags || []

  return (
    <button
      onClick={onClick}
      className="w-full text-left rounded-[12px] overflow-hidden hover:border-[#333] transition-colors"
      style={{ backgroundColor: '#111', border: '1px solid #222' }}
    >
      {/* Photo area — gradient placeholder */}
      <div
        className="flex items-center justify-center relative"
        style={{
          height: '100px',
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
        }}
      >
        <DestinationIcon />
        {/* Countdown badge in top-right */}
        {trip.daysUntil != null && (
          <span
            className="absolute font-['Lato',sans-serif] text-[10px] font-medium leading-[1]"
            style={{
              top: '8px',
              right: '8px',
              backgroundColor: 'rgba(0,0,0,0.5)',
              color: '#fff',
              padding: '4px 8px',
              borderRadius: '999px',
            }}
          >
            {trip.daysUntil}d away
          </span>
        )}
        {/* Trip type badge in top-left */}
        <span
          className="absolute font-['Lato',sans-serif] text-[9px] font-medium leading-[1] uppercase tracking-wider"
          style={{
            top: '8px',
            left: '8px',
            backgroundColor: 'rgba(0,0,0,0.5)',
            color: '#888',
            padding: '4px 6px',
            borderRadius: '4px',
          }}
        >
          {trip.tripType?.replace('+', ' + ') || 'trip'}
        </span>
      </div>

      {/* Bottom section */}
      <div style={{ backgroundColor: '#1a1a1a', padding: '12px 14px 14px' }}>
        {/* Title */}
        <p className="font-['Lato',sans-serif] font-semibold text-[14px] text-white leading-[1.3] mb-[2px]">
          {trip.title}
        </p>

        {/* Dates + travelers */}
        <p className="font-['Lato',sans-serif] text-[11px] text-[#888] leading-[1.3] mb-[8px]">
          {trip.dates}
          {trip.travelers && <> &middot; {trip.travelers} traveler{trip.travelers !== 1 ? 's' : ''}</>}
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

        {/* Tag chips */}
        {tags.length > 0 && (
          <div className="flex flex-wrap mb-[10px]" style={{ gap: '6px' }}>
            {tags.map((tag, i) => {
              const color = TAG_COLORS[i % TAG_COLORS.length]
              return (
                <span
                  key={tag}
                  className="font-['Lato',sans-serif] text-[9px] font-medium leading-[1] rounded-full"
                  style={{
                    backgroundColor: `${color}15`,
                    color: color,
                    padding: '3px 8px',
                  }}
                >
                  {tag}
                </span>
              )
            })}
          </div>
        )}

        {/* Footer: created date + budget */}
        <div className="flex items-center justify-between">
          {trip.createdAt && (
            <span className="font-['Lato',sans-serif] text-[9px] text-[#555] leading-[1]">
              Written {trip.createdAt}
            </span>
          )}
          {trip.budget && (
            <span
              className="font-['Lato',sans-serif] font-semibold text-[13px] leading-[1]"
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

'use client'

// ─── Variant K: Kanban Ticket ─────────────────────────────────────
// Looks like a kanban/project board ticket. Top: priority tag pill +
// type icons. Title prominent. Notes in italic secondary text.
// Tags as bottom row of rounded outline pills. Footer: budget left,
// countdown right, horizontal divider. Subtle left accent bar.

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

const PRIORITY_CONFIG = {
  high: { label: 'HIGH', color: '#EF508D', bg: 'rgba(239,80,141,0.12)' },
  medium: { label: 'MED', color: '#FB7A29', bg: 'rgba(251,122,41,0.12)' },
  low: { label: 'LOW', color: '#888', bg: 'rgba(136,136,136,0.12)' },
}

// ─── Skeleton ───────────────────────────────────────────────────────
function Skeleton() {
  return (
    <div
      className="animate-pulse rounded-[12px] overflow-hidden"
      style={{ backgroundColor: '#111', border: '1px solid #222' }}
    >
      <div className="flex" style={{ minHeight: '140px' }}>
        <div style={{ width: '3px', backgroundColor: '#222' }} />
        <div className="flex-1" style={{ padding: '14px' }}>
          <div className="flex items-center mb-[10px]">
            <div className="h-[18px] w-[40px] bg-[#222] rounded-full mr-[8px]" />
            <div className="h-[12px] w-[60px] bg-[#1a1a1a] rounded" />
          </div>
          <div className="h-[16px] w-[160px] bg-[#222] rounded mb-[4px]" />
          <div className="h-[10px] w-[120px] bg-[#1a1a1a] rounded mb-[10px]" />
          <div className="h-[20px] w-full bg-[#1a1a1a] rounded mb-[12px]" />
          <div className="flex mb-[10px]" style={{ gap: '6px' }}>
            <div className="h-[20px] w-[70px] bg-[#222] rounded-full" />
            <div className="h-[20px] w-[50px] bg-[#222] rounded-full" />
          </div>
          <div className="border-t border-[#222] pt-[10px] flex justify-between">
            <div className="h-[12px] w-[60px] bg-[#222] rounded" />
            <div className="h-[12px] w-[40px] bg-[#1a1a1a] rounded" />
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Trip Type Icons (flight + hotel) ────────────────────────────────
function TripTypeIcons({ type }) {
  const showFlight = type === 'flight' || type === 'flight+hotel'
  const showHotel = type === 'hotel' || type === 'flight+hotel'
  return (
    <div className="flex items-center">
      {showFlight && (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5 5 3 2 2-5 1.5-2-1.5-1 .5 2.5 3 3 2.5.5-1-1.5-2 1.5-5 2 2 3 5 .5-.3c.4-.2.6-.6.5-1.1z" />
        </svg>
      )}
      {showFlight && showHotel && <span style={{ color: '#333', margin: '0 2px', fontSize: '10px' }}>+</span>}
      {showHotel && (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 21h18M3 7v14M21 7v14M6 11h4M6 15h4M14 11h4M14 15h4M10 21V7l2-4 2 4v14" />
        </svg>
      )}
    </div>
  )
}

// ─── Main Component ─────────────────────────────────────────────────
export default function TripCard({ trip = DEFAULT_TRIP, loading = false, onClick }) {
  if (loading) return <Skeleton />

  const priority = PRIORITY_CONFIG[trip.priority] || PRIORITY_CONFIG.low
  const tags = trip.tags || []
  const checklist = trip.checklist || []
  const doneCount = checklist.filter((c) => c.done).length
  const totalCount = checklist.length

  return (
    <button
      onClick={onClick}
      className="w-full text-left rounded-[12px] overflow-hidden hover:border-[#333] transition-colors"
      style={{ backgroundColor: '#111', border: '1px solid #222' }}
    >
      <div className="flex">
        {/* Left accent bar */}
        <div
          className="shrink-0"
          style={{ width: '3px', backgroundColor: priority.color }}
        />

        {/* Content */}
        <div className="flex-1" style={{ padding: '14px' }}>
          {/* Top: priority pill + type icons */}
          <div className="flex items-center justify-between mb-[8px]">
            <div className="flex items-center">
              <span
                className="font-['Lato',sans-serif] text-[9px] font-semibold leading-[1] tracking-wider rounded-full mr-[8px]"
                style={{
                  backgroundColor: priority.bg,
                  color: priority.color,
                  padding: '4px 8px',
                }}
              >
                {priority.label}
              </span>
              <TripTypeIcons type={trip.tripType || 'flight+hotel'} />
            </div>
            {/* Checklist progress if items exist */}
            {totalCount > 0 && (
              <span className="font-['Lato',sans-serif] text-[9px] text-[#555] leading-[1]">
                {doneCount}/{totalCount}
              </span>
            )}
          </div>

          {/* Title */}
          <p className="font-['Lato',sans-serif] font-semibold text-[15px] text-white leading-[1.3] mb-[2px]">
            {trip.title}
          </p>

          {/* Dates + travelers */}
          <p className="font-['Lato',sans-serif] text-[11px] text-[#888] leading-[1.3] mb-[8px]">
            {trip.dates}
            {trip.travelers && <> &middot; {trip.travelers} traveler{trip.travelers !== 1 ? 's' : ''}</>}
          </p>

          {/* Notes — italic secondary */}
          {trip.notes && (
            <p
              className="font-['Lato',sans-serif] text-[11px] leading-[1.4] mb-[10px]"
              style={{ color: '#888', fontStyle: 'italic' }}
            >
              {trip.notes}
            </p>
          )}

          {/* Tags as outline pills */}
          {tags.length > 0 && (
            <div className="flex flex-wrap mb-[10px]" style={{ gap: '6px' }}>
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="font-['Lato',sans-serif] text-[10px] font-medium leading-[1] rounded-full"
                  style={{
                    border: '1px solid #333',
                    color: '#888',
                    padding: '3px 8px',
                    backgroundColor: 'transparent',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Divider + Footer */}
          <div className="border-t border-[#222] pt-[10px] flex items-center justify-between">
            {trip.budget && (
              <span
                className="font-['Lato',sans-serif] font-semibold text-[13px] leading-[1]"
                style={{ color: '#4FC660' }}
              >
                ${trip.budget.toLocaleString()}
              </span>
            )}
            {trip.daysUntil != null && (
              <span
                className="font-['Lato',sans-serif] text-[11px] font-medium leading-[1]"
                style={{ color: '#888' }}
              >
                {trip.daysUntil} days
              </span>
            )}
          </div>
        </div>
      </div>
    </button>
  )
}

'use client'

// ─── Variant G: Sticky Note ──────────────────────────────────────
// Looks like a pinned sticky note / memo. Slightly rotated (-1deg),
// paper-like feel with top-left pin icon. Handwritten-style notes,
// tag pills, budget in green, priority colored dot, countdown badge.

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

const PRIORITY_COLORS = {
  high: '#EF508D',
  medium: '#FB7A29',
  low: '#888888',
}

// ─── Skeleton ───────────────────────────────────────────────────────
function Skeleton() {
  return (
    <div
      className="animate-pulse rounded-[12px]"
      style={{
        backgroundColor: '#111',
        border: '1px solid #222',
        padding: '16px',
        transform: 'rotate(-1deg)',
      }}
    >
      <div className="flex items-center mb-[12px]">
        <div className="w-[16px] h-[16px] rounded-full bg-[#222] mr-[8px]" />
        <div className="h-[14px] w-[140px] bg-[#222] rounded" />
      </div>
      <div className="h-[10px] w-[180px] bg-[#1a1a1a] rounded mb-[8px]" />
      <div className="h-[32px] w-full bg-[#1a1a1a] rounded mb-[12px]" />
      <div className="flex gap-[6px] mb-[10px]">
        <div className="h-[18px] w-[60px] bg-[#222] rounded-full" />
        <div className="h-[18px] w-[50px] bg-[#222] rounded-full" />
      </div>
      <div className="h-[10px] w-[80px] bg-[#222] rounded" />
    </div>
  )
}

// ─── Pin Icon ───────────────────────────────────────────────────────
function PinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#EF508D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="17" x2="12" y2="22" />
      <path d="M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V6h1a2 2 0 0 0 0-4H8a2 2 0 0 0 0 4h1v4.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24Z" />
    </svg>
  )
}

// ─── Main Component ─────────────────────────────────────────────────
export default function TripCard({ trip = DEFAULT_TRIP, loading = false, onClick }) {
  if (loading) return <Skeleton />

  const priorityColor = PRIORITY_COLORS[trip.priority] || '#888'

  return (
    <button
      onClick={onClick}
      className="w-full text-left rounded-[12px] hover:border-[#333] transition-all"
      style={{
        backgroundColor: '#111',
        border: '1px solid #222',
        padding: '16px',
        transform: 'rotate(-1deg)',
      }}
    >
      {/* Pin + Title row */}
      <div className="flex items-start mb-[4px]">
        <div className="shrink-0 mr-[8px] mt-[1px]">
          <PinIcon />
        </div>
        <p
          className="font-['Lato',sans-serif] font-semibold text-[15px] text-white leading-[1.3] flex-1"
        >
          {trip.title}
        </p>
        {/* Priority dot */}
        <div
          className="shrink-0 ml-[8px] mt-[5px] w-[8px] h-[8px] rounded-full"
          style={{ backgroundColor: priorityColor }}
        />
      </div>

      {/* Date + travelers */}
      <p className="font-['Lato',sans-serif] text-[11px] text-[#888] leading-[1.3] mb-[10px] ml-[24px]">
        {trip.dates}
        {trip.travelers && <> &middot; {trip.travelers} traveler{trip.travelers !== 1 ? 's' : ''}</>}
      </p>

      {/* Notes — handwritten style */}
      {trip.notes && (
        <p
          className="font-['Lato',sans-serif] text-[12px] leading-[1.5] mb-[12px] ml-[24px]"
          style={{
            color: '#aaa',
            fontStyle: 'italic',
            borderLeft: '2px solid #333',
            paddingLeft: '10px',
          }}
        >
          &ldquo;{trip.notes}&rdquo;
        </p>
      )}

      {/* Tags row */}
      {trip.tags && trip.tags.length > 0 && (
        <div className="flex flex-wrap ml-[24px] mb-[10px]" style={{ gap: '6px' }}>
          {trip.tags.map((tag) => (
            <span
              key={tag}
              className="font-['Lato',sans-serif] text-[10px] font-medium leading-[1] rounded-full"
              style={{
                backgroundColor: '#222',
                color: '#888',
                padding: '4px 8px',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Footer: Budget + Countdown */}
      <div className="flex items-center justify-between ml-[24px] mt-[2px]">
        {trip.budget && (
          <span
            className="font-['Lato',sans-serif] font-semibold text-[13px] leading-[1]"
            style={{ color: '#4FC660' }}
          >
            ${trip.budget.toLocaleString()} budget
          </span>
        )}
        {trip.daysUntil != null && (
          <span
            className="font-['Lato',sans-serif] text-[10px] font-medium leading-[1] rounded-full"
            style={{
              backgroundColor: '#222',
              color: '#fff',
              padding: '4px 8px',
            }}
          >
            {trip.daysUntil} days away
          </span>
        )}
      </div>
    </button>
  )
}

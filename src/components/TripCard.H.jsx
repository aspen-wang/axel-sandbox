'use client'

// ─── Variant H: Checklist Planner ─────────────────────────────────
// Focused on checklist/to-do items for trip prep. Title + dates header,
// progress bar, checkboxes for each item, budget + priority footer,
// tags as subtle inline text.

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

const PRIORITY_LABELS = {
  high: 'High',
  medium: 'Med',
  low: 'Low',
}

// ─── Skeleton ───────────────────────────────────────────────────────
function Skeleton() {
  return (
    <div
      className="animate-pulse rounded-[12px]"
      style={{ backgroundColor: '#111', border: '1px solid #222', padding: '14px' }}
    >
      <div className="flex items-center justify-between mb-[10px]">
        <div className="h-[14px] w-[150px] bg-[#222] rounded" />
        <div className="h-[10px] w-[50px] bg-[#1a1a1a] rounded" />
      </div>
      <div className="h-[4px] w-full bg-[#222] rounded-full mb-[12px]" />
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="flex items-center mb-[8px]">
          <div className="w-[14px] h-[14px] rounded-[3px] bg-[#222] mr-[8px]" />
          <div className="h-[11px] bg-[#1a1a1a] rounded" style={{ width: `${80 + i * 15}px` }} />
        </div>
      ))}
      <div className="border-t border-[#222] mt-[10px] pt-[10px] flex justify-between">
        <div className="h-[11px] w-[80px] bg-[#222] rounded" />
        <div className="h-[11px] w-[40px] bg-[#1a1a1a] rounded" />
      </div>
    </div>
  )
}

// ─── Checkbox Icon ──────────────────────────────────────────────────
function CheckboxIcon({ checked }) {
  if (checked) {
    return (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <rect x="0.5" y="0.5" width="13" height="13" rx="2.5" fill="#4FC660" fillOpacity="0.15" stroke="#4FC660" />
        <path d="M4 7l2.5 2.5L10 5" stroke="#4FC660" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <rect x="0.5" y="0.5" width="13" height="13" rx="2.5" stroke="#333" />
    </svg>
  )
}

// ─── Main Component ─────────────────────────────────────────────────
export default function TripCard({ trip = DEFAULT_TRIP, loading = false, onClick }) {
  if (loading) return <Skeleton />

  const priorityColor = PRIORITY_COLORS[trip.priority] || '#888'
  const priorityLabel = PRIORITY_LABELS[trip.priority] || 'Low'
  const checklist = trip.checklist || []
  const doneCount = checklist.filter((c) => c.done).length
  const totalCount = checklist.length
  const progressPct = totalCount > 0 ? (doneCount / totalCount) * 100 : 0

  return (
    <button
      onClick={onClick}
      className="w-full text-left rounded-[12px] hover:border-[#333] transition-colors"
      style={{ backgroundColor: '#111', border: '1px solid #222', padding: '14px' }}
    >
      {/* Header: title + dates */}
      <div className="flex items-start justify-between mb-[2px]">
        <p className="font-['Lato',sans-serif] font-semibold text-[14px] text-white leading-[1.3] flex-1 mr-[8px]">
          {trip.title}
        </p>
        {trip.daysUntil != null && (
          <span
            className="font-['Lato',sans-serif] text-[10px] font-medium leading-[1] shrink-0 rounded-full"
            style={{ backgroundColor: '#222', color: '#fff', padding: '4px 8px' }}
          >
            {trip.daysUntil}d
          </span>
        )}
      </div>
      <p className="font-['Lato',sans-serif] text-[11px] text-[#888] leading-[1.3] mb-[10px]">
        {trip.dates}
        {trip.travelers && <> &middot; {trip.travelers} traveler{trip.travelers !== 1 ? 's' : ''}</>}
      </p>

      {/* Progress bar */}
      {totalCount > 0 && (
        <div className="mb-[12px]">
          <div className="flex items-center justify-between mb-[4px]">
            <span className="font-['Lato',sans-serif] text-[10px] text-[#888] leading-[1]">
              {doneCount}/{totalCount} complete
            </span>
            <span className="font-['Lato',sans-serif] text-[10px] leading-[1]" style={{ color: '#4FC660' }}>
              {Math.round(progressPct)}%
            </span>
          </div>
          <div className="w-full h-[4px] rounded-full" style={{ backgroundColor: '#222' }}>
            <div
              className="h-[4px] rounded-full transition-all"
              style={{ width: `${progressPct}%`, backgroundColor: '#4FC660' }}
            />
          </div>
        </div>
      )}

      {/* Checklist items */}
      <div className="mb-[10px]">
        {checklist.map((item, i) => (
          <div key={i} className="flex items-center mb-[6px] last:mb-0">
            <div className="shrink-0 mr-[8px]">
              <CheckboxIcon checked={item.done} />
            </div>
            <span
              className="font-['Lato',sans-serif] text-[12px] leading-[1.3]"
              style={{
                color: item.done ? '#555' : '#ccc',
                textDecoration: item.done ? 'line-through' : 'none',
              }}
            >
              {item.label}
            </span>
          </div>
        ))}
      </div>

      {/* Tags as inline text */}
      {trip.tags && trip.tags.length > 0 && (
        <p className="font-['Lato',sans-serif] text-[10px] text-[#555] leading-[1.3] mb-[10px]">
          {trip.tags.join(' / ')}
        </p>
      )}

      {/* Footer: budget + priority */}
      <div className="border-t border-[#222] pt-[10px] flex items-center justify-between">
        {trip.budget && (
          <span
            className="font-['Lato',sans-serif] font-semibold text-[13px] leading-[1]"
            style={{ color: '#4FC660' }}
          >
            ${trip.budget.toLocaleString()}
          </span>
        )}
        <div className="flex items-center">
          <div
            className="w-[6px] h-[6px] rounded-full mr-[4px]"
            style={{ backgroundColor: priorityColor }}
          />
          <span
            className="font-['Lato',sans-serif] text-[10px] font-medium leading-[1]"
            style={{ color: priorityColor }}
          >
            {priorityLabel}
          </span>
        </div>
      </div>
    </button>
  )
}

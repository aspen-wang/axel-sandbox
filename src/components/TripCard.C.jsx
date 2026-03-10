'use client'

// ─── Variant C: Compact Row ────────────────────────────────────────
// Single-row horizontal layout, minimal ~56px height.
// Left: route + date. Center: status. Right: price.
// Entire card clickable. Completed state 0.5 opacity.

const DEFAULT_TRIP = {
  title: 'Seattle → San Francisco',
  tripType: 'flight+hotel',
  dates: 'Apr 15 - 18, 2026',
  travelers: 2,
  status: 'monitoring',
  price: 358,
  originalPrice: 478,
  axelLastChecked: '2 min ago',
  airlineName: 'United Airlines',
  hotelName: 'The Westin SF',
}

const STATUS_CONFIG = {
  monitoring: { label: 'Monitoring', color: '#EF508D', dot: 'pulse' },
  'price-drop': { label: 'Price Drop Found', color: '#4FC660', dot: 'solid' },
  booked: { label: 'Booked', color: '#FFFFFF', dot: 'check' },
  completed: { label: 'Completed', color: '#888888', dot: 'check' },
}

function Skeleton() {
  return (
    <div
      className="flex items-center animate-pulse rounded-[12px]"
      style={{
        backgroundColor: '#111111',
        border: '1px solid #222222',
        padding: '12px 16px',
        height: '56px',
      }}
    >
      <div className="flex-1 mr-[12px]">
        <div className="h-[14px] w-[140px] rounded mb-[6px]" style={{ backgroundColor: '#222222' }} />
        <div className="h-[11px] w-[100px] rounded" style={{ backgroundColor: '#1A1A1A' }} />
      </div>
      <div className="h-[12px] w-[70px] rounded mr-[16px]" style={{ backgroundColor: '#1A1A1A' }} />
      <div className="h-[14px] w-[50px] rounded" style={{ backgroundColor: '#222222' }} />
    </div>
  )
}

export default function TripCard({ trip = DEFAULT_TRIP, loading = false, onClick }) {
  if (loading) return <Skeleton />

  const status = STATUS_CONFIG[trip.status] || STATUS_CONFIG.monitoring
  const isCompleted = trip.status === 'completed'

  return (
    <button
      onClick={onClick}
      className="w-full text-left flex items-center rounded-[12px] hover:border-[#333] transition-colors"
      style={{
        backgroundColor: '#111111',
        border: '1px solid #222222',
        padding: '12px 16px',
        minHeight: '56px',
        opacity: isCompleted ? 0.5 : 1,
      }}
    >
      {/* Left: route title + date */}
      <div className="flex-1 min-w-0 mr-[12px]">
        <p
          className="font-['Lato',system-ui,sans-serif] leading-[1.2] truncate mb-[4px]"
          style={{ fontSize: '14px', fontWeight: 600, color: '#FFFFFF' }}
        >
          {trip.title}
        </p>
        <p
          className="font-['Lato',system-ui,sans-serif] leading-[1]"
          style={{ fontSize: '11px', fontWeight: 400, color: '#AAAAAA' }}
        >
          {trip.dates}
        </p>
      </div>

      {/* Center: status dot + label */}
      <div className="flex items-center shrink-0 mr-[16px]">
        {status.dot === 'pulse' && (
          <div className="relative mr-[5px] shrink-0" style={{ width: '6px', height: '6px' }}>
            <div
              className="absolute inset-0 rounded-full animate-ping"
              style={{ backgroundColor: status.color, opacity: 0.4 }}
            />
            <div
              className="absolute inset-0 rounded-full"
              style={{ backgroundColor: status.color }}
            />
          </div>
        )}
        {status.dot === 'solid' && (
          <div
            className="rounded-full mr-[5px] shrink-0"
            style={{ width: '6px', height: '6px', backgroundColor: status.color }}
          />
        )}
        {status.dot === 'check' && (
          <svg
            width="10"
            height="10"
            viewBox="0 0 24 24"
            fill="none"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-[4px] shrink-0"
            style={{ stroke: status.color }}
          >
            <path d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        )}
        <span
          className="font-['Lato',system-ui,sans-serif] leading-[1]"
          style={{ fontSize: '11px', fontWeight: 400, color: status.color }}
        >
          {status.label}
        </span>
      </div>

      {/* Right: price (original strikethrough above if different) */}
      {trip.price && (
        <div className="flex flex-col items-end shrink-0">
          {trip.originalPrice && trip.originalPrice !== trip.price && (
            <span
              className="font-['Lato',system-ui,sans-serif] line-through leading-[1] mb-[3px]"
              style={{ fontSize: '11px', fontWeight: 400, color: '#888888' }}
            >
              ${trip.originalPrice}
            </span>
          )}
          <span
            className="font-['Lato',system-ui,sans-serif] leading-[1]"
            style={{ fontSize: '14px', fontWeight: 600, color: '#4FC660' }}
          >
            ${trip.price}
          </span>
        </div>
      )}
    </button>
  )
}

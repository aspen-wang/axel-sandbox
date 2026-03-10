'use client'

// ─── Variant E: Timeline Strip ─────────────────────────────────────
// Horizontal timeline visual. Left dot (status colored) connected by
// line to right. Above line: title and date. Below line: airline/hotel.
// Price floated far right, large green. Dot pulses for monitoring.

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
      className="animate-pulse rounded-[12px]"
      style={{
        backgroundColor: '#111111',
        border: '1px solid #222222',
        padding: '16px',
      }}
    >
      <div className="flex items-center">
        {/* Left dot placeholder */}
        <div className="mr-[12px] shrink-0">
          <div className="rounded-full" style={{ width: '10px', height: '10px', backgroundColor: '#222222' }} />
        </div>
        {/* Line placeholder */}
        <div className="flex-1 mr-[16px]">
          <div className="h-[14px] w-[160px] rounded mb-[8px]" style={{ backgroundColor: '#222222' }} />
          <div style={{ height: '2px', backgroundColor: '#1A1A1A', marginBottom: '8px' }} />
          <div className="h-[12px] w-[120px] rounded" style={{ backgroundColor: '#1A1A1A' }} />
        </div>
        {/* Right dot placeholder */}
        <div className="ml-[12px] shrink-0">
          <div className="rounded-full" style={{ width: '10px', height: '10px', backgroundColor: '#222222' }} />
        </div>
        {/* Price placeholder */}
        <div className="ml-[16px] shrink-0">
          <div className="h-[20px] w-[60px] rounded" style={{ backgroundColor: '#222222' }} />
        </div>
      </div>
    </div>
  )
}

export default function TripCard({ trip = DEFAULT_TRIP, loading = false, onClick }) {
  if (loading) return <Skeleton />

  const status = STATUS_CONFIG[trip.status] || STATUS_CONFIG.monitoring
  const isCompleted = trip.status === 'completed'
  const saved = trip.originalPrice && trip.price ? trip.originalPrice - trip.price : 0

  return (
    <button
      onClick={onClick}
      className="w-full text-left rounded-[12px] hover:border-[#333] transition-colors"
      style={{
        backgroundColor: '#111111',
        border: '1px solid #222222',
        padding: '16px',
        opacity: isCompleted ? 0.6 : 1,
      }}
    >
      <div className="flex items-center">
        {/* Left: status dot */}
        <div className="shrink-0 mr-[12px]">
          {status.dot === 'pulse' && (
            <div className="relative" style={{ width: '10px', height: '10px' }}>
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
              className="rounded-full"
              style={{ width: '10px', height: '10px', backgroundColor: status.color }}
            />
          )}
          {status.dot === 'check' && (
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ stroke: status.color }}
            >
              <path d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          )}
        </div>

        {/* Center: timeline content */}
        <div className="flex-1 min-w-0">
          {/* Above line: title + date */}
          <div className="flex items-baseline justify-between mb-[6px]">
            <p
              className="font-['Lato',system-ui,sans-serif] leading-[1.2] truncate mr-[8px]"
              style={{ fontSize: '14px', fontWeight: 600, color: '#FFFFFF' }}
            >
              {trip.title}
            </p>
            <span
              className="font-['Lato',system-ui,sans-serif] leading-[1] shrink-0"
              style={{ fontSize: '12px', fontWeight: 400, color: '#AAAAAA' }}
            >
              {trip.dates}
            </span>
          </div>

          {/* Timeline line */}
          <div className="relative mb-[6px]">
            <div
              style={{
                height: '2px',
                backgroundColor: '#222222',
                width: '100%',
              }}
            />
            {/* Colored progress overlay */}
            <div
              className="absolute top-0 left-0"
              style={{
                height: '2px',
                backgroundColor: status.color,
                width: isCompleted ? '100%' : trip.status === 'booked' ? '75%' : '40%',
                opacity: 0.6,
              }}
            />
          </div>

          {/* Below line: airline/hotel info + status label */}
          <div className="flex items-center justify-between">
            <p
              className="font-['Lato',system-ui,sans-serif] leading-[1] truncate mr-[8px]"
              style={{ fontSize: '12px', fontWeight: 400, color: '#666666' }}
            >
              {[trip.airlineName, trip.hotelName].filter(Boolean).join(' · ')}
              {trip.travelers && <> · {trip.travelers} traveler{trip.travelers !== 1 ? 's' : ''}</>}
            </p>
            <span
              className="font-['Lato',system-ui,sans-serif] leading-[1] shrink-0"
              style={{ fontSize: '11px', fontWeight: 400, color: status.color }}
            >
              {status.label}
            </span>
          </div>
        </div>

        {/* Right: price */}
        <div className="shrink-0 ml-[16px] flex flex-col items-end">
          {trip.originalPrice && trip.originalPrice !== trip.price && (
            <span
              className="font-['Lato',system-ui,sans-serif] line-through leading-[1] mb-[4px]"
              style={{ fontSize: '12px', fontWeight: 400, color: '#888888' }}
            >
              ${trip.originalPrice}
            </span>
          )}
          {trip.price && (
            <span
              className="font-['Lato',system-ui,sans-serif] leading-[1]"
              style={{ fontSize: '20px', fontWeight: 600, color: '#4FC660' }}
            >
              ${trip.price}
            </span>
          )}
          {saved > 0 && (
            <span
              className="font-['Lato',system-ui,sans-serif] leading-[1] mt-[3px]"
              style={{ fontSize: '10px', fontWeight: 400, color: '#4FC660' }}
            >
              -{saved} saved
            </span>
          )}
        </div>
      </div>
    </button>
  )
}

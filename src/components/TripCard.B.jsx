'use client'

// ─── Variant B: Itinerary Note ─────────────────────────────────────
// Vertical journal-style layout with left pink accent border for
// Axel monitoring. Airline + hotel on separate lines, price section
// at bottom with savings pill, status + Axel checked at very bottom.

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
        borderLeft: '3px solid #333333',
        padding: '16px',
      }}
    >
      <div className="mb-[8px]">
        <div className="h-[14px] w-[180px] rounded" style={{ backgroundColor: '#222222' }} />
      </div>
      <div className="mb-[12px]">
        <div className="h-[12px] w-[140px] rounded" style={{ backgroundColor: '#1A1A1A' }} />
      </div>
      <div className="mb-[6px]">
        <div className="h-[12px] w-[120px] rounded" style={{ backgroundColor: '#1A1A1A' }} />
      </div>
      <div className="mb-[16px]">
        <div className="h-[12px] w-[100px] rounded" style={{ backgroundColor: '#1A1A1A' }} />
      </div>
      <div className="flex items-baseline mb-[12px]">
        <div className="h-[12px] w-[40px] rounded mr-[8px]" style={{ backgroundColor: '#222222' }} />
        <div className="h-[20px] w-[60px] rounded" style={{ backgroundColor: '#222222' }} />
      </div>
      <div className="h-[10px] w-[80px] rounded" style={{ backgroundColor: '#1A1A1A' }} />
    </div>
  )
}

export default function TripCard({ trip = DEFAULT_TRIP, loading = false, onClick }) {
  if (loading) return <Skeleton />

  const status = STATUS_CONFIG[trip.status] || STATUS_CONFIG.monitoring
  const isCompleted = trip.status === 'completed'
  const hasPriceDrop = trip.status === 'price-drop'
  const isMonitoring = trip.status === 'monitoring'
  const saved = trip.originalPrice && trip.price ? trip.originalPrice - trip.price : 0

  // Left accent: pink for monitoring (Axel identity), green for price-drop, default #222
  const accentColor = isMonitoring ? '#EF508D' : hasPriceDrop ? '#4FC660' : '#222222'

  return (
    <button
      onClick={onClick}
      className="w-full text-left rounded-[12px] hover:border-[#333] transition-colors"
      style={{
        backgroundColor: '#111111',
        border: '1px solid #222222',
        borderLeft: `3px solid ${accentColor}`,
        padding: '16px',
        opacity: isCompleted ? 0.5 : 1,
      }}
    >
      {/* Title */}
      <p
        className="font-['Lato',system-ui,sans-serif] leading-[1.3] mb-[4px]"
        style={{ fontSize: '14px', fontWeight: 600, color: '#FFFFFF' }}
      >
        {trip.title}
      </p>

      {/* Date + Travelers */}
      <p
        className="font-['Lato',system-ui,sans-serif] leading-[1.3] mb-[12px]"
        style={{ fontSize: '13px', fontWeight: 400, color: '#AAAAAA' }}
      >
        {trip.dates}
        {trip.travelers && <> · {trip.travelers} traveler{trip.travelers !== 1 ? 's' : ''}</>}
      </p>

      {/* Airline line */}
      {trip.airlineName && (
        <div className="flex items-center mb-[6px]">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#666666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mr-[6px] shrink-0">
            <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5 5 3 2 2-5 1.5-2-1.5-1 .5 2.5 3 3 2.5.5-1-1.5-2 1.5-5 2 2 3 5 .5-.3c.4-.2.6-.6.5-1.1z" />
          </svg>
          <span
            className="font-['Lato',system-ui,sans-serif] leading-[1]"
            style={{ fontSize: '12px', fontWeight: 400, color: '#AAAAAA' }}
          >
            {trip.airlineName}
          </span>
        </div>
      )}

      {/* Hotel line */}
      {trip.hotelName && (
        <div className="flex items-center mb-[12px]">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#666666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mr-[6px] shrink-0">
            <path d="M3 21h18M3 7v14M21 7v14M6 11h4M6 15h4M14 11h4M14 15h4M10 21V7l2-4 2 4v14" />
          </svg>
          <span
            className="font-['Lato',system-ui,sans-serif] leading-[1]"
            style={{ fontSize: '12px', fontWeight: 400, color: '#AAAAAA' }}
          >
            {trip.hotelName}
          </span>
        </div>
      )}

      {/* Price section */}
      <div className="flex items-baseline mb-[4px]">
        {trip.originalPrice && trip.originalPrice !== trip.price && (
          <span
            className="font-['Lato',system-ui,sans-serif] line-through leading-[1] mr-[8px]"
            style={{ fontSize: '14px', fontWeight: 400, color: '#888888' }}
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
      </div>

      {/* Savings pill */}
      {saved > 0 && (
        <div className="mb-[12px]">
          <span
            className="font-['Lato',system-ui,sans-serif] inline-block rounded-full leading-[1]"
            style={{
              fontSize: '12px',
              fontWeight: 400,
              color: '#4FC660',
              backgroundColor: 'rgba(79,198,96,0.1)',
              padding: '4px 8px',
            }}
          >
            Save ${saved}
          </span>
        </div>
      )}
      {saved <= 0 && <div className="mb-[12px]" />}

      {/* Status dot + label */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {status.dot === 'pulse' && (
            <div className="relative mr-[6px] shrink-0" style={{ width: '8px', height: '8px' }}>
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
              className="rounded-full mr-[6px] shrink-0"
              style={{ width: '8px', height: '8px', backgroundColor: status.color }}
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
              className="mr-[4px] shrink-0"
              style={{ stroke: status.color }}
            >
              <path d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          )}
          <span
            className="font-['Lato',system-ui,sans-serif] leading-[1]"
            style={{ fontSize: '12px', fontWeight: 400, color: status.color }}
          >
            {status.label}
          </span>
        </div>

        {/* Axel checked */}
        {trip.axelLastChecked && !isCompleted && (
          <span
            className="font-['Lato',system-ui,sans-serif] leading-[1]"
            style={{ fontSize: '10px', fontWeight: 400, color: '#666666' }}
          >
            Axel checked {trip.axelLastChecked}
          </span>
        )}
      </div>
    </button>
  )
}

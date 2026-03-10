'use client'

// ─── Variant D: Boarding Pass ──────────────────────────────────────
// Ticket/tear-line aesthetic. Top section has route (SEA -> SFO style)
// and trip type icons. Dotted divider separates top from bottom.
// Bottom has date/travelers on left, price on right. Status badge
// as small pill at top-right. Perforated edge feel with dashed border.

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

// City-to-code mapping for boarding pass style
const CITY_CODES = {
  'seattle': 'SEA',
  'san francisco': 'SFO',
  'los angeles': 'LAX',
  'new york': 'JFK',
  'chicago': 'ORD',
  'miami': 'MIA',
  'boston': 'BOS',
  'denver': 'DEN',
  'portland': 'PDX',
  'austin': 'AUS',
  'dallas': 'DFW',
  'atlanta': 'ATL',
  'phoenix': 'PHX',
  'las vegas': 'LAS',
  'honolulu': 'HNL',
  'tokyo': 'NRT',
  'london': 'LHR',
  'paris': 'CDG',
}

function getCityCode(city) {
  const lower = city.toLowerCase().trim()
  return CITY_CODES[lower] || city.substring(0, 3).toUpperCase()
}

function TripTypeIcons({ type }) {
  const showFlight = type === 'flight' || type === 'flight+hotel'
  const showHotel = type === 'hotel' || type === 'flight+hotel'
  return (
    <div className="flex items-center">
      {showFlight && (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#666666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5 5 3 2 2-5 1.5-2-1.5-1 .5 2.5 3 3 2.5.5-1-1.5-2 1.5-5 2 2 3 5 .5-.3c.4-.2.6-.6.5-1.1z" />
        </svg>
      )}
      {showFlight && showHotel && (
        <span className="mx-[3px]" style={{ color: '#666666', fontSize: '10px' }}>+</span>
      )}
      {showHotel && (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#666666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 21h18M3 7v14M21 7v14M6 11h4M6 15h4M14 11h4M14 15h4M10 21V7l2-4 2 4v14" />
        </svg>
      )}
    </div>
  )
}

function Skeleton() {
  return (
    <div
      className="animate-pulse rounded-[12px]"
      style={{
        backgroundColor: '#111111',
        border: '1px dashed #222222',
        padding: '16px',
      }}
    >
      {/* Top section skeleton */}
      <div className="flex items-center justify-between mb-[12px]">
        <div className="flex items-center">
          <div className="h-[20px] w-[36px] rounded mr-[12px]" style={{ backgroundColor: '#222222' }} />
          <div className="h-[8px] w-[24px] rounded mr-[12px]" style={{ backgroundColor: '#1A1A1A' }} />
          <div className="h-[20px] w-[36px] rounded" style={{ backgroundColor: '#222222' }} />
        </div>
        <div className="h-[20px] w-[70px] rounded-full" style={{ backgroundColor: '#1A1A1A' }} />
      </div>
      {/* Divider */}
      <div className="mb-[12px]" style={{ borderTop: '1px dashed #222222' }} />
      {/* Bottom section skeleton */}
      <div className="flex items-end justify-between">
        <div>
          <div className="h-[10px] w-[100px] rounded mb-[6px]" style={{ backgroundColor: '#1A1A1A' }} />
          <div className="h-[10px] w-[60px] rounded" style={{ backgroundColor: '#1A1A1A' }} />
        </div>
        <div className="h-[20px] w-[60px] rounded" style={{ backgroundColor: '#222222' }} />
      </div>
    </div>
  )
}

export default function TripCard({ trip = DEFAULT_TRIP, loading = false, onClick }) {
  if (loading) return <Skeleton />

  const status = STATUS_CONFIG[trip.status] || STATUS_CONFIG.monitoring
  const isCompleted = trip.status === 'completed'
  const hasPriceDrop = trip.status === 'price-drop'
  const saved = trip.originalPrice && trip.price ? trip.originalPrice - trip.price : 0

  // Parse cities for boarding pass code display
  const cities = (trip.title || '').split('\u2192').map(s => s.trim())
  const fromCode = cities[0] ? getCityCode(cities[0]) : '---'
  const toCode = cities[1] ? getCityCode(cities[1]) : '---'

  return (
    <button
      onClick={onClick}
      className="w-full text-left rounded-[12px] hover:border-[#333] transition-colors"
      style={{
        backgroundColor: '#111111',
        border: '1px dashed #222222',
        padding: '16px',
        opacity: isCompleted ? 0.6 : 1,
      }}
    >
      {/* Top section: Route + Status pill */}
      <div className="flex items-start justify-between mb-[12px]">
        {/* Route: SEA -----> SFO */}
        <div className="flex items-center">
          {/* From code */}
          <div className="mr-[12px]">
            <p
              className="font-['Lato',system-ui,sans-serif] leading-[1] mb-[2px]"
              style={{ fontSize: '20px', fontWeight: 600, color: '#FFFFFF' }}
            >
              {fromCode}
            </p>
            <p
              className="font-['Lato',system-ui,sans-serif] leading-[1]"
              style={{ fontSize: '10px', fontWeight: 400, color: '#666666' }}
            >
              {cities[0] || ''}
            </p>
          </div>

          {/* Arrow with trip type icons */}
          <div className="flex flex-col items-center mx-[8px]">
            <TripTypeIcons type={trip.tripType || 'flight+hotel'} />
            <div className="flex items-center mt-[4px]">
              <div style={{ width: '20px', height: '1px', backgroundColor: '#333333' }} />
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none" className="mx-[2px]">
                <path d="M2 1L6 4L2 7" stroke="#666666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div style={{ width: '20px', height: '1px', backgroundColor: '#333333' }} />
            </div>
          </div>

          {/* To code */}
          <div className="ml-[12px]">
            <p
              className="font-['Lato',system-ui,sans-serif] leading-[1] mb-[2px]"
              style={{ fontSize: '20px', fontWeight: 600, color: '#FFFFFF' }}
            >
              {toCode}
            </p>
            <p
              className="font-['Lato',system-ui,sans-serif] leading-[1]"
              style={{ fontSize: '10px', fontWeight: 400, color: '#666666' }}
            >
              {cities[1] || ''}
            </p>
          </div>
        </div>

        {/* Status pill at top-right */}
        <div
          className="flex items-center rounded-full shrink-0 ml-[8px]"
          style={{
            padding: '4px 8px',
            backgroundColor: `${status.color}15`,
          }}
        >
          {status.dot === 'pulse' && (
            <div className="relative mr-[4px] shrink-0" style={{ width: '6px', height: '6px' }}>
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
              className="rounded-full mr-[4px] shrink-0"
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
              className="mr-[3px] shrink-0"
              style={{ stroke: status.color }}
            >
              <path d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          )}
          <span
            className="font-['Lato',system-ui,sans-serif] leading-[1]"
            style={{ fontSize: '10px', fontWeight: 400, color: status.color }}
          >
            {status.label}
          </span>
        </div>
      </div>

      {/* Dotted divider (perforated tear line) */}
      <div
        className="mb-[12px]"
        style={{
          borderTop: '1px dashed #222222',
        }}
      />

      {/* Bottom section: date/travelers left, price right */}
      <div className="flex items-end justify-between">
        {/* Left: date + travelers */}
        <div>
          <p
            className="font-['Lato',system-ui,sans-serif] leading-[1] mb-[4px]"
            style={{ fontSize: '9px', fontWeight: 400, color: '#666666', textTransform: 'uppercase', letterSpacing: '0.06em' }}
          >
            Date
          </p>
          <p
            className="font-['Lato',system-ui,sans-serif] leading-[1] mb-[8px]"
            style={{ fontSize: '13px', fontWeight: 400, color: '#AAAAAA' }}
          >
            {trip.dates}
          </p>
          {trip.travelers && (
            <>
              <p
                className="font-['Lato',system-ui,sans-serif] leading-[1] mb-[4px]"
                style={{ fontSize: '9px', fontWeight: 400, color: '#666666', textTransform: 'uppercase', letterSpacing: '0.06em' }}
              >
                Travelers
              </p>
              <p
                className="font-['Lato',system-ui,sans-serif] leading-[1]"
                style={{ fontSize: '13px', fontWeight: 400, color: '#AAAAAA' }}
              >
                {trip.travelers}
              </p>
            </>
          )}
        </div>

        {/* Right: price */}
        <div className="flex flex-col items-end">
          {trip.originalPrice && trip.originalPrice !== trip.price && (
            <span
              className="font-['Lato',system-ui,sans-serif] line-through leading-[1] mb-[4px]"
              style={{ fontSize: '13px', fontWeight: 400, color: '#888888' }}
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
          {/* Savings pill for price-drop */}
          {hasPriceDrop && saved > 0 && (
            <span
              className="font-['Lato',system-ui,sans-serif] inline-block rounded-full leading-[1] mt-[6px]"
              style={{
                fontSize: '10px',
                fontWeight: 400,
                color: '#4FC660',
                backgroundColor: 'rgba(79,198,96,0.1)',
                padding: '3px 7px',
              }}
            >
              Save ${saved}
            </span>
          )}
        </div>
      </div>
    </button>
  )
}

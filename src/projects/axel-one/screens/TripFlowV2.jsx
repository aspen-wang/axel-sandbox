'use client'

import { useState, useEffect, useCallback, useRef, useReducer } from 'react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import statusIcons from '@/assets/status-icons.svg'
import iterations from '@/data/iterations.json'

// ─── Color Rules (STRICT — USER PERCEPTION) ──────────────────────────
// Pink #EF508D = ONLY "Axel is doing something": avatar, label, thinking, searching
// Blue #0090FF = ALL interactive UI user touches: buttons, CTAs, options, pickers
// Green #4FC660 = Prices, savings, confirmed, success, "Nonstop"
// Orange #FB7A29 = Alerts, "Non-refundable", stops count
// Surfaces: bg #000, card #111, border #222, elevated #1A1A1A
// Text: primary #FFF, secondary #AAA, tertiary #666, strikethrough #888

// ─── Iteration data ─────────────────────────────────────────────────
const FLIGHT_VERSIONS = iterations['component:flight-deal-card']?.versions || [{ label: 'A', notes: '' }]
const HOTEL_VERSIONS = iterations['component:hotel-deal-card']?.versions || [{ label: 'A', notes: '' }]
const CONFIRMED_FLIGHT_VERSIONS = iterations['component:confirmed-flight-card']?.versions || [{ label: 'A', notes: '' }]
const PRICE_BREAKDOWN_VERSIONS = iterations['component:price-breakdown-card']?.versions || [{ label: 'A', notes: '' }]
const CONFIRMED_BOOKING_VERSIONS = iterations['component:confirmed-booking-card']?.versions || [{ label: 'A', notes: '' }]
const ORDER_SUMMARY_VERSIONS = iterations['component:order-summary-card']?.versions || [{ label: 'A', notes: '' }]
const SAVED_PAYMENT_VERSIONS = iterations['component:saved-payment-card']?.versions || [{ label: 'A', notes: '' }]
const AXEL_PANEL_VERSIONS = iterations['component:axel-panel']?.versions || [{ label: 'A', notes: '' }]
const STEP_PROGRESS_VERSIONS = iterations['component:step-progress']?.versions || [{ label: 'A', notes: '' }]

// ─── Dynamic component loaders ──────────────────────────────────────
function makeDynamic(versions, baseName) {
  const map = {}
  versions.forEach(({ label }) => {
    map[label] = dynamic(
      () => label === 'A'
        ? import(`@/components/${baseName}`)
        : import(`@/components/${baseName}.${label}`).catch(() => import(`@/components/${baseName}`)),
      { ssr: false }
    )
  })
  return map
}

const flightDealCards = makeDynamic(FLIGHT_VERSIONS, 'FlightDealCard')
const hotelDealCards = makeDynamic(HOTEL_VERSIONS, 'HotelDealCard')
const confirmedFlightCards = makeDynamic(CONFIRMED_FLIGHT_VERSIONS, 'ConfirmedFlightCard')
const priceBreakdownCards = makeDynamic(PRICE_BREAKDOWN_VERSIONS, 'PriceBreakdownCard')
const confirmedBookingCards = makeDynamic(CONFIRMED_BOOKING_VERSIONS, 'ConfirmedBookingCard')
const orderSummaryCards = makeDynamic(ORDER_SUMMARY_VERSIONS, 'OrderSummaryCard')
const savedPaymentCards = makeDynamic(SAVED_PAYMENT_VERSIONS, 'SavedPaymentCard')
const axelPanels = makeDynamic(AXEL_PANEL_VERSIONS, 'AxelPanel')
const stepProgresses = makeDynamic(STEP_PROGRESS_VERSIONS, 'StepProgress')

// ─── CSS Animations ─────────────────────────────────────────────────
const ANIMATIONS_CSS = `
  @keyframes searchPulse {
    0% { transform: scale(0.3); opacity: 0.6; }
    100% { transform: scale(2.5); opacity: 0; }
  }
  @keyframes staggerFadeUp {
    0% { opacity: 0; transform: translateY(16px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  @keyframes confettiBurst {
    0% { transform: translate(0, 0) rotate(0deg); opacity: 1; }
    100% { transform: translate(var(--cx), var(--cy)) rotate(var(--cr)); opacity: 0; }
  }
  @keyframes scaleIn {
    0% { transform: scale(0); }
    70% { transform: scale(1.1); }
    100% { transform: scale(1); }
  }
  @keyframes floatY {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-8px); }
  }
  @keyframes fadeInUp {
    0% { opacity: 0; transform: translateY(12px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  @keyframes countUp {
    0% { opacity: 0.5; }
    50% { opacity: 1; }
    100% { opacity: 0.5; }
  }
  @keyframes dotTravel {
    0% { left: 10%; opacity: 0; }
    10% { opacity: 1; }
    90% { opacity: 1; }
    100% { left: 90%; opacity: 0; }
  }
  @keyframes priceCountIn {
    0% { opacity: 0; transform: scale(0.8); }
    100% { opacity: 1; transform: scale(1); }
  }
  @keyframes checkBurst {
    0% { transform: scale(0) rotate(-10deg); }
    50% { transform: scale(1.2) rotate(5deg); }
    100% { transform: scale(1) rotate(0deg); }
  }
`

// ═══════════════════════════════════════════════════════════════════
// ─── STATE MACHINE ───────────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════

const STATES = {
  'trip-input':       { label: 'Trip Input' },
  'axel-searching':   { label: 'Searching' },
  'axel-question':    { label: 'Axel Question' },
  'flight-results':   { label: 'Flight Results' },
  'flight-selected':  { label: 'Flight Selected' },
  'hotel-results':    { label: 'Hotel Results' },
  'hotel-selected':   { label: 'Hotel Selected' },
  'itinerary':        { label: 'Itinerary' },
  'payment':          { label: 'Payment' },
  'confirmation':     { label: 'Confirmed' },
}

const STATE_ORDER = Object.keys(STATES)

const TRANSITIONS = {
  'trip-input': {
    'submit-flights-and-hotel': 'axel-searching',
    'submit-flights-only': 'axel-searching',
    'submit-hotel-only': 'axel-searching',
    'submit-cheapest': 'axel-searching',
    'submit-unsure': 'axel-question',
  },
  'axel-question': {
    'answer-flights-and-hotel': 'axel-searching',
    'answer-flights-only': 'axel-searching',
    'answer-hotel-only': 'axel-searching',
    'answer-cheapest': 'axel-searching',
  },
  'axel-searching': {
    'flights-found': 'flight-results',
    'hotels-found': 'hotel-results',
    'auto-selected': 'itinerary',
  },
  'flight-results': {
    'select-flight': 'flight-selected',
  },
  'flight-selected': {
    'need-hotel': 'axel-searching',
    'skip-hotel': 'itinerary',
  },
  'hotel-results': {
    'select-hotel': 'hotel-selected',
  },
  'hotel-selected': {
    'continue': 'itinerary',
  },
  'itinerary': {
    'continue': 'payment',
  },
  'payment': {
    'pay': 'confirmation',
  },
  'confirmation': {},
}

const BRANCH_LABELS = {
  A: 'Flights + Hotel',
  B: 'Flights Only',
  C: 'Hotel Only',
  D: 'Cheapest Auto',
  E: 'Unsure → Ask',
}

// ─── Context Reducer ──────────────────────────────────────────────
const INITIAL_CTX = {
  branch: null,
  tripType: null,
  selectedFlight: null,
  selectedHotel: null,
  needsFlight: false,
  needsHotel: false,
  searchingFor: 'flights',
}

// ─── Slug → state mapping for standalone page rendering ─────────────
const SLUG_TO_STATE = {
  'v2-trip-input': 'trip-input',
  'v2-searching': 'axel-searching',
  'v2-question': 'axel-question',
  'v2-flight-results': 'flight-results',
  'v2-flight-selected': 'flight-selected',
  'v2-hotel-results': 'hotel-results',
  'v2-hotel-selected': 'hotel-selected',
  'v2-itinerary': 'itinerary',
  'v2-payment': 'payment',
  'v2-confirmation': 'confirmation',
}

function contextReducer(state, action) {
  switch (action.type) {
    case 'SET_TRIP_TYPE':
      return { ...state, branch: action.branch, tripType: action.tripType, needsFlight: action.needsFlight, needsHotel: action.needsHotel, searchingFor: action.searchingFor }
    case 'SELECT_FLIGHT':
      return { ...state, selectedFlight: action.deal }
    case 'SELECT_HOTEL':
      return { ...state, selectedHotel: action.deal }
    case 'SEARCHING_HOTELS':
      return { ...state, searchingFor: 'hotels' }
    case 'AUTO_SELECT':
      return { ...state, selectedFlight: FLIGHT_DEALS[0], selectedHotel: HOTEL_DEALS[1] }
    case 'RESTORE':
      return { ...action.ctx }
    case 'RESET':
      return { ...INITIAL_CTX }
    default:
      return state
  }
}

// ─── Deal data ──────────────────────────────────────────────────────
const FLIGHT_DEALS = [
  {
    airline: 'United Airlines', flight_number: 'UA 224', aircraft: 'Boeing 737-800',
    from: 'SEA', to: 'SFO', from_city: 'Seattle, WA', to_city: 'San Francisco, CA',
    from_airport: 'Seattle-Tacoma Intl', to_airport: 'San Francisco Intl',
    depart_time: '7:12 AM', arrive_time: '9:30 AM', duration: '2h 18m', stops: 'Nonstop',
    price: 218, original_price: 266, saved: 48, date: 'Apr 15',
    cabin_class: 'Economy', fare_type: 'Main Cabin', base_fare: 189, taxes: 29,
    baggage: '1 personal, 1 carry-on', checked_bag_fee: '$30', seat_selection: 'Included',
    layover_details: null, comparison_source: 'Google Flights',
    change_policy: 'Changes allowed ($0 fee)', cancel_policy: 'Cancel within 24h for full refund',
  },
  {
    airline: 'Alaska Airlines', flight_number: 'AS 872', aircraft: 'Boeing 737-900ER',
    from: 'SEA', to: 'SFO', from_city: 'Seattle, WA', to_city: 'San Francisco, CA',
    from_airport: 'Seattle-Tacoma Intl', to_airport: 'San Francisco Intl',
    depart_time: '8:45 AM', arrive_time: '11:02 AM', duration: '2h 17m', stops: 'Nonstop',
    price: 234, original_price: 289, saved: 55, date: 'Apr 15',
    cabin_class: 'Economy', fare_type: 'Main Cabin', base_fare: 201, taxes: 33,
    baggage: '1 personal, 1 carry-on', checked_bag_fee: '$35', seat_selection: 'Included',
    layover_details: null, comparison_source: 'Google Flights',
    change_policy: 'Changes allowed ($0 fee)', cancel_policy: 'Cancel within 24h for full refund',
  },
  {
    airline: 'Delta Air Lines', flight_number: 'DL 1891', aircraft: 'Airbus A320',
    from: 'SEA', to: 'SFO', from_city: 'Seattle, WA', to_city: 'San Francisco, CA',
    from_airport: 'Seattle-Tacoma Intl', to_airport: 'San Francisco Intl',
    depart_time: '10:30 AM', arrive_time: '12:48 PM', duration: '2h 18m', stops: 'Nonstop',
    price: 247, original_price: 312, saved: 65, date: 'Apr 15',
    cabin_class: 'Economy', fare_type: 'Main Cabin', base_fare: 212, taxes: 35,
    baggage: '1 personal, 1 carry-on', checked_bag_fee: '$40', seat_selection: 'Included',
    layover_details: null, comparison_source: 'Google Flights',
    change_policy: 'Changes allowed ($0 fee)', cancel_policy: 'Cancel within 24h for full refund',
  },
]

const HOTEL_DEALS = [
  {
    name: 'Hotel Nikko SF', chain: 'Nikko Hotels', location: 'Union Square, SF',
    stars: 4, rating: 4.5, reviews: 2847, price_per_night: 189, original_price: 245,
    saved: 56, nights: 3, check_in: 'Apr 15', check_out: 'Apr 18',
    amenities: ['Free WiFi', 'Pool', 'Spa', 'Fitness Center', 'Restaurant', 'Business Center'],
    room_type: 'Standard King', bed_type: '1 King bed', max_guests: '2 adults',
    checkin_time: '3:00 PM', checkout_time: '11:00 AM', taxes: 23,
    comparison_source: 'Booking.com', cancellation_policy: 'Free cancellation until Apr 13',
    payment_policy: 'Pay at hotel', full_address: '222 Mason St, San Francisco, CA',
  },
  {
    name: 'The Marker', chain: 'Hyatt', location: 'Market Street, SF',
    stars: 4, rating: 4.3, reviews: 1923, price_per_night: 167, original_price: 245,
    saved: 78, nights: 3, check_in: 'Apr 15', check_out: 'Apr 18',
    amenities: ['Free WiFi', 'Restaurant', 'Bar', 'Fitness Center', 'Valet Parking'],
    room_type: 'King Room', bed_type: '1 King bed', max_guests: '2 adults',
    checkin_time: '3:00 PM', checkout_time: '12:00 PM', taxes: 20,
    comparison_source: 'Hotels.com', cancellation_policy: 'Free cancellation until Apr 13',
    payment_policy: 'Pay now', full_address: '501 Geary St, San Francisco, CA',
  },
  {
    name: 'Hyatt Regency SF', chain: 'Hyatt', location: 'Embarcadero, SF',
    stars: 4, rating: 4.6, reviews: 3412, price_per_night: 212, original_price: 245,
    saved: 33, nights: 3, check_in: 'Apr 15', check_out: 'Apr 18',
    amenities: ['Free WiFi', 'Pool', 'Restaurant', 'Fitness Center', 'Parking', 'Concierge'],
    room_type: 'Regency King', bed_type: '1 King bed', max_guests: '2 adults',
    checkin_time: '3:00 PM', checkout_time: '11:00 AM', taxes: 25,
    comparison_source: 'Expedia', cancellation_policy: 'Free cancellation until Apr 13',
    payment_policy: 'Pay at hotel', full_address: '5 Embarcadero Center, San Francisco, CA',
  },
]

// ─── Shared UI ──────────────────────────────────────────────────────
function StatusBar() {
  return (
    <div className="absolute top-0 left-0 right-0 flex h-[59px] items-center justify-between px-[28px] py-[15px] z-10">
      <p className="font-['SF_Pro_Text',sans-serif] font-semibold text-[15px] text-text-1 tracking-[-0.045px] leading-[18px] w-[54px]">9:41</p>
      <div className="relative shrink-0 w-[66.16px] h-[11px]">
        <img alt="" className="block max-w-none w-full h-full" src={statusIcons.src || statusIcons} />
      </div>
    </div>
  )
}

function BackHeader({ label, onBack, right }) {
  return (
    <div className="absolute left-[16px] top-[68px] right-[16px] flex items-center justify-between z-10">
      <button onClick={onBack} className="flex items-center" style={{ marginRight: 8 }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#AAAAAA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 6 }}><path d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
        <p className="text-[13px]" style={{ color: '#AAAAAA' }}>{label}</p>
      </button>
      {right}
    </div>
  )
}

function HomeIndicator() {
  return <div className="absolute bottom-[8px] left-1/2 -translate-x-1/2 w-[134px] h-[5px] rounded-full bg-text-1 z-30" />
}

function BottomNav() {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-[72px] flex items-start justify-around pt-[10px] rounded-b-[30px]" style={{ backgroundColor: '#111111', borderTop: '1px solid #222222' }}>
      {[
        { label: 'Trips', active: true, d: 'M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5' },
        { label: 'Explore', active: false, d: 'M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z' },
        { label: 'Profile', active: false, d: 'M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z' },
      ].map((item) => (
        <div key={item.label} className="flex flex-col items-center" style={{ gap: 4 }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={item.active ? '#EF508D' : '#666666'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d={item.d} />
          </svg>
          <p className="text-[12px]" style={{ color: item.active ? '#EF508D' : '#666666' }}>{item.label}</p>
        </div>
      ))}
    </div>
  )
}

function BlueCTA({ label, onClick }) {
  return (
    <button onClick={onClick} className="w-full flex items-center justify-center rounded-[12px] cursor-pointer hover:brightness-110 transition" style={{ backgroundColor: '#0090FF', padding: '12px 16px' }}>
      <p className="font-['Lato',sans-serif] font-semibold text-[14px] text-center leading-normal text-white">{label}</p>
    </button>
  )
}

function GlassPanel({ message, actions = [], typing = false, children }) {
  return (
    <div className="absolute bottom-0 left-0 right-0 z-20 rounded-t-[16px] overflow-hidden" style={{ backgroundColor: '#111111', borderTop: '1px solid #222222', borderLeft: '3px solid #EF508D' }}>
      <div style={{ padding: 16, paddingBottom: 28 }}>
        <div className="flex items-start">
          <div className="rounded-full flex items-center justify-center shrink-0" style={{ width: 32, height: 32, marginRight: 12, backgroundColor: '#EF508D' }}>
            <span className="font-['Lato',sans-serif] font-semibold text-[12px] leading-none text-white">A</span>
          </div>
          <div className="flex-1 min-w-0">
            {typing ? (
              <div className="flex items-center">
                <div className="flex items-center" style={{ gap: 3 }}>
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="rounded-full" style={{ width: 5, height: 5, backgroundColor: '#EF508D', animation: `floatY 1.2s ease-in-out infinite`, animationDelay: `${i * 0.15}s` }} />
                  ))}
                </div>
                {message && <span className="font-['Lato',sans-serif] text-[13px] leading-[1]" style={{ marginLeft: 8, color: '#AAAAAA' }}>{message}</span>}
              </div>
            ) : (
              <p className="font-['Lato',sans-serif] text-[14px] text-white leading-[1.4]" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{message}</p>
            )}
            {children}
            {actions.length > 0 && (
              <div className="flex items-center flex-wrap" style={{ marginTop: 12 }}>
                {actions.map((a, i) => (
                  <button key={i} onClick={a.onClick}
                    className="font-['Lato',sans-serif] text-[14px] font-semibold rounded-[20px] transition-colors"
                    style={{
                      marginRight: 8, marginBottom: 4,
                      padding: '8px 16px',
                      ...(a.variant === 'primary'
                        ? { backgroundColor: '#0090FF', color: '#fff' }
                        : { border: '1px solid #0090FF', color: '#0090FF', background: 'transparent' }),
                    }}
                  >{a.label}</button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Search Visualization ──────────────────────────────────────────
function SearchViz({ label, sublabel, count, type = 'flights' }) {
  const [num, setNum] = useState(0)
  const providers = type === 'flights'
    ? ['United', 'Alaska', 'Delta', 'JetBlue', 'Southwest']
    : ['Marriott', 'Hilton', 'Hyatt', 'IHG', 'Westin']
  const [active, setActive] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setNum((n) => Math.min(n + Math.floor(Math.random() * 23) + 5, count)), 80)
    return () => clearInterval(t)
  }, [count])

  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % providers.length), 600)
    return () => clearInterval(t)
  }, [providers.length])

  return (
    <div className="flex flex-col items-center justify-center" style={{ height: 280 }}>
      <p className="font-['Lato',sans-serif] font-semibold text-[20px] text-white" style={{ marginBottom: 2 }}>{label}</p>
      <p className="font-['Lato',sans-serif] text-[13px]" style={{ marginBottom: 24, color: '#AAAAAA' }}>{sublabel}</p>
      <div className="relative" style={{ width: 140, height: 140, marginBottom: 20 }}>
        {[0, 1, 2].map((i) => (
          <div key={i} className="absolute inset-0 rounded-full" style={{ border: '1px solid rgba(239,80,141,0.25)', animation: `searchPulse 2s ease-out infinite`, animationDelay: `${i * 0.6}s` }} />
        ))}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="rounded-full" style={{ width: 10, height: 10, backgroundColor: '#EF508D' }} />
        </div>
        <div className="absolute" style={{ top: '50%', left: '15%', right: '15%', height: 2, marginTop: -1 }}>
          <div className="absolute w-full h-full" style={{ backgroundColor: 'rgba(239,80,141,0.15)' }} />
          <div className="absolute rounded-full" style={{ width: 4, height: 4, top: -1, backgroundColor: '#EF508D', animation: 'dotTravel 1.5s linear infinite' }} />
        </div>
      </div>
      <div className="flex items-center justify-center" style={{ marginBottom: 8, height: 20 }}>
        <span className="font-['Lato',sans-serif] text-[11px] text-[#666666]" style={{ marginRight: 6 }}>Scanning</span>
        <span className="font-['Lato',sans-serif] text-[11px] font-medium" style={{ color: '#EF508D', minWidth: 70 }}>{providers[active]}</span>
      </div>
      <p className="font-['Lato',sans-serif] text-[12px] text-[#AAAAAA]" style={{ animation: 'countUp 1.5s ease-in-out infinite' }}>
        Checking {num} {type}...
      </p>
    </div>
  )
}

// ─── Price Count-Up ─────────────────────────────────────────────────
function PriceCount({ value, prefix = '$', className = '', style = {} }) {
  const [display, setDisplay] = useState(0)
  const ref = useRef(null)
  useEffect(() => {
    const end = value
    const duration = 600
    const startTime = Date.now()
    function tick() {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.round(end * eased))
      if (progress < 1) ref.current = requestAnimationFrame(tick)
    }
    ref.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(ref.current)
  }, [value])
  return <span className={className} style={style}>{prefix}{display}</span>
}

// ═══════════════════════════════════════════════════════════════════
// ─── STATE RENDERERS ────────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════

// ─── 1. Trip Input ──────────────────────────────────────────────────
function StateTripInput({ send, dispatch }) {
  const branches = [
    { label: 'Flights + Hotel', action: 'submit-flights-and-hotel', ctxAction: { type: 'SET_TRIP_TYPE', branch: 'A', tripType: 'flights-and-hotel', needsFlight: true, needsHotel: true, searchingFor: 'flights' } },
    { label: 'Just flights', action: 'submit-flights-only', ctxAction: { type: 'SET_TRIP_TYPE', branch: 'B', tripType: 'flights-only', needsFlight: true, needsHotel: false, searchingFor: 'flights' } },
    { label: 'Just a hotel', action: 'submit-hotel-only', ctxAction: { type: 'SET_TRIP_TYPE', branch: 'C', tripType: 'hotel-only', needsFlight: false, needsHotel: true, searchingFor: 'hotels' } },
    { label: 'Book cheapest', action: 'submit-cheapest', ctxAction: { type: 'SET_TRIP_TYPE', branch: 'D', tripType: 'cheapest', needsFlight: true, needsHotel: true, searchingFor: 'flights' } },
    { label: 'Not sure yet', action: 'submit-unsure', ctxAction: { type: 'SET_TRIP_TYPE', branch: 'E', tripType: 'unsure', needsFlight: false, needsHotel: false, searchingFor: 'flights' } },
  ]

  return (
    <>
      <style>{ANIMATIONS_CSS}</style>
      <StatusBar />
      <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ padding: '0 32px', paddingBottom: 120 }}>
        <div className="flex items-center" style={{ marginBottom: 16, gap: 12 }}>
          {[0, 1, 2].map((i) => (
            <div key={i} className="rounded-full" style={{ width: 8, height: 8, backgroundColor: '#EF508D', opacity: 0.4 + i * 0.2, animation: `floatY 3s ease-in-out infinite`, animationDelay: `${i * 0.5}s` }} />
          ))}
        </div>
        <p className="font-['Lato',sans-serif] font-semibold text-[20px] text-white text-center leading-[1.3]" style={{ marginBottom: 4 }}>Where to next?</p>
        <p className="font-['Lato',sans-serif] text-[13px] text-center leading-[1.4]" style={{ marginBottom: 6, color: '#AAAAAA' }}>Seattle → San Francisco · Apr 15-18</p>
      </div>

      <GlassPanel message="What kind of trip are you planning?">
        <div className="flex flex-col" style={{ marginTop: 10 }}>
          {branches.map((b, i) => (
            <button
              key={b.action}
              onClick={() => send(b.action, b.ctxAction)}
              className="flex items-center rounded-[10px] transition-colors hover:bg-[rgba(255,255,255,0.05)]"
              style={{ padding: '8px 10px', marginBottom: 2, animation: `staggerFadeUp 0.3s ease-out ${i * 0.06}s both` }}
            >
              <div className="rounded-full shrink-0" style={{ width: 6, height: 6, marginRight: 10, backgroundColor: '#0090FF' }} />
              <span className="font-['Lato',sans-serif] text-[14px] text-white">{b.label}</span>
            </button>
          ))}
        </div>
      </GlassPanel>
      <HomeIndicator />
    </>
  )
}

// ─── 2. Axel Searching ──────────────────────────────────────────────
function StateAxelSearching({ send, ctx, dispatch, isDemo }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (ctx.branch === 'D') {
        dispatch({ type: 'AUTO_SELECT' })
        send('auto-selected')
      } else if (ctx.searchingFor === 'flights') {
        send('flights-found')
      } else {
        send('hotels-found')
      }
    }, isDemo ? 1200 : 2000)
    return () => clearTimeout(timer)
  }, [send, ctx, dispatch, isDemo])

  const searchLabel = ctx.searchingFor === 'flights' ? 'SEA → SFO' : 'Hotels near Union Square'
  const searchSub = ctx.searchingFor === 'flights' ? 'Nonstop · Apr 15' : 'Apr 15-18 · 3 nights'
  const searchCount = ctx.searchingFor === 'flights' ? 247 : 184

  return (
    <>
      <style>{ANIMATIONS_CSS}</style>
      <StatusBar />
      <div className="absolute left-[16px] right-[16px] top-[68px] bottom-[100px]">
        <SearchViz label={searchLabel} sublabel={searchSub} count={searchCount} type={ctx.searchingFor} />
      </div>
      <GlassPanel typing message={ctx.searchingFor === 'flights' ? 'Searching flights...' : 'Finding hotels...'} />
      <HomeIndicator />
    </>
  )
}

// ─── 3. Axel Question (Branch E) ────────────────────────────────────
function StateAxelQuestion({ send, dispatch }) {
  const options = [
    { label: 'Flights + Hotel', action: 'answer-flights-and-hotel', ctxAction: { type: 'SET_TRIP_TYPE', branch: 'A', tripType: 'flights-and-hotel', needsFlight: true, needsHotel: true, searchingFor: 'flights' } },
    { label: 'Just flights', action: 'answer-flights-only', ctxAction: { type: 'SET_TRIP_TYPE', branch: 'B', tripType: 'flights-only', needsFlight: true, needsHotel: false, searchingFor: 'flights' } },
    { label: 'Just a hotel', action: 'answer-hotel-only', ctxAction: { type: 'SET_TRIP_TYPE', branch: 'C', tripType: 'hotel-only', needsFlight: false, needsHotel: true, searchingFor: 'hotels' } },
    { label: 'Book cheapest', action: 'answer-cheapest', ctxAction: { type: 'SET_TRIP_TYPE', branch: 'D', tripType: 'cheapest', needsFlight: true, needsHotel: true, searchingFor: 'flights' } },
  ]

  return (
    <>
      <style>{ANIMATIONS_CSS}</style>
      <StatusBar />
      <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ padding: '0 32px', paddingBottom: 180 }}>
        <div className="rounded-full flex items-center justify-center" style={{ width: 56, height: 56, background: 'rgba(239,80,141,0.12)', marginBottom: 16, animation: 'scaleIn 0.4s ease-out' }}>
          <span className="font-['Lato',sans-serif] font-semibold text-[16px]" style={{ color: '#EF508D' }}>?</span>
        </div>
        <p className="font-['Lato',sans-serif] font-semibold text-[20px] text-white text-center leading-[1.4]" style={{ marginBottom: 4 }}>Let me help narrow it down</p>
        <p className="font-['Lato',sans-serif] text-[13px] text-center" style={{ color: '#AAAAAA' }}>Seattle → San Francisco · Apr 15-18</p>
      </div>

      <GlassPanel message="What are you looking for?">
        <div className="flex flex-wrap" style={{ marginTop: 10 }}>
          {options.map((o, i) => (
            <button
              key={o.action}
              onClick={() => send(o.action, o.ctxAction)}
              className="font-['Lato',sans-serif] text-[11px] font-medium rounded-full transition-colors"
              style={{ marginRight: 8, marginBottom: 6, padding: '8px 16px', border: '1px solid #0090FF', color: '#0090FF', background: 'transparent', borderRadius: 20, animation: `staggerFadeUp 0.3s ease-out ${i * 0.06}s both` }}
            >{o.label}</button>
          ))}
        </div>
      </GlassPanel>
      <HomeIndicator />
    </>
  )
}

// ─── 4. Flight Results ──────────────────────────────────────────────
function StateFlightResults({ send, ctx, dispatch, variants }) {
  const [visible, setVisible] = useState(false)
  useEffect(() => { const t = setTimeout(() => setVisible(true), 100); return () => clearTimeout(t) }, [])
  const FlightCard = flightDealCards[variants?.flightDealCard] || flightDealCards.A

  return (
    <>
      <style>{ANIMATIONS_CSS}</style>
      <StatusBar />
      <div className="absolute left-[16px] top-[68px] right-[16px]">
        <p className="font-['Lato',sans-serif] font-semibold text-[20px] text-white leading-normal" style={{ marginBottom: 2 }}>Flights found</p>
        <p className="font-['Lato',sans-serif] text-[12px] text-[#AAAAAA]">SEA → SFO · Apr 15 · Nonstop</p>
      </div>
      <div className="absolute left-[16px] top-[112px] right-[16px] bottom-[100px] overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
        <div className={`flex flex-col ${visible ? '' : 'opacity-0'}`}>
          {FLIGHT_DEALS.map((deal, i) => (
            <div key={i} style={{ marginBottom: 8, ...(visible ? { animation: `staggerFadeUp 0.4s ease-out ${i * 0.1}s both` } : {}) }}>
              <FlightCard deal={deal} mode="list" onClick={() => send('select-flight', { type: 'SELECT_FLIGHT', deal })} />
            </div>
          ))}
        </div>
      </div>
      <GlassPanel message="Morning nonstops are cheapest. Tap a flight to select it." />
      <HomeIndicator />
    </>
  )
}

// ─── 5. Flight Selected ─────────────────────────────────────────────
function StateFlightSelected({ send, ctx, dispatch, variants, goBack }) {
  const ConfirmedFlight = confirmedFlightCards[variants?.confirmedFlightCard] || confirmedFlightCards.A
  const flight = ctx.selectedFlight || FLIGHT_DEALS[0]

  return (
    <>
      <StatusBar />
      <div className="absolute left-[16px] top-[68px] right-[16px]">
        <p className="font-['Lato',sans-serif] font-semibold text-[20px] text-white leading-normal" style={{ marginBottom: 2 }}>Flight selected</p>
        <p className="font-['Lato',sans-serif] text-[12px] text-[#AAAAAA]">{flight.airline} · {flight.depart_time}</p>
      </div>
      <div className="absolute left-[16px] top-[112px] right-[16px]">
        <ConfirmedFlight flight={{ airline: flight.airline, from: flight.from, to: flight.to, departTime: flight.depart_time, arriveTime: flight.arrive_time, date: flight.date, duration: flight.duration, price: flight.price }} />
      </div>

      {ctx.needsHotel ? (
        <GlassPanel
          message="Great pick! Need a hotel in San Francisco too?"
          actions={[
            { label: 'Yes, find hotels', variant: 'primary', onClick: () => { dispatch({ type: 'SEARCHING_HOTELS' }); send('need-hotel') } },
            { label: 'No, skip hotel', variant: 'secondary', onClick: () => send('skip-hotel') },
          ]}
        />
      ) : (
        <GlassPanel
          message="Flight confirmed! Let's review your trip."
          actions={[{ label: 'Continue to review →', variant: 'primary', onClick: () => send('skip-hotel') }]}
        />
      )}
      <HomeIndicator />
    </>
  )
}

// ─── 6. Hotel Results ───────────────────────────────────────────────
function StateHotelResults({ send, ctx, dispatch, variants }) {
  const [visible, setVisible] = useState(false)
  useEffect(() => { const t = setTimeout(() => setVisible(true), 100); return () => clearTimeout(t) }, [])
  const HotelCard = hotelDealCards[variants?.hotelDealCard] || hotelDealCards.A
  const ConfirmedFlight = confirmedFlightCards[variants?.confirmedFlightCard] || confirmedFlightCards.A

  return (
    <>
      <style>{ANIMATIONS_CSS}</style>
      <StatusBar />
      <div className="absolute left-[16px] top-[68px] right-[16px]">
        <p className="font-['Lato',sans-serif] font-semibold text-[20px] text-white leading-normal" style={{ marginBottom: 2 }}>Hotels found</p>
        <p className="font-['Lato',sans-serif] text-[12px] text-[#AAAAAA]">Union Square · Apr 15-18 · 3 nights</p>
      </div>
      <div className="absolute left-[16px] top-[112px] right-[16px] bottom-[100px] overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
        {ctx.selectedFlight && (
          <div style={{ marginBottom: 8 }}>
            <ConfirmedFlight flight={{ airline: ctx.selectedFlight.airline, from: ctx.selectedFlight.from, to: ctx.selectedFlight.to, departTime: ctx.selectedFlight.depart_time, arriveTime: ctx.selectedFlight.arrive_time, date: ctx.selectedFlight.date, duration: ctx.selectedFlight.duration, price: ctx.selectedFlight.price }} />
          </div>
        )}
        <div className={`flex flex-col ${visible ? '' : 'opacity-0'}`}>
          {HOTEL_DEALS.map((deal, i) => (
            <div key={i} style={{ marginBottom: 8, ...(visible ? { animation: `staggerFadeUp 0.4s ease-out ${i * 0.1}s both` } : {}) }}>
              <HotelCard deal={deal} mode="list" onClick={() => send('select-hotel', { type: 'SELECT_HOTEL', deal })} />
            </div>
          ))}
        </div>
      </div>
      <GlassPanel message="Great options near Union Square. Tap a hotel to select it." />
      <HomeIndicator />
    </>
  )
}

// ─── 7. Hotel Selected ──────────────────────────────────────────────
function StateHotelSelected({ send, ctx, variants }) {
  const hotel = ctx.selectedHotel || HOTEL_DEALS[0]

  return (
    <>
      <StatusBar />
      <div className="absolute left-[16px] top-[68px] right-[16px]">
        <p className="font-['Lato',sans-serif] font-semibold text-[20px] text-white leading-normal" style={{ marginBottom: 2 }}>Hotel selected</p>
        <p className="font-['Lato',sans-serif] text-[12px] text-[#AAAAAA]">{hotel.name} · {hotel.nights} nights</p>
      </div>
      <div className="absolute left-[16px] top-[112px] right-[16px]">
        <div className="rounded-[12px]" style={{ backgroundColor: '#111111', border: '1px solid #222222', padding: 16 }}>
          <p className="font-['Lato',sans-serif] font-semibold text-[15px] text-white" style={{ marginBottom: 2 }}>{hotel.name}</p>
          <p className="font-['Lato',sans-serif] text-[12px] text-[#AAAAAA]" style={{ marginBottom: 6 }}>{hotel.location} · {hotel.room_type}</p>
          <p className="font-['Lato',sans-serif] text-[12px] text-[#AAAAAA]" style={{ marginBottom: 6 }}>{hotel.check_in} → {hotel.check_out} · {hotel.nights} nights</p>
          <div className="flex items-baseline">
            <PriceCount value={hotel.price_per_night} className="font-['Lato',sans-serif] font-semibold text-[20px]" style={{ color: '#4FC660' }} />
            <span className="font-['Lato',sans-serif] text-[12px] text-[#AAAAAA]" style={{ marginLeft: 2 }}>/night</span>
            <span className="font-['Lato',sans-serif] text-[12px] text-[#AAAAAA] line-through" style={{ marginLeft: 8 }}>${hotel.original_price}</span>
            <span className="font-['Lato',sans-serif] text-[11px]" style={{ color: '#4FC660', marginLeft: 8 }}>Save ${hotel.saved}/night</span>
          </div>
        </div>
      </div>

      <GlassPanel
        message="Excellent choice! Let's review everything."
        actions={[{ label: 'Continue to review →', variant: 'primary', onClick: () => send('continue') }]}
      />
      <HomeIndicator />
    </>
  )
}

// ─── 8. Itinerary ───────────────────────────────────────────────────
function StateItinerary({ send, ctx, variants }) {
  const ConfirmedBooking = confirmedBookingCards[variants?.confirmedBookingCard] || confirmedBookingCards.A
  const PriceBreakdown = priceBreakdownCards[variants?.priceBreakdownCard] || priceBreakdownCards.A

  const flight = ctx.selectedFlight
  const hotel = ctx.selectedHotel

  const lineItems = []
  if (flight) lineItems.push({ label: 'Flight', amount: `$${flight.price}` })
  if (hotel) lineItems.push({ label: `Hotel (${hotel.nights} nights)`, amount: `$${hotel.price_per_night * hotel.nights}` })

  const flightTax = flight ? flight.taxes : 0
  const hotelTax = hotel ? hotel.taxes * hotel.nights : 0
  const totalTax = flightTax + hotelTax
  if (totalTax > 0) lineItems.push({ label: 'Taxes & fees', amount: `$${totalTax}`, color: 'orange' })

  const subtotal = (flight ? flight.price : 0) + (hotel ? hotel.price_per_night * hotel.nights : 0)
  const total = subtotal + totalTax
  const originalTotal = (flight ? flight.original_price : 0) + (hotel ? hotel.original_price * hotel.nights : 0)
  const savings = originalTotal - subtotal

  return (
    <>
      <StatusBar />
      <div className="absolute left-[16px] top-[68px] right-[16px]">
        <p className="font-['Lato',sans-serif] font-semibold text-[20px] text-white leading-normal" style={{ marginBottom: 2 }}>Trip Review</p>
        <p className="font-['Lato',sans-serif] text-[12px] text-[#AAAAAA]">Seattle → San Francisco · Apr 15-18</p>
      </div>
      <div className="absolute left-[16px] top-[112px] right-[16px] bottom-[100px] overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
        <div className="relative" style={{ paddingLeft: 18 }}>
          <div className="absolute" style={{ left: 4, top: 6, bottom: 6, width: 2, backgroundColor: '#4FC660' }} />

          {flight && (
            <div className="relative" style={{ marginBottom: 8 }}>
              <div className="absolute rounded-full flex items-center justify-center" style={{ left: -18, top: 10, width: 10, height: 10, backgroundColor: '#4FC660' }}>
                <svg width="6" height="6" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5L8 3" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>
              <ConfirmedBooking type="flight" title={`${flight.airline} ${flight.flight_number} · ${flight.from} → ${flight.to}`} details={`${flight.date} · ${flight.depart_time} – ${flight.arrive_time} · ${flight.stops}`} />
            </div>
          )}

          {hotel && (
            <div className="relative" style={{ marginBottom: 8 }}>
              <div className="absolute rounded-full flex items-center justify-center" style={{ left: -18, top: 10, width: 10, height: 10, backgroundColor: '#4FC660' }}>
                <svg width="6" height="6" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5L8 3" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>
              <ConfirmedBooking type="hotel" title={hotel.name} details={`${hotel.check_in}–${hotel.check_out} · ${hotel.nights} nights · ${hotel.room_type}`} />
            </div>
          )}

          <div className="relative" style={{ marginBottom: 12 }}>
            <div className="absolute rounded-full" style={{ left: -18, top: 10, width: 10, height: 10, backgroundColor: '#666666' }} />
            <PriceBreakdown
              lineItems={lineItems}
              total={{ label: 'Total', amount: `$${total}` }}
              savings={savings > 0 ? { label: 'You save', amount: `$${savings}` } : undefined}
            />
          </div>
        </div>
      </div>
      <GlassPanel
        message="Everything looks good. Ready to checkout?"
        actions={[{ label: 'Continue to checkout →', variant: 'primary', onClick: () => send('continue') }]}
      />
      <HomeIndicator />
    </>
  )
}

// ─── 9. Payment ─────────────────────────────────────────────────────
function StatePayment({ send, ctx, variants }) {
  const OrderSummary = orderSummaryCards[variants?.orderSummaryCard] || orderSummaryCards.A
  const SavedPayment = savedPaymentCards[variants?.savedPaymentCard] || savedPaymentCards.A
  const PriceBreakdown = priceBreakdownCards[variants?.priceBreakdownCard] || priceBreakdownCards.A

  const flight = ctx.selectedFlight
  const hotel = ctx.selectedHotel

  const items = []
  if (flight) items.push({ icon: 'Flight', text: `${flight.airline} ${flight.from}→${flight.to} · ${flight.date}` })
  if (hotel) items.push({ icon: 'Hotel', text: `${hotel.name} · ${hotel.nights} nights` })

  const flightCost = flight ? flight.price : 0
  const hotelCost = hotel ? hotel.price_per_night * hotel.nights : 0
  const subtotal = flightCost + hotelCost
  const flightTax = flight ? flight.taxes : 0
  const hotelTax = hotel ? hotel.taxes * hotel.nights : 0
  const totalTax = flightTax + hotelTax
  const total = subtotal + totalTax

  return (
    <>
      <StatusBar />
      <div className="absolute left-[16px] top-[68px] right-[16px]">
        <p className="font-['Lato',sans-serif] font-semibold text-[20px] text-white leading-normal" style={{ marginBottom: 2 }}>Checkout</p>
      </div>
      <div className="absolute left-[16px] top-[100px] right-[16px] bottom-[100px] overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
        <div style={{ marginBottom: 14 }}>
          <OrderSummary title="SF Trip" subtitle="Apr 15–18 · 1 traveler" items={items} />
        </div>
        <p className="font-['Lato',sans-serif] font-semibold text-[16px] text-white leading-normal" style={{ marginBottom: 8 }}>Payment Method</p>
        <div style={{ marginBottom: 6 }} className="[&_*]:!border-[#0090FF]">
          <SavedPayment last4="4242" brand="Visa" selected={true} />
        </div>
        <p className="font-['Lato',sans-serif] text-[10px] text-[#AAAAAA] leading-normal" style={{ marginBottom: 14 }}>Or pay with new card</p>
        <PriceBreakdown
          lineItems={[
            { label: 'Subtotal', amount: `$${subtotal}` },
            ...(totalTax > 0 ? [{ label: 'Taxes & fees', amount: `$${totalTax}`, color: 'orange' }] : []),
          ]}
          total={{ label: 'Total', amount: `$${total}` }}
        />
      </div>
      <GlassPanel
        message={`Ready to book! Total: $${total}`}
        actions={[{ label: `Pay $${total} →`, variant: 'primary', onClick: () => send('pay') }]}
      />
      <HomeIndicator />
    </>
  )
}

// ─── 10. Confirmation ───────────────────────────────────────────────
function StateConfirmation({ ctx }) {
  const [showConfetti, setShowConfetti] = useState(true)
  useEffect(() => { const t = setTimeout(() => setShowConfetti(false), 1500); return () => clearTimeout(t) }, [])

  const confetti = Array.from({ length: 24 }, (_, i) => ({
    id: i,
    color: ['#EF508D', '#4FC660', '#0090FF', '#FFB347'][i % 4],
    cx: `${(Math.random() - 0.5) * 240}px`,
    cy: `${-Math.random() * 320 - 60}px`,
    cr: `${Math.random() * 720 - 360}deg`,
    size: Math.random() * 6 + 4,
    delay: Math.random() * 0.4,
  }))

  const flight = ctx.selectedFlight
  const hotel = ctx.selectedHotel
  const flightCost = flight ? flight.price : 0
  const hotelCost = hotel ? hotel.price_per_night * hotel.nights : 0
  const flightTax = flight ? flight.taxes : 0
  const hotelTax = hotel ? hotel.taxes * hotel.nights : 0
  const total = flightCost + hotelCost + flightTax + hotelTax
  const savings = (flight ? flight.saved : 0) + (hotel ? hotel.saved * hotel.nights : 0)

  return (
    <>
      <style>{ANIMATIONS_CSS}</style>
      <StatusBar />

      {showConfetti && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
          {confetti.map((c) => (
            <div key={c.id} className="absolute" style={{ width: c.size, height: c.size, borderRadius: 2, backgroundColor: c.color, '--cx': c.cx, '--cy': c.cy, '--cr': c.cr, animation: `confettiBurst 1s ease-out ${c.delay}s both` }} />
          ))}
        </div>
      )}

      <div className="absolute left-0 right-0 top-[59px] bottom-[100px] flex flex-col items-center justify-center" style={{ padding: '0 24px' }}>
        <div className="rounded-full flex items-center justify-center" style={{ width: 64, height: 64, background: 'rgba(79,198,96,0.2)', marginBottom: 12, animation: 'checkBurst 0.5s ease-out' }}>
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none"><path d="M8 16l6 6 10-12" stroke="#4fc660" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </div>
        <p className="font-['Lato',sans-serif] font-semibold text-[20px] text-white leading-normal" style={{ marginTop: 12, marginBottom: 6, animation: 'fadeInUp 0.3s ease-out 0.2s both' }}>Trip booked!</p>
        <p className="font-['Lato',sans-serif] text-[13px] text-[#AAAAAA] leading-normal" style={{ marginBottom: 2 }}>SF Trip</p>
        <p className="font-['Lato',sans-serif] text-[12px] text-[#AAAAAA] leading-normal" style={{ marginBottom: 16 }}>Apr 15–18</p>

        <div className="w-full" style={{ maxWidth: 280, marginBottom: 16 }}>
          {flight && (
            <div style={{ borderLeft: '2px solid #4FC660', paddingLeft: 10, marginBottom: 8 }}>
              <p className="font-['Lato',sans-serif] text-[11px] text-[#AAAAAA] leading-normal">Flight — {flight.airline} {flight.from} → {flight.to} · {flight.date} · {flight.depart_time}</p>
            </div>
          )}
          {hotel && (
            <div style={{ borderLeft: '2px solid #4FC660', paddingLeft: 10 }}>
              <p className="font-['Lato',sans-serif] text-[11px] text-[#AAAAAA] leading-normal">Hotel — {hotel.name} · {hotel.nights} nights</p>
            </div>
          )}
        </div>

        <p className="font-['Lato',sans-serif] font-semibold text-[16px]" style={{ color: '#4FC660', marginBottom: 4, animation: 'priceCountIn 0.4s ease-out 0.3s both' }}>${total} total</p>
        {savings > 0 && <p className="font-['Lato',sans-serif] text-[11px]" style={{ color: '#4FC660', marginBottom: 16 }}>You saved ${savings}</p>}

        <p className="font-mono text-[10px] text-[#AAAAAA] tracking-[0.5px]" style={{ marginTop: 8 }}>Confirmation #AX-{Math.floor(10000 + Math.random() * 90000)}</p>
      </div>

      <GlassPanel message="I'll keep monitoring prices for you." />
      <HomeIndicator />
    </>
  )
}

// ═══════════════════════════════════════════════════════════════════
// ─── PATH SIDEBAR ───────────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════

const SIDEBAR_COMPONENT_DEFS = [
  { key: 'flightDealCard', label: 'Flight Deal Card', states: ['flight-results'], versions: FLIGHT_VERSIONS },
  { key: 'hotelDealCard', label: 'Hotel Deal Card', states: ['hotel-results'], versions: HOTEL_VERSIONS },
  { key: 'confirmedFlightCard', label: 'Confirmed Flight', states: ['flight-selected', 'hotel-results'], versions: CONFIRMED_FLIGHT_VERSIONS },
  { key: 'confirmedBookingCard', label: 'Confirmed Booking', states: ['itinerary'], versions: CONFIRMED_BOOKING_VERSIONS },
  { key: 'priceBreakdownCard', label: 'Price Breakdown', states: ['itinerary', 'payment'], versions: PRICE_BREAKDOWN_VERSIONS },
  { key: 'orderSummaryCard', label: 'Order Summary', states: ['payment'], versions: ORDER_SUMMARY_VERSIONS },
  { key: 'savedPaymentCard', label: 'Saved Payment', states: ['payment'], versions: SAVED_PAYMENT_VERSIONS },
]

function PathSidebar({ currentState, ctx, history, jumpTo, variants, setVariants }) {
  return (
    <div className="w-[200px] rounded-[12px] self-start overflow-y-auto max-h-[852px]" style={{ padding: 14, backgroundColor: '#111111', border: '1px solid #222222' }}>
      <p className="text-[11px] font-medium text-[rgba(170,170,170,0.5)] uppercase tracking-[0.08em]" style={{ marginBottom: 8 }}>Trip Flow v2</p>

      {/* Branch badge */}
      {ctx.branch && (
        <div className="inline-flex items-center rounded-full" style={{ backgroundColor: 'rgba(239,80,141,0.15)', padding: '4px 10px', marginBottom: 12 }}>
          <span className="font-['Lato',sans-serif] text-[12px]" style={{ color: '#EF508D' }}>
            Branch {ctx.branch}: {BRANCH_LABELS[ctx.branch]}
          </span>
        </div>
      )}

      {/* Breadcrumb trail */}
      <p className="text-[10px] font-medium text-[rgba(170,170,170,0.4)] uppercase tracking-[0.08em]" style={{ marginBottom: 6 }}>Path</p>
      <div className="flex flex-col" style={{ marginBottom: 16 }}>
        {history.map((entry, i) => {
          const stateInfo = STATES[entry.state]
          if (!stateInfo) return null
          const isCurrent = i === history.length - 1
          return (
            <button
              key={i}
              onClick={() => jumpTo(i)}
              className={`flex items-center rounded-[6px] text-left transition ${isCurrent ? 'bg-main/10' : 'hover:bg-[#111111]'}`}
              style={{ padding: '5px 8px', marginBottom: 2 }}
            >
              <div className="rounded-full shrink-0" style={{ width: 6, height: 6, marginRight: 8, backgroundColor: isCurrent ? '#EF508D' : '#666666' }} />
              <span className={`font-['Lato',sans-serif] text-[11px] ${isCurrent ? 'text-main font-medium' : 'text-[#AAAAAA]'}`}>
                {stateInfo.label}
              </span>
              {isCurrent && <div className="rounded-full" style={{ width: 4, height: 4, backgroundColor: '#EF508D', marginLeft: 'auto' }} />}
            </button>
          )
        })}
      </div>

      {/* Component variants */}
      <div style={{ borderTop: '1px solid #222222', paddingTop: 12 }}>
        <p className="text-[10px] font-medium text-[rgba(170,170,170,0.4)] uppercase tracking-[0.08em]" style={{ marginBottom: 8 }}>Components</p>
        {SIDEBAR_COMPONENT_DEFS.map((comp) => {
          const isActive = comp.states.includes(currentState)
          const currentVer = comp.versions.find((v) => v.label === variants[comp.key])
          return (
            <div key={comp.key} className={`transition ${isActive ? 'opacity-100' : 'opacity-40'}`} style={{ marginBottom: 12 }}>
              <div className="flex items-center" style={{ gap: 6, marginBottom: 4 }}>
                {isActive && <div className="rounded-full shrink-0" style={{ width: 5, height: 5, backgroundColor: '#EF508D' }} />}
                <p className={`text-[11px] font-medium ${isActive ? 'text-white' : 'text-[#AAAAAA]'}`}>{comp.label}</p>
                <span className="text-[10px] text-[rgba(170,170,170,0.4)]">{comp.versions.length}</span>
              </div>
              <div className="flex flex-wrap" style={{ gap: 3, marginLeft: 11 }}>
                {comp.versions.slice(0, 8).map((ver) => {
                  const isSelected = variants[comp.key] === ver.label
                  return (
                    <button key={ver.label} onClick={() => setVariants((prev) => ({ ...prev, [comp.key]: ver.label }))} title={ver.notes}
                      className={`rounded-full text-[10px] font-medium transition ${isSelected ? 'bg-main/15 text-main' : 'bg-[#111111] text-[rgba(170,170,170,0.6)] hover:text-[#AAAAAA]'}`}
                      style={{ padding: '2px 7px' }}
                    >{ver.label}</button>
                  )
                })}
                {comp.versions.length > 8 && <span className="text-[10px] text-[rgba(170,170,170,0.3)]">+{comp.versions.length - 8}</span>}
              </div>
              {currentVer?.notes && (
                <p className="text-[10px] text-[rgba(170,170,170,0.5)] leading-[1.3]" style={{ marginLeft: 11, marginTop: 3 }}>{currentVer.notes}</p>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════
// ─── DEMO AUTO-PLAY ─────────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════

const DEMO_SEQUENCE = [
  { delay: 800,  action: 'submit-flights-and-hotel', ctxAction: { type: 'SET_TRIP_TYPE', branch: 'A', tripType: 'flights-and-hotel', needsFlight: true, needsHotel: true, searchingFor: 'flights' } },
  // axel-searching auto-advances to flight-results
  { delay: 2200, action: 'select-flight', ctxAction: { type: 'SELECT_FLIGHT', deal: FLIGHT_DEALS[0] } },
  { delay: 1500, action: 'need-hotel', ctxAction: { type: 'SEARCHING_HOTELS' } },
  // axel-searching auto-advances to hotel-results
  { delay: 2200, action: 'select-hotel', ctxAction: { type: 'SELECT_HOTEL', deal: HOTEL_DEALS[1] } },
  { delay: 1500, action: 'continue' },
  { delay: 2000, action: 'continue' },
  { delay: 2000, action: 'pay' },
]

// ─── Mock context for fixed-state page rendering ────────────────────
function getMockContext(st) {
  const f = FLIGHT_DEALS[0]
  const h = HOTEL_DEALS[1]
  const base = { branch: 'A', tripType: 'flights-and-hotel', needsFlight: true, needsHotel: true, searchingFor: 'flights', selectedFlight: null, selectedHotel: null }
  if (st === 'trip-input') return INITIAL_CTX
  if (st === 'axel-question') return { ...INITIAL_CTX, branch: 'E', tripType: 'unsure' }
  if (st === 'axel-searching' || st === 'flight-results') return base
  if (st === 'flight-selected') return { ...base, selectedFlight: f }
  if (st === 'hotel-results') return { ...base, searchingFor: 'hotels', selectedFlight: f }
  if (st === 'hotel-selected') return { ...base, searchingFor: 'hotels', selectedFlight: f, selectedHotel: h }
  if (['itinerary', 'payment', 'confirmation'].includes(st)) return { ...base, searchingFor: 'hotels', selectedFlight: f, selectedHotel: h }
  return INITIAL_CTX
}

// ═══════════════════════════════════════════════════════════════════
// ─── MAIN COMPONENT ─────────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════

export default function TripFlowV2({ slug }) {
  // ─── Fixed state detection (synchronous — no flash) ────────────────
  const fixedState = slug ? (SLUG_TO_STATE[slug] || null) : null
  const fixedCtx = fixedState ? getMockContext(fixedState) : null

  const router = useRouter()
  const [state, setState] = useState(fixedState || 'trip-input')
  const [displayState, setDisplayState] = useState(fixedState || 'trip-input')
  const [dir, setDir] = useState('forward')
  const [animating, setAnimating] = useState(false)
  const prevState = useRef(fixedState || 'trip-input')
  const [ctx, dispatch] = useReducer(contextReducer, fixedCtx || INITIAL_CTX)
  const [history, setHistory] = useState([{ state: fixedState || 'trip-input', ctx: fixedCtx || INITIAL_CTX }])
  const [isStandalone, setIsStandalone] = useState(false)
  const [viewMode, setViewMode] = useState('demo')
  const [demoStep, setDemoStep] = useState(0)
  const demoTimerRef = useRef(null)
  const [variants, setVariants] = useState({
    flightDealCard: 'A', hotelDealCard: 'A', confirmedFlightCard: 'A',
    priceBreakdownCard: 'A', confirmedBookingCard: 'A', orderSummaryCard: 'A',
    savedPaymentCard: 'A', axelPanel: 'A', stepProgress: 'A',
  })

  useEffect(() => { setIsStandalone(window.self === window.top) }, [])

  // ─── send(action, ctxAction) — resolve next state from transitions map
  const send = useCallback((action, ctxAction) => {
    if (animating) return
    const transitions = TRANSITIONS[prevState.current]
    if (!transitions) return
    const nextState = transitions[action]
    if (!nextState) return

    if (ctxAction) dispatch(ctxAction)

    const fromIdx = STATE_ORDER.indexOf(prevState.current)
    const toIdx = STATE_ORDER.indexOf(nextState)
    setDir(toIdx >= fromIdx ? 'forward' : 'back')
    setAnimating(true)
    setState(nextState)

    // Push to history with context snapshot (after dispatch, use functional update)
    setTimeout(() => {
      setHistory((h) => {
        const newCtx = ctxAction ? contextReducer(h[h.length - 1]?.ctx || INITIAL_CTX, ctxAction) : (h[h.length - 1]?.ctx || INITIAL_CTX)
        return [...h, { state: nextState, ctx: newCtx }]
      })
    }, 0)

    setTimeout(() => { setDisplayState(nextState); prevState.current = nextState; setAnimating(false) }, 300)
  }, [animating])

  // ─── goBack — pop history, restore context
  const goBack = useCallback(() => {
    if (animating || history.length <= 1) return
    const newHistory = history.slice(0, -1)
    const target = newHistory[newHistory.length - 1]
    setDir('back')
    setAnimating(true)
    setState(target.state)
    dispatch({ type: 'RESTORE', ctx: target.ctx })
    setHistory(newHistory)
    setTimeout(() => { setDisplayState(target.state); prevState.current = target.state; setAnimating(false) }, 300)
  }, [animating, history])

  // ─── jumpTo(historyIndex) — slice back, restore context
  const jumpTo = useCallback((idx) => {
    if (animating || idx >= history.length - 1) return
    const newHistory = history.slice(0, idx + 1)
    const target = newHistory[newHistory.length - 1]
    setDir('back')
    setAnimating(true)
    setState(target.state)
    dispatch({ type: 'RESTORE', ctx: target.ctx })
    setHistory(newHistory)
    setTimeout(() => { setDisplayState(target.state); prevState.current = target.state; setAnimating(false) }, 300)
  }, [animating, history])

  // ─── Demo auto-play
  useEffect(() => {
    if (viewMode !== 'demo' || demoStep >= DEMO_SEQUENCE.length) return
    // Don't auto-advance if we're on axel-searching (it auto-advances itself)
    if (prevState.current === 'axel-searching') return

    const step = DEMO_SEQUENCE[demoStep]
    if (!step) return

    demoTimerRef.current = setTimeout(() => {
      send(step.action, step.ctxAction)
      setDemoStep((s) => s + 1)
    }, step.delay)

    return () => clearTimeout(demoTimerRef.current)
  }, [viewMode, demoStep, send, displayState])

  // Auto-advance demo step when search completes
  useEffect(() => {
    if (viewMode !== 'demo') return
    if (displayState === 'flight-results' && demoStep === 1) setDemoStep(1)
    if (displayState === 'hotel-results' && demoStep === 3) setDemoStep(3)
  }, [viewMode, displayState, demoStep])

  // ─── Keyboard shortcuts
  useEffect(() => {
    if (!isStandalone) return
    function handleKey(e) {
      if (e.key === 'Escape') router.push('/flow/trip-flow-v2')
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [router, isStandalone])

  // ─── Reset demo
  const resetDemo = useCallback(() => {
    setState('trip-input')
    setDisplayState('trip-input')
    prevState.current = 'trip-input'
    dispatch({ type: 'RESET' })
    setHistory([{ state: 'trip-input', ctx: INITIAL_CTX }])
    setDir('forward')
    setAnimating(false)
    setDemoStep(0)
  }, [])

  const currentVisible = animating ? state : displayState
  const isDemo = viewMode === 'demo'

  function renderState(key, overrideProps) {
    const props = overrideProps || { send, ctx, dispatch, variants, goBack, isDemo }
    switch (key) {
      case 'trip-input':      return <StateTripInput {...props} />
      case 'axel-searching':  return <StateAxelSearching {...props} />
      case 'axel-question':   return <StateAxelQuestion {...props} />
      case 'flight-results':  return <StateFlightResults {...props} />
      case 'flight-selected': return <StateFlightSelected {...props} />
      case 'hotel-results':   return <StateHotelResults {...props} />
      case 'hotel-selected':  return <StateHotelSelected {...props} />
      case 'itinerary':       return <StateItinerary {...props} />
      case 'payment':         return <StatePayment {...props} />
      case 'confirmation':    return <StateConfirmation {...props} />
      default: return null
    }
  }

  const slideOutForward = '-translate-x-full'
  const slideOutBack = 'translate-x-full'
  const enterFrom = dir === 'forward' ? 'translate-x-full' : '-translate-x-full'

  const phoneFrame = (
    <div className="bg-bg overflow-hidden relative rounded-[30px] w-[393px] h-[852px] shrink-0">
      {animating && (
        <div className={`absolute inset-0 transition-transform duration-300 ease-in-out ${dir === 'forward' ? slideOutForward : slideOutBack}`}>
          {renderState(displayState)}
        </div>
      )}
      <div
        className={`absolute inset-0 transition-transform duration-300 ease-in-out ${animating ? enterFrom : 'translate-x-0'}`}
        style={!animating ? { transition: 'none' } : {}}
      >
        {renderState(animating ? state : displayState)}
      </div>
    </div>
  )

  // Standalone page rendering — show just that one state, no animation/navigation
  if (fixedState) {
    const noop = () => {}
    const fixedProps = { send: noop, ctx, dispatch: noop, variants, goBack: noop, isDemo: false }
    return (
      <div className="font-['Inter',sans-serif]">
        <div className="bg-bg overflow-hidden relative rounded-[30px] w-[393px] h-[852px] shrink-0">
          {renderState(fixedState, fixedProps)}
        </div>
      </div>
    )
  }

  if (!isStandalone) {
    return <div className="font-['Inter',sans-serif]">{phoneFrame}</div>
  }

  return (
    <div className="flex flex-col items-center font-['Inter',sans-serif]">
      <div className="flex items-center justify-between" style={{ width: 605, marginBottom: 10 }}>
        <button onClick={() => router.push('/flow/trip-flow-v2')} className="flex items-center text-[#AAAAAA] hover:text-white transition" style={{ gap: 6 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
          <span className="text-[12px]">Flow</span>
        </button>
        <div className="flex items-center" style={{ gap: 8 }}>
          <div className="flex items-center bg-[#111111] rounded-full" style={{ padding: 2 }}>
            <button onClick={() => { setViewMode('demo'); resetDemo() }} className={`rounded-full text-[10px] font-medium transition ${viewMode === 'demo' ? 'bg-main/15 text-main' : 'text-[rgba(170,170,170,0.6)] hover:text-[#AAAAAA]'}`} style={{ padding: '3px 10px' }}>Demo</button>
            <button onClick={() => { setViewMode('interactive'); clearTimeout(demoTimerRef.current) }} className={`rounded-full text-[10px] font-medium transition ${viewMode === 'interactive' ? 'bg-main/15 text-main' : 'text-[rgba(170,170,170,0.6)] hover:text-[#AAAAAA]'}`} style={{ padding: '3px 10px' }}>Interactive</button>
          </div>
          <span className="text-[rgba(170,170,170,0.2)] text-[11px]">&middot;</span>
          <span className="text-[11px] text-[rgba(170,170,170,0.5)]">{STATES[currentVisible]?.label || 'Trip Flow v2'}</span>
          <span className="text-[rgba(170,170,170,0.2)] text-[11px]">&middot;</span>
          <span className="text-[11px] text-[rgba(170,170,170,0.3)]">{history.length - 1} steps</span>
        </div>
        <div className="flex items-center" style={{ gap: 8 }}>
          <button onClick={resetDemo} className="text-[11px] text-[#AAAAAA] hover:text-white transition" style={{ padding: '3px 8px' }}>Reset</button>
          <button onClick={() => router.push('/')} className="text-[12px] text-[#AAAAAA] hover:text-white transition">Dashboard</button>
        </div>
      </div>

      <div className="flex items-start" style={{ gap: 12 }}>
        {phoneFrame}
        <PathSidebar
          currentState={currentVisible}
          ctx={ctx}
          history={history}
          jumpTo={jumpTo}
          variants={variants}
          setVariants={setVariants}
        />
      </div>
    </div>
  )
}

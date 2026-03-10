'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import statusIcons from '@/assets/status-icons.svg'
import StatusBar from '@/components/StatusBar'
import BottomNav from '@/components/BottomNav'
import HomeIndicator from '@/components/HomeIndicator'
import TripCard from '@/components/TripCard'
import QuickOptionPills from '@/components/QuickOptionPills'
import TripInputBar from '@/components/TripInputBar'
import iterations from '@/data/iterations.json'

// ─── Color Rules (STRICT) ──────────────────────────────────────────
// Pink #EF508D = Axel / AI / automation ONLY
// Blue #0090FF = User manual actions ONLY
// Green #4FC660 = Price / savings / success ONLY
// Orange #FB7A29 = Warning / attention ONLY
// White #fff = Primary content
// Gray #888 = Secondary content

// ─── Iteration data ─────────────────────────────────────────────────
const FLIGHT_VERSIONS = iterations['component:flight-deal-card']?.versions || [{ label: 'A', notes: '' }]
const HOTEL_VERSIONS = iterations['component:hotel-deal-card']?.versions || [{ label: 'A', notes: '' }]
const THINKING_VERSIONS = iterations['component:thinking-bubble']?.versions || [{ label: 'A', notes: '' }]
const TRIP_CARD_VERSIONS = iterations['component:trip-card']?.versions || [{ label: 'A', notes: '' }]
const CONFIRMED_FLIGHT_VERSIONS = iterations['component:confirmed-flight-card']?.versions || [{ label: 'A', notes: '' }]
const PRICE_BREAKDOWN_VERSIONS = iterations['component:price-breakdown-card']?.versions || [{ label: 'A', notes: '' }]
const CONFIRMED_BOOKING_VERSIONS = iterations['component:confirmed-booking-card']?.versions || [{ label: 'A', notes: '' }]
const ORDER_SUMMARY_VERSIONS = iterations['component:order-summary-card']?.versions || [{ label: 'A', notes: '' }]
const PAYWALL_VERSIONS = iterations['component:paywall-card']?.versions || [{ label: 'A', notes: '' }]
const HOTEL_MAP_PEEK_VERSIONS = iterations['component:hotel-map-peek-card']?.versions || [{ label: 'A', notes: '' }]
const SAVED_PAYMENT_VERSIONS = iterations['component:saved-payment-card']?.versions || [{ label: 'A', notes: '' }]
const AXEL_PANEL_VERSIONS = iterations['component:axel-panel']?.versions || [{ label: 'A', notes: '' }]
const STEP_PROGRESS_VERSIONS = iterations['component:step-progress']?.versions || [{ label: 'A', notes: '' }]

// ─── Dynamic component loaders ──────────────────────────────────────
const flightDealCards = {}
FLIGHT_VERSIONS.forEach(({ label }) => {
  flightDealCards[label] = dynamic(
    () => label === 'A'
      ? import('@/components/FlightDealCard')
      : import(`@/components/FlightDealCard.${label}`).catch(() => import('@/components/FlightDealCard')),
    { ssr: false }
  )
})

const hotelDealCards = {}
HOTEL_VERSIONS.forEach(({ label }) => {
  hotelDealCards[label] = dynamic(
    () => label === 'A'
      ? import('@/components/HotelDealCard')
      : import(`@/components/HotelDealCard.${label}`).catch(() => import('@/components/HotelDealCard')),
    { ssr: false }
  )
})

const thinkingBubbles = {}
THINKING_VERSIONS.forEach(({ label }) => {
  thinkingBubbles[label] = dynamic(
    () => label === 'A'
      ? import('@/components/ThinkingBubble')
      : import(`@/components/ThinkingBubble.${label}`).catch(() => import('@/components/ThinkingBubble')),
    { ssr: false }
  )
})

const tripCards = {}
TRIP_CARD_VERSIONS.forEach(({ label }) => {
  tripCards[label] = dynamic(
    () => label === 'A'
      ? import('@/components/TripCard')
      : import(`@/components/TripCard.${label}`).catch(() => import('@/components/TripCard')),
    { ssr: false }
  )
})

const confirmedFlightCards = {}
CONFIRMED_FLIGHT_VERSIONS.forEach(({ label }) => {
  confirmedFlightCards[label] = dynamic(
    () => label === 'A'
      ? import('@/components/ConfirmedFlightCard')
      : import(`@/components/ConfirmedFlightCard.${label}`).catch(() => import('@/components/ConfirmedFlightCard')),
    { ssr: false }
  )
})

const priceBreakdownCards = {}
PRICE_BREAKDOWN_VERSIONS.forEach(({ label }) => {
  priceBreakdownCards[label] = dynamic(
    () => label === 'A'
      ? import('@/components/PriceBreakdownCard')
      : import(`@/components/PriceBreakdownCard.${label}`).catch(() => import('@/components/PriceBreakdownCard')),
    { ssr: false }
  )
})

const confirmedBookingCards = {}
CONFIRMED_BOOKING_VERSIONS.forEach(({ label }) => {
  confirmedBookingCards[label] = dynamic(
    () => label === 'A'
      ? import('@/components/ConfirmedBookingCard')
      : import(`@/components/ConfirmedBookingCard.${label}`).catch(() => import('@/components/ConfirmedBookingCard')),
    { ssr: false }
  )
})

const orderSummaryCards = {}
ORDER_SUMMARY_VERSIONS.forEach(({ label }) => {
  orderSummaryCards[label] = dynamic(
    () => label === 'A'
      ? import('@/components/OrderSummaryCard')
      : import(`@/components/OrderSummaryCard.${label}`).catch(() => import('@/components/OrderSummaryCard')),
    { ssr: false }
  )
})

const paywallCards = {}
PAYWALL_VERSIONS.forEach(({ label }) => {
  paywallCards[label] = dynamic(
    () => label === 'A'
      ? import('@/components/PaywallCard')
      : import(`@/components/PaywallCard.${label}`).catch(() => import('@/components/PaywallCard')),
    { ssr: false }
  )
})

const hotelMapPeekCards = {}
HOTEL_MAP_PEEK_VERSIONS.forEach(({ label }) => {
  hotelMapPeekCards[label] = dynamic(
    () => label === 'A'
      ? import('@/components/HotelMapPeekCard')
      : import(`@/components/HotelMapPeekCard.${label}`).catch(() => import('@/components/HotelMapPeekCard')),
    { ssr: false }
  )
})

const savedPaymentCards = {}
SAVED_PAYMENT_VERSIONS.forEach(({ label }) => {
  savedPaymentCards[label] = dynamic(
    () => label === 'A'
      ? import('@/components/SavedPaymentCard')
      : import(`@/components/SavedPaymentCard.${label}`).catch(() => import('@/components/SavedPaymentCard')),
    { ssr: false }
  )
})

const axelPanels = {}
AXEL_PANEL_VERSIONS.forEach(({ label }) => {
  axelPanels[label] = dynamic(
    () => label === 'A'
      ? import('@/components/AxelPanel')
      : import(`@/components/AxelPanel.${label}`).catch(() => import('@/components/AxelPanel')),
    { ssr: false }
  )
})

const stepProgresses = {}
STEP_PROGRESS_VERSIONS.forEach(({ label }) => {
  stepProgresses[label] = dynamic(
    () => label === 'A'
      ? import('@/components/StepProgress')
      : import(`@/components/StepProgress.${label}`).catch(() => import('@/components/StepProgress')),
    { ssr: false }
  )
})

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
  @keyframes scanLine {
    0% { transform: translateX(-100%); opacity: 0; }
    20% { opacity: 1; }
    80% { opacity: 1; }
    100% { transform: translateX(100%); opacity: 0; }
  }
  @keyframes dotTravel {
    0% { left: 10%; opacity: 0; }
    10% { opacity: 1; }
    90% { opacity: 1; }
    100% { left: 90%; opacity: 0; }
  }
  @keyframes bubblePop {
    0% { transform: scale(0); opacity: 0; }
    60% { transform: scale(1.15); opacity: 1; }
    100% { transform: scale(1); opacity: 1; }
  }
  @keyframes priceCountIn {
    0% { opacity: 0; transform: scale(0.8); }
    100% { opacity: 1; transform: scale(1); }
  }
  @keyframes glassShimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
  @keyframes wizardSlide {
    0% { opacity: 0; transform: translateX(20px); }
    100% { opacity: 1; transform: translateX(0); }
  }
  @keyframes checkBurst {
    0% { transform: scale(0) rotate(-10deg); }
    50% { transform: scale(1.2) rotate(5deg); }
    100% { transform: scale(1) rotate(0deg); }
  }
`

// ─── Shared UI ──────────────────────────────────────────────────────
function BackHeader({ label, onBack, right }) {
  return (
    <div className="absolute left-[16px] top-[68px] right-[16px] flex items-center justify-between z-10">
      <button onClick={onBack} className="flex items-center" style={{ marginRight: 8 }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#989898" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 6 }}><path d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
        <p className="text-[13px] text-[#989898]">{label}</p>
      </button>
      {right}
    </div>
  )
}

// ─── BlueCTA (user actions = BLUE) ──────────────────────────────────
function BlueCTA({ label, onClick }) {
  return (
    <button onClick={onClick} className="w-full flex items-center justify-center py-[12px] rounded-[30px] cursor-pointer hover:brightness-110 transition" style={{ backgroundColor: '#0090FF' }}>
      <p className="font-medium text-[13px] text-center leading-normal text-white">{label}</p>
    </button>
  )
}

// ─── PinkCTA (Axel/AI actions = PINK) ───────────────────────────────
function PinkCTA({ label, onClick }) {
  return (
    <button onClick={onClick} className="w-full flex items-center justify-center py-[12px] rounded-[30px] cursor-pointer hover:brightness-110 transition" style={{ backgroundColor: '#EF508D' }}>
      <p className="font-medium text-[13px] text-center leading-normal text-white">{label}</p>
    </button>
  )
}

// ─── Glass Panel (Axel assistant — frosted glass) ───────────────────
function GlassPanel({ message, actions = [], typing = false, children }) {
  return (
    <div className="absolute bottom-0 left-0 right-0 z-20 rounded-t-[20px] overflow-hidden" style={{ background: 'rgba(18,18,18,0.88)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', borderLeft: '3px solid #EF508D' }}>
      <div className="px-[16px] pt-[14px] pb-[28px]">
        <div className="flex items-start">
          {/* Axel Avatar — Pink = AI identity */}
          <div className="w-[28px] h-[28px] rounded-full flex items-center justify-center shrink-0" style={{ marginRight: 10, background: 'rgba(239,80,141,0.15)' }}>
            <span className="font-['Lato',sans-serif] font-bold text-[12px] leading-none" style={{ color: '#EF508D' }}>A</span>
          </div>
          <div className="flex-1 min-w-0">
            {typing ? (
              <div className="flex items-center">
                <div className="flex items-center" style={{ gap: 3 }}>
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="w-[5px] h-[5px] rounded-full" style={{ backgroundColor: '#EF508D', animation: `floatY 1.2s ease-in-out infinite`, animationDelay: `${i * 0.15}s` }} />
                  ))}
                </div>
                {message && <span className="font-['Lato',sans-serif] text-[12px] text-[#888] leading-[1]" style={{ marginLeft: 8 }}>{message}</span>}
              </div>
            ) : (
              <p className="font-['Lato',sans-serif] text-[13px] text-white leading-[1.4]" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{message}</p>
            )}
            {children}
            {actions.length > 0 && (
              <div className="flex items-center" style={{ marginTop: 10 }}>
                {actions.map((a, i) => (
                  <button key={i} onClick={a.onClick}
                    className="font-['Lato',sans-serif] text-[11px] font-medium rounded-full transition-colors"
                    style={{
                      marginRight: 8,
                      padding: '7px 14px',
                      ...(a.variant === 'primary'
                        ? { backgroundColor: '#0090FF', color: '#fff' }
                        : { border: '1px solid rgba(0,144,255,0.4)', color: '#0090FF', background: 'transparent' }),
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

// ─── Summary Pill (collapsed step context) ──────────────────────────
function SummaryPill({ icon, text }) {
  return (
    <div className="inline-flex items-center rounded-full" style={{ background: '#1a1a1a', border: '1px solid #333', padding: '4px 10px', marginRight: 6, marginBottom: 4 }}>
      <span className="text-[11px]" style={{ marginRight: 4 }}>{icon}</span>
      <span className="font-['Lato',sans-serif] text-[11px] text-[#ccc] leading-[1]">{text}</span>
    </div>
  )
}

// ─── BottomSheet (enhanced with glass) ──────────────────────────────
function BottomSheet({ open, onClose, children }) {
  return (
    <>
      <div
        className={`absolute inset-0 z-30 transition-opacity duration-200 ${open ? 'pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        style={open ? { backgroundColor: 'rgba(0,0,0,0.5)' } : undefined}
        onClick={onClose}
      />
      <div
        className={`absolute left-0 right-0 bottom-0 z-40 rounded-t-[20px] max-h-[75vh] overflow-y-auto transition-transform duration-300 ease-out ${open ? 'translate-y-0' : 'translate-y-full'}`}
        style={{ scrollbarWidth: 'none', background: 'rgba(22,22,22,0.95)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-center" style={{ paddingTop: 8, paddingBottom: 4 }}>
          <div className="w-[40px] h-[4px] rounded-full bg-[#474747]" />
        </div>
        <div style={{ padding: '0 16px 32px' }}>
          {children}
        </div>
      </div>
    </>
  )
}

// ─── Step config ────────────────────────────────────────────────────
const STEPS = [
  { emoji: '', label: 'Flights' },
  { emoji: '', label: 'Hotels' },
  { emoji: '', label: 'Review' },
  { emoji: '', label: 'Book' },
]

// ─── Destination themes ─────────────────────────────────────────────
const DEST_THEMES = {
  'San Francisco': { gradient: 'linear-gradient(135deg, #1a1520, #221518)', accent: '#FF6B47', icon: '' },
  'New York': { gradient: 'linear-gradient(135deg, #1a1520, #201a2a)', accent: '#FFB347', icon: '' },
  'Tokyo': { gradient: 'linear-gradient(135deg, #1a1520, #1a1528)', accent: '#FF6B8A', icon: '' },
  'Portland': { gradient: 'linear-gradient(135deg, #151a18, #1a2018)', accent: '#7BC67B', icon: '' },
  default: { gradient: 'linear-gradient(135deg, #1a1a1a, #222)', accent: '#EF508D', icon: '' },
}

function getDestTheme(title) {
  for (const [city, theme] of Object.entries(DEST_THEMES)) {
    if (city !== 'default' && title?.includes(city)) return theme
  }
  return DEST_THEMES.default
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

const PINS = [
  { id: 0, name: 'Hotel Nikko SF', area: 'Union Square', price: 189, save: 56, top: '38%', left: '45%', best: false },
  { id: 1, name: 'The Marker', area: 'Market Street', price: 167, save: 78, top: '52%', left: '32%', best: true },
  { id: 2, name: 'Hyatt Regency SF', area: 'Embarcadero', price: 212, save: 33, top: '30%', left: '65%', best: false },
]

const AMENITIES = ['WiFi', 'Pool', 'Gym', 'Restaurant', 'Bar', 'Parking']

// ─── Enhanced Search Visualization ──────────────────────────────────
function SearchViz({ label, sublabel, count, type = 'flights' }) {
  const [num, setNum] = useState(0)
  const airlines = type === 'flights'
    ? ['United', 'Alaska', 'Delta', 'JetBlue', 'Southwest']
    : ['Marriott', 'Hilton', 'Hyatt', 'IHG', 'Westin']
  const [activeAirline, setActiveAirline] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setNum((n) => Math.min(n + Math.floor(Math.random() * 23) + 5, count)), 80)
    return () => clearInterval(t)
  }, [count])

  useEffect(() => {
    const t = setInterval(() => setActiveAirline((a) => (a + 1) % airlines.length), 600)
    return () => clearInterval(t)
  }, [airlines.length])

  return (
    <div className="flex flex-col items-center justify-center" style={{ height: 280 }}>
      <p className="font-['Lato',sans-serif] font-bold text-[16px] text-white" style={{ marginBottom: 2 }}>{label}</p>
      <p className="font-['Lato',sans-serif] text-[12px] text-[#888]" style={{ marginBottom: 24 }}>{sublabel}</p>

      {/* Pulse rings */}
      <div className="relative" style={{ width: 140, height: 140, marginBottom: 20 }}>
        {[0, 1, 2].map((i) => (
          <div key={i} className="absolute inset-0 rounded-full" style={{ border: '1px solid rgba(239,80,141,0.25)', animation: `searchPulse 2s ease-out infinite`, animationDelay: `${i * 0.6}s` }} />
        ))}
        {/* Center dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="rounded-full" style={{ width: 10, height: 10, backgroundColor: '#EF508D' }} />
        </div>
        {/* Traveling dots along route line */}
        <div className="absolute" style={{ top: '50%', left: '15%', right: '15%', height: 2, marginTop: -1 }}>
          <div className="absolute w-full h-full" style={{ backgroundColor: 'rgba(239,80,141,0.15)' }} />
          <div className="absolute rounded-full" style={{ width: 4, height: 4, top: -1, backgroundColor: '#EF508D', animation: 'dotTravel 1.5s linear infinite' }} />
        </div>
      </div>

      {/* Scanning airline names */}
      <div className="flex items-center justify-center" style={{ marginBottom: 8, height: 20 }}>
        <span className="font-['Lato',sans-serif] text-[11px] text-[#666]" style={{ marginRight: 6 }}>Scanning</span>
        <span className="font-['Lato',sans-serif] text-[11px] font-medium" style={{ color: '#EF508D', minWidth: 70 }}>{airlines[activeAirline]}</span>
      </div>

      {/* Counter */}
      <p className="font-['Lato',sans-serif] text-[12px] text-[#888]" style={{ animation: 'countUp 1.5s ease-in-out infinite' }}>
        Checking {num} {type}...
      </p>
    </div>
  )
}

// ─── Price Display with count-up ────────────────────────────────────
function PriceCount({ value, prefix = '$', className = '', style = {} }) {
  const [display, setDisplay] = useState(0)
  const ref = useRef(null)

  useEffect(() => {
    let start = 0
    const end = value
    const duration = 600
    const startTime = Date.now()
    function tick() {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.round(start + (end - start) * eased))
      if (progress < 1) ref.current = requestAnimationFrame(tick)
    }
    ref.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(ref.current)
  }, [value])

  return <span className={className} style={style}>{prefix}{display}</span>
}

// ═══════════════════════════════════════════════════════════════════
// ─── Screen 1: My Plans (Travel Plan Drafts) ────────────────────────
// ═══════════════════════════════════════════════════════════════════
const TRIP_LIST_DATA = [
  { id: 1, month: 'APR', days: '15 - 18', year: '2026', type: 'FLIGHT + HOTEL', typeColor: '#4FC660', route: 'Seattle \u2192 San Francisco', travelers: '2 travelers', img: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=400&fit=crop' },
  { id: 2, month: 'APR', days: '20 - 22', year: '2026', type: 'HOTEL ONLY', typeColor: '#FFFFFF', route: 'Los Angeles \u2192 New York', travelers: '3 travelers', img: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=800&h=400&fit=crop' },
  { id: 3, month: 'MAY', days: '10 - 13', year: '2026', type: 'FLIGHT + HOTEL', typeColor: '#4FC660', route: 'Chicago \u2192 Miami', travelers: '1 traveler', img: 'https://images.unsplash.com/photo-1514214246283-d427a95c5d2f?w=800&h=400&fit=crop' },
]

function ScreenTripsList({ go, variants = {} }) {
  const TripCardComp = tripCards[variants.tripCard] || TripCard
  return (
    <>
      <style>{ANIMATIONS_CSS}</style>
      <StatusBar />
      <div className="absolute left-[16px] top-[66px] right-[16px] flex items-center justify-between">
        <p className="font-['Lato',sans-serif] font-semibold text-[28px] text-white leading-normal">Trips</p>
        <button onClick={() => go('new-trip')} className="border border-[#333] rounded-[30px] px-[16px] py-[8px] hover:bg-white/5 transition">
          <p className="font-['Lato',sans-serif] text-[13px] text-white font-medium">+ New Trip</p>
        </button>
      </div>
      <div className="absolute left-[16px] top-[124px] right-[16px] bottom-[88px] overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
        <div className="flex flex-col" style={{ gap: 16 }}>
          {TRIP_LIST_DATA.map((trip, i) => (
            <div key={trip.id} style={{ animation: `staggerFadeUp 0.4s ease-out ${i * 0.08}s both` }}>
              <TripCardComp trip={trip} onClick={() => go('new-trip')} />
            </div>
          ))}
        </div>
      </div>
      <BottomNav activeTab="trips" />
      <HomeIndicator />
    </>
  )
}

// ═══════════════════════════════════════════════════════════════════
// ─── Screen 2: New Plan (Guided Wizard) ─────────────────────────────
// ═══════════════════════════════════════════════════════════════════

function ScreenNewTrip({ go, goBack }) {
  const [text, setText] = useState('business trip to sf. seattle to sf flights apr 15 - 18')
  return (
    <>
      <style>{ANIMATIONS_CSS}</style>
      <StatusBar />
      <div className="absolute left-[16px] top-[66px] right-[16px]">
        <div className="flex items-center" style={{ gap: 10 }}>
          <button onClick={goBack}>
            <svg width="12" height="18" viewBox="0 0 12 18" fill="none"><path d="M10 2L3 9L10 16" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <p className="font-['Lato',sans-serif] font-semibold text-[20px] text-white leading-normal">New trip plan</p>
        </div>
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center px-[40px]" style={{ marginTop: -40 }}>
        <img src="/axel-mascot.png" alt="Axel" className="w-[180px] h-[180px] object-contain" style={{ marginBottom: 16 }} />
        <p className="font-['Lato',sans-serif] text-[14px] text-[#888] text-center leading-[1.5]">Tell me about your trip — where, when, and what matters to you.</p>
      </div>
      <div className="absolute left-[16px] right-[16px] bottom-[32px]">
        <div style={{ marginBottom: 12 }}>
          <QuickOptionPills onSelect={() => go('chat-thinking')} />
        </div>
        <TripInputBar
          value={text}
          onChange={(e) => setText(e.target.value)}
          onSubmit={() => text && go('chat-thinking')}
        />
      </div>
      <HomeIndicator />
    </>
  )
}

// ═══════════════════════════════════════════════════════════════════
// ─── Screen 3: Flight Search Animation ──────────────────────────────
// ═══════════════════════════════════════════════════════════════════
function ScreenChatThinking({ go, goBack, variants }) {
  useEffect(() => { const t = setTimeout(() => go('chat-flights'), 2500); return () => clearTimeout(t) }, [go])
  const StepProgress = stepProgresses[variants?.stepProgress] || stepProgresses.A
  return (
    <>
      <style>{ANIMATIONS_CSS}</style>
      <StatusBar />
      <BackHeader label="My Plans" onBack={goBack} />
      <div className="absolute left-0 right-0 top-[92px] z-10">
        <StepProgress steps={STEPS} current={0} completed={[]} />
      </div>
      {/* Summary pills */}
      <div className="absolute left-[16px] right-[16px] top-[136px] flex flex-wrap">
        <SummaryPill icon="" text="SEA → SFO" />
        <SummaryPill icon="" text="Apr 15-18" />
        <SummaryPill icon="" text="2 adults" />
      </div>
      <div className="absolute left-[16px] right-[16px] top-[170px] bottom-[100px]">
        <SearchViz label="SEA → SFO" sublabel="Nonstop · Apr 15" count={247} type="flights" />
      </div>
      <GlassPanel typing message="Searching flights..." />
      <HomeIndicator />
    </>
  )
}

// ═══════════════════════════════════════════════════════════════════
// ─── Screen 4: Flight Selection ─────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════
function ScreenChatFlights({ go, goBack, variants }) {
  const [visible, setVisible] = useState(false)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [selectedFlight, setSelectedFlight] = useState(null)
  useEffect(() => { const t = setTimeout(() => setVisible(true), 100); return () => clearTimeout(t) }, [])
  const FlightCard = flightDealCards[variants?.flightDealCard] || flightDealCards.A
  const StepProgress = stepProgresses[variants?.stepProgress] || stepProgresses.A
  return (
    <>
      <style>{ANIMATIONS_CSS}</style>
      <StatusBar />
      <BackHeader label="My Plans" onBack={goBack} />
      <div className="absolute left-0 right-0 top-[92px] z-10">
        <StepProgress steps={STEPS} current={0} completed={[]} />
      </div>
      <div className="absolute left-[16px] top-[136px] right-[16px] bottom-[100px] overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
        {/* Summary pills */}
        <div className="flex flex-wrap" style={{ marginBottom: 8 }}>
          <SummaryPill icon="" text="SEA → SFO" />
          <SummaryPill icon="" text="Apr 15 · Nonstop" />
        </div>
        {/* Flight cards with stagger animation */}
        <div className={`flex flex-col ${visible ? '' : 'opacity-0'}`} style={{ gap: 0 }}>
          {FLIGHT_DEALS.map((deal, i) => (
            <div
              key={i}
              style={{ marginBottom: 8, ...(visible ? { animation: `staggerFadeUp 0.4s ease-out ${i * 0.1}s both` } : {}) }}
            >
              <FlightCard deal={deal} mode="list" onClick={() => { setSelectedFlight(deal); setSheetOpen(true) }} />
            </div>
          ))}
        </div>
      </div>
      <GlassPanel
        message="Morning nonstops are cheapest. Tap a flight to see details."
        actions={[
          { label: 'Need a hotel too?', variant: 'secondary', onClick: () => go('chat-hotel-thinking') },
          { label: 'Flights only →', variant: 'primary', onClick: () => go('itinerary') },
        ]}
      />
      {/* Bottom sheet — full flight details */}
      <BottomSheet open={sheetOpen} onClose={() => setSheetOpen(false)}>
        {selectedFlight && (
          <>
            <p className="font-['Lato',sans-serif] font-bold text-[16px] text-white" style={{ marginBottom: 4 }}>{selectedFlight.airline}</p>
            <p className="font-['Lato',sans-serif] text-[12px] text-[#888]" style={{ marginBottom: 12 }}>{selectedFlight.flight_number} · {selectedFlight.aircraft}</p>
            {/* Times */}
            <div className="flex items-center justify-between" style={{ marginBottom: 8 }}>
              <div>
                <p className="font-['Lato',sans-serif] font-medium text-[18px] text-white">{selectedFlight.depart_time}</p>
                <p className="font-['Lato',sans-serif] text-[12px] text-[#888]">{selectedFlight.from} · {selectedFlight.from_city}</p>
              </div>
              <div className="flex-1" style={{ margin: '0 12px', height: 1, backgroundColor: '#333' }} />
              <div className="text-right">
                <p className="font-['Lato',sans-serif] font-medium text-[18px] text-white">{selectedFlight.arrive_time}</p>
                <p className="font-['Lato',sans-serif] text-[12px] text-[#888]">{selectedFlight.to} · {selectedFlight.to_city}</p>
              </div>
            </div>
            {/* Details */}
            <div className="flex items-center justify-between" style={{ marginBottom: 6 }}>
              <p className="font-['Lato',sans-serif] text-[12px] text-[#888]">{selectedFlight.duration} · {selectedFlight.stops}</p>
              <p className="font-['Lato',sans-serif] text-[12px] text-[#888]">{selectedFlight.cabin_class}</p>
            </div>
            <div style={{ marginBottom: 4 }}>
              <p className="font-['Lato',sans-serif] text-[12px] text-[#888]">Baggage: {selectedFlight.baggage}</p>
            </div>
            <div style={{ marginBottom: 6 }}>
              <p className="font-['Lato',sans-serif] text-[12px] text-[#888]">Checked bag: {selectedFlight.checked_bag_fee}</p>
            </div>
            <div style={{ marginBottom: 4 }}>
              <p className="font-['Lato',sans-serif] text-[12px] text-[#888]">Seat: {selectedFlight.seat_selection}</p>
            </div>
            {/* Policy */}
            <div style={{ padding: '8px 0', marginBottom: 8, borderTop: '1px solid #222', borderBottom: '1px solid #222', marginTop: 8 }}>
              <p className="font-['Lato',sans-serif] text-[11px] text-[#666]">{selectedFlight.change_policy}</p>
              <p className="font-['Lato',sans-serif] text-[11px] text-[#666]" style={{ marginTop: 2 }}>{selectedFlight.cancel_policy}</p>
            </div>
            {/* Price — Green for savings */}
            <div className="flex items-baseline" style={{ marginBottom: 16 }}>
              <span className="font-['Lato',sans-serif] text-[13px] text-[#888] line-through" style={{ marginRight: 8 }}>${selectedFlight.original_price}</span>
              <PriceCount value={selectedFlight.price} className="font-['Lato',sans-serif] font-bold text-[22px]" style={{ color: '#4FC660' }} />
              <span className="font-['Lato',sans-serif] text-[12px]" style={{ color: '#4FC660', marginLeft: 8 }}>Save ${selectedFlight.saved}</span>
            </div>
            {/* Blue CTA — user action */}
            <BlueCTA label="Select this flight" onClick={() => { setSheetOpen(false); go('chat-hotel-thinking') }} />
          </>
        )}
      </BottomSheet>
      <HomeIndicator />
    </>
  )
}

// ═══════════════════════════════════════════════════════════════════
// ─── Screen 5: Hotel Search Animation ───────────────────────────────
// ═══════════════════════════════════════════════════════════════════
function ScreenChatHotelThinking({ go, goBack, variants }) {
  useEffect(() => { const t = setTimeout(() => go('chat-hotels'), 2500); return () => clearTimeout(t) }, [go])
  const StepProgress = stepProgresses[variants?.stepProgress] || stepProgresses.A
  const ConfirmedFlight = confirmedFlightCards[variants?.confirmedFlightCard] || confirmedFlightCards.A
  return (
    <>
      <style>{ANIMATIONS_CSS}</style>
      <StatusBar />
      <BackHeader label="My Plans" onBack={goBack} />
      <div className="absolute left-0 right-0 top-[92px] z-10">
        <StepProgress steps={STEPS} current={1} completed={[0]} />
      </div>
      <div className="absolute left-[16px] right-[16px] top-[136px]">
        <ConfirmedFlight flight={{ airline: 'United Airlines', from: 'SEA', to: 'SFO', departTime: '7:12am', arriveTime: '9:30am', date: 'Apr 15', duration: '2h 18m', price: 218 }} />
      </div>
      <div className="absolute left-[16px] right-[16px] top-[220px] bottom-[100px]">
        <SearchViz label="Hotels near Union Square" sublabel="Apr 15-18 · 3 nights" count={184} type="hotels" />
      </div>
      <GlassPanel typing message="Finding hotels near Union Square..." />
      <HomeIndicator />
    </>
  )
}

// ═══════════════════════════════════════════════════════════════════
// ─── Screen 6: Hotel Selection ──────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════
function ScreenChatHotels({ go, goBack, variants }) {
  const [visible, setVisible] = useState(false)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [selectedHotel, setSelectedHotel] = useState(null)
  useEffect(() => { const t = setTimeout(() => setVisible(true), 100); return () => clearTimeout(t) }, [])
  const HotelCard = hotelDealCards[variants?.hotelDealCard] || hotelDealCards.A
  const StepProgress = stepProgresses[variants?.stepProgress] || stepProgresses.A
  const ConfirmedFlight = confirmedFlightCards[variants?.confirmedFlightCard] || confirmedFlightCards.A
  return (
    <>
      <style>{ANIMATIONS_CSS}</style>
      <StatusBar />
      <BackHeader label="My Plans" onBack={goBack} />
      <div className="absolute left-0 right-0 top-[92px] z-10">
        <StepProgress steps={STEPS} current={1} completed={[0]} />
      </div>
      <div className="absolute left-[16px] top-[136px] right-[16px] bottom-[100px] overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
        {/* Collapsed flight confirmation */}
        <div style={{ marginBottom: 8 }}>
          <ConfirmedFlight flight={{ airline: 'United Airlines', from: 'SEA', to: 'SFO', departTime: '7:12am', arriveTime: '9:30am', date: 'Apr 15', duration: '2h 18m', price: 218 }} />
        </div>
        {/* Hotel cards with stagger */}
        <div className={`flex flex-col ${visible ? '' : 'opacity-0'}`}>
          {HOTEL_DEALS.map((deal, i) => (
            <div
              key={i}
              style={{ marginBottom: 8, ...(visible ? { animation: `staggerFadeUp 0.4s ease-out ${i * 0.1}s both` } : {}) }}
            >
              <HotelCard deal={deal} mode="list" onClick={() => { setSelectedHotel(deal); setSheetOpen(true) }} />
            </div>
          ))}
        </div>
      </div>
      <GlassPanel
        message="Great options near your meeting area."
        actions={[
          { label: 'Show on map', variant: 'secondary', onClick: () => go('hotel-map') },
          { label: 'Select & continue →', variant: 'primary', onClick: () => go('itinerary') },
        ]}
      />
      <BottomSheet open={sheetOpen} onClose={() => setSheetOpen(false)}>
        {selectedHotel && (
          <>
            <p className="font-['Lato',sans-serif] font-bold text-[16px] text-white" style={{ marginBottom: 2 }}>{selectedHotel.name}</p>
            <div className="flex items-center" style={{ gap: 6, marginBottom: 6 }}>
              <div className="flex">{Array.from({ length: selectedHotel.stars }, (_, i) => <span key={i} className="text-[#F5C518] text-[12px] leading-none">&#9733;</span>)}</div>
              <p className="font-['Lato',sans-serif] text-[12px] text-[#888]">{selectedHotel.location}</p>
            </div>
            <p className="font-['Lato',sans-serif] text-[12px] text-[#888]" style={{ marginBottom: 4 }}>{selectedHotel.room_type} · {selectedHotel.bed_type}</p>
            <p className="font-['Lato',sans-serif] text-[12px] text-[#888]" style={{ marginBottom: 4 }}>{selectedHotel.check_in} → {selectedHotel.check_out} · {selectedHotel.nights} nights</p>
            <div className="flex flex-wrap" style={{ marginBottom: 8 }}>
              {selectedHotel.amenities.slice(0, 4).map((a) => (
                <span key={a} className="font-['Lato',sans-serif] rounded-full text-[10px] text-[#989898]" style={{ padding: '3px 8px', background: '#2A2A2A', marginRight: 6, marginBottom: 4 }}>{a}</span>
              ))}
            </div>
            {/* Cancellation */}
            <p className="font-['Lato',sans-serif] text-[11px]" style={{ color: selectedHotel.cancellation_policy.includes('Free') ? '#4FC660' : '#FB7A29', marginBottom: 8 }}>
              {selectedHotel.cancellation_policy}
            </p>
            {/* Price — Green */}
            <div className="flex items-baseline" style={{ marginBottom: 4 }}>
              <PriceCount value={selectedHotel.price_per_night} className="font-['Lato',sans-serif] font-bold text-[22px]" style={{ color: '#4FC660' }} />
              <span className="font-['Lato',sans-serif] text-[12px] text-[#888]" style={{ marginLeft: 2 }}>/night</span>
              <span className="font-['Lato',sans-serif] text-[13px] text-[#888] line-through" style={{ marginLeft: 8 }}>${selectedHotel.original_price}</span>
            </div>
            <p className="font-['Lato',sans-serif] text-[11px]" style={{ color: '#4FC660', marginBottom: 12 }}>Save ${selectedHotel.saved * selectedHotel.nights} total</p>
            <BlueCTA label="Select this hotel" onClick={() => { setSheetOpen(false); go('itinerary') }} />
          </>
        )}
      </BottomSheet>
      <HomeIndicator />
    </>
  )
}

// ═══════════════════════════════════════════════════════════════════
// ─── Screen 7: Hotel Map (price bubbles) ────────────────────────────
// ═══════════════════════════════════════════════════════════════════
function ScreenHotelMap({ go, goBack }) {
  const [pin, setPin] = useState(1)
  const [sheetOpen, setSheetOpen] = useState(false)
  const sel = PINS[pin]
  return (
    <>
      <style>{ANIMATIONS_CSS}</style>
      <StatusBar />
      <div className="absolute left-[16px] top-[68px] right-[16px] flex items-center justify-between z-10">
        <button onClick={goBack} className="flex items-center">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#989898" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 6 }}><path d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
          <p className="text-[15px] font-medium text-white">Hotels near SF</p>
        </button>
        <button onClick={goBack} className="font-['Lato',sans-serif] text-[12px] text-[#989898] font-medium">List</button>
      </div>
      {/* Map grid */}
      <div className="absolute inset-0 rounded-[30px] overflow-hidden" style={{ backgroundColor: '#1a1a1a', backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
        <div className="absolute inset-0"><svg width="100%" height="100%" className="opacity-[0.06]"><line x1="0" y1="45%" x2="100%" y2="42%" stroke="#fff" strokeWidth="2" /><line x1="30%" y1="0" x2="35%" y2="100%" stroke="#fff" strokeWidth="2" /><line x1="60%" y1="0" x2="55%" y2="100%" stroke="#fff" strokeWidth="1.5" /></svg></div>
        {/* Price bubbles on pins */}
        {PINS.map((p, i) => (
          <button key={p.id} onClick={() => { setPin(p.id); setSheetOpen(true) }} className="absolute flex flex-col items-center" style={{ top: p.top, left: p.left, transform: 'translate(-50%, -50%)', animation: `bubblePop 0.4s ease-out ${i * 0.12}s both` }}>
            <div className={`rounded-full flex items-center justify-center shadow-lg transition ${pin === p.id ? 'ring-2 ring-white/40 scale-110' : ''}`} style={{ width: 36, height: 36, backgroundColor: p.best ? '#4FC660' : '#fff' }}>
              {/* Price in bubble — Green = savings */}
              <p className="font-['Lato',sans-serif] font-bold text-[10px] leading-none" style={{ color: p.best ? '#fff' : '#181818' }}>${p.price}</p>
            </div>
            <div style={{ width: 0, height: 0, borderLeft: '5px solid transparent', borderRight: '5px solid transparent', borderTop: `6px solid ${p.best ? '#4FC660' : '#fff'}` }} />
            {/* Pulse ring for best deal */}
            {p.best && (
              <div className="absolute rounded-full animate-ping" style={{ width: 36, height: 36, top: 0, backgroundColor: 'rgba(79,198,96,0.2)' }} />
            )}
          </button>
        ))}
      </div>
      <GlassPanel
        message="Tap a pin to compare. Green = best value."
        actions={[{ label: 'Back to list', variant: 'secondary', onClick: goBack }]}
      />
      <BottomSheet open={sheetOpen} onClose={() => setSheetOpen(false)}>
        <p className="font-['Lato',sans-serif] font-bold text-[16px] text-white" style={{ marginBottom: 2 }}>{sel.name}</p>
        <p className="font-['Lato',sans-serif] text-[12px] text-[#888]" style={{ marginBottom: 6 }}>{sel.area}</p>
        <div className="flex items-baseline" style={{ marginBottom: 4 }}>
          <PriceCount value={sel.price} className="font-['Lato',sans-serif] font-bold text-[22px] text-white" />
          <span className="font-['Lato',sans-serif] text-[12px] text-[#888]" style={{ marginLeft: 2 }}>/night</span>
        </div>
        <div className="inline-block rounded-full" style={{ padding: '3px 8px', background: 'rgba(79,198,96,0.1)', marginBottom: 12 }}>
          <span className="font-['Lato',sans-serif] text-[11px] font-medium" style={{ color: '#4FC660' }}>Save ${sel.save}</span>
        </div>
        <BlueCTA label="Select this hotel" onClick={() => { setSheetOpen(false); go('itinerary') }} />
      </BottomSheet>
      <HomeIndicator />
    </>
  )
}

// ═══════════════════════════════════════════════════════════════════
// ─── Screen 8: Hotel Detail (BottomSheet style) ─────────────────────
// ═══════════════════════════════════════════════════════════════════
function ScreenHotelDetail({ go, goBack, variants }) {
  const PriceBreakdown = priceBreakdownCards[variants?.priceBreakdownCard] || priceBreakdownCards.A
  return (
    <>
      <StatusBar />
      {/* Map peek at top */}
      <div className="absolute top-0 left-0 right-0 h-[130px] rounded-t-[30px] overflow-hidden" style={{ backgroundColor: '#1a1a1a', backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      {/* Sheet */}
      <div className="absolute left-0 right-0 top-[110px] bottom-0 rounded-t-[20px] z-10 overflow-y-auto" style={{ scrollbarWidth: 'none', background: 'rgba(22,22,22,0.98)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}>
        <div className="flex justify-center" style={{ paddingTop: 8, paddingBottom: 4 }}>
          <div className="w-[40px] h-[4px] rounded-full bg-[#474747]" />
        </div>
        <div style={{ padding: '0 16px 32px' }}>
          <button onClick={goBack} className="flex items-center" style={{ marginBottom: 8 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#989898" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 4 }}><path d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
            <span className="font-['Lato',sans-serif] text-[12px] text-[#989898]">Back</span>
          </button>
          {/* Image placeholder */}
          <div className="relative rounded-[12px] flex items-center justify-center overflow-hidden" style={{ height: 140, marginBottom: 12, background: 'radial-gradient(ellipse at 70% 30%, rgba(255,200,150,0.08), transparent 60%), linear-gradient(135deg, #2A3040, #1E2832, #2A2A2A)' }}>
            <svg className="absolute inset-0 w-full h-full opacity-[0.05]" viewBox="0 0 200 120" fill="none" stroke="white" strokeWidth="1.5" preserveAspectRatio="xMidYMid slice"><rect x="120" y="15" width="50" height="35" rx="2" /><line x1="145" y1="15" x2="145" y2="50" /><line x1="120" y1="32" x2="170" y2="32" /><rect x="30" y="55" width="65" height="35" rx="5" /><rect x="30" y="48" width="65" height="14" rx="4" /><rect x="36" y="60" width="24" height="16" rx="3" /><rect x="65" y="60" width="24" height="16" rx="3" /></svg>
          </div>
          <p className="font-['Lato',sans-serif] font-bold text-[18px] text-white leading-[1.2]">Hotel Nikko SF</p>
          <div className="flex items-center" style={{ gap: 6, marginTop: 3 }}>
            <div className="flex">{[0,1,2,3].map((i) => <span key={i} className="text-[#F5C518] text-[12px] leading-none">&#9733;</span>)}</div>
            <p className="font-['Lato',sans-serif] text-[12px] text-[#989898]">Union Square, San Francisco</p>
          </div>
          <div className="flex flex-wrap" style={{ marginTop: 10, marginBottom: 12 }}>
            {AMENITIES.map((a) => (<span key={a} className="font-['Lato',sans-serif] rounded-full text-[10px] text-[#989898]" style={{ padding: '3px 8px', background: '#2A2A2A', marginRight: 6, marginBottom: 4 }}>{a}</span>))}
          </div>
          <div className="rounded-[10px]" style={{ background: '#242424', padding: '10px 12px', marginBottom: 8 }}>
            <p className="font-['Lato',sans-serif] font-bold text-[13px] text-white leading-[1.3]">Standard King</p>
            <p className="font-['Lato',sans-serif] text-[11px] text-[#989898]" style={{ marginTop: 2 }}>1 King Bed · City View · Apr 15–18 (3 nights)</p>
          </div>
          <div style={{ marginBottom: 12 }}>
            <PriceBreakdown
              lineItems={[
                { label: '3 nights × $189', amount: '$567' },
                { label: 'Taxes & fees', amount: '$68', color: 'orange' },
              ]}
              total={{ label: 'Total', amount: '$635' }}
              savings={{ label: 'You save', amount: '$168' }}
            />
          </div>
          <BlueCTA label="Select this hotel" onClick={() => go('itinerary')} />
        </div>
      </div>
      <HomeIndicator />
    </>
  )
}

// ═══════════════════════════════════════════════════════════════════
// ─── Screen 9: Trip Review (Timeline) ───────────────────────────────
// ═══════════════════════════════════════════════════════════════════
function ScreenItinerary({ go, goBack, variants }) {
  const [fn, setFn] = useState('Alex')
  const [ln, setLn] = useState('Morgan')
  const [em, setEm] = useState('alex@email.com')
  // Blue border = user manual input
  const inputCls = "w-full rounded-[8px] text-[12px] text-white outline-none font-['Lato',sans-serif] transition"
  const ConfirmedBooking = confirmedBookingCards[variants?.confirmedBookingCard] || confirmedBookingCards.A
  const PriceBreakdown = priceBreakdownCards[variants?.priceBreakdownCard] || priceBreakdownCards.A
  const StepProgress = stepProgresses[variants?.stepProgress] || stepProgresses.A
  return (
    <>
      <StatusBar />
      <BackHeader label="My Plans" onBack={goBack} />
      <div className="absolute left-0 right-0 top-[92px] z-10">
        <StepProgress steps={STEPS} current={2} completed={[0, 1]} />
      </div>
      <div className="absolute left-[16px] top-[136px] right-[16px] bottom-[100px] overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
        {/* Timeline layout — green line */}
        <div className="relative" style={{ paddingLeft: 18 }}>
          <div className="absolute" style={{ left: 4, top: 6, bottom: 6, width: 2, backgroundColor: '#4FC660' }} />

          <div className="relative" style={{ marginBottom: 8 }}>
            <div className="absolute rounded-full flex items-center justify-center" style={{ left: -18, top: 10, width: 10, height: 10, backgroundColor: '#4FC660' }}>
              <svg width="6" height="6" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5L8 3" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
            <ConfirmedBooking type="flight" title="United UA 224 · SEA → SFO" details="Apr 15 · 7:12am – 9:30am · Nonstop" />
          </div>

          <div className="relative" style={{ marginBottom: 8 }}>
            <div className="absolute rounded-full flex items-center justify-center" style={{ left: -18, top: 10, width: 10, height: 10, backgroundColor: '#4FC660' }}>
              <svg width="6" height="6" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5L8 3" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
            <ConfirmedBooking type="hotel" title="Hotel Nikko SF" details="Apr 15–18 · 3 nights · Standard King" />
          </div>

          <div className="relative" style={{ marginBottom: 12 }}>
            <div className="absolute rounded-full" style={{ left: -18, top: 10, width: 10, height: 10, backgroundColor: '#474747' }} />
            <PriceBreakdown
              lineItems={[
                { label: 'Flight', amount: '$218' },
                { label: 'Hotel (3 nights)', amount: '$567' },
                { label: 'Taxes & fees', amount: '$94', color: 'orange' },
              ]}
              total={{ label: 'Total', amount: '$879' }}
              savings={{ label: 'You save', amount: '$224' }}
            />
          </div>
        </div>

        <p className="font-['Lato',sans-serif] font-medium text-[14px] text-white leading-normal" style={{ marginBottom: 8 }}>Traveler Details</p>
        <div className="flex" style={{ gap: 8, marginBottom: 8 }}>
          <div className="flex-1">
            <p className="font-['Lato',sans-serif] text-[10px] text-[#989898] font-medium" style={{ marginBottom: 3 }}>First Name</p>
            <input value={fn} onChange={e => setFn(e.target.value)} className={inputCls} style={{ background: '#2A2A2A', border: '1px solid rgba(0,144,255,0.2)', padding: '8px 10px' }} />
          </div>
          <div className="flex-1">
            <p className="font-['Lato',sans-serif] text-[10px] text-[#989898] font-medium" style={{ marginBottom: 3 }}>Last Name</p>
            <input value={ln} onChange={e => setLn(e.target.value)} className={inputCls} style={{ background: '#2A2A2A', border: '1px solid rgba(0,144,255,0.2)', padding: '8px 10px' }} />
          </div>
        </div>
        <div style={{ marginBottom: 8 }}>
          <p className="font-['Lato',sans-serif] text-[10px] text-[#989898] font-medium" style={{ marginBottom: 3 }}>Email</p>
          <input value={em} onChange={e => setEm(e.target.value)} type="email" className={inputCls} style={{ background: '#2A2A2A', border: '1px solid rgba(0,144,255,0.2)', padding: '8px 10px' }} />
        </div>
      </div>
      <GlassPanel
        message="Everything looks good. Ready to continue?"
        actions={[{ label: 'Continue to checkout →', variant: 'primary', onClick: () => go('paywall') }]}
      />
      <HomeIndicator />
    </>
  )
}

// ═══════════════════════════════════════════════════════════════════
// ─── Screen 10: Paywall ─────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════
function ScreenPaywall({ go, goBack, variants }) {
  const [visible, setVisible] = useState(false)
  useEffect(() => { const t = setTimeout(() => setVisible(true), 50); return () => clearTimeout(t) }, [])
  const Paywall = paywallCards[variants?.paywallCard] || paywallCards.A
  return (
    <>
      <style>{ANIMATIONS_CSS}</style>
      <StatusBar />
      <div className={`absolute left-0 right-0 top-[59px] bottom-0 flex flex-col items-center justify-center transition-transform duration-200 ${visible ? 'translate-y-0' : 'translate-y-[20px]'}`}
        style={visible ? { animation: 'fadeInUp 0.2s ease-out' } : undefined}
      >
        {/* Paywall CTA is Pink = AI/subscription action */}
        <Paywall
          benefits={['Average $284 savings per booking', 'Price monitoring on all trips', 'Automatic rebooking when prices drop', 'Free cancellation within 24 hours']}
          price="$9.99"
          period="month"
          ctaLabel="Become a member"
          onCta={() => go('payment')}
          onSkip={goBack}
        />
      </div>
    </>
  )
}

// ═══════════════════════════════════════════════════════════════════
// ─── Screen 11: Payment (Checkout) ──────────────────────────────────
// ═══════════════════════════════════════════════════════════════════
function ScreenPayment({ go, goBack, variants }) {
  const OrderSummary = orderSummaryCards[variants?.orderSummaryCard] || orderSummaryCards.A
  const SavedPayment = savedPaymentCards[variants?.savedPaymentCard] || savedPaymentCards.A
  const PriceBreakdown = priceBreakdownCards[variants?.priceBreakdownCard] || priceBreakdownCards.A
  const StepProgress = stepProgresses[variants?.stepProgress] || stepProgresses.A
  return (
    <>
      <StatusBar />
      <BackHeader label="My Plans" onBack={goBack} />
      <div className="absolute left-0 right-0 top-[92px] z-10">
        <StepProgress steps={STEPS} current={3} completed={[0, 1, 2]} />
      </div>
      <div className="absolute left-[16px] top-[136px] right-[16px] bottom-[100px] overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
        <div style={{ marginBottom: 14 }}>
          <OrderSummary title="SF Business Trip" subtitle="Apr 15–18 · 1 traveler" items={[{ icon: '', text: 'United SEA→SFO · Apr 15' }, { icon: '', text: 'Hotel Nikko SF · 3 nights' }]} />
        </div>
        <p className="font-['Lato',sans-serif] font-medium text-[14px] text-white leading-normal" style={{ marginBottom: 8 }}>Payment Method</p>
        {/* Blue border = user selection */}
        <div style={{ marginBottom: 6 }} className="[&_*]:!border-[rgba(0,144,255,0.4)]">
          <SavedPayment last4="4242" brand="Visa" selected={true} />
        </div>
        <p className="font-['Lato',sans-serif] text-[10px] text-[#888] leading-normal" style={{ marginBottom: 14 }}>Or pay with new card</p>
        <PriceBreakdown
          lineItems={[
            { label: 'Subtotal', amount: '$785' },
            { label: 'Taxes & fees', amount: '$94', color: 'orange' },
            { label: 'Member discount', amount: '−$47', color: 'green' },
          ]}
          total={{ label: 'Total', amount: '$832' }}
        />
      </div>
      {/* Blue CTA = user action (paying) */}
      <GlassPanel
        message="Ready to book! Total: $832"
        actions={[{ label: 'Pay $832 →', variant: 'primary', onClick: () => go('confirmation') }]}
      />
      <HomeIndicator />
    </>
  )
}

// ═══════════════════════════════════════════════════════════════════
// ─── Screen 12: Confirmation (Celebration!) ─────────────────────────
// ═══════════════════════════════════════════════════════════════════
function ScreenConfirmation({ go }) {
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

  return (
    <>
      <style>{ANIMATIONS_CSS}</style>
      <StatusBar />

      {/* Confetti burst */}
      {showConfetti && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
          {confetti.map((c) => (
            <div
              key={c.id}
              className="absolute"
              style={{
                width: c.size, height: c.size, borderRadius: 2,
                backgroundColor: c.color,
                '--cx': c.cx, '--cy': c.cy, '--cr': c.cr,
                animation: `confettiBurst 1s ease-out ${c.delay}s both`,
              }}
            />
          ))}
        </div>
      )}

      <div className="absolute left-0 right-0 top-[59px] bottom-[100px] flex flex-col items-center justify-center" style={{ padding: '0 24px' }}>
        {/* Green check — scale-in burst */}
        <div
          className="rounded-full flex items-center justify-center"
          style={{ width: 64, height: 64, background: 'rgba(79,198,96,0.2)', marginBottom: 12, animation: 'checkBurst 0.5s ease-out' }}
        >
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none"><path d="M8 16l6 6 10-12" stroke="#4fc660" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </div>
        <p className="font-['Lato',sans-serif] font-bold text-[19px] text-white leading-normal" style={{ marginTop: 12, marginBottom: 6, animation: 'fadeInUp 0.3s ease-out 0.2s both' }}>Trip booked!</p>
        <p className="font-['Lato',sans-serif] text-[13px] text-[#888] leading-normal" style={{ marginBottom: 2 }}>SF Business Trip</p>
        <p className="font-['Lato',sans-serif] text-[12px] text-[#888] leading-normal" style={{ marginBottom: 16 }}>Apr 15–18</p>

        {/* Timeline summary — green borders = confirmed */}
        <div className="w-full" style={{ maxWidth: 280, marginBottom: 16 }}>
          <div style={{ borderLeft: '2px solid #4FC660', paddingLeft: 10, marginBottom: 8 }}>
            <p className="font-['Lato',sans-serif] text-[11px] text-[#888] leading-normal">United SEA → SFO · Apr 15 · 7:12am</p>
          </div>
          <div style={{ borderLeft: '2px solid #4FC660', paddingLeft: 10 }}>
            <p className="font-['Lato',sans-serif] text-[11px] text-[#888] leading-normal">Hotel Nikko SF · 3 nights</p>
          </div>
        </div>

        {/* Green total — price */}
        <p className="font-['Lato',sans-serif] font-bold text-[16px]" style={{ color: '#4FC660', marginBottom: 4, animation: 'priceCountIn 0.4s ease-out 0.3s both' }}>$832 total</p>
        <p className="font-['Lato',sans-serif] text-[11px]" style={{ color: '#4FC660', marginBottom: 16 }}>You saved $224</p>

        <p className="font-mono text-[10px] text-[#888] tracking-[0.5px]" style={{ marginTop: 8 }}>Confirmation #AX-48291</p>
      </div>

      {/* Axel panel — Pink = AI monitoring */}
      <GlassPanel
        message="I'll keep monitoring prices for you."
        actions={[{ label: 'View my plans →', variant: 'primary', onClick: () => go('trips-list-done') }]}
      />
      <HomeIndicator />
    </>
  )
}

// ═══════════════════════════════════════════════════════════════════
// ─── Component Sidebar ──────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════
const SIDEBAR_DEFS = [
  { key: 'tripCard', label: 'Trip Card', screens: ['trips-list', 'trips-list-done'], versions: TRIP_CARD_VERSIONS },
  { key: 'flightDealCard', label: 'Flight Deal Card', screens: ['chat-flights'], versions: FLIGHT_VERSIONS },
  { key: 'hotelDealCard', label: 'Hotel Deal Card', screens: ['chat-hotels'], versions: HOTEL_VERSIONS },
  { key: 'thinkingBubble', label: 'Thinking Bubble', screens: ['chat-thinking', 'chat-hotel-thinking'], versions: THINKING_VERSIONS },
  { key: 'confirmedFlightCard', label: 'Confirmed Flight', screens: ['chat-hotel-thinking', 'chat-hotels'], versions: CONFIRMED_FLIGHT_VERSIONS },
  { key: 'confirmedBookingCard', label: 'Confirmed Booking', screens: ['itinerary'], versions: CONFIRMED_BOOKING_VERSIONS },
  { key: 'priceBreakdownCard', label: 'Price Breakdown', screens: ['hotel-detail', 'itinerary', 'payment'], versions: PRICE_BREAKDOWN_VERSIONS },
  { key: 'orderSummaryCard', label: 'Order Summary', screens: ['payment'], versions: ORDER_SUMMARY_VERSIONS },
  { key: 'savedPaymentCard', label: 'Saved Payment', screens: ['payment'], versions: SAVED_PAYMENT_VERSIONS },
  { key: 'hotelMapPeekCard', label: 'Hotel Map Peek', screens: ['hotel-map'], versions: HOTEL_MAP_PEEK_VERSIONS },
  { key: 'paywallCard', label: 'Paywall', screens: ['paywall'], versions: PAYWALL_VERSIONS },
  { key: 'axelPanel', label: 'Axel Panel', screens: ['chat-thinking', 'chat-flights', 'chat-hotel-thinking', 'chat-hotels', 'hotel-map', 'itinerary', 'payment', 'confirmation'], versions: AXEL_PANEL_VERSIONS },
  { key: 'stepProgress', label: 'Step Progress', screens: ['chat-thinking', 'chat-flights', 'chat-hotel-thinking', 'chat-hotels', 'itinerary', 'payment'], versions: STEP_PROGRESS_VERSIONS },
]

function ComponentSidebar({ variants, setVariants, currentScreen, combinations, onSave, onLoad, onDelete, showSaveInput, setShowSaveInput, saveInputName, setSaveInputName }) {
  const DEFAULT_VARIANTS = {
    flightDealCard: 'A', hotelDealCard: 'A', thinkingBubble: 'A',
    tripCard: 'A', confirmedFlightCard: 'A', priceBreakdownCard: 'A',
    confirmedBookingCard: 'A', orderSummaryCard: 'A', paywallCard: 'A',
    hotelMapPeekCard: 'A', savedPaymentCard: 'A', axelPanel: 'A', stepProgress: 'A',
  }
  return (
    <div className="w-[200px] bg-[#1a1a1a] rounded-[12px] self-start overflow-y-auto max-h-[852px]" style={{ padding: 14 }}>
      <p className="text-[11px] font-medium text-[rgba(152,152,152,0.5)] uppercase tracking-[0.08em]" style={{ marginBottom: 12 }}>Components</p>
      {SIDEBAR_DEFS.map((comp) => {
        const isActive = comp.screens.includes(currentScreen)
        const currentVer = comp.versions.find((v) => v.label === variants[comp.key])
        return (
          <div key={comp.key} className={`transition ${isActive ? 'opacity-100' : 'opacity-40'}`} style={{ marginBottom: 16 }}>
            <div className="flex items-center" style={{ gap: 6, marginBottom: 6 }}>
              {isActive && <div className="rounded-full shrink-0" style={{ width: 5, height: 5, backgroundColor: '#EF508D' }} />}
              <p className={`text-[12px] font-medium ${isActive ? 'text-white' : 'text-[#888]'}`}>{comp.label}</p>
              <span className="text-[10px] text-[rgba(152,152,152,0.4)]">{comp.versions.length}</span>
            </div>
            <div className="flex flex-wrap" style={{ gap: 4, marginLeft: 11 }}>
              {comp.versions.map((ver) => {
                const isSelected = variants[comp.key] === ver.label
                return (
                  <button
                    key={ver.label}
                    onClick={() => setVariants((prev) => ({ ...prev, [comp.key]: ver.label }))}
                    title={ver.notes}
                    className={`rounded-full text-[10px] font-medium transition ${
                      isSelected
                        ? 'bg-main/15 text-main'
                        : 'bg-[#242424] text-[rgba(152,152,152,0.6)] hover:text-[#888]'
                    }`}
                    style={{ padding: '3px 8px' }}
                  >
                    {ver.label}
                  </button>
                )
              })}
            </div>
            {currentVer?.notes && (
              <p className="text-[10px] text-[rgba(152,152,152,0.5)] leading-[1.3]" style={{ marginLeft: 11, marginTop: 4 }}>{currentVer.notes}</p>
            )}
          </div>
        )
      })}

      <div style={{ borderTop: '1px solid #333', marginTop: 16, paddingTop: 12 }}>
        <p className="text-[11px] font-medium text-[rgba(152,152,152,0.5)] uppercase tracking-[0.08em]" style={{ marginBottom: 8 }}>Presets</p>
        <button
          onClick={() => setVariants(DEFAULT_VARIANTS)}
          className="w-full text-left rounded-[6px] text-[11px] text-[rgba(152,152,152,0.6)] hover:bg-[#242424] hover:text-[#888] transition"
          style={{ padding: '4px 8px', marginBottom: 4 }}
        >
          Reset to defaults
        </button>
        {showSaveInput ? (
          <div className="flex" style={{ gap: 4, marginBottom: 6 }}>
            <input
              value={saveInputName}
              onChange={e => setSaveInputName(e.target.value)}
              placeholder="Name..."
              className="flex-1 min-w-0 rounded-[6px] text-[10px] text-white outline-none"
              style={{ background: '#242424', border: '1px solid #474747', padding: '3px 6px' }}
              onKeyDown={e => { if (e.key === 'Enter' && saveInputName.trim()) onSave(saveInputName.trim()); if (e.key === 'Escape') { setShowSaveInput(false); setSaveInputName('') } }}
              autoFocus
            />
            <button onClick={() => saveInputName.trim() && onSave(saveInputName.trim())} className="shrink-0 rounded-[6px] bg-main/15 text-main text-[10px] font-medium" style={{ padding: '3px 6px' }}>Save</button>
          </div>
        ) : (
          <button
            onClick={() => setShowSaveInput(true)}
            className="w-full text-left rounded-[6px] text-[11px] text-main hover:bg-main/10 transition"
            style={{ padding: '4px 8px', marginBottom: 4 }}
          >
            + Save current
          </button>
        )}
        {combinations.map(combo => (
          <div key={combo.id} className="flex items-center group" style={{ gap: 4, marginBottom: 2 }}>
            <button
              onClick={() => onLoad(combo)}
              className="flex-1 min-w-0 text-left rounded-[6px] text-[11px] text-[rgba(152,152,152,0.6)] hover:bg-[#242424] hover:text-[#888] transition truncate"
              style={{ padding: '3px 8px' }}
              title={Object.entries(combo.variants).filter(([,v]) => v !== 'A').map(([k,v]) => `${k}=${v}`).join(', ') || 'All defaults'}
            >
              {combo.name}
            </button>
            <button
              onClick={() => onDelete(combo.id)}
              className="opacity-0 group-hover:opacity-100 shrink-0 text-[rgba(152,152,152,0.3)] hover:text-red-400 text-[10px] transition"
              style={{ padding: '0 4px' }}
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Screen labels ──────────────────────────────────────────────────
const SCREEN_LABELS = {
  'trips-list': 'My Plans', 'trips-list-done': 'My Plans', 'new-trip': 'New Plan',
  'chat-thinking': 'Flight Search', 'chat-flights': 'Flight Results',
  'chat-hotel-thinking': 'Hotel Search', 'chat-hotels': 'Hotel Results',
  'hotel-map': 'Hotel Map', 'hotel-detail': 'Hotel Detail',
  'itinerary': 'Trip Review', 'paywall': 'Membership',
  'payment': 'Checkout', 'confirmation': 'Trip Booked!',
}

// ─── Main Container ─────────────────────────────────────────────────
const SCREEN_ORDER = ['trips-list', 'new-trip', 'chat-thinking', 'chat-flights', 'chat-hotel-thinking', 'chat-hotels', 'hotel-map', 'hotel-detail', 'itinerary', 'paywall', 'payment', 'confirmation', 'trips-list-done']

export default function TripFlowInteractive() {
  const router = useRouter()
  const [screen, setScreen] = useState('trips-list')
  const [history, setHistory] = useState(['trips-list'])
  const [dir, setDir] = useState('forward')
  const [animating, setAnimating] = useState(false)
  const [displayScreen, setDisplayScreen] = useState('trips-list')
  const prevScreen = useRef('trips-list')
  const [variants, setVariants] = useState({
    flightDealCard: 'A', hotelDealCard: 'A', thinkingBubble: 'A',
    tripCard: 'A', confirmedFlightCard: 'A', priceBreakdownCard: 'A',
    confirmedBookingCard: 'A', orderSummaryCard: 'A', paywallCard: 'A',
    hotelMapPeekCard: 'A', savedPaymentCard: 'A', axelPanel: 'A', stepProgress: 'A',
  })
  const [isStandalone, setIsStandalone] = useState(false)
  const [viewMode, setViewMode] = useState('demo')
  const [combinations, setCombinations] = useState([])
  const [showSaveInput, setShowSaveInput] = useState(false)
  const [saveInputName, setSaveInputName] = useState('')

  useEffect(() => {
    setIsStandalone(window.self === window.top)
  }, [])

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const s = params.get('s')
    const v = params.get('v')
    if (s && SCREEN_ORDER.includes(s)) {
      setScreen(s); setDisplayScreen(s); prevScreen.current = s; setHistory([s])
    }
    if (v) {
      try { const parsed = JSON.parse(v); setVariants(prev => ({ ...prev, ...parsed })) } catch {}
    }
  }, [])

  const loadedRef = useRef(false)
  useEffect(() => {
    if (!isStandalone) return
    fetch('/api/combinations').then(r => r.json()).then((combos) => {
      const current = combos.find(c => c.id === '__current__')
      if (current) {
        setVariants(prev => ({ ...prev, ...current.variants }))
      }
      setCombinations(combos.filter(c => c.id !== '__current__'))
      // Mark loaded so auto-save can start
      setTimeout(() => { loadedRef.current = true }, 600)
    }).catch(() => { loadedRef.current = true })
  }, [isStandalone])

  // Auto-save current variants to server (debounced, only after initial load)
  useEffect(() => {
    if (!isStandalone || !loadedRef.current) return
    const timer = setTimeout(() => {
      fetch('/api/combinations', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ variants }),
      }).catch(() => {})
    }, 500)
    return () => clearTimeout(timer)
  }, [variants, isStandalone])

  useEffect(() => {
    if (!isStandalone) return
    const browseScreens = SCREEN_ORDER.filter(s => s !== 'trips-list-done')
    function handleKey(e) {
      if (e.key === 'Escape') router.push('/flow/trip-flow')
      if (viewMode === 'browse') {
        const idx = browseScreens.indexOf(displayScreen)
        if (e.key === 'ArrowLeft' && idx > 0) {
          const target = browseScreens[idx - 1]
          setScreen(target); setDisplayScreen(target); prevScreen.current = target; setHistory([target]); setAnimating(false)
        }
        if (e.key === 'ArrowRight' && idx < browseScreens.length - 1) {
          const target = browseScreens[idx + 1]
          setScreen(target); setDisplayScreen(target); prevScreen.current = target; setHistory([target]); setAnimating(false)
        }
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [router, isStandalone, viewMode, displayScreen])

  const go = useCallback((target) => {
    if (viewMode === 'browse' || animating) return
    const fromIdx = SCREEN_ORDER.indexOf(prevScreen.current)
    const toIdx = SCREEN_ORDER.indexOf(target)
    setDir(toIdx >= fromIdx ? 'forward' : 'back')
    setAnimating(true)
    setScreen(target)
    setHistory((h) => [...h, target])
    setTimeout(() => { setDisplayScreen(target); prevScreen.current = target; setAnimating(false) }, 300)
  }, [animating, viewMode])

  const goBack = useCallback(() => {
    if (viewMode === 'browse' || animating || history.length <= 1) return
    const newHistory = history.slice(0, -1)
    const target = newHistory[newHistory.length - 1]
    setDir('back')
    setAnimating(true)
    setScreen(target)
    setHistory(newHistory)
    setTimeout(() => { setDisplayScreen(target); prevScreen.current = target; setAnimating(false) }, 300)
  }, [animating, history, viewMode])

  const jumpToScreen = useCallback((key) => {
    setScreen(key)
    setDisplayScreen(key)
    prevScreen.current = key
    setHistory([key])
    setAnimating(false)
  }, [])

  const saveCombination = useCallback(async (name) => {
    const res = await fetch('/api/combinations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, variants }),
    })
    const combo = await res.json()
    setCombinations(prev => [...prev, combo])
    setShowSaveInput(false)
    setSaveInputName('')
  }, [variants])

  const deleteCombination = useCallback(async (id) => {
    await fetch('/api/combinations', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    setCombinations(prev => prev.filter(c => c.id !== id))
  }, [])

  const loadCombination = useCallback((combo) => {
    setVariants(prev => ({ ...prev, ...combo.variants }))
  }, [])

  const currentVisible = animating ? screen : displayScreen

  function renderScreen(key) {
    switch (key) {
      case 'trips-list': return <ScreenTripsList go={go} completed={false} variants={variants} />
      case 'trips-list-done': return <ScreenTripsList go={go} completed={true} variants={variants} />
      case 'new-trip': return <ScreenNewTrip go={go} goBack={goBack} />
      case 'chat-thinking': return <ScreenChatThinking go={go} goBack={goBack} variants={variants} />
      case 'chat-flights': return <ScreenChatFlights go={go} goBack={goBack} variants={variants} />
      case 'chat-hotel-thinking': return <ScreenChatHotelThinking go={go} goBack={goBack} variants={variants} />
      case 'chat-hotels': return <ScreenChatHotels go={go} goBack={goBack} variants={variants} />
      case 'hotel-map': return <ScreenHotelMap go={go} goBack={goBack} />
      case 'hotel-detail': return <ScreenHotelDetail go={go} goBack={goBack} variants={variants} />
      case 'itinerary': return <ScreenItinerary go={go} goBack={goBack} variants={variants} />
      case 'paywall': return <ScreenPaywall go={go} goBack={goBack} variants={variants} />
      case 'payment': return <ScreenPayment go={go} goBack={goBack} variants={variants} />
      case 'confirmation': return <ScreenConfirmation go={go} />
      default: return null
    }
  }

  const slideOutForward = '-translate-x-full'
  const slideOutBack = 'translate-x-full'
  const enterFrom = dir === 'forward' ? 'translate-x-full' : '-translate-x-full'

  const phoneFrame = (
    <div className="bg-bg overflow-hidden relative rounded-[30px] w-[393px] h-[852px] shrink-0">
      {viewMode === 'demo' && animating && (
        <div className={`absolute inset-0 transition-transform duration-300 ease-in-out ${dir === 'forward' ? slideOutForward : slideOutBack}`}>
          {renderScreen(displayScreen)}
        </div>
      )}
      <div
        className={`absolute inset-0 ${viewMode === 'demo' ? `transition-transform duration-300 ease-in-out ${animating ? enterFrom : 'translate-x-0'}` : ''}`}
        style={viewMode === 'demo' && !animating ? { transition: 'none' } : {}}
      >
        {renderScreen(viewMode === 'demo' ? (animating ? screen : displayScreen) : displayScreen)}
      </div>
    </div>
  )

  if (!isStandalone) {
    return <div className="font-['Inter',sans-serif]">{phoneFrame}</div>
  }

  const browseScreens = SCREEN_ORDER.filter(s => s !== 'trips-list-done')
  const browseIdx = browseScreens.indexOf(displayScreen)

  return (
    <div className="flex flex-col items-center font-['Inter',sans-serif]">
      <div className="flex items-center justify-between" style={{ width: 605, marginBottom: 10 }}>
        <button onClick={() => router.push('/flow/trip-flow')} className="flex items-center text-[#888] hover:text-white transition" style={{ gap: 6 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
          <span className="text-[12px]">Flow</span>
        </button>
        <div className="flex items-center" style={{ gap: 8 }}>
          <div className="flex items-center bg-[#242424] rounded-full" style={{ padding: 2 }}>
            <button onClick={() => setViewMode('demo')} className={`rounded-full text-[10px] font-medium transition ${viewMode === 'demo' ? 'bg-main/15 text-main' : 'text-[rgba(152,152,152,0.6)] hover:text-[#888]'}`} style={{ padding: '3px 10px' }}>Demo</button>
            <button onClick={() => setViewMode('browse')} className={`rounded-full text-[10px] font-medium transition ${viewMode === 'browse' ? 'bg-main/15 text-main' : 'text-[rgba(152,152,152,0.6)] hover:text-[#888]'}`} style={{ padding: '3px 10px' }}>Pages</button>
          </div>
          <span className="text-[rgba(152,152,152,0.2)] text-[11px]">&middot;</span>
          <span className="text-[11px] text-[rgba(152,152,152,0.5)]">{SCREEN_LABELS[currentVisible] || 'Trip Flow'}</span>
          {viewMode === 'demo' && (
            <>
              <span className="text-[rgba(152,152,152,0.2)] text-[11px]">&middot;</span>
              <span className="text-[11px] text-[rgba(152,152,152,0.3)]">{history.length - 1} steps</span>
            </>
          )}
          {viewMode === 'browse' && (
            <span className="text-[11px] text-[rgba(152,152,152,0.3)]">{browseIdx + 1}/{browseScreens.length}</span>
          )}
        </div>
        <div className="flex items-center" style={{ gap: 8 }}>
          <button
            onClick={() => {
              const v = encodeURIComponent(JSON.stringify(variants))
              window.open(`/preview/interactive-export?v=${v}`, '_blank')
            }}
            className="flex items-center rounded-[6px] bg-main/10 text-main text-[11px] font-medium hover:bg-main/20 transition"
            style={{ gap: 4, padding: '4px 10px' }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 9V10H10V9M6 2V7.5M6 7.5L3.5 5M6 7.5L8.5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Export
          </button>
          <button onClick={() => router.push('/')} className="text-[12px] text-[#888] hover:text-white transition">
            Dashboard
          </button>
        </div>
      </div>

      {viewMode === 'browse' && (
        <div className="flex items-center" style={{ width: 605, gap: 6, marginBottom: 10 }}>
          <button
            onClick={() => browseIdx > 0 && jumpToScreen(browseScreens[browseIdx - 1])}
            disabled={browseIdx === 0}
            className="shrink-0 flex items-center justify-center rounded-full bg-[#242424] text-[#888] disabled:opacity-20 hover:text-white transition"
            style={{ width: 24, height: 24 }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M15 18l-6-6 6-6" /></svg>
          </button>
          <div className="flex-1 flex flex-wrap justify-center" style={{ gap: 4 }}>
            {browseScreens.map((key) => (
              <button
                key={key}
                onClick={() => jumpToScreen(key)}
                className={`rounded-full text-[10px] font-medium transition ${
                  displayScreen === key ? 'bg-main/15 text-main' : 'bg-[#242424] text-[rgba(152,152,152,0.6)] hover:text-[#888]'
                }`}
                style={{ padding: '3px 8px' }}
              >
                {SCREEN_LABELS[key] || key}
              </button>
            ))}
          </div>
          <button
            onClick={() => browseIdx < browseScreens.length - 1 && jumpToScreen(browseScreens[browseIdx + 1])}
            disabled={browseIdx === browseScreens.length - 1}
            className="shrink-0 flex items-center justify-center rounded-full bg-[#242424] text-[#888] disabled:opacity-20 hover:text-white transition"
            style={{ width: 24, height: 24 }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M9 18l6-6-6-6" /></svg>
          </button>
        </div>
      )}

      <div className="flex items-start" style={{ gap: 12 }}>
        {phoneFrame}
        <ComponentSidebar
          variants={variants}
          setVariants={setVariants}
          currentScreen={currentVisible}
          combinations={combinations}
          onSave={saveCombination}
          onLoad={loadCombination}
          onDelete={deleteCombination}
          showSaveInput={showSaveInput}
          setShowSaveInput={setShowSaveInput}
          saveInputName={saveInputName}
          setSaveInputName={setSaveInputName}
        />
      </div>
    </div>
  )
}

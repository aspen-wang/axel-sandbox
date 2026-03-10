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
`

// ─── Shared UI pieces ───────────────────────────────────────────────
function BackHeader({ label, onBack, right }) {
  return (
    <div className="absolute left-[16px] top-[68px] right-[16px] flex items-center justify-between z-10">
      <button onClick={onBack} className="flex items-center gap-[6px]">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#989898" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
        <p className="text-[13px] text-[#989898]">{label}</p>
      </button>
      {right}
    </div>
  )
}

// ─── Blue CTA (replaces pink CTABtn for user actions) ───────────────
function BlueCTA({ label, onClick }) {
  return (
    <button onClick={onClick} className="w-full flex items-center justify-center py-[12px] rounded-[30px] cursor-pointer hover:brightness-110 transition bg-blue">
      <p className="font-medium text-[13px] text-center leading-normal text-white">{label}</p>
    </button>
  )
}

// ─── BottomSheet ────────────────────────────────────────────────────
function BottomSheet({ open, onClose, children }) {
  return (
    <>
      {/* Overlay */}
      <div
        className={`absolute inset-0 z-30 transition-opacity duration-200 ${open ? 'bg-black/50 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      {/* Sheet */}
      <div
        className={`absolute left-0 right-0 bottom-0 z-40 bg-[#1A1A1A] rounded-t-[20px] max-h-[75vh] overflow-y-auto transition-transform duration-300 ease-out ${open ? 'translate-y-0' : 'translate-y-full'}`}
        style={{ scrollbarWidth: 'none' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-[8px] pb-[4px]">
          <div className="w-[40px] h-[4px] rounded-full bg-[#474747]" />
        </div>
        <div className="px-[16px] pb-[32px]">
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

// ─── Search Animation ───────────────────────────────────────────────
function SearchAnimation({ label, count }) {
  const [num, setNum] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setNum((n) => Math.min(n + Math.floor(Math.random() * 23) + 5, count)), 80)
    return () => clearInterval(t)
  }, [count])
  return (
    <div className="flex flex-col items-center justify-center h-[260px]">
      <p className="font-bold text-[15px] text-text-1 mb-[2px]">{label}</p>
      <p className="text-[12px] text-text-2 mb-[24px]">Apr 15</p>
      <div className="relative w-[120px] h-[120px] mb-[20px]">
        {[0, 1, 2].map((i) => (
          <div key={i} className="absolute inset-0 rounded-full border border-main/30" style={{ animation: `searchPulse 2s ease-out infinite`, animationDelay: `${i * 0.6}s` }} />
        ))}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[8px] h-[8px] rounded-full bg-main" />
        </div>
      </div>
      <p className="text-[12px] text-text-2" style={{ animation: 'countUp 1.5s ease-in-out infinite' }}>
        Checking {num} flights...
      </p>
    </div>
  )
}

// ─── Screen 1: My Plans ─────────────────────────────────────────────
const TRIP_LIST_DATA = [
  { id: 1, month: 'APR', days: '15 - 18', year: '2026', type: 'FLIGHT + HOTEL', typeColor: '#4FC660', route: 'Seattle \u2192 San Francisco', travelers: '2 travelers', img: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=400&fit=crop' },
  { id: 2, month: 'APR', days: '20 - 22', year: '2026', type: 'HOTEL ONLY', typeColor: '#FFFFFF', route: 'Los Angeles \u2192 New York', travelers: '3 travelers', img: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=800&h=400&fit=crop' },
  { id: 3, month: 'MAY', days: '10 - 13', year: '2026', type: 'FLIGHT + HOTEL', typeColor: '#4FC660', route: 'Chicago \u2192 Miami', travelers: '1 traveler', img: 'https://images.unsplash.com/photo-1514214246283-d427a95c5d2f?w=800&h=400&fit=crop' },
]

function ScreenTripsList({ go, variants = {} }) {
  const TripCardComp = tripCards[variants.tripCard] || TripCard
  return (
    <>
      <StatusBar />
      <div className="absolute left-[16px] top-[66px] right-[16px] flex items-center justify-between">
        <p className="font-semibold text-[28px] text-white leading-normal">Trips</p>
        <button onClick={() => go('new-trip')} className="border border-[#333] rounded-[30px] px-[16px] py-[8px] hover:bg-white/5 transition">
          <p className="text-[13px] text-white font-medium">+ New Trip</p>
        </button>
      </div>
      <div className="absolute left-[16px] top-[124px] right-[16px] bottom-[88px] overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
        <div className="flex flex-col gap-[16px]">
          {TRIP_LIST_DATA.map((trip) => (
            <TripCardComp key={trip.id} trip={trip} onClick={() => go('new-trip')} />
          ))}
        </div>
      </div>
      <BottomNav activeTab="trips" />
      <HomeIndicator />
    </>
  )
}

// ─── Screen 2: New Plan ─────────────────────────────────────────────

function ScreenNewTrip({ go, goBack }) {
  const [text, setText] = useState('business trip to sf. seattle to sf flights apr 15 - 18')
  return (
    <>
      <StatusBar />
      <div className="absolute left-[16px] top-[66px] right-[16px]">
        <div className="flex items-center gap-[10px]">
          <button onClick={goBack}>
            <svg width="12" height="18" viewBox="0 0 12 18" fill="none"><path d="M10 2L3 9L10 16" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <p className="font-semibold text-[20px] text-white leading-normal">New trip plan</p>
        </div>
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center px-[40px]" style={{ marginTop: '-40px' }}>
        <img src="/axel-mascot.png" alt="Axel" className="w-[180px] h-[180px] object-contain mb-[16px]" />
        <p className="text-[14px] text-[#888] text-center leading-[1.5]">Tell me about your trip — where, when, and what matters to you.</p>
      </div>
      <div className="absolute left-[16px] right-[16px] bottom-[32px]">
        <div className="mb-[12px]">
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

// ─── Screen 3: Flight Search Animation ──────────────────────────────
function ScreenChatThinking({ go, goBack, variants }) {
  useEffect(() => { const t = setTimeout(() => go('chat-flights'), 2000); return () => clearTimeout(t) }, [go])
  const StepProgress = stepProgresses[variants?.stepProgress] || stepProgresses.A
  const AxelPanel = axelPanels[variants?.axelPanel] || axelPanels.A
  return (
    <>
      <style>{ANIMATIONS_CSS}</style>
      <StatusBar />
      <BackHeader label="My Plans" onBack={goBack} />
      <div className="absolute left-0 right-0 top-[92px] z-10">
        <StepProgress steps={STEPS} current={0} completed={[]} />
      </div>
      <div className="absolute left-[16px] right-[16px] top-[136px] bottom-[100px]">
        <SearchAnimation label="SEA → SFO" count={247} />
      </div>
      <AxelPanel typing message="Searching flights..." />
      <HomeIndicator />
    </>
  )
}

// ─── Screen 4: Flight Selection ─────────────────────────────────────
function ScreenChatFlights({ go, goBack, variants }) {
  const [visible, setVisible] = useState(false)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [selectedFlight, setSelectedFlight] = useState(null)
  useEffect(() => { const t = setTimeout(() => setVisible(true), 100); return () => clearTimeout(t) }, [])
  const FlightCard = flightDealCards[variants?.flightDealCard] || flightDealCards.A
  const StepProgress = stepProgresses[variants?.stepProgress] || stepProgresses.A
  const AxelPanel = axelPanels[variants?.axelPanel] || axelPanels.A
  return (
    <>
      <style>{ANIMATIONS_CSS}</style>
      <StatusBar />
      <BackHeader label="My Plans" onBack={goBack} />
      <div className="absolute left-0 right-0 top-[92px] z-10">
        <StepProgress steps={STEPS} current={0} completed={[]} />
      </div>
      <div className="absolute left-[16px] top-[136px] right-[16px] bottom-[100px] overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
        <p className="text-[12px] text-text-2 mb-[10px]">SEA → SFO · Nonstop · Apr 15</p>
        <div className={`flex flex-col gap-[8px] ${visible ? '' : 'opacity-0'}`}>
          {FLIGHT_DEALS.map((deal, i) => (
            <div
              key={i}
              style={visible ? { animation: `staggerFadeUp 0.4s ease-out ${i * 0.1}s both` } : undefined}
            >
              <FlightCard deal={deal} mode="list" onClick={() => { setSelectedFlight(deal); setSheetOpen(true) }} />
            </div>
          ))}
        </div>
      </div>
      <AxelPanel
        message="Morning nonstops are cheapest. Tap a flight to see details."
        actions={[
          { label: 'Need a hotel too?', variant: 'secondary', onClick: () => go('chat-hotel-thinking') },
          { label: 'Flights only →', variant: 'primary', onClick: () => go('itinerary') },
        ]}
      />
      <BottomSheet open={sheetOpen} onClose={() => setSheetOpen(false)}>
        {selectedFlight && (
          <>
            <p className="font-bold text-[16px] text-text-1 mb-[4px]">{selectedFlight.airline}</p>
            <p className="text-[12px] text-text-2 mb-[8px]">{selectedFlight.flight_number} · {selectedFlight.aircraft}</p>
            <div className="flex items-center justify-between mb-[8px]">
              <div>
                <p className="font-medium text-[18px] text-text-1">{selectedFlight.depart_time}</p>
                <p className="text-[12px] text-text-2">{selectedFlight.from} · {selectedFlight.from_city}</p>
              </div>
              <div className="flex-1 mx-[12px] h-[1px] bg-[#333]" />
              <div className="text-right">
                <p className="font-medium text-[18px] text-text-1">{selectedFlight.arrive_time}</p>
                <p className="text-[12px] text-text-2">{selectedFlight.to} · {selectedFlight.to_city}</p>
              </div>
            </div>
            <div className="flex items-center justify-between mb-[6px]">
              <p className="text-[12px] text-text-2">{selectedFlight.duration} · {selectedFlight.stops}</p>
              <p className="text-[12px] text-text-2">{selectedFlight.cabin_class}</p>
            </div>
            <div className="flex items-center justify-between mb-[4px]">
              <p className="text-[12px] text-text-2">Baggage: {selectedFlight.baggage}</p>
            </div>
            <div className="flex items-center justify-between mb-[12px]">
              <p className="text-[12px] text-text-2">Checked bag: {selectedFlight.checked_bag_fee}</p>
            </div>
            <div className="flex items-baseline mb-[16px]">
              <span className="text-[13px] text-[#888] line-through mr-[8px]">${selectedFlight.original_price}</span>
              <span className="font-bold text-[20px] text-green">${selectedFlight.price}</span>
              <span className="ml-[8px] text-[12px] text-green">Save ${selectedFlight.saved}</span>
            </div>
            <BlueCTA label="Select this flight" onClick={() => { setSheetOpen(false); go('chat-hotel-thinking') }} />
          </>
        )}
      </BottomSheet>
      <HomeIndicator />
    </>
  )
}

// ─── Screen 5: Hotel Search Animation ───────────────────────────────
function ScreenChatHotelThinking({ go, goBack, variants }) {
  useEffect(() => { const t = setTimeout(() => go('chat-hotels'), 2000); return () => clearTimeout(t) }, [go])
  const StepProgress = stepProgresses[variants?.stepProgress] || stepProgresses.A
  const AxelPanel = axelPanels[variants?.axelPanel] || axelPanels.A
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
        <SearchAnimation label="Hotels near Union Square" count={184} />
      </div>
      <AxelPanel typing message="Finding hotels near Union Square..." />
      <HomeIndicator />
    </>
  )
}

// ─── Screen 6: Hotel Selection ──────────────────────────────────────
function ScreenChatHotels({ go, goBack, variants }) {
  const [visible, setVisible] = useState(false)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [selectedHotel, setSelectedHotel] = useState(null)
  useEffect(() => { const t = setTimeout(() => setVisible(true), 100); return () => clearTimeout(t) }, [])
  const HotelCard = hotelDealCards[variants?.hotelDealCard] || hotelDealCards.A
  const StepProgress = stepProgresses[variants?.stepProgress] || stepProgresses.A
  const AxelPanel = axelPanels[variants?.axelPanel] || axelPanels.A
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
        <div className="mb-[8px]">
          <ConfirmedFlight flight={{ airline: 'United Airlines', from: 'SEA', to: 'SFO', departTime: '7:12am', arriveTime: '9:30am', date: 'Apr 15', duration: '2h 18m', price: 218 }} />
        </div>
        <div className={`flex flex-col gap-[8px] ${visible ? '' : 'opacity-0'}`}>
          {HOTEL_DEALS.map((deal, i) => (
            <div
              key={i}
              style={visible ? { animation: `staggerFadeUp 0.4s ease-out ${i * 0.1}s both` } : undefined}
            >
              <HotelCard deal={deal} mode="list" onClick={() => { setSelectedHotel(deal); setSheetOpen(true) }} />
            </div>
          ))}
        </div>
      </div>
      <AxelPanel
        message="Great options near your meeting area."
        actions={[
          { label: 'Show on map', variant: 'secondary', onClick: () => go('hotel-map') },
          { label: 'Select & continue →', variant: 'primary', onClick: () => go('itinerary') },
        ]}
      />
      <BottomSheet open={sheetOpen} onClose={() => setSheetOpen(false)}>
        {selectedHotel && (
          <>
            <p className="font-bold text-[16px] text-text-1 mb-[2px]">{selectedHotel.name}</p>
            <div className="flex items-center gap-[6px] mb-[6px]">
              <div className="flex">{Array.from({ length: selectedHotel.stars }, (_, i) => <span key={i} className="text-[#F5C518] text-[12px] leading-none">&#9733;</span>)}</div>
              <p className="text-[12px] text-text-2">{selectedHotel.location}</p>
            </div>
            <p className="text-[12px] text-text-2 mb-[4px]">{selectedHotel.room_type} · {selectedHotel.bed_type}</p>
            <p className="text-[12px] text-text-2 mb-[4px]">{selectedHotel.check_in} → {selectedHotel.check_out} · {selectedHotel.nights} nights</p>
            <div className="flex flex-wrap gap-[6px] mb-[8px]">
              {selectedHotel.amenities.slice(0, 4).map((a) => (
                <span key={a} className="px-[8px] py-[3px] rounded-full bg-[#2A2A2A] text-[10px] text-[#989898]">{a}</span>
              ))}
            </div>
            <div className="flex items-baseline mb-[4px]">
              <span className="font-bold text-[20px] text-green">${selectedHotel.price_per_night}</span>
              <span className="text-[12px] text-text-2 ml-[2px]">/night</span>
              <span className="text-[13px] text-[#888] line-through ml-[8px]">${selectedHotel.original_price}</span>
            </div>
            <p className="text-[11px] text-green mb-[12px]">Save ${selectedHotel.saved * selectedHotel.nights} total</p>
            <BlueCTA label="Select this hotel" onClick={() => { setSheetOpen(false); go('itinerary') }} />
          </>
        )}
      </BottomSheet>
      <HomeIndicator />
    </>
  )
}

// ─── Screen 7: Hotel Map ────────────────────────────────────────────
function ScreenHotelMap({ go, goBack, variants }) {
  const [pin, setPin] = useState(1)
  const [sheetOpen, setSheetOpen] = useState(false)
  const sel = PINS[pin]
  const AxelPanel = axelPanels[variants?.axelPanel] || axelPanels.A
  return (
    <>
      <StatusBar />
      <div className="absolute left-[16px] top-[68px] right-[16px] flex items-center justify-between z-10">
        <button onClick={goBack} className="flex items-center gap-[6px]">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#989898" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
          <p className="text-[15px] font-medium text-text-1">Hotels near SF</p>
        </button>
        <button onClick={goBack} className="text-[12px] text-[#989898] font-medium">List</button>
      </div>
      <div className="absolute inset-0 rounded-[30px] overflow-hidden" style={{ backgroundColor: '#1a1a1a', backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
        <div className="absolute inset-0"><svg width="100%" height="100%" className="opacity-[0.06]"><line x1="0" y1="45%" x2="100%" y2="42%" stroke="#fff" strokeWidth="2" /><line x1="30%" y1="0" x2="35%" y2="100%" stroke="#fff" strokeWidth="2" /><line x1="60%" y1="0" x2="55%" y2="100%" stroke="#fff" strokeWidth="1.5" /></svg></div>
        {PINS.map((p) => (
          <button key={p.id} onClick={() => { setPin(p.id); setSheetOpen(true) }} className="absolute flex flex-col items-center" style={{ top: p.top, left: p.left, transform: 'translate(-50%, -50%)' }}>
            <div className={`w-[28px] h-[28px] rounded-full flex items-center justify-center shadow-lg transition ${p.best ? 'bg-green' : 'bg-white'} ${pin === p.id ? 'ring-2 ring-white/40 scale-110' : ''}`}>
              <p className={`text-[9px] font-bold leading-none ${p.best ? 'text-white' : 'text-[#181818]'}`}>${p.price}</p>
            </div>
            <div className={`w-0 h-0 border-l-[5px] border-r-[5px] border-t-[6px] border-l-transparent border-r-transparent ${p.best ? 'border-t-green' : 'border-t-white'}`} />
          </button>
        ))}
      </div>
      <AxelPanel
        message="Tap a pin to compare. Green = best value."
        actions={[{ label: 'Back to list', variant: 'secondary', onClick: goBack }]}
      />
      <BottomSheet open={sheetOpen} onClose={() => setSheetOpen(false)}>
        <p className="font-bold text-[16px] text-text-1 mb-[2px]">{sel.name}</p>
        <p className="text-[12px] text-text-2 mb-[6px]">{sel.area}</p>
        <div className="flex items-baseline mb-[4px]">
          <span className="font-bold text-[20px] text-text-1">${sel.price}</span>
          <span className="text-[12px] text-text-2 ml-[2px]">/night</span>
        </div>
        <div className="bg-green/10 rounded-full px-[8px] py-[3px] inline-block mb-[12px]">
          <span className="text-[11px] font-medium text-green">Save ${sel.save}</span>
        </div>
        <BlueCTA label="Select this hotel" onClick={() => { setSheetOpen(false); go('itinerary') }} />
      </BottomSheet>
      <HomeIndicator />
    </>
  )
}

// ─── Screen 8: Hotel Detail ─────────────────────────────────────────
function ScreenHotelDetail({ go, goBack, variants }) {
  const PriceBreakdown = priceBreakdownCards[variants?.priceBreakdownCard] || priceBreakdownCards.A
  return (
    <>
      <StatusBar />
      {/* Subtle map peek */}
      <div className="absolute top-0 left-0 right-0 h-[130px] rounded-t-[30px] overflow-hidden" style={{ backgroundColor: '#1a1a1a', backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      {/* BottomSheet-style detail */}
      <div className="absolute left-0 right-0 top-[110px] bottom-0 bg-[#1A1A1A] rounded-t-[20px] z-10 overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
        <div className="flex justify-center pt-[8px] pb-[4px]">
          <div className="w-[40px] h-[4px] rounded-full bg-[#474747]" />
        </div>
        <div className="px-[16px] pb-[32px]">
          <button onClick={goBack} className="flex items-center gap-[4px] mb-[8px]">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#989898" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
            <span className="text-[12px] text-[#989898]">Back</span>
          </button>
          <div className="relative h-[140px] rounded-[12px] mb-[12px] flex items-center justify-center overflow-hidden" style={{ background: 'radial-gradient(ellipse at 70% 30%, rgba(255,200,150,0.08), transparent 60%), linear-gradient(135deg, #2A3040, #1E2832, #2A2A2A)' }}>
            <svg className="absolute inset-0 w-full h-full opacity-[0.05]" viewBox="0 0 200 120" fill="none" stroke="white" strokeWidth="1.5" preserveAspectRatio="xMidYMid slice"><rect x="120" y="15" width="50" height="35" rx="2" /><line x1="145" y1="15" x2="145" y2="50" /><line x1="120" y1="32" x2="170" y2="32" /><rect x="30" y="55" width="65" height="35" rx="5" /><rect x="30" y="48" width="65" height="14" rx="4" /><rect x="36" y="60" width="24" height="16" rx="3" /><rect x="65" y="60" width="24" height="16" rx="3" /></svg>
          </div>
          <p className="font-bold text-[18px] text-text-1 leading-[1.2]">Hotel Nikko SF</p>
          <div className="flex items-center gap-[6px] mt-[3px]">
            <div className="flex">{[0,1,2,3].map((i) => <span key={i} className="text-[#F5C518] text-[12px] leading-none">&#9733;</span>)}</div>
            <p className="font-['Lato',sans-serif] text-[12px] text-[#989898]">Union Square, San Francisco</p>
          </div>
          <div className="flex flex-wrap gap-[6px] mt-[10px] mb-[12px]">
            {AMENITIES.map((a) => (<span key={a} className="px-[8px] py-[3px] rounded-full bg-[#2A2A2A] text-[10px] text-[#989898]">{a}</span>))}
          </div>
          <div className="bg-[#242424] rounded-[10px] px-[12px] py-[10px] mb-[8px]">
            <p className="font-bold text-[13px] text-text-1 leading-[1.3]">Standard King</p>
            <p className="font-['Lato',sans-serif] text-[11px] text-[#989898] mt-[2px]">1 King Bed · City View · Apr 15–18 (3 nights)</p>
          </div>
          <div className="mb-[12px]">
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

// ─── Screen 9: Trip Review ──────────────────────────────────────────
function ScreenItinerary({ go, goBack, variants }) {
  const [fn, setFn] = useState('Alex')
  const [ln, setLn] = useState('Morgan')
  const [em, setEm] = useState('alex@email.com')
  const inputCls = "w-full bg-[#2A2A2A] border border-blue/20 rounded-[8px] px-[10px] py-[8px] text-[12px] text-text-1 outline-none focus:border-blue/50 transition"
  const ConfirmedBooking = confirmedBookingCards[variants?.confirmedBookingCard] || confirmedBookingCards.A
  const PriceBreakdown = priceBreakdownCards[variants?.priceBreakdownCard] || priceBreakdownCards.A
  const StepProgress = stepProgresses[variants?.stepProgress] || stepProgresses.A
  const AxelPanel = axelPanels[variants?.axelPanel] || axelPanels.A
  return (
    <>
      <StatusBar />
      <BackHeader label="My Plans" onBack={goBack} />
      <div className="absolute left-0 right-0 top-[92px] z-10">
        <StepProgress steps={STEPS} current={2} completed={[0, 1]} />
      </div>
      <div className="absolute left-[16px] top-[136px] right-[16px] bottom-[100px] overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
        {/* Timeline layout */}
        <div className="relative pl-[18px]">
          {/* Vertical green line */}
          <div className="absolute left-[4px] top-[6px] bottom-[6px] w-[2px] bg-green" />

          <div className="relative mb-[8px]">
            <div className="absolute left-[-18px] top-[10px] w-[10px] h-[10px] rounded-full bg-green flex items-center justify-center">
              <svg width="6" height="6" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5L8 3" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
            <ConfirmedBooking type="flight" title="United UA 224 · SEA → SFO" details="Apr 15 · 7:12am – 9:30am · Nonstop" />
          </div>

          <div className="relative mb-[8px]">
            <div className="absolute left-[-18px] top-[10px] w-[10px] h-[10px] rounded-full bg-green flex items-center justify-center">
              <svg width="6" height="6" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5L8 3" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
            <ConfirmedBooking type="hotel" title="Hotel Nikko SF" details="Apr 15–18 · 3 nights · Standard King" />
          </div>

          <div className="relative mb-[12px]">
            <div className="absolute left-[-18px] top-[10px] w-[10px] h-[10px] rounded-full bg-[#474747]" />
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

        <p className="font-medium text-[14px] text-text-1 leading-normal mb-[8px]">Traveler Details</p>
        <div className="flex gap-[8px] mb-[8px]">
          <div className="flex-1"><p className="text-[10px] text-[#989898] font-medium mb-[3px]">First Name</p><input value={fn} onChange={e => setFn(e.target.value)} className={inputCls} /></div>
          <div className="flex-1"><p className="text-[10px] text-[#989898] font-medium mb-[3px]">Last Name</p><input value={ln} onChange={e => setLn(e.target.value)} className={inputCls} /></div>
        </div>
        <div className="mb-[8px]"><p className="text-[10px] text-[#989898] font-medium mb-[3px]">Email</p><input value={em} onChange={e => setEm(e.target.value)} type="email" className={inputCls} /></div>
      </div>
      <AxelPanel
        message="Everything looks good. Ready to continue?"
        actions={[{ label: 'Continue to checkout →', variant: 'primary', onClick: () => go('paywall') }]}
      />
      <HomeIndicator />
    </>
  )
}

// ─── Screen 10: Paywall ─────────────────────────────────────────────
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

// ─── Screen 11: Payment ─────────────────────────────────────────────
function ScreenPayment({ go, goBack, variants }) {
  const OrderSummary = orderSummaryCards[variants?.orderSummaryCard] || orderSummaryCards.A
  const SavedPayment = savedPaymentCards[variants?.savedPaymentCard] || savedPaymentCards.A
  const PriceBreakdown = priceBreakdownCards[variants?.priceBreakdownCard] || priceBreakdownCards.A
  const StepProgress = stepProgresses[variants?.stepProgress] || stepProgresses.A
  const AxelPanel = axelPanels[variants?.axelPanel] || axelPanels.A
  return (
    <>
      <StatusBar />
      <BackHeader label="My Plans" onBack={goBack} />
      <div className="absolute left-0 right-0 top-[92px] z-10">
        <StepProgress steps={STEPS} current={3} completed={[0, 1, 2]} />
      </div>
      <div className="absolute left-[16px] top-[136px] right-[16px] bottom-[100px] overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
        <div className="mb-[14px]">
          <OrderSummary title="SF Business Trip" subtitle="Apr 15–18 · 1 traveler" items={[{ icon: '', text: 'United SEA→SFO · Apr 15' }, { icon: '', text: 'Hotel Nikko SF · 3 nights' }]} />
        </div>
        <p className="font-medium text-[14px] text-text-1 leading-normal mb-[8px]">Payment Method</p>
        <div className="mb-[6px] [&_*]:border-blue/40">
          <SavedPayment last4="4242" brand="Visa" selected={true} />
        </div>
        <p className="text-[10px] text-text-2 leading-normal mb-[14px]">Or pay with new card</p>
        <PriceBreakdown
          lineItems={[
            { label: 'Subtotal', amount: '$785' },
            { label: 'Taxes & fees', amount: '$94', color: 'orange' },
            { label: 'Member discount', amount: '−$47', color: 'green' },
          ]}
          total={{ label: 'Total', amount: '$832' }}
        />
      </div>
      <AxelPanel
        message="Ready to book! Total: $832"
        actions={[{ label: 'Pay $832 →', variant: 'primary', onClick: () => go('confirmation') }]}
      />
      <HomeIndicator />
    </>
  )
}

// ─── Screen 12: Confirmation ────────────────────────────────────────
function ScreenConfirmation({ go, variants }) {
  const [showConfetti, setShowConfetti] = useState(true)
  useEffect(() => { const t = setTimeout(() => setShowConfetti(false), 1500); return () => clearTimeout(t) }, [])
  const AxelPanel = axelPanels[variants?.axelPanel] || axelPanels.A

  // Generate confetti particles
  const confetti = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    color: i % 2 === 0 ? '#EF508D' : '#4FC660',
    cx: `${(Math.random() - 0.5) * 200}px`,
    cy: `${-Math.random() * 300 - 50}px`,
    cr: `${Math.random() * 720 - 360}deg`,
    size: Math.random() * 6 + 4,
    delay: Math.random() * 0.3,
  }))

  return (
    <>
      <style>{ANIMATIONS_CSS}</style>
      <StatusBar />

      {/* Confetti */}
      {showConfetti && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
          {confetti.map((c) => (
            <div
              key={c.id}
              className="absolute rounded-[2px]"
              style={{
                width: c.size, height: c.size,
                backgroundColor: c.color,
                '--cx': c.cx, '--cy': c.cy, '--cr': c.cr,
                animation: `confettiBurst 1s ease-out ${c.delay}s both`,
              }}
            />
          ))}
        </div>
      )}

      <div className="absolute left-0 right-0 top-[59px] bottom-[100px] flex flex-col items-center justify-center px-[24px]">
        {/* Green check */}
        <div
          className="w-[64px] h-[64px] rounded-full bg-green/20 flex items-center justify-center mb-[12px]"
          style={{ animation: 'scaleIn 0.4s ease-out' }}
        >
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none"><path d="M8 16l6 6 10-12" stroke="#4fc660" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </div>
        <p className="font-bold text-[19px] text-text-1 leading-normal mt-[12px] mb-[6px]" style={{ animation: 'fadeInUp 0.3s ease-out 0.2s both' }}>Trip booked!</p>
        <p className="text-[13px] text-text-2 leading-normal mb-[2px]">SF Business Trip</p>
        <p className="text-[12px] text-text-2 leading-normal mb-[16px]">Apr 15–18</p>

        {/* Timeline summary */}
        <div className="w-full max-w-[280px] mb-[16px]">
          <div className="border-l-2 border-green pl-[10px] mb-[8px]"><p className="text-[11px] text-text-2 leading-normal">United SEA → SFO · Apr 15 · 7:12am</p></div>
          <div className="border-l-2 border-green pl-[10px]"><p className="text-[11px] text-text-2 leading-normal">Hotel Nikko SF · 3 nights</p></div>
        </div>
        <p className="text-[10px] text-text-2 font-mono tracking-[0.5px] mt-[16px]">Confirmation #AX-48291</p>
      </div>

      <AxelPanel
        message="I'll keep monitoring prices for you."
        actions={[{ label: 'View my plans →', variant: 'primary', onClick: () => go('trips-list-done') }]}
      />
      <HomeIndicator />
    </>
  )
}

// ─── Component Sidebar ──────────────────────────────────────────────
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
  { key: 'axelPanel', label: 'Axel Panel', screens: ['new-trip', 'chat-thinking', 'chat-flights', 'chat-hotel-thinking', 'chat-hotels', 'hotel-map', 'itinerary', 'payment', 'confirmation'], versions: AXEL_PANEL_VERSIONS },
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
    <div className="w-[200px] bg-[#1a1a1a] rounded-[12px] p-[14px] self-start overflow-y-auto max-h-[852px]">
      <p className="text-[11px] font-medium text-text-2/50 uppercase tracking-[0.08em] mb-[12px]">Components</p>
      {SIDEBAR_DEFS.map((comp) => {
        const isActive = comp.screens.includes(currentScreen)
        const currentVer = comp.versions.find((v) => v.label === variants[comp.key])
        return (
          <div key={comp.key} className={`mb-[16px] last:mb-0 transition ${isActive ? 'opacity-100' : 'opacity-40'}`}>
            <div className="flex items-center gap-[6px] mb-[6px]">
              {isActive && <div className="w-[5px] h-[5px] rounded-full bg-main shrink-0" />}
              <p className={`text-[12px] font-medium ${isActive ? 'text-text-1' : 'text-text-2'}`}>{comp.label}</p>
              <span className="text-[10px] text-text-2/40">{comp.versions.length}</span>
            </div>
            <div className="flex flex-wrap gap-[4px] ml-[11px]">
              {comp.versions.map((ver) => {
                const isSelected = variants[comp.key] === ver.label
                return (
                  <button
                    key={ver.label}
                    onClick={() => setVariants((prev) => ({ ...prev, [comp.key]: ver.label }))}
                    title={ver.notes}
                    className={`px-[8px] py-[3px] rounded-full text-[10px] font-medium transition ${
                      isSelected
                        ? 'bg-main/15 text-main'
                        : 'bg-[#242424] text-text-2/60 hover:text-text-2'
                    }`}
                  >
                    {ver.label}
                  </button>
                )
              })}
            </div>
            {currentVer?.notes && (
              <p className="text-[10px] text-text-2/50 ml-[11px] mt-[4px] leading-[1.3]">{currentVer.notes}</p>
            )}
          </div>
        )
      })}

      {/* Presets section */}
      <div className="border-t border-[#333] mt-[16px] pt-[12px]">
        <p className="text-[11px] font-medium text-text-2/50 uppercase tracking-[0.08em] mb-[8px]">Presets</p>
        <button
          onClick={() => setVariants(DEFAULT_VARIANTS)}
          className="w-full text-left px-[8px] py-[4px] rounded-[6px] text-[11px] text-text-2/60 hover:bg-[#242424] hover:text-text-2 transition mb-[4px]"
        >
          Reset to defaults
        </button>
        {showSaveInput ? (
          <div className="flex gap-[4px] mb-[6px]">
            <input
              value={saveInputName}
              onChange={e => setSaveInputName(e.target.value)}
              placeholder="Name..."
              className="flex-1 min-w-0 bg-[#242424] border border-[#474747] rounded-[6px] px-[6px] py-[3px] text-[10px] text-text-1 outline-none focus:border-main/50"
              onKeyDown={e => { if (e.key === 'Enter' && saveInputName.trim()) onSave(saveInputName.trim()); if (e.key === 'Escape') { setShowSaveInput(false); setSaveInputName('') } }}
              autoFocus
            />
            <button onClick={() => saveInputName.trim() && onSave(saveInputName.trim())} className="shrink-0 px-[6px] py-[3px] rounded-[6px] bg-main/15 text-main text-[10px] font-medium">Save</button>
          </div>
        ) : (
          <button
            onClick={() => setShowSaveInput(true)}
            className="w-full text-left px-[8px] py-[4px] rounded-[6px] text-[11px] text-main hover:bg-main/10 transition mb-[4px]"
          >
            + Save current
          </button>
        )}
        {combinations.map(combo => (
          <div key={combo.id} className="flex items-center gap-[4px] group mb-[2px]">
            <button
              onClick={() => onLoad(combo)}
              className="flex-1 min-w-0 text-left px-[8px] py-[3px] rounded-[6px] text-[11px] text-text-2/60 hover:bg-[#242424] hover:text-text-2 transition truncate"
              title={Object.entries(combo.variants).filter(([,v]) => v !== 'A').map(([k,v]) => `${k}=${v}`).join(', ') || 'All defaults'}
            >
              {combo.name}
            </button>
            <button
              onClick={() => onDelete(combo.id)}
              className="opacity-0 group-hover:opacity-100 shrink-0 text-text-2/30 hover:text-red-400 text-[10px] transition px-[4px]"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Screen name map ────────────────────────────────────────────────
const SCREEN_LABELS = {
  'trips-list': 'My Plans', 'trips-list-done': 'My Plans', 'new-trip': 'New Plan',
  'chat-thinking': 'Flight Search', 'chat-flights': 'Flight Selection',
  'chat-hotel-thinking': 'Hotel Search', 'chat-hotels': 'Hotel Selection',
  'hotel-map': 'Hotel Map', 'hotel-detail': 'Hotel Detail',
  'itinerary': 'Trip Review', 'paywall': 'Membership',
  'payment': 'Checkout', 'confirmation': 'Trip Booked',
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
      setTimeout(() => { loadedRef.current = true }, 600)
    }).catch(() => { loadedRef.current = true })
  }, [isStandalone])

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
      case 'new-trip': return <ScreenNewTrip go={go} goBack={goBack} variants={variants} />
      case 'chat-thinking': return <ScreenChatThinking go={go} goBack={goBack} variants={variants} />
      case 'chat-flights': return <ScreenChatFlights go={go} goBack={goBack} variants={variants} />
      case 'chat-hotel-thinking': return <ScreenChatHotelThinking go={go} goBack={goBack} variants={variants} />
      case 'chat-hotels': return <ScreenChatHotels go={go} goBack={goBack} variants={variants} />
      case 'hotel-map': return <ScreenHotelMap go={go} goBack={goBack} variants={variants} />
      case 'hotel-detail': return <ScreenHotelDetail go={go} goBack={goBack} variants={variants} />
      case 'itinerary': return <ScreenItinerary go={go} goBack={goBack} variants={variants} />
      case 'paywall': return <ScreenPaywall go={go} goBack={goBack} variants={variants} />
      case 'payment': return <ScreenPayment go={go} goBack={goBack} variants={variants} />
      case 'confirmation': return <ScreenConfirmation go={go} variants={variants} />
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
      <div className="flex items-center justify-between mb-[10px]" style={{ width: 605 }}>
        <button onClick={() => router.push('/flow/trip-flow')} className="flex items-center gap-[6px] text-text-2 hover:text-text-1 transition">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
          <span className="text-[12px]">Flow</span>
        </button>
        <div className="flex items-center gap-[8px]">
          <div className="flex items-center bg-[#242424] rounded-full p-[2px]">
            <button onClick={() => setViewMode('demo')} className={`px-[10px] py-[3px] rounded-full text-[10px] font-medium transition ${viewMode === 'demo' ? 'bg-main/15 text-main' : 'text-text-2/60 hover:text-text-2'}`}>Demo</button>
            <button onClick={() => setViewMode('browse')} className={`px-[10px] py-[3px] rounded-full text-[10px] font-medium transition ${viewMode === 'browse' ? 'bg-main/15 text-main' : 'text-text-2/60 hover:text-text-2'}`}>Pages</button>
          </div>
          <span className="text-text-2/20 text-[11px]">&middot;</span>
          <span className="text-[11px] text-text-2/50">{SCREEN_LABELS[currentVisible] || 'Trip Flow'}</span>
          {viewMode === 'demo' && (
            <>
              <span className="text-text-2/20 text-[11px]">&middot;</span>
              <span className="text-[11px] text-text-2/30">{history.length - 1} steps</span>
            </>
          )}
          {viewMode === 'browse' && (
            <span className="text-[11px] text-text-2/30">{browseIdx + 1}/{browseScreens.length}</span>
          )}
        </div>
        <div className="flex items-center gap-[8px]">
          <button
            onClick={() => {
              const v = encodeURIComponent(JSON.stringify(variants))
              window.open(`/preview/interactive-export?v=${v}`, '_blank')
            }}
            className="flex items-center gap-[4px] px-[10px] py-[4px] rounded-[6px] bg-main/10 text-main text-[11px] font-medium hover:bg-main/20 transition"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 9V10H10V9M6 2V7.5M6 7.5L3.5 5M6 7.5L8.5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Export
          </button>
          <button onClick={() => router.push('/')} className="text-[12px] text-text-2 hover:text-text-1 transition">
            Dashboard
          </button>
        </div>
      </div>

      {viewMode === 'browse' && (
        <div className="flex items-center gap-[6px] mb-[10px]" style={{ width: 605 }}>
          <button
            onClick={() => browseIdx > 0 && jumpToScreen(browseScreens[browseIdx - 1])}
            disabled={browseIdx === 0}
            className="shrink-0 w-[24px] h-[24px] flex items-center justify-center rounded-full bg-[#242424] text-text-2 disabled:opacity-20 hover:text-text-1 transition"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M15 18l-6-6 6-6" /></svg>
          </button>
          <div className="flex-1 flex gap-[4px] flex-wrap justify-center">
            {browseScreens.map((key) => (
              <button
                key={key}
                onClick={() => jumpToScreen(key)}
                className={`px-[8px] py-[3px] rounded-full text-[10px] font-medium transition ${
                  displayScreen === key ? 'bg-main/15 text-main' : 'bg-[#242424] text-text-2/60 hover:text-text-2'
                }`}
              >
                {SCREEN_LABELS[key] || key}
              </button>
            ))}
          </div>
          <button
            onClick={() => browseIdx < browseScreens.length - 1 && jumpToScreen(browseScreens[browseIdx + 1])}
            disabled={browseIdx === browseScreens.length - 1}
            className="shrink-0 w-[24px] h-[24px] flex items-center justify-center rounded-full bg-[#242424] text-text-2 disabled:opacity-20 hover:text-text-1 transition"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M9 18l6-6-6-6" /></svg>
          </button>
        </div>
      )}

      <div className="flex gap-[12px] items-start">
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

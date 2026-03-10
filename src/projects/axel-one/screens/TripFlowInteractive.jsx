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

// ─── Shared UI pieces ───────────────────────────────────────────────

function BackHeader({ label, onBack, right }) {
  return (
    <div className="absolute left-[16px] top-[68px] right-[16px] flex items-center justify-between z-10">
      <button onClick={onBack} className="flex items-center gap-[6px]">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#989898" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
        <p className="text-[14px] text-[#989898]">{label}</p>
      </button>
      {right}
    </div>
  )
}

function InputBar({ placeholder, onSubmit, buttonLabel = 'Reply', readOnly = true, value, onChange }) {
  return (
    <div className="absolute left-[16px] right-[16px] bottom-[36px] z-10">
      <div className="bg-[#212121] border border-[#474747] rounded-[30px] flex items-center px-[16px] py-[10px]">
        <input
          readOnly={readOnly}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="flex-1 bg-transparent text-[14px] text-text-1 outline-none placeholder:text-[#474747] font-['Lato',sans-serif]"
          onKeyDown={(e) => e.key === 'Enter' && onSubmit?.()}
        />
        <button onClick={onSubmit} className="ml-[8px] px-[16px] py-[6px] rounded-[30px] bg-[#0090FF] text-white text-[13px] font-medium">{buttonLabel}</button>
      </div>
    </div>
  )
}

function UserBubble({ text }) {
  return (
    <div className="flex justify-end mb-[10px]">
      <div className="bg-[#2A2A2A] rounded-[16px] rounded-tr-[4px] px-[14px] py-[10px] max-w-[280px]">
        <p className="font-['Lato',sans-serif] text-[14px] text-text-1 leading-[1.45]">{text}</p>
      </div>
    </div>
  )
}

function AxelLabel() {
  return <p className="text-[11px] font-medium text-main tracking-[0.05em] mb-[4px]">AXEL</p>
}

function ThinkingDots({ label }) {
  const [phase, setPhase] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setPhase((p) => (p + 1) % 4), 400)
    return () => clearInterval(t)
  }, [])
  return (
    <div className="bg-[#212121] rounded-[16px] rounded-tl-[4px] px-[14px] py-[12px] max-w-[280px]">
      <div className="flex items-center gap-[6px]">
        {[0, 1, 2].map((i) => (
          <div key={i} className="w-[7px] h-[7px] rounded-full transition-all duration-300"
            style={{ backgroundColor: i <= phase ? '#EF508D' : '#474747', transform: i === phase % 3 ? 'scale(1.3)' : 'scale(1)' }} />
        ))}
        <p className="text-[12px] text-[#474747] ml-[4px] font-['Lato',sans-serif]">{label}</p>
      </div>
      <div className="mt-[8px] h-[3px] bg-[#2A2A2A] rounded-full overflow-hidden">
        <div className="h-full bg-main/60 rounded-full" style={{ width: `${40 + phase * 15}%`, transition: 'width 0.4s ease' }} />
      </div>
    </div>
  )
}

function GreenCheck({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#4fc660" /><path d="M8 12l3 3 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
  )
}

// ─── Simple UI components ───────────────────────────────────────────
function CTABtn({ label, onClick }) {
  return (
    <button onClick={onClick} className="w-full flex items-center justify-center py-[14px] rounded-[30px] cursor-pointer hover:brightness-110 transition bg-[#0090FF]">
      <p className="font-medium text-[14px] text-center leading-normal text-white">{label}</p>
    </button>
  )
}

function TripCardItem({ trip, onClick }) {
  return (
    <button onClick={onClick} className="w-full bg-[#242424] rounded-[12px] px-[16px] py-[14px] text-left hover:bg-[#2A2A2A] transition">
      <div className="flex items-start justify-between mb-[4px]">
        <p className="font-medium text-[15px] text-text-1 leading-normal">{trip.title}</p>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#474747" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-[2px]"><path d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
      </div>
      <p className="font-['Lato',sans-serif] text-[12px] text-[#989898] leading-normal mb-[6px]">{trip.dates}</p>
      <div className="flex items-center gap-[6px]">
        {trip.status === 'searching' && <div className="flex gap-[3px]">{[0,1,2].map(i=><div key={i} className="w-[4px] h-[4px] rounded-full bg-[#989898] animate-pulse" style={{animationDelay:`${i*0.2}s`}}/>)}</div>}
        {trip.status === 'options' && <div className="w-[5px] h-[5px] rounded-full bg-main" />}
        {(trip.status === 'partial' || trip.status === 'booked') && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#4FC660" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 12.75l6 6 9-13.5" /></svg>}
        <p className="text-[12px] font-medium" style={{ color: trip.statusColor }}>{trip.statusLabel}</p>
      </div>
      {trip.partial && <div className="flex gap-[6px] mt-[8px]"><span className="px-[8px] py-[3px] rounded-[6px] bg-green/10 text-green text-[10px] font-medium">Flight</span><span className="px-[8px] py-[3px] rounded-[6px] bg-[#2A2A2A] text-[#474747] text-[10px] font-medium">Hotel</span></div>}
    </button>
  )
}

// ─── Deal data (matches real component interfaces) ──────────────────
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

const HOTEL_DEAL_UPDATED = {
  ...HOTEL_DEALS[1],
  price_per_night: 166, original_price: 245, saved: 79,
}

// ─── Screen 1: Trips List ───────────────────────────────────────────
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

// ─── Screen 3: New Trip ─────────────────────────────────────────────
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

// ─── Screen Home B: Concierge Greeting ──────────────────────────────
function ScreenHomeB({ go }) {
  const [text, setText] = useState('')
  const actions = [
    { label: 'Book Flights', desc: 'Compare prices, find deals', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" /></svg> },
    { label: 'Find Hotels', desc: 'Stays near your destination', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 22V6a2 2 0 012-2h16a2 2 0 012 2v16M6 10h4v4H6zM14 10h4M14 14h4M6 18h12" /></svg> },
    { label: 'Track Prices', desc: 'Get alerts when prices drop', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 20h20M5 20V8l5-5 5 5v12M3 20v-6h4M17 20v-6h4" /></svg> },
    { label: 'Explore Deals', desc: 'Curated picks from Axel', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg> },
  ]
  return (
    <>
      <StatusBar />
      <div className="absolute left-[20px] top-[68px] right-[20px] bottom-[0] flex flex-col">
        {/* Greeting */}
        <div className="mb-[24px]">
          <p className="text-[#666] text-[15px] mb-[4px]">Good morning, Alex</p>
          <p className="text-white text-[28px] font-semibold leading-[1.2]">Where to next?</p>
        </div>

        {/* Action grid */}
        <div className="grid grid-cols-2 gap-[10px] mb-[20px]">
          {actions.map((a) => (
            <button key={a.label} onClick={() => go('new-trip')} className="bg-[#111] border border-[#222] rounded-[14px] px-[14px] py-[14px] text-left hover:border-[#333] hover:bg-[#151515] transition">
              <div className="text-[#888] mb-[10px]">{a.icon}</div>
              <p className="text-[14px] text-white font-medium leading-normal">{a.label}</p>
              <p className="text-[12px] text-[#666] mt-[2px] leading-normal">{a.desc}</p>
            </button>
          ))}
        </div>

        {/* Active trips */}
        <p className="text-[12px] text-[#555] font-medium uppercase tracking-[0.06em] mb-[8px]">Active Trips</p>
        <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
          <div className="flex flex-col gap-[8px] pb-[90px]">
            {[
              { route: 'Seattle to SF', dates: 'Apr 15-18', status: 'Monitoring prices', statusColor: '#EF508D' },
              { route: 'NYC Weekend', dates: 'May 2-5', status: 'Price drop found', statusColor: '#4FC660' },
            ].map((t) => (
              <button key={t.route} onClick={() => go('chat-thinking')} className="flex items-center justify-between bg-[#111] border border-[#222] rounded-[12px] px-[14px] py-[12px] hover:border-[#333] transition">
                <div>
                  <p className="text-[14px] text-white font-medium">{t.route}</p>
                  <p className="text-[12px] text-[#666] mt-[1px]">{t.dates}</p>
                </div>
                <div className="flex items-center gap-[6px]">
                  <div className="w-[5px] h-[5px] rounded-full" style={{ backgroundColor: t.statusColor }} />
                  <p className="text-[11px] font-medium" style={{ color: t.statusColor }}>{t.status}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Input bar */}
      <div className="absolute left-[16px] right-[16px] bottom-[36px] z-10">
        <div className="bg-[#111] border border-[#333] rounded-[30px] flex items-center px-[16px] py-[10px]">
          <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Ask Axel anything..." className="flex-1 bg-transparent text-[14px] text-white outline-none placeholder:text-[#444] font-['Lato',sans-serif]" onKeyDown={(e) => e.key === 'Enter' && text && go('chat-thinking')} />
          <button onClick={() => text && go('chat-thinking')} className="ml-[8px] w-[32px] h-[32px] rounded-full bg-[#0090FF] flex items-center justify-center hover:brightness-110 transition">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </button>
        </div>
      </div>
      <HomeIndicator />
    </>
  )
}

// ─── Screen Home C: Quick-Pick Agent ────────────────────────────────
function ScreenHomeC({ go }) {
  const [text, setText] = useState('')
  const [selected, setSelected] = useState([])
  const toggle = (v) => setSelected((p) => p.includes(v) ? p.filter((x) => x !== v) : [...p, v])

  const intents = ['Weekend getaway', 'Business trip', 'Family vacation', 'Budget adventure', 'Luxury stay', 'Last-minute deal']
  const destinations = ['San Francisco', 'New York', 'Tokyo', 'Paris', 'Bali', 'London']

  return (
    <>
      <StatusBar />
      <div className="absolute left-[20px] top-[68px] right-[20px] bottom-0 flex flex-col">
        {/* Axel branding */}
        <div className="flex items-center gap-[8px] mb-[6px]">
          <div className="w-[28px] h-[28px] rounded-full bg-[#EF508D]/15 flex items-center justify-center">
            <p className="text-[#EF508D] text-[12px] font-semibold">A</p>
          </div>
          <p className="text-[13px] text-[#EF508D] font-medium">Axel</p>
        </div>

        {/* Big heading */}
        <p className="text-white text-[26px] font-semibold leading-[1.2] mb-[6px]">What kind of trip<br />are you planning?</p>
        <p className="text-[14px] text-[#666] mb-[20px]">Pick one or a few to get started</p>

        {/* Intent chips */}
        <div className="flex flex-wrap gap-[8px] mb-[24px]">
          {intents.map((intent) => {
            const active = selected.includes(intent)
            return (
              <button key={intent} onClick={() => toggle(intent)} className={`rounded-[30px] px-[16px] py-[10px] text-[13px] font-medium transition border ${active ? 'bg-white text-black border-white' : 'bg-transparent text-[#AAA] border-[#333] hover:border-[#555]'}`}>
                {intent}
              </button>
            )
          })}
        </div>

        {/* Destination pills */}
        <p className="text-[12px] text-[#555] font-medium uppercase tracking-[0.06em] mb-[8px]">Popular destinations</p>
        <div className="flex flex-wrap gap-[8px] mb-[24px]">
          {destinations.map((d) => {
            const active = selected.includes(d)
            return (
              <button key={d} onClick={() => toggle(d)} className={`rounded-[30px] px-[14px] py-[8px] text-[12px] font-medium transition border ${active ? 'bg-white text-black border-white' : 'bg-transparent text-[#777] border-[#222] hover:border-[#444]'}`}>
                {d}
              </button>
            )
          })}
        </div>

        {/* Active monitoring */}
        <div className="flex-1" />
        <div className="pb-[90px]">
          <div className="bg-[#111] border border-[#222] rounded-[14px] px-[14px] py-[12px] flex items-center justify-between">
            <div className="flex items-center gap-[8px]">
              <div className="w-[6px] h-[6px] rounded-full bg-[#EF508D]" />
              <p className="text-[13px] text-[#AAA]">Axel is monitoring <span className="text-white font-medium">3 trips</span></p>
            </div>
            <button onClick={() => go('trips-list')} className="text-[12px] text-[#0090FF] font-medium">View</button>
          </div>
        </div>
      </div>

      {/* CTA or input */}
      <div className="absolute left-[16px] right-[16px] bottom-[36px] z-10">
        {selected.length > 0 ? (
          <button onClick={() => go('chat-thinking')} className="w-full py-[14px] rounded-[30px] bg-[#0090FF] hover:brightness-110 transition">
            <p className="text-white text-[14px] font-medium text-center">Find trips for me</p>
          </button>
        ) : (
          <div className="bg-[#111] border border-[#333] rounded-[30px] flex items-center px-[16px] py-[10px]">
            <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Or just tell me what you need..." className="flex-1 bg-transparent text-[14px] text-white outline-none placeholder:text-[#444] font-['Lato',sans-serif]" onKeyDown={(e) => e.key === 'Enter' && text && go('chat-thinking')} />
            <button onClick={() => text && go('chat-thinking')} className="ml-[8px] w-[32px] h-[32px] rounded-full bg-[#333] flex items-center justify-center hover:bg-[#444] transition">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </button>
          </div>
        )}
      </div>
      <HomeIndicator />
    </>
  )
}

// ─── Screen Home D: Agent Feed ──────────────────────────────────────
function ScreenHomeD({ go }) {
  const [text, setText] = useState('')
  return (
    <>
      <StatusBar />
      <div className="absolute left-[16px] top-[68px] right-[16px] bottom-0 flex flex-col">
        {/* Agent status header */}
        <div className="flex items-center justify-between mb-[20px]">
          <div className="flex items-center gap-[10px]">
            <div className="w-[36px] h-[36px] rounded-full bg-[#EF508D]/15 flex items-center justify-center">
              <p className="text-[#EF508D] text-[14px] font-semibold">A</p>
            </div>
            <div>
              <p className="text-white text-[16px] font-medium">Axel</p>
              <p className="text-[12px] text-[#EF508D]">Monitoring 3 trips</p>
            </div>
          </div>
          <button onClick={() => go('new-trip')} className="w-[36px] h-[36px] rounded-full bg-[#0090FF] flex items-center justify-center hover:brightness-110 transition">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
          </button>
        </div>

        {/* Feed */}
        <div className="flex-1 overflow-y-auto pb-[90px]" style={{ scrollbarWidth: 'none' }}>
          <div className="flex flex-col gap-[12px]">
            {/* Alert card */}
            <div className="bg-[#111] border border-[#FB7A29]/20 rounded-[14px] px-[16px] py-[14px]">
              <div className="flex items-center gap-[6px] mb-[6px]">
                <div className="w-[5px] h-[5px] rounded-full bg-[#FB7A29]" />
                <p className="text-[11px] text-[#FB7A29] font-medium uppercase tracking-[0.04em]">Price Alert</p>
                <p className="text-[11px] text-[#555] ml-auto">2 min ago</p>
              </div>
              <p className="text-[14px] text-white leading-[1.4] mb-[8px]">NYC flights dropped <span className="text-[#4FC660] font-medium">$118</span> since yesterday. Best fare now $412.</p>
              <div className="flex gap-[8px]">
                <button onClick={() => go('chat-flights')} className="flex-1 py-[10px] rounded-[10px] bg-[#0090FF] text-white text-[13px] font-medium text-center hover:brightness-110 transition">Book now</button>
                <button className="px-[14px] py-[10px] rounded-[10px] border border-[#333] text-[#AAA] text-[13px] font-medium hover:border-[#555] transition">Later</button>
              </div>
            </div>

            {/* Trip card */}
            <button onClick={() => go('chat-thinking')} className="bg-[#111] border border-[#222] rounded-[14px] px-[16px] py-[14px] text-left hover:border-[#333] transition">
              <div className="flex items-center justify-between mb-[8px]">
                <div className="flex items-center gap-[6px]">
                  <div className="w-[5px] h-[5px] rounded-full bg-[#EF508D]" />
                  <p className="text-[11px] text-[#EF508D] font-medium uppercase tracking-[0.04em]">Monitoring</p>
                </div>
                <p className="text-[11px] text-[#555]">Checked 2 min ago</p>
              </div>
              <p className="text-[15px] text-white font-medium mb-[2px]">Seattle to San Francisco</p>
              <p className="text-[13px] text-[#888]">Apr 15-18 · Flight + Hotel · 2 travelers</p>
              <div className="flex items-center gap-[8px] mt-[8px]">
                <span className="text-[13px] text-[#4FC660] font-medium">$358</span>
                <span className="text-[12px] text-[#555] line-through">$478</span>
                <span className="px-[8px] py-[2px] rounded-[6px] bg-[#4FC660]/10 text-[#4FC660] text-[11px] font-medium">Save $120</span>
              </div>
            </button>

            {/* Confirmed trip */}
            <button onClick={() => go('confirmation')} className="bg-[#111] border border-[#222] rounded-[14px] px-[16px] py-[14px] text-left hover:border-[#333] transition">
              <div className="flex items-center gap-[6px] mb-[8px]">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#4FC660" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 12.75l6 6 9-13.5" /></svg>
                <p className="text-[11px] text-[#4FC660] font-medium uppercase tracking-[0.04em]">Booked</p>
              </div>
              <p className="text-[15px] text-white font-medium mb-[2px]">Portland Day Trip</p>
              <p className="text-[13px] text-[#888]">Apr 22 · Alaska Airlines · $89</p>
            </button>

            {/* Suggestion card */}
            <div className="bg-[#111] border border-[#222] rounded-[14px] px-[16px] py-[14px]">
              <div className="flex items-center gap-[6px] mb-[6px]">
                <div className="w-[5px] h-[5px] rounded-full bg-[#0090FF]" />
                <p className="text-[11px] text-[#0090FF] font-medium uppercase tracking-[0.04em]">Suggestion</p>
              </div>
              <p className="text-[14px] text-white leading-[1.4] mb-[4px]">Based on your trips, you might like weekend fares to LA -- starting at $89.</p>
              <button onClick={() => go('chat-thinking')} className="text-[13px] text-[#0090FF] font-medium mt-[4px]">Tell me more</button>
            </div>
          </div>
        </div>
      </div>

      {/* Input bar */}
      <div className="absolute left-[16px] right-[16px] bottom-[36px] z-10">
        <div className="bg-[#111] border border-[#333] rounded-[30px] flex items-center px-[16px] py-[10px]">
          <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Plan a trip, ask a question..." className="flex-1 bg-transparent text-[14px] text-white outline-none placeholder:text-[#444] font-['Lato',sans-serif]" onKeyDown={(e) => e.key === 'Enter' && text && go('chat-thinking')} />
          <button onClick={() => text && go('chat-thinking')} className="ml-[8px] w-[32px] h-[32px] rounded-full bg-[#0090FF] flex items-center justify-center hover:brightness-110 transition">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </button>
        </div>
      </div>
      <HomeIndicator />
    </>
  )
}

// ─── Screen 4: Chat Thinking ────────────────────────────────────────
function ScreenChatThinking({ go, goBack, variants }) {
  useEffect(() => { const t = setTimeout(() => go('chat-flights'), 2000); return () => clearTimeout(t) }, [go])
  const ThinkingBubble = thinkingBubbles[variants?.thinkingBubble] || thinkingBubbles.A
  return (
    <>
      <StatusBar />
      <BackHeader label="Trips" onBack={goBack} right={<div className="flex items-center gap-[4px]"><div className="w-[6px] h-[6px] rounded-full bg-main" /><p className="text-[11px] text-main font-medium">Axel is searching</p></div>} />
      <div className="absolute left-[16px] top-[100px] right-[16px] bottom-[80px] overflow-hidden">
        <UserBubble text="Business trip to SF, Apr 15-18. Need flights from Seattle." />
        <div className="mb-[10px]">
          <ThinkingBubble label="Finding the best flights..." />
        </div>
      </div>
      <InputBar placeholder="Type a message..." onSubmit={() => {}} />
      <HomeIndicator />
    </>
  )
}

// ─── Screen 5: Chat Flights ─────────────────────────────────────────
function ScreenChatFlights({ go, goBack, variants }) {
  const [visible, setVisible] = useState(false)
  useEffect(() => { const t = setTimeout(() => setVisible(true), 100); return () => clearTimeout(t) }, [])
  const FlightCard = flightDealCards[variants.flightDealCard] || flightDealCards.A
  return (
    <>
      <StatusBar />
      <BackHeader label="Trips" onBack={goBack} />
      <div className="absolute left-[16px] top-[96px] right-[16px] bottom-[80px] overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
        <UserBubble text="Business trip to SF, Apr 15-18. Need flights from Seattle." />
        <div className={`transition-opacity duration-500 ${visible ? 'opacity-100' : 'opacity-0'}`}>
          <AxelLabel />
          <p className="font-['Lato',sans-serif] text-[14px] text-text-1 leading-[1.45] mb-[10px] max-w-[300px]">
            All nonstops, around 2h 15m. Morning departures have the best prices:
          </p>
          <div className="flex flex-col gap-[8px] mb-[12px]">
            {FLIGHT_DEALS.map((deal, i) => (
              <FlightCard key={i} deal={deal} mode="list" onClick={() => go('chat-hotel-thinking')} />
            ))}
          </div>
          <div className="flex gap-[8px]">
            <button onClick={() => go('chat-hotel-thinking')} className="border border-[#0090FF] rounded-[30px] px-[14px] py-[7px]">
              <p className="text-[12px] font-medium text-[#0090FF]">Find hotels too</p>
            </button>
            <button onClick={() => go('itinerary')} className="border border-[#0090FF] rounded-[30px] px-[14px] py-[7px]">
              <p className="text-[12px] font-medium text-[#0090FF]">Just flights</p>
            </button>
          </div>
        </div>
      </div>
      <InputBar placeholder="Type a message..." onSubmit={() => {}} />
      <HomeIndicator />
    </>
  )
}

// ─── Screen 6: Hotel Search Thinking ────────────────────────────────
function ScreenChatHotelThinking({ go, goBack, variants }) {
  useEffect(() => { const t = setTimeout(() => go('chat-hotels'), 2000); return () => clearTimeout(t) }, [go])
  const ThinkingBubble = thinkingBubbles[variants?.thinkingBubble] || thinkingBubbles.A
  return (
    <>
      <StatusBar />
      <BackHeader label="Trips" onBack={goBack} />
      <div className="absolute left-[16px] top-[96px] right-[16px] bottom-[80px] overflow-hidden">
        <UserBubble text="Book the 7:12am United flight" />
        <div className="mb-[10px]">
          <AxelLabel />
          <p className="font-['Lato',sans-serif] text-[14px] text-text-1 leading-[1.45] mb-[8px] max-w-[300px]">Done -- United 7:12am is locked in.</p>
          {(() => { const ConfirmedFlight = confirmedFlightCards[variants?.confirmedFlightCard] || confirmedFlightCards.A; return <div className="mb-[10px]"><ConfirmedFlight flight={{ airline: 'United Airlines', from: 'SEA', to: 'SFO', departTime: '7:12am', arriveTime: '9:30am', date: 'Apr 15', duration: '2h 18m', price: 218 }} /></div> })()}
          <p className="font-['Lato',sans-serif] text-[14px] text-text-1 leading-[1.45] mb-[8px] max-w-[300px]">Now finding hotels for Apr 15-18.</p>
          <ThinkingBubble label="Searching hotels nearby..." />
        </div>
      </div>
      <InputBar placeholder="Type a message..." onSubmit={() => {}} />
      <HomeIndicator />
    </>
  )
}

// ─── Screen 7: Chat Hotels ──────────────────────────────────────────
function ScreenChatHotels({ go, goBack, variants }) {
  const HotelCard = hotelDealCards[variants.hotelDealCard] || hotelDealCards.A
  return (
    <>
      <StatusBar />
      <BackHeader label="Trips" onBack={goBack} />
      <div className="absolute left-[16px] top-[96px] right-[16px] bottom-[80px] overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
        <p className="font-['Lato',sans-serif] text-[12px] text-[#989898] leading-normal mb-[8px]">Flight confirmed: United SEA to SFO, Apr 15</p>
        <AxelLabel />
        <p className="font-['Lato',sans-serif] text-[14px] text-text-1 leading-[1.45] mb-[10px] max-w-[300px]">Here are the top picks near Union Square and downtown:</p>
        <div className="flex flex-col gap-[8px] mb-[12px]">
          {HOTEL_DEALS.map((deal, i) => (
            <HotelCard key={i} deal={deal} mode="list" onClick={() => go('hotel-detail')} />
          ))}
        </div>
        <div className="flex gap-[8px]">
          <button onClick={() => go('hotel-map')} className="border border-[#0090FF] rounded-[30px] px-[14px] py-[7px]"><p className="text-[12px] font-medium text-[#0090FF]">View on map</p></button>
          <button className="border border-[#0090FF] rounded-[30px] px-[14px] py-[7px]"><p className="text-[12px] font-medium text-[#0090FF]">See more</p></button>
        </div>
      </div>
      <InputBar placeholder="Type a message..." onSubmit={() => {}} />
      <HomeIndicator />
    </>
  )
}

// ─── Screen 8: Hotel Map ────────────────────────────────────────────
function ScreenHotelMap({ go, goBack, variants }) {
  const [pin, setPin] = useState(1)
  const sel = PINS[pin]
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
          <button key={p.id} onClick={() => setPin(p.id)} className="absolute flex flex-col items-center" style={{ top: p.top, left: p.left, transform: 'translate(-50%, -50%)' }}>
            <div className={`w-[28px] h-[28px] rounded-full flex items-center justify-center shadow-lg transition ${p.best ? 'bg-green' : 'bg-white'} ${pin === p.id ? 'ring-2 ring-white/40 scale-110' : ''}`}>
              <p className={`text-[10px] font-semibold leading-none ${p.best ? 'text-white' : 'text-[#181818]'}`}>${p.price}</p>
            </div>
            <div className={`w-0 h-0 border-l-[5px] border-r-[5px] border-t-[6px] border-l-transparent border-r-transparent ${p.best ? 'border-t-green' : 'border-t-white'}`} />
          </button>
        ))}
      </div>
      <div className="absolute left-0 right-0 bottom-0 z-10">
        {(() => { const HotelMapPeek = hotelMapPeekCards[variants?.hotelMapPeekCard] || hotelMapPeekCards.A; return <HotelMapPeek hotel={sel} ctaLabel="Select this hotel" onCta={() => go('hotel-detail')} /> })()}
      </div>
    </>
  )
}

// ─── Screen 9: Hotel Detail ─────────────────────────────────────────
function ScreenHotelDetail({ go, goBack, variants }) {
  return (
    <>
      <StatusBar />
      <div className="absolute left-[16px] top-[68px] right-[16px] flex items-center gap-[8px] z-10">
        <button onClick={goBack}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#989898" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg></button>
        <p className="text-[15px] font-medium text-text-1">Hotel Nikko SF</p>
      </div>
      <div className="absolute left-[16px] top-[100px] right-[16px] bottom-[80px] overflow-hidden">
        <div className="relative h-[140px] rounded-[12px] mb-[12px] flex items-center justify-center overflow-hidden" style={{ background: 'radial-gradient(ellipse at 70% 30%, rgba(255,200,150,0.08), transparent 60%), linear-gradient(135deg, #2A3040, #1E2832, #2A2A2A)' }}>
          <svg className="absolute inset-0 w-full h-full opacity-[0.05]" viewBox="0 0 200 120" fill="none" stroke="white" strokeWidth="1.5" preserveAspectRatio="xMidYMid slice"><rect x="120" y="15" width="50" height="35" rx="2" /><line x1="145" y1="15" x2="145" y2="50" /><line x1="120" y1="32" x2="170" y2="32" /><rect x="30" y="55" width="65" height="35" rx="5" /><rect x="30" y="48" width="65" height="14" rx="4" /><rect x="36" y="60" width="24" height="16" rx="3" /><rect x="65" y="60" width="24" height="16" rx="3" /></svg>
        </div>
        <p className="font-semibold text-[18px] text-text-1 leading-[1.2]">Hotel Nikko SF</p>
        <div className="flex items-center gap-[6px] mt-[4px]">
          <div className="flex">{[0,1,2,3].map((i)=><span key={i} className="text-[#F5C518] text-[13px] leading-none">&#9733;</span>)}</div>
          <p className="font-['Lato',sans-serif] text-[13px] text-[#989898]">Union Square, San Francisco</p>
        </div>
        <div className="flex flex-wrap gap-[6px] mt-[10px] mb-[12px]">
          {AMENITIES.map((a)=>(<span key={a} className="px-[8px] py-[4px] rounded-full bg-[#2A2A2A] text-[11px] text-[#989898]">{a}</span>))}
        </div>
        <div className="bg-[#242424] rounded-[10px] px-[14px] py-[12px] mb-[8px]">
          <p className="font-semibold text-[14px] text-text-1 leading-[1.3]">Standard King</p>
          <p className="font-['Lato',sans-serif] text-[12px] text-[#989898] mt-[3px]">1 King Bed · City View · Apr 15-18 (3 nights)</p>
        </div>
        {(() => { const PriceBreakdown = priceBreakdownCards[variants?.priceBreakdownCard] || priceBreakdownCards.A; return <PriceBreakdown lineItems={[{ label: '3 nights × $189', amount: '$567' }, { label: 'Taxes & fees', amount: '$68', color: 'muted' }]} total={{ label: 'Total', amount: '$635' }} savings={{ label: 'You save', amount: '$168' }} /> })()}
      </div>
      <div className="absolute left-[16px] right-[16px] bottom-[32px]">
        <CTABtn label="Select this hotel" onClick={() => go('itinerary')} />
      </div>
      <HomeIndicator />
    </>
  )
}

// ─── Screen 10: Itinerary ───────────────────────────────────────────
function ScreenItinerary({ go, goBack, variants }) {
  const [fn, setFn] = useState('Alex')
  const [ln, setLn] = useState('Morgan')
  const [em, setEm] = useState('alex@email.com')
  const inputCls = "w-full bg-[#2A2A2A] border border-[#474747] rounded-[10px] px-[12px] py-[10px] text-[13px] text-text-1 outline-none focus:border-[#0090FF]/50 transition"
  return (
    <>
      <StatusBar />
      <div className="absolute left-[16px] top-[68px] right-[16px] flex items-center gap-[8px]">
        <button onClick={goBack}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#989898" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg></button>
        <p className="font-medium text-[15px] text-text-1 leading-normal">Trip Summary</p>
      </div>
      <div className="absolute left-[16px] top-[100px] right-[16px] bottom-[76px] overflow-hidden">
        {(() => { const ConfirmedBooking = confirmedBookingCards[variants?.confirmedBookingCard] || confirmedBookingCards.A; return <><div className="mb-[6px]"><ConfirmedBooking type="flight" title="United UA 224 · SEA → SFO" details="Apr 15 · 7:12am – 9:30am · Nonstop" /></div><div className="mb-[6px]"><ConfirmedBooking type="hotel" title="Hotel Nikko SF" details="Apr 15–18 · 3 nights · Standard King" /></div></> })()}
        {(() => { const PriceBreakdown = priceBreakdownCards[variants?.priceBreakdownCard] || priceBreakdownCards.A; return <div className="mb-[12px]"><PriceBreakdown lineItems={[{ label: 'Flight', amount: '$218' }, { label: 'Hotel (3 nights)', amount: '$567' }, { label: 'Taxes & fees', amount: '$94', color: 'muted' }]} total={{ label: 'Total', amount: '$879' }} savings={{ label: 'You save', amount: '$224' }} /></div> })()}
        <p className="font-medium text-[15px] text-text-1 leading-normal mb-[10px]">Traveler Details</p>
        <div className="flex gap-[8px] mb-[10px]">
          <div className="flex-1"><p className="text-[11px] text-[#989898] font-medium mb-[4px]">First Name</p><input value={fn} onChange={e=>setFn(e.target.value)} className={inputCls} /></div>
          <div className="flex-1"><p className="text-[11px] text-[#989898] font-medium mb-[4px]">Last Name</p><input value={ln} onChange={e=>setLn(e.target.value)} className={inputCls} /></div>
        </div>
        <div className="mb-[10px]"><p className="text-[11px] text-[#989898] font-medium mb-[4px]">Email</p><input value={em} onChange={e=>setEm(e.target.value)} type="email" className={inputCls} /></div>
      </div>
      <div className="absolute left-[16px] right-[16px] bottom-[32px]">
        <CTABtn label="Continue" onClick={() => go('paywall')} />
      </div>
      <HomeIndicator />
    </>
  )
}

// ─── Screen 11: Paywall ─────────────────────────────────────────────
function ScreenPaywall({ go, goBack, variants }) {
  return (
    <>
      <StatusBar />
      <div className="absolute left-0 right-0 top-[59px] bottom-0 flex flex-col items-center justify-center">
        {(() => { const Paywall = paywallCards[variants?.paywallCard] || paywallCards.A; return <Paywall benefits={['Average $284 savings per booking','Price monitoring on all trips','Automatic rebooking when prices drop','Free cancellation within 24 hours']} price="$9.99" period="month" ctaLabel="Become a member" onCta={() => go('payment')} onSkip={goBack} /> })()}
      </div>
    </>
  )
}

// ─── Screen 12: Payment ─────────────────────────────────────────────
function ScreenPayment({ go, goBack, variants }) {
  return (
    <>
      <StatusBar />
      <div className="absolute left-[16px] top-[68px] right-[16px] flex items-center gap-[8px]">
        <button onClick={goBack}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#989898" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg></button>
        <p className="font-medium text-[15px] text-text-1 leading-normal">Complete booking</p>
      </div>
      <div className="absolute left-[16px] top-[100px] right-[16px] bottom-[76px] overflow-hidden">
        {(() => { const OrderSummary = orderSummaryCards[variants?.orderSummaryCard] || orderSummaryCards.A; return <div className="mb-[14px]"><OrderSummary title="SF Business Trip" subtitle="Apr 15–18 · 1 traveler" items={[{ icon: '', text: 'United SEA→SFO · Apr 15' }, { icon: '', text: 'Hotel Nikko SF · 3 nights' }]} /></div> })()}
        <p className="font-medium text-[15px] text-text-1 leading-normal mb-[10px]">Payment Method</p>
        {(() => { const SavedPayment = savedPaymentCards[variants?.savedPaymentCard] || savedPaymentCards.A; return <div className="mb-[8px]"><SavedPayment last4="4242" brand="Visa" selected={true} /></div> })()}
        <p className="text-[12px] text-text-2 leading-normal mb-[14px]">Or add a new card</p>
        {(() => { const PriceBreakdown = priceBreakdownCards[variants?.priceBreakdownCard] || priceBreakdownCards.A; return <PriceBreakdown lineItems={[{ label: 'Subtotal', amount: '$785' }, { label: 'Taxes & fees', amount: '$94', color: 'muted' }, { label: 'Member discount', amount: '−$47', color: 'green' }]} total={{ label: 'Total', amount: '$832' }} /> })()}
      </div>
      <div className="absolute left-[16px] right-[16px] bottom-[32px]">
        <CTABtn label="Pay $832" onClick={() => go('confirmation')} />
      </div>
      <HomeIndicator />
    </>
  )
}

// ─── Screen 13: Confirmation ────────────────────────────────────────
function ScreenConfirmation({ go }) {
  return (
    <>
      <StatusBar />
      <div className="absolute left-0 right-0 top-[59px] bottom-0 flex flex-col items-center justify-center px-[24px]">
        <div className="w-[64px] h-[64px] rounded-full bg-green/20 flex items-center justify-center mb-[12px]">
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none"><path d="M8 16l6 6 10-12" stroke="#4fc660" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </div>
        <p className="font-semibold text-[20px] text-text-1 leading-normal mt-[14px] mb-[6px]">You&apos;re all set</p>
        <p className="text-[14px] text-text-2 leading-normal mb-[2px]">SF Business Trip</p>
        <p className="text-[13px] text-text-2 leading-normal mb-[16px]">Apr 15-18, 2026</p>
        <div className="w-full max-w-[280px] mb-[16px]">
          <div className="border-l-2 border-green pl-[12px] mb-[10px]"><p className="text-[13px] text-text-2 leading-normal">United SEA to SFO · Apr 15 · 7:12am</p></div>
          <div className="border-l-2 border-green pl-[12px]"><p className="text-[13px] text-text-2 leading-normal">Hotel Nikko SF · 3 nights</p></div>
        </div>
        <p className="text-[11px] text-text-2 font-mono tracking-[0.5px] mt-[16px] mb-[24px]">Confirmation #AX-48291</p>
        <button onClick={() => go('trips-list-done')} className="bg-[#0090FF] flex items-center justify-center px-[28px] py-[14px] rounded-[30px] cursor-pointer hover:brightness-110 transition"><p className="font-medium text-[14px] text-white text-center leading-normal">View trip</p></button>
        <button onClick={() => go('trips-list-done')} className="mt-[12px]"><p className="text-[13px] text-text-2 text-center hover:text-text-1 transition">Back to trips</p></button>
      </div>
    </>
  )
}

// ─── Turn-Based Flow Components ─────────────────────────────────────

function AxelText({ children }) {
  return (
    <div className="mb-[12px]">
      <p className="text-[11px] font-medium text-[#EF508D] tracking-[0.05em] mb-[4px]">AXEL</p>
      <p className="font-['Lato',sans-serif] text-[20px] text-white leading-[1.35]">{children}</p>
    </div>
  )
}

function FlightInfo({ flight }) {
  return (
    <div className="bg-[#111] border border-[#222] rounded-[12px] px-[16px] py-[14px] mb-[8px]">
      <div className="flex items-center justify-between mb-[6px]">
        <p className="font-['Lato',sans-serif] text-[14px] text-white font-medium">{flight.airline}</p>
        <p className="font-['Lato',sans-serif] text-[12px] text-[#666]">{flight.flight_number}</p>
      </div>
      <div className="flex items-center gap-[8px] mb-[4px]">
        <p className="font-['Lato',sans-serif] text-[15px] text-white">{flight.from}</p>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
        <p className="font-['Lato',sans-serif] text-[15px] text-white">{flight.to}</p>
      </div>
      <div className="flex items-center gap-[12px]">
        <p className="font-['Lato',sans-serif] text-[13px] text-[#AAA]">{flight.depart_time} - {flight.arrive_time}</p>
        <p className="font-['Lato',sans-serif] text-[12px] text-[#666]">{flight.duration}</p>
        <p className="font-['Lato',sans-serif] text-[12px] text-[#666]">{flight.date}</p>
      </div>
    </div>
  )
}

function BookableFlight({ deal, selected, onSelect }) {
  return (
    <button onClick={onSelect} className={`w-full text-left bg-[#111] border rounded-[12px] px-[16px] py-[14px] mb-[8px] transition ${selected ? 'border-[#0090FF]' : 'border-[#222] hover:border-[#333]'}`}>
      <div className="flex items-center justify-between mb-[6px]">
        <p className="font-['Lato',sans-serif] text-[14px] text-white font-medium">{deal.airline}</p>
        <p className="font-['Lato',sans-serif] text-[16px] text-[#FB7A29] font-semibold">${deal.price}</p>
      </div>
      <div className="flex items-center gap-[8px] mb-[4px]">
        <p className="font-['Lato',sans-serif] text-[13px] text-[#AAA]">{deal.from} {deal.depart_time}</p>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
        <p className="font-['Lato',sans-serif] text-[13px] text-[#AAA]">{deal.to} {deal.arrive_time}</p>
      </div>
      <div className="flex items-center gap-[8px]">
        <span className="text-[12px] text-[#4FC660] font-medium">Save ${deal.saved}</span>
        {deal.stops === 'Nonstop' && <span className="px-[8px] py-[2px] rounded-[6px] bg-[#4FC660]/10 text-[#4FC660] text-[11px] font-medium">Nonstop</span>}
        <span className="text-[12px] text-[#666]">{deal.duration}</span>
      </div>
    </button>
  )
}

function BookableHotel({ deal, selected, onSelect }) {
  return (
    <button onClick={onSelect} className={`w-full text-left bg-[#111] border rounded-[12px] px-[16px] py-[14px] mb-[8px] transition ${selected ? 'border-[#0090FF]' : 'border-[#222] hover:border-[#333]'}`}>
      <div className="flex items-center justify-between mb-[4px]">
        <div className="flex items-center gap-[6px]">
          <p className="font-['Lato',sans-serif] text-[14px] text-white font-medium">{deal.name}</p>
          <div className="flex">{Array.from({ length: deal.stars }, (_, i) => <span key={i} className="text-[#F5C518] text-[10px] leading-none">&#9733;</span>)}</div>
        </div>
        <p className="font-['Lato',sans-serif] text-[16px] text-[#FB7A29] font-semibold">${deal.price_per_night}<span className="text-[12px] text-[#666] font-normal">/nt</span></p>
      </div>
      <p className="font-['Lato',sans-serif] text-[12px] text-[#666] mb-[6px]">{deal.location}</p>
      <div className="flex flex-wrap gap-[4px] mb-[6px]">
        {deal.amenities.slice(0, 3).map((a) => <span key={a} className="px-[6px] py-[2px] rounded-full bg-[#1A1A1A] text-[10px] text-[#888]">{a}</span>)}
      </div>
      <span className="text-[12px] text-[#4FC660] font-medium">Save ${deal.saved}</span>
    </button>
  )
}

function HotelMapInline({ pins, selectedPin, onSelectPin }) {
  const sel = pins[selectedPin]
  return (
    <div className="relative rounded-[12px] overflow-hidden mb-[8px]" style={{ height: 240, backgroundColor: '#1a1a1a', backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      <div className="absolute inset-0"><svg width="100%" height="100%" className="opacity-[0.06]"><line x1="0" y1="45%" x2="100%" y2="42%" stroke="#fff" strokeWidth="2" /><line x1="30%" y1="0" x2="35%" y2="100%" stroke="#fff" strokeWidth="2" /><line x1="60%" y1="0" x2="55%" y2="100%" stroke="#fff" strokeWidth="1.5" /></svg></div>
      {pins.map((p) => (
        <button key={p.id} onClick={() => onSelectPin(p.id)} className="absolute flex flex-col items-center" style={{ top: p.top, left: p.left, transform: 'translate(-50%, -50%)' }}>
          <div className={`w-[24px] h-[24px] rounded-full flex items-center justify-center shadow-lg transition ${p.best ? 'bg-[#4FC660]' : 'bg-white'} ${selectedPin === p.id ? 'ring-2 ring-white/40 scale-110' : ''}`}>
            <p className={`text-[9px] font-semibold leading-none ${p.best ? 'text-white' : 'text-[#181818]'}`}>${p.price}</p>
          </div>
          <div className={`w-0 h-0 border-l-[4px] border-r-[4px] border-t-[5px] border-l-transparent border-r-transparent ${p.best ? 'border-t-[#4FC660]' : 'border-t-white'}`} />
        </button>
      ))}
      {sel && (
        <div className="absolute bottom-[8px] left-[8px] right-[8px] bg-[#111]/90 border border-[#222] rounded-[10px] px-[12px] py-[8px] flex items-center justify-between backdrop-blur-sm">
          <div>
            <p className="font-['Lato',sans-serif] text-[13px] text-white font-medium">{sel.name}</p>
            <p className="font-['Lato',sans-serif] text-[11px] text-[#888]">{sel.area}</p>
          </div>
          <p className="font-['Lato',sans-serif] text-[14px] text-[#FB7A29] font-semibold">${sel.price}/nt</p>
        </div>
      )}
    </div>
  )
}

function ForwardEmail({ subject, from, to, type }) {
  return (
    <div className="bg-[#111] border border-[#222] rounded-[12px] px-[16px] py-[14px] mb-[8px]">
      <div className="flex items-center gap-[8px] mb-[6px]">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M22 7l-10 7L2 7" /></svg>
        <p className="font-['Lato',sans-serif] text-[14px] text-white font-medium">{subject}</p>
      </div>
      <div className="flex items-center gap-[12px] mb-[4px]">
        <p className="font-['Lato',sans-serif] text-[12px] text-[#888]">From: {from}</p>
        <p className="font-['Lato',sans-serif] text-[12px] text-[#888]">To: {to}</p>
      </div>
      {type && <span className="px-[8px] py-[2px] rounded-[6px] bg-[#1A1A1A] text-[11px] text-[#888]">{type}</span>}
    </div>
  )
}

function Suggestion({ text, actionLabel, onAction }) {
  return (
    <div className="bg-[#111] border border-[#222] rounded-[12px] px-[16px] py-[12px] mb-[8px] flex items-start gap-[10px]">
      <div className="w-[6px] h-[6px] rounded-full bg-[#EF508D] mt-[6px] shrink-0" />
      <div className="flex-1">
        <p className="font-['Lato',sans-serif] text-[14px] text-white leading-[1.4]">{text}</p>
        {actionLabel && <button onClick={onAction} className="text-[13px] text-[#0090FF] font-medium mt-[4px]">{actionLabel}</button>}
      </div>
    </div>
  )
}

function HotelImage() {
  return (
    <div className="relative h-[100px] rounded-[12px] mb-[8px] flex items-center justify-center overflow-hidden" style={{ background: 'radial-gradient(ellipse at 70% 30%, rgba(255,200,150,0.08), transparent 60%), linear-gradient(135deg, #2A3040, #1E2832, #2A2A2A)' }}>
      <svg className="absolute inset-0 w-full h-full opacity-[0.05]" viewBox="0 0 200 120" fill="none" stroke="white" strokeWidth="1.5" preserveAspectRatio="xMidYMid slice"><rect x="120" y="15" width="50" height="35" rx="2" /><line x1="145" y1="15" x2="145" y2="50" /><line x1="120" y1="32" x2="170" y2="32" /><rect x="30" y="55" width="65" height="35" rx="5" /><rect x="30" y="48" width="65" height="14" rx="4" /><rect x="36" y="60" width="24" height="16" rx="3" /><rect x="65" y="60" width="24" height="16" rx="3" /></svg>
      <p className="font-['Lato',sans-serif] text-[13px] text-[#444] z-10">Hotel Nikko SF</p>
    </div>
  )
}

// ─── Scene 1: New Trip ──────────────────────────────────────────────
function SceneNewTrip({ go }) {
  return (
    <>
      <StatusBar />
      <div className="absolute left-[16px] top-[68px] right-[16px] bottom-[36px] overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
        <AxelText>Got it -- San Francisco for work next week. Let me pull together some options.</AxelText>
        <Suggestion
          text="I found 3 nonstop flights and 12 hotels near Union Square. Want me to narrow it down?"
          actionLabel="Show me the best options"
          onAction={() => go('scene-context')}
        />
        <Suggestion
          text="Your calendar is clear Apr 15-18. I can also check Fri departures if you want to extend."
          actionLabel="Check Friday flights"
          onAction={() => go('scene-context')}
        />
      </div>
      <HomeIndicator />
    </>
  )
}

// ─── Scene 2: Context — Flights + Hotels + Map ──────────────────────
function SceneContext({ go }) {
  const [selectedFlight, setSelectedFlight] = useState(null)
  const [selectedHotel, setSelectedHotel] = useState(null)
  const [selectedPin, setSelectedPin] = useState(1)
  const bothSelected = selectedFlight !== null && selectedHotel !== null
  return (
    <>
      <StatusBar />
      <div className="absolute left-[16px] top-[68px] right-[16px] bottom-[36px] overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
        <AxelText>Here are the best options I found for your SF trip.</AxelText>

        <p className="font-['Lato',sans-serif] text-[12px] text-[#666] font-medium uppercase tracking-[0.06em] mb-[8px]">Flights -- Apr 15, SEA to SFO</p>
        {FLIGHT_DEALS.map((deal, i) => (
          <BookableFlight key={i} deal={deal} selected={selectedFlight === i} onSelect={() => setSelectedFlight(i)} />
        ))}

        <p className="font-['Lato',sans-serif] text-[12px] text-[#666] font-medium uppercase tracking-[0.06em] mb-[8px] mt-[16px]">Hotels -- 3 nights near downtown</p>
        {HOTEL_DEALS.slice(0, 2).map((deal, i) => (
          <BookableHotel key={i} deal={deal} selected={selectedHotel === i} onSelect={() => { setSelectedHotel(i); setSelectedPin(i) }} />
        ))}

        <HotelMapInline pins={PINS} selectedPin={selectedPin} onSelectPin={(id) => { setSelectedPin(id); if (id < 2) setSelectedHotel(id) }} />

        {bothSelected && (
          <div className="mt-[8px]">
            <CTABtn label="Lock in these picks" onClick={() => go('scene-cached')} />
          </div>
        )}
        <div className="h-[16px]" />
      </div>
      <HomeIndicator />
    </>
  )
}

// ─── Scene 3: Cached — Re-entry ─────────────────────────────────────
function SceneCached({ go }) {
  return (
    <>
      <StatusBar />
      <div className="absolute left-[16px] top-[68px] right-[16px] bottom-[36px] overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
        <AxelText>Welcome back. Your trip is still on hold.</AxelText>
        <FlightInfo flight={FLIGHT_DEALS[0]} />
        <HotelImage />
        <p className="font-['Lato',sans-serif] text-[13px] text-[#AAA] mb-[12px]">Hotel Nikko SF -- 3 nights, $189/nt</p>
        <Suggestion
          text="Prices are stable. I'd lock this in before the weekend rush."
          actionLabel="Book now"
          onAction={() => go('scene-decision')}
        />
        <Suggestion
          text="Want me to keep watching for price drops?"
          actionLabel="Keep watching"
          onAction={() => go('scene-updates')}
        />
      </div>
      <HomeIndicator />
    </>
  )
}

// ─── Scene 4: Updates — Price Change ────────────────────────────────
function SceneUpdates({ go }) {
  return (
    <>
      <StatusBar />
      <div className="absolute left-[16px] top-[68px] right-[16px] bottom-[36px] overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
        <AxelText>Price update on your SF trip.</AxelText>

        <div className="bg-[#111] border border-[#FB7A29]/30 rounded-[12px] px-[16px] py-[14px] mb-[8px]">
          <div className="flex items-center gap-[6px] mb-[6px]">
            <div className="w-[5px] h-[5px] rounded-full bg-[#FB7A29]" />
            <p className="text-[11px] text-[#FB7A29] font-medium uppercase tracking-[0.04em]">Price Drop</p>
          </div>
          <p className="font-['Lato',sans-serif] text-[14px] text-white leading-[1.4]">The Marker dropped to <span className="text-[#4FC660] font-semibold">$166/night</span> -- that is $1 less per night than before.</p>
        </div>

        <BookableHotel deal={HOTEL_DEAL_UPDATED} selected={false} onSelect={() => go('scene-decision')} />

        <ForwardEmail
          subject="Price alert: The Marker SF"
          from="axel@notifications"
          to="alex@email.com"
          type="Price Alert"
        />
      </div>
      <HomeIndicator />
    </>
  )
}

// ─── Scene 5: Decision — Confirmed Wrap-Up ──────────────────────────
function SceneDecision({ go }) {
  return (
    <>
      <StatusBar />
      <div className="absolute left-[16px] top-[68px] right-[16px] bottom-[36px] overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
        <AxelText>All set. Here is your confirmed trip.</AxelText>

        <FlightInfo flight={FLIGHT_DEALS[0]} />
        <HotelImage />
        <p className="font-['Lato',sans-serif] text-[13px] text-[#AAA] mb-[12px]">Hotel Nikko SF -- 3 nights, $189/nt</p>

        <div className="bg-[#111] border border-[#222] rounded-[12px] px-[16px] py-[14px] mb-[8px]">
          <div className="flex items-center justify-between mb-[6px]">
            <p className="font-['Lato',sans-serif] text-[14px] text-white font-medium">Trip Total</p>
            <p className="font-['Lato',sans-serif] text-[16px] text-white font-semibold">$785</p>
          </div>
          <div className="flex items-center justify-between mb-[4px]">
            <p className="font-['Lato',sans-serif] text-[13px] text-[#888]">Flight (United UA 224)</p>
            <p className="font-['Lato',sans-serif] text-[13px] text-[#AAA]">$218</p>
          </div>
          <div className="flex items-center justify-between mb-[4px]">
            <p className="font-['Lato',sans-serif] text-[13px] text-[#888]">Hotel (3 nights)</p>
            <p className="font-['Lato',sans-serif] text-[13px] text-[#AAA]">$567</p>
          </div>
          <div className="flex items-center justify-between pt-[6px] border-t border-[#222]">
            <p className="font-['Lato',sans-serif] text-[13px] text-[#4FC660] font-medium">You saved</p>
            <p className="font-['Lato',sans-serif] text-[13px] text-[#4FC660] font-medium">$224</p>
          </div>
        </div>

        <ForwardEmail
          subject="Booking confirmed: SF Business Trip"
          from="axel@bookings"
          to="alex@email.com"
          type="Confirmation"
        />

        <div className="mt-[8px]">
          <CTABtn label="View trip details" onClick={() => go('confirmation')} />
        </div>
        <div className="h-[16px]" />
      </div>
      <HomeIndicator />
    </>
  )
}

// ─── Component Sidebar (iteration-based) ────────────────────────────
const SIDEBAR_DEFS = [
  { key: 'tripCard', label: 'Trip Card', screens: ['trips-list', 'trips-list-done'], versions: TRIP_CARD_VERSIONS },
  { key: 'flightDealCard', label: 'Flight Deal Card', screens: ['chat-flights'], versions: FLIGHT_VERSIONS },
  { key: 'hotelDealCard', label: 'Hotel Deal Card', screens: ['chat-hotels'], versions: HOTEL_VERSIONS },
  { key: 'thinkingBubble', label: 'Thinking Bubble', screens: ['chat-thinking', 'chat-hotel-thinking'], versions: THINKING_VERSIONS },
  { key: 'confirmedFlightCard', label: 'Confirmed Flight', screens: ['chat-hotel-thinking'], versions: CONFIRMED_FLIGHT_VERSIONS },
  { key: 'confirmedBookingCard', label: 'Confirmed Booking', screens: ['itinerary'], versions: CONFIRMED_BOOKING_VERSIONS },
  { key: 'priceBreakdownCard', label: 'Price Breakdown', screens: ['hotel-detail', 'itinerary', 'payment'], versions: PRICE_BREAKDOWN_VERSIONS },
  { key: 'orderSummaryCard', label: 'Order Summary', screens: ['payment'], versions: ORDER_SUMMARY_VERSIONS },
  { key: 'savedPaymentCard', label: 'Saved Payment', screens: ['payment'], versions: SAVED_PAYMENT_VERSIONS },
  { key: 'hotelMapPeekCard', label: 'Hotel Map Peek', screens: ['hotel-map'], versions: HOTEL_MAP_PEEK_VERSIONS },
  { key: 'paywallCard', label: 'Paywall', screens: ['paywall'], versions: PAYWALL_VERSIONS },
]

function getNextVersion(versions) {
  if (!versions || versions.length === 0) return 'v1.0.0'
  const last = versions[versions.length - 1].version
  const major = parseInt(last.replace('v', '').split('.')[0], 10) || 0
  return `v${major + 1}.0.0`
}

function ComponentSidebar({ variants, setVariants, currentScreen, combinations, onSave, onLoad, onDelete, showSaveInput, setShowSaveInput, saveInputName, setSaveInputName, componentVersions, onSaveVersion, onDeleteVersion, compareMode, setCompareMode }) {
  const DEFAULT_VARIANTS = {
    flightDealCard: 'A', hotelDealCard: 'A', thinkingBubble: 'A',
    tripCard: 'A', confirmedFlightCard: 'A', priceBreakdownCard: 'A',
    confirmedBookingCard: 'A', orderSummaryCard: 'A', paywallCard: 'A',
    hotelMapPeekCard: 'A', savedPaymentCard: 'A',
  }
  return (
    <div className="w-[230px] bg-[#1a1a1a] rounded-[12px] p-[16px] self-start overflow-y-auto max-h-[852px]">
      <p className="text-[12px] font-medium text-text-2/50 uppercase tracking-[0.08em] mb-[12px]">Components</p>
      {SIDEBAR_DEFS.map((comp) => {
        const isActive = comp.screens.includes(currentScreen)
        const currentVer = comp.versions.find((v) => v.label === variants[comp.key])
        const savedVersions = componentVersions[comp.key] || []
        const isLatest = savedVersions.length === 0 || savedVersions[savedVersions.length - 1]?.variant === variants[comp.key]
        const isComparing = compareMode?.componentKey === comp.key
        return (
          <div key={comp.key} className={`mb-[16px] last:mb-0 transition ${isActive ? 'opacity-100' : 'opacity-40'}`}>
            <div className="flex items-center gap-[6px] mb-[6px]">
              {isActive && <div className="w-[5px] h-[5px] rounded-full bg-main shrink-0" />}
              <p className={`text-[13px] font-medium ${isActive ? 'text-text-1' : 'text-text-2'} flex-1 min-w-0 truncate`}>{comp.label}</p>
              {savedVersions.length > 0 && (
                <span className="text-[10px] text-text-2/30 shrink-0">{savedVersions.length}v</span>
              )}
            </div>
            <div className="flex flex-wrap gap-[4px] ml-[11px]">
              {comp.versions.map((ver) => {
                const isSelected = variants[comp.key] === ver.label
                return (
                  <button
                    key={ver.label}
                    onClick={() => setVariants((prev) => ({ ...prev, [comp.key]: ver.label }))}
                    title={ver.notes}
                    className={`px-[10px] py-[4px] rounded-full text-[11px] font-medium transition ${
                      isSelected
                        ? 'bg-white/10 text-white'
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
            {/* Version controls */}
            <div className="ml-[11px] mt-[6px] flex items-center gap-[4px] flex-wrap">
              {savedVersions.length > 0 && (
                <select
                  value=""
                  onChange={(e) => {
                    const ver = savedVersions.find(v => v.version === e.target.value)
                    if (ver) setVariants(prev => ({ ...prev, [comp.key]: ver.variant }))
                  }}
                  className="bg-[#111] border border-[#222] rounded-[4px] text-[11px] text-text-2 px-[4px] py-[2px] outline-none font-['Lato',sans-serif] cursor-pointer"
                  style={{ maxWidth: 90 }}
                >
                  <option value="">Versions</option>
                  {savedVersions.map(sv => (
                    <option key={sv.version} value={sv.version}>
                      {sv.version} ({sv.variant}){sv.notes ? ` - ${sv.notes}` : ''}
                    </option>
                  ))}
                </select>
              )}
              {isLatest && savedVersions.length > 0 && (
                <span className="text-[10px] font-medium" style={{ color: '#4FC660' }}>latest</span>
              )}
              <button
                onClick={() => onSaveVersion(comp.key, variants[comp.key])}
                className="bg-[#222] text-text-2/60 hover:text-text-2 px-[8px] py-[3px] rounded-[5px] text-[12px] font-['Lato',sans-serif] transition"
              >
                Save v
              </button>
              {savedVersions.length >= 2 && (
                <button
                  onClick={() => {
                    if (isComparing) {
                      setCompareMode(null)
                    } else {
                      const vA = savedVersions[savedVersions.length - 2]
                      const vB = savedVersions[savedVersions.length - 1]
                      setCompareMode({ componentKey: comp.key, versionA: vA, versionB: vB })
                    }
                  }}
                  className={`px-[8px] py-[3px] rounded-[5px] text-[12px] font-['Lato',sans-serif] transition ${
                    isComparing ? 'bg-white/10 text-white' : 'bg-[#222] text-text-2/60 hover:text-text-2'
                  }`}
                >
                  {isComparing ? 'Close' : 'Compare'}
                </button>
              )}
            </div>
            {/* Compare dropdowns */}
            {isComparing && (
              <div className="ml-[11px] mt-[4px] flex items-center gap-[4px]">
                <select
                  value={compareMode.versionA.version}
                  onChange={(e) => {
                    const ver = savedVersions.find(v => v.version === e.target.value)
                    if (ver) setCompareMode(prev => ({ ...prev, versionA: ver }))
                  }}
                  className="bg-[#111] border border-[#222] rounded-[4px] text-[10px] text-text-2 px-[3px] py-[1px] outline-none font-['Lato',sans-serif]"
                >
                  {savedVersions.map(sv => (
                    <option key={sv.version} value={sv.version}>{sv.version}</option>
                  ))}
                </select>
                <span className="text-[10px] text-text-2/30">vs</span>
                <select
                  value={compareMode.versionB.version}
                  onChange={(e) => {
                    const ver = savedVersions.find(v => v.version === e.target.value)
                    if (ver) setCompareMode(prev => ({ ...prev, versionB: ver }))
                  }}
                  className="bg-[#111] border border-[#222] rounded-[4px] text-[10px] text-text-2 px-[3px] py-[1px] outline-none font-['Lato',sans-serif]"
                >
                  {savedVersions.map(sv => (
                    <option key={sv.version} value={sv.version}>{sv.version}</option>
                  ))}
                </select>
              </div>
            )}
          </div>
        )
      })}

      {/* Presets section */}
      <div className="border-t border-[#333] mt-[16px] pt-[12px]">
        <p className="text-[12px] font-medium text-text-2/50 uppercase tracking-[0.08em] mb-[8px]">Presets</p>
        <button
          onClick={() => setVariants(DEFAULT_VARIANTS)}
          className="w-full text-left px-[8px] py-[5px] rounded-[6px] text-[12px] text-text-2/60 hover:bg-[#242424] hover:text-text-2 transition mb-[4px]"
        >
          Reset all to A
        </button>
        {showSaveInput ? (
          <div className="flex gap-[4px] mb-[6px]">
            <input
              value={saveInputName}
              onChange={e => setSaveInputName(e.target.value)}
              placeholder="Name..."
              className="flex-1 min-w-0 bg-[#242424] border border-[#474747] rounded-[6px] px-[8px] py-[4px] text-[11px] text-text-1 outline-none focus:border-[#555]"
              onKeyDown={e => { if (e.key === 'Enter' && saveInputName.trim()) onSave(saveInputName.trim()); if (e.key === 'Escape') { setShowSaveInput(false); setSaveInputName('') } }}
              autoFocus
            />
            <button onClick={() => saveInputName.trim() && onSave(saveInputName.trim())} className="shrink-0 px-[8px] py-[4px] rounded-[6px] bg-white/10 text-white text-[11px] font-medium">Save</button>
          </div>
        ) : (
          <button
            onClick={() => setShowSaveInput(true)}
            className="w-full text-left px-[8px] py-[5px] rounded-[6px] text-[12px] text-white/60 hover:bg-[#242424] hover:text-white transition mb-[4px]"
          >
            + Save current mix
          </button>
        )}
        {combinations.map(combo => (
          <div key={combo.id} className="flex items-center gap-[4px] group mb-[2px]">
            <button
              onClick={() => onLoad(combo)}
              className="flex-1 min-w-0 text-left px-[8px] py-[4px] rounded-[6px] text-[12px] text-text-2/60 hover:bg-[#242424] hover:text-text-2 transition truncate"
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

// ─── Screen name map for sidebar ────────────────────────────────────
const SCREEN_LABELS = {
  'trips-list': 'Trips List', 'trips-list-done': 'Trips List', 'new-trip': 'New Trip',
  'home-b': 'Home B: Concierge', 'home-c': 'Home C: Quick-Pick', 'home-d': 'Home D: Agent Feed',
  'chat-thinking': 'Chat Thinking', 'chat-flights': 'Chat Flights',
  'chat-hotel-thinking': 'Hotel Thinking', 'chat-hotels': 'Chat Hotels',
  'hotel-map': 'Hotel Map', 'hotel-detail': 'Hotel Detail',
  'itinerary': 'Itinerary', 'paywall': 'Paywall',
  'payment': 'Payment', 'confirmation': 'Confirmation',
  'scene-new-trip': 'Turn: New Trip', 'scene-context': 'Turn: Options',
  'scene-cached': 'Turn: Re-entry', 'scene-updates': 'Turn: Updates',
  'scene-decision': 'Turn: Confirmed',
}

// ─── Main Container ─────────────────────────────────────────────────
const SCREEN_ORDER = ['trips-list', 'new-trip', 'home-b', 'home-c', 'home-d', 'scene-new-trip', 'scene-context', 'scene-cached', 'scene-updates', 'scene-decision', 'chat-thinking', 'chat-flights', 'chat-hotel-thinking', 'chat-hotels', 'hotel-map', 'hotel-detail', 'itinerary', 'paywall', 'payment', 'confirmation', 'trips-list-done']

export default function TripFlowInteractive({ slug }) {
  const initialScreen = slug && SCREEN_ORDER.includes(slug) ? slug : 'trips-list'
  const router = useRouter()
  const [screen, setScreen] = useState(initialScreen)
  const [history, setHistory] = useState([initialScreen])
  const [dir, setDir] = useState('forward')
  const [animating, setAnimating] = useState(false)
  const [displayScreen, setDisplayScreen] = useState(initialScreen)
  const prevScreen = useRef(initialScreen)
  const [variants, setVariants] = useState({
    flightDealCard: 'A', hotelDealCard: 'A', thinkingBubble: 'A',
    tripCard: 'A', confirmedFlightCard: 'A', priceBreakdownCard: 'A',
    confirmedBookingCard: 'A', orderSummaryCard: 'A', paywallCard: 'A',
    hotelMapPeekCard: 'A', savedPaymentCard: 'A',
  })
  const [isStandalone, setIsStandalone] = useState(false)
  const [viewMode, setViewMode] = useState('demo') // 'demo' | 'browse'
  const [combinations, setCombinations] = useState([])
  const [showSaveInput, setShowSaveInput] = useState(false)
  const [saveInputName, setSaveInputName] = useState('')
  const [componentVersions, setComponentVersions] = useState({})
  const [compareMode, setCompareMode] = useState(null)

  useEffect(() => {
    setIsStandalone(window.self === window.top)
  }, [])

  // Read initial screen/variants from URL params (used by export page iframes)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const s = params.get('s')
    const v = params.get('v')
    if (s && SCREEN_ORDER.includes(s)) {
      setScreen(s); setDisplayScreen(s); prevScreen.current = s; setHistory([s])
    }
    if (v) {
      try { setVariants(prev => ({ ...prev, ...JSON.parse(v) })) } catch {}
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Load saved combinations + restore last-used variants
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

  // Escape key exits demo, arrow keys navigate in browse mode
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

  // Load saved component versions
  useEffect(() => {
    if (!isStandalone) return
    fetch('/api/component-versions').then(r => r.json()).then(setComponentVersions).catch(() => {})
  }, [isStandalone])

  const saveComponentVersion = useCallback(async (componentKey, variant) => {
    const existing = componentVersions[componentKey] || []
    const nextVer = getNextVersion(existing)
    const res = await fetch('/api/component-versions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ componentKey, version: nextVer, variant, notes: '' }),
    })
    const entry = await res.json()
    if (res.ok) {
      setComponentVersions(prev => ({
        ...prev,
        [componentKey]: [...(prev[componentKey] || []), entry],
      }))
    }
  }, [componentVersions])

  const deleteComponentVersion = useCallback(async (componentKey, version) => {
    const res = await fetch('/api/component-versions', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ componentKey, version }),
    })
    if (res.ok) {
      setComponentVersions(prev => {
        const updated = { ...prev }
        updated[componentKey] = (updated[componentKey] || []).filter(v => v.version !== version)
        if (updated[componentKey].length === 0) delete updated[componentKey]
        return updated
      })
    }
  }, [])

  const currentVisible = animating ? screen : displayScreen

  function renderScreen(key, overrideVariants) {
    const v = overrideVariants || variants
    switch (key) {
      case 'trips-list': return <ScreenTripsList go={go} completed={false} variants={v} />
      case 'trips-list-done': return <ScreenTripsList go={go} completed={true} variants={v} />
      case 'new-trip': return <ScreenNewTrip go={go} goBack={goBack} />
      case 'home-b': return <ScreenHomeB go={go} />
      case 'home-c': return <ScreenHomeC go={go} />
      case 'home-d': return <ScreenHomeD go={go} />
      case 'scene-new-trip': return <SceneNewTrip go={go} />
      case 'scene-context': return <SceneContext go={go} />
      case 'scene-cached': return <SceneCached go={go} />
      case 'scene-updates': return <SceneUpdates go={go} />
      case 'scene-decision': return <SceneDecision go={go} />
      case 'chat-thinking': return <ScreenChatThinking go={go} goBack={goBack} variants={v} />
      case 'chat-flights': return <ScreenChatFlights go={go} goBack={goBack} variants={v} />
      case 'chat-hotel-thinking': return <ScreenChatHotelThinking go={go} goBack={goBack} variants={v} />
      case 'chat-hotels': return <ScreenChatHotels go={go} goBack={goBack} variants={v} />
      case 'hotel-map': return <ScreenHotelMap go={go} goBack={goBack} variants={v} />
      case 'hotel-detail': return <ScreenHotelDetail go={go} goBack={goBack} variants={v} />
      case 'itinerary': return <ScreenItinerary go={go} goBack={goBack} variants={v} />
      case 'paywall': return <ScreenPaywall go={go} goBack={goBack} variants={v} />
      case 'payment': return <ScreenPayment go={go} goBack={goBack} variants={v} />
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

  // Standalone — full chrome with sidebar
  const browseScreens = SCREEN_ORDER.filter(s => s !== 'trips-list-done')
  const browseIdx = browseScreens.indexOf(displayScreen)

  return (
    <div className={`font-['Inter',sans-serif] ${isStandalone ? 'flex flex-col items-center' : ''}`}>
      {/* Top bar — only in standalone */}
      {isStandalone && (
        <div className="flex items-center justify-between mb-[10px]" style={{ width: 605 }}>
          <button onClick={() => router.push('/flow/trip-flow')} className="flex items-center gap-[6px] text-text-2 hover:text-text-1 transition">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
            <span className="text-[12px]">Flow</span>
          </button>
          <div className="flex items-center gap-[8px]">
            {/* Mode toggle */}
            <div className="flex items-center bg-[#242424] rounded-full p-[2px]">
              <button onClick={() => setViewMode('demo')} className={`px-[12px] py-[4px] rounded-full text-[11px] font-medium transition ${viewMode === 'demo' ? 'bg-white/10 text-white' : 'text-text-2/60 hover:text-text-2'}`}>Demo</button>
              <button onClick={() => setViewMode('browse')} className={`px-[12px] py-[4px] rounded-full text-[11px] font-medium transition ${viewMode === 'browse' ? 'bg-white/10 text-white' : 'text-text-2/60 hover:text-text-2'}`}>Pages</button>
            </div>
            <span className="text-text-2/20 text-[12px]">&middot;</span>
            <span className="text-[12px] text-text-2/50">{SCREEN_LABELS[currentVisible] || 'Trip Flow'}</span>
            {viewMode === 'demo' && (
              <>
                <span className="text-text-2/20 text-[11px]">&middot;</span>
                <span className="text-[12px] text-text-2/30">{history.length - 1} steps</span>
              </>
            )}
            {viewMode === 'browse' && (
              <span className="text-[12px] text-text-2/30">{browseIdx + 1}/{browseScreens.length}</span>
            )}
          </div>
          <div className="flex items-center gap-[8px]">
            <button
              onClick={() => {
                const v = encodeURIComponent(JSON.stringify(variants))
                window.open(`/preview/interactive-export?v=${v}`, '_blank')
              }}
              className="flex items-center gap-[4px] px-[12px] py-[5px] rounded-[6px] bg-white/10 text-white text-[12px] font-medium hover:bg-white/15 transition"
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
      )}

      {/* Screen strip (browse mode) */}
      {isStandalone && viewMode === 'browse' && (
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
                className={`px-[10px] py-[4px] rounded-full text-[11px] font-medium transition ${
                  displayScreen === key ? 'bg-white/10 text-white' : 'bg-[#242424] text-text-2/60 hover:text-text-2'
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

      {/* Phone + sidebar */}
      <div className={isStandalone ? "flex gap-[12px] items-start" : undefined}>
        {isStandalone && compareMode ? (
          <>
            {/* Compare: version A */}
            <div className="flex flex-col items-center gap-[4px]">
              <span className="text-[10px] text-text-2/50 font-['Lato',sans-serif]">{compareMode.versionA.version} (variant {compareMode.versionA.variant})</span>
              <div className="bg-bg overflow-hidden relative rounded-[30px] w-[393px] h-[852px] shrink-0">
                <div className="absolute inset-0">
                  {renderScreen(currentVisible, { ...variants, [compareMode.componentKey]: compareMode.versionA.variant })}
                </div>
              </div>
            </div>
            {/* Compare: version B */}
            <div className="flex flex-col items-center gap-[4px]">
              <span className="text-[10px] text-text-2/50 font-['Lato',sans-serif]">{compareMode.versionB.version} (variant {compareMode.versionB.variant})</span>
              <div className="bg-bg overflow-hidden relative rounded-[30px] w-[393px] h-[852px] shrink-0">
                <div className="absolute inset-0">
                  {renderScreen(currentVisible, { ...variants, [compareMode.componentKey]: compareMode.versionB.variant })}
                </div>
              </div>
            </div>
          </>
        ) : (
          phoneFrame
        )}
        {isStandalone && (
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
            componentVersions={componentVersions}
            onSaveVersion={saveComponentVersion}
            onDeleteVersion={deleteComponentVersion}
            compareMode={compareMode}
            setCompareMode={setCompareMode}
          />
        )}
      </div>
    </div>
  )
}

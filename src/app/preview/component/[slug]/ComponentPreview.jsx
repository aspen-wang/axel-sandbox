'use client'

import dynamic from 'next/dynamic'
import FlightCard from '@/components/FlightCard'
import PriceChart from '@/components/PriceChart'
import CTAButton from '@/components/CTAButton'
import FlightDealCard from '@/components/FlightDealCard'
import FlightResultsList from '@/components/FlightResultsList'
import HotelDealCard from '@/components/HotelDealCard'
import WatchCard from '@/components/WatchCard'
import HotelWatchCard from '@/components/HotelWatchCard'
import ThinkingBubble from '@/components/ThinkingBubble'
import ConfirmedFlightCard from '@/components/ConfirmedFlightCard'
import ConfirmedBookingCard from '@/components/ConfirmedBookingCard'
import PriceBreakdownCard from '@/components/PriceBreakdownCard'
import OrderSummaryCard from '@/components/OrderSummaryCard'
import SavedPaymentCard from '@/components/SavedPaymentCard'
import HotelMapPeekCard from '@/components/HotelMapPeekCard'
import PaywallCard from '@/components/PaywallCard'
import TripCard from '@/components/TripCard'
import { getFlights, getFlightDeals, getHotelDeals, getWatches, getHotelWatches } from '@/lib/data'

const flights = getFlights()
const flightDeals = getFlightDeals()
const hotelDeals = getHotelDeals()
const watches = getWatches()
const hotelWatches = getHotelWatches()

const mainComponents = {
  'flight-card': FlightCard,
  'price-chart': PriceChart,
  'cta-button': CTAButton,
  'flight-deal-card': FlightDealCard,
  'flight-results-list': FlightResultsList,
  'hotel-deal-card': HotelDealCard,
  'watch-card': WatchCard,
  'hotel-watch-card': HotelWatchCard,
  'thinking-bubble': ThinkingBubble,
  'confirmed-flight-card': ConfirmedFlightCard,
  'confirmed-booking-card': ConfirmedBookingCard,
  'price-breakdown-card': PriceBreakdownCard,
  'order-summary-card': OrderSummaryCard,
  'saved-payment-card': SavedPaymentCard,
  'hotel-map-peek-card': HotelMapPeekCard,
  'paywall-card': PaywallCard,
  'trip-card': TripCard,
}

const fileNames = {
  'flight-card': 'FlightCard',
  'price-chart': 'PriceChart',
  'cta-button': 'CTAButton',
  'flight-deal-card': 'FlightDealCard',
  'flight-results-list': 'FlightResultsList',
  'hotel-deal-card': 'HotelDealCard',
  'watch-card': 'WatchCard',
  'hotel-watch-card': 'HotelWatchCard',
  'thinking-bubble': 'ThinkingBubble',
  'confirmed-flight-card': 'ConfirmedFlightCard',
  'confirmed-booking-card': 'ConfirmedBookingCard',
  'price-breakdown-card': 'PriceBreakdownCard',
  'order-summary-card': 'OrderSummaryCard',
  'saved-payment-card': 'SavedPaymentCard',
  'hotel-map-peek-card': 'HotelMapPeekCard',
  'paywall-card': 'PaywallCard',
  'trip-card': 'TripCard',
}

function loadVersioned(slug, version) {
  const baseName = fileNames[slug]
  if (!baseName) return null
  return dynamic(
    () => import(`@/components/${baseName}.${version}`).catch(() => ({
      default: () => <div className="text-text-2 text-center p-4">Version {version} not found</div>,
    })),
    { ssr: false }
  )
}

// Sample props for each component type
function getSampleProps(slug) {
  switch (slug) {
    case 'flight-card':
      return { flight: flights[0], onClick: () => {} }
    case 'price-chart':
      return { currentPrice: 478, targetPrice: 400 }
    case 'cta-button':
      return { label: 'Axel, get me the best price', onClick: () => {} }
    case 'flight-deal-card':
      return { deal: flightDeals[0], onClick: () => {} }
    case 'flight-results-list':
      return { FlightResultCardComponent: FlightDealCard, deals: flightDeals.slice(0, 3) }
    case 'hotel-deal-card':
      return { deal: hotelDeals[0], onClick: () => {} }
    case 'watch-card':
      return { watch: watches[0], state: 'watching', onClick: () => {} }
    case 'hotel-watch-card':
      return { watch: hotelWatches[0], state: 'watching', onClick: () => {} }
    case 'thinking-bubble':
      return { label: 'Searching flights...' }
    case 'confirmed-flight-card':
      return { flight: { airline: 'United Airlines', from: 'SEA', to: 'SFO', departTime: '7:12am', arriveTime: '9:30am', date: 'Apr 15', duration: '2h 18m', price: 218 } }
    case 'confirmed-booking-card':
      return { type: 'flight', title: 'United UA 224 · SEA → SFO', details: 'Apr 15 · 7:12am – 9:30am · Nonstop' }
    case 'price-breakdown-card':
      return { lineItems: [{ label: 'Base fare', amount: '$467', color: 'default' }, { label: 'Taxes & fees', amount: '$82', color: 'muted' }, { label: 'Seat upgrade', amount: '$86', color: 'muted' }, { label: 'Axel discount', amount: '-$168', color: 'green' }], total: { label: 'Total', amount: '$635' }, savings: { label: 'You save', amount: '$168' } }
    case 'order-summary-card':
      return { title: 'SF Business Trip', subtitle: 'Apr 15–18 · 1 traveler', items: [{ icon: '✈️', text: 'SEA → SFO · United UA 224' }, { icon: '🏨', text: 'The Marker · 3 nights' }, { icon: '💳', text: 'Visa ••4242' }] }
    case 'saved-payment-card':
      return { last4: '4242', brand: 'Visa', selected: true }
    case 'hotel-map-peek-card':
      return { hotel: { name: 'The Marker', area: 'Market Street', price: 167, save: 78 }, ctaLabel: 'Select this hotel', onCta: () => {} }
    case 'paywall-card':
      return { benefits: ['Exclusive member-only fares', 'Price drop alerts', 'Free cancellation', 'Priority support'], price: '$9.99', period: 'month', ctaLabel: 'Become a member', onCta: () => {}, onSkip: () => {} }
    case 'trip-card':
      return { trip: { title: 'Seattle → San Francisco', tripType: 'flight+hotel', dates: 'Apr 15 - 18, 2026', travelers: 2, status: 'monitoring', price: 358, originalPrice: 478, axelLastChecked: '2 min ago', airlineName: 'United Airlines', hotelName: 'The Westin SF' }, onClick: () => {} }
    default:
      return {}
  }
}

export default function ComponentPreview({ slug, version }) {
  const Component = (!version || version === 'A')
    ? mainComponents[slug]
    : loadVersioned(slug, version)

  if (!Component) return null

  const props = getSampleProps(slug)
  const isCTA = slug === 'cta-button'

  return (
    <div className="bg-bg min-h-screen flex items-center justify-center p-[24px] font-['Inter',sans-serif]">
      <div className={isCTA ? 'relative w-[393px] h-[100px]' : 'w-[345px]'}>
        <Component {...props} />
      </div>
    </div>
  )
}

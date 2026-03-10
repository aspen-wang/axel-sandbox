import FlightCard from '@/components/FlightCard'
import PriceChart from '@/components/PriceChart'
import CTAButton from '@/components/CTAButton'
import FlightDealCard from '@/components/FlightDealCard'
import FlightResultsList from '@/components/FlightResultsList'
import HotelDealCard from '@/components/HotelDealCard'
import WatchCard from '@/components/WatchCard'
import ThinkingBubble from '@/components/ThinkingBubble'
import TripCard from '@/components/TripCard'
import ConfirmedFlightCard from '@/components/ConfirmedFlightCard'
import PriceBreakdownCard from '@/components/PriceBreakdownCard'
import ConfirmedBookingCard from '@/components/ConfirmedBookingCard'
import OrderSummaryCard from '@/components/OrderSummaryCard'
import PaywallCard from '@/components/PaywallCard'
import HotelMapPeekCard from '@/components/HotelMapPeekCard'
import SavedPaymentCard from '@/components/SavedPaymentCard'
import AxelPanel from '@/components/AxelPanel'
import StepProgress from '@/components/StepProgress'
import BottomNav from '@/components/BottomNav'
import StatusBar from '@/components/StatusBar'
import HomeIndicator from '@/components/HomeIndicator'
import QuickOptionPills from '@/components/QuickOptionPills'
import TripInputBar from '@/components/TripInputBar'
import { getFlights, getFlightDeals, getHotelDeals, getWatches } from '@/lib/data'

const flights = getFlights()
const flightDeals = getFlightDeals()
const hotelDeals = getHotelDeals()
const watches = getWatches()

export const mainComponents = {
  'flight-card': FlightCard,
  'price-chart': PriceChart,
  'cta-button': CTAButton,
  'flight-deal-card': FlightDealCard,
  'flight-results-list': FlightResultsList,
  'hotel-deal-card': HotelDealCard,
  'watch-card': WatchCard,
  'thinking-bubble': ThinkingBubble,
  'trip-card': TripCard,
  'confirmed-flight-card': ConfirmedFlightCard,
  'price-breakdown-card': PriceBreakdownCard,
  'confirmed-booking-card': ConfirmedBookingCard,
  'order-summary-card': OrderSummaryCard,
  'paywall-card': PaywallCard,
  'hotel-map-peek-card': HotelMapPeekCard,
  'saved-payment-card': SavedPaymentCard,
  'axel-panel': AxelPanel,
  'step-progress': StepProgress,
  'bottom-nav': BottomNav,
  'status-bar': StatusBar,
  'home-indicator': HomeIndicator,
  'quick-option-pills': QuickOptionPills,
  'trip-input-bar': TripInputBar,
}

export const fileNames = {
  'flight-card': 'FlightCard',
  'price-chart': 'PriceChart',
  'cta-button': 'CTAButton',
  'flight-deal-card': 'FlightDealCard',
  'flight-results-list': 'FlightResultsList',
  'hotel-deal-card': 'HotelDealCard',
  'watch-card': 'WatchCard',
  'thinking-bubble': 'ThinkingBubble',
  'trip-card': 'TripCard',
  'confirmed-flight-card': 'ConfirmedFlightCard',
  'price-breakdown-card': 'PriceBreakdownCard',
  'confirmed-booking-card': 'ConfirmedBookingCard',
  'order-summary-card': 'OrderSummaryCard',
  'paywall-card': 'PaywallCard',
  'hotel-map-peek-card': 'HotelMapPeekCard',
  'saved-payment-card': 'SavedPaymentCard',
  'axel-panel': 'AxelPanel',
  'step-progress': 'StepProgress',
  'bottom-nav': 'BottomNav',
  'status-bar': 'StatusBar',
  'home-indicator': 'HomeIndicator',
  'quick-option-pills': 'QuickOptionPills',
  'trip-input-bar': 'TripInputBar',
}

export function getSampleProps(slug) {
  switch (slug) {
    case 'flight-card':
      return { flight: flights[0], onClick: () => {} }
    case 'price-chart':
      return { currentPrice: 478, targetPrice: 400 }
    case 'cta-button':
      return { label: 'Axel, get me the best price', onClick: () => {} }
    case 'flight-deal-card':
      return { deal: flightDeals[0] || {}, onClick: () => {} }
    case 'flight-results-list':
      return { FlightResultCardComponent: FlightDealCard, deals: flightDeals.slice(0, 3) }
    case 'hotel-deal-card':
      return { deal: hotelDeals[0] || {}, onClick: () => {} }
    case 'watch-card':
      return { watch: watches[0], state: 'watching', onClick: () => {} }
    case 'thinking-bubble':
      return { label: 'Searching flights...' }
    case 'trip-card':
      return { trip: { month: 'APR', days: '15 - 18', year: '2026', type: 'FLIGHT + HOTEL', typeColor: '#4FC660', route: 'Seattle \u2192 San Francisco', travelers: '2 travelers', img: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=400&fit=crop' }, onClick: () => {} }
    case 'confirmed-flight-card':
      return { flight: { airline: 'United Airlines', from: 'SEA', to: 'SFO', departTime: '7:12am', arriveTime: '9:30am', date: 'Apr 15', duration: '2h 18m', price: 218 } }
    case 'price-breakdown-card':
      return { lineItems: [{ label: '3 nights × $189', amount: '$567' }, { label: 'Taxes & fees', amount: '$68', color: 'muted' }], total: { label: 'Total', amount: '$635' }, savings: { label: 'You save', amount: '$168' } }
    case 'confirmed-booking-card':
      return { type: 'flight', title: 'United UA 224 · SEA → SFO', details: 'Apr 15 · 7:12am – 9:30am · Nonstop' }
    case 'order-summary-card':
      return { title: 'SF Business Trip', subtitle: 'Apr 15–18 · 1 traveler', items: [{ icon: 'Flight', text: 'United SEA→SFO · Apr 15' }, { icon: 'Hotel', text: 'Hotel Nikko SF · 3 nights' }] }
    case 'paywall-card':
      return { benefits: ['Average $284 savings per booking', 'Price monitoring on all trips', 'Automatic rebooking when prices drop', 'Free cancellation within 24 hours'], price: '$9.99', period: 'month', ctaLabel: 'Become a member', onCta: () => {}, onSkip: () => {} }
    case 'hotel-map-peek-card':
      return { hotel: { name: 'The Marker', area: 'Market Street', price: 167, save: 78 }, ctaLabel: 'Select this hotel', onCta: () => {} }
    case 'saved-payment-card':
      return { last4: '4242', brand: 'Visa', selected: true }
    case 'axel-panel':
      return { message: 'I found 3 nonstop options. Tap a flight to see details.', actions: [{ label: 'Need hotel?', variant: 'secondary' }, { label: 'Flights only', variant: 'primary' }] }
    case 'step-progress':
      return { steps: [{ emoji: 'Flight', label: 'Flights' }, { emoji: 'Hotel', label: 'Hotels' }, { emoji: 'Review', label: 'Review' }, { emoji: 'Book', label: 'Book' }], current: 1, completed: [0] }
    case 'bottom-nav':
      return { activeTab: 'trips' }
    case 'status-bar':
      return {}
    case 'home-indicator':
      return {}
    case 'quick-option-pills':
      return { onSelect: () => {} }
    case 'trip-input-bar':
      return { value: '', onChange: () => {}, onSubmit: () => {}, placeholder: 'Describe your trip...' }
    default:
      return {}
  }
}

export const variantData = {
  'flight-card': {
    default: () => <FlightCard flight={flights[0]} onClick={() => {}} />,
    nonstop: () => <FlightCard flight={flights[0]} onClick={() => {}} />,
    'one-stop': () => <FlightCard flight={flights[1]} onClick={() => {}} />,
  },
  'price-chart': {
    default: () => <PriceChart currentPrice={478} targetPrice={400} />,
  },
  'cta-button': {
    default: () => (
      <div className="relative w-[393px] h-[100px]">
        <CTAButton label="Axel, get me the best price" onClick={() => {}} />
      </div>
    ),
  },
  'flight-deal-card': {
    default: () => <FlightDealCard deal={flightDeals[0] || undefined} onClick={() => {}} />,
    'one-stop': () => <FlightDealCard deal={{ ...(flightDeals[0] || {}), airline: 'Delta Air Lines', flight_number: 'DL 1847', depart_time: '10:20 AM', arrive_time: '3:45 PM', duration: '5h 25m', stops: '1 stop', price: 298, original_price: 412, saved: 114, cabin_class: 'Economy', baggage: '1 personal, 1 carry-on', checked_bag_fee: '$35', layover_details: { duration: '1h 20m', city: 'DEN', airport: 'Denver Intl' } }} onClick={() => {}} />,
    'multi-stop': () => <FlightDealCard deal={{ ...(flightDeals[0] || {}), airline: 'American Airlines', flight_number: 'AA 2391', depart_time: '6:00 AM', arrive_time: '4:30 PM', duration: '10h 30m', stops: '2 stops', price: 245, original_price: 395, saved: 150, cabin_class: 'Economy', baggage: '1 personal, 1 carry-on', checked_bag_fee: '$30' }} onClick={() => {}} />,
    'best-deal': () => <FlightDealCard deal={flightDeals[0] || undefined} bestDeal onClick={() => {}} />,
    loading: () => <FlightDealCard loading />,
    hover: () => <div className="[&>div]:border-[#333]"><FlightDealCard deal={flightDeals[0] || undefined} onClick={() => {}} /></div>,
  },
  'flight-results-list': {
    default: () => <FlightResultsList FlightResultCardComponent={FlightDealCard} deals={flightDeals.slice(0, 3)} />,
  },
  'hotel-deal-card': {
    default: () => <HotelDealCard deal={hotelDeals[0] || undefined} onClick={() => {}} />,
    'best-deal': () => <HotelDealCard deal={hotelDeals[0] || undefined} bestDeal onClick={() => {}} />,
    'non-refundable': () => <HotelDealCard deal={{ ...(hotelDeals[0] || {}), cancellation_policy: 'Non-refundable', payment_policy: 'Pay now' }} nonRefundable onClick={() => {}} />,
    loading: () => <HotelDealCard loading />,
    hover: () => <div className="[&>div]:border-[#333]"><HotelDealCard deal={hotelDeals[0] || undefined} onClick={() => {}} /></div>,
  },
  'watch-card': {
    default: () => <WatchCard watch={watches[0]} state="watching" onClick={() => {}} />,
  },
  'thinking-bubble': {
    default: () => <ThinkingBubble label="Searching flights..." />,
  },
  'trip-card': {
    default: () => <TripCard trip={{ month: 'APR', days: '15 - 18', year: '2026', type: 'FLIGHT + HOTEL', typeColor: '#4FC660', route: 'Seattle \u2192 San Francisco', travelers: '2 travelers', img: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=400&fit=crop' }} onClick={() => {}} />,
  },
  'confirmed-flight-card': {
    default: () => <ConfirmedFlightCard flight={{ airline: 'United Airlines', from: 'SEA', to: 'SFO', departTime: '7:12am', arriveTime: '9:30am', date: 'Apr 15', duration: '2h 18m', price: 218 }} />,
  },
  'price-breakdown-card': {
    default: () => <PriceBreakdownCard lineItems={[{ label: '3 nights × $189', amount: '$567' }, { label: 'Taxes & fees', amount: '$68', color: 'muted' }]} total={{ label: 'Total', amount: '$635' }} savings={{ label: 'You save', amount: '$168' }} />,
  },
  'confirmed-booking-card': {
    default: () => <ConfirmedBookingCard type="flight" title="United UA 224 · SEA → SFO" details="Apr 15 · 7:12am – 9:30am · Nonstop" />,
  },
  'order-summary-card': {
    default: () => <OrderSummaryCard title="SF Business Trip" subtitle="Apr 15–18 · 1 traveler" items={[{ icon: 'Flight', text: 'United SEA→SFO · Apr 15' }, { icon: 'Hotel', text: 'Hotel Nikko SF · 3 nights' }]} />,
  },
  'paywall-card': {
    default: () => <PaywallCard benefits={['Average $284 savings per booking', 'Price monitoring on all trips', 'Automatic rebooking when prices drop', 'Free cancellation within 24 hours']} price="$9.99" period="month" ctaLabel="Become a member" onCta={() => {}} onSkip={() => {}} />,
  },
  'hotel-map-peek-card': {
    default: () => <HotelMapPeekCard hotel={{ name: 'The Marker', area: 'Market Street', price: 167, save: 78 }} ctaLabel="Select this hotel" onCta={() => {}} />,
  },
  'saved-payment-card': {
    default: () => <SavedPaymentCard last4="4242" brand="Visa" selected={true} />,
  },
  'axel-panel': {
    default: () => (
      <div className="relative w-[393px] h-[120px]">
        <AxelPanel message="I found 3 nonstop options. Tap a flight to see details." actions={[{ label: 'Need hotel?', variant: 'secondary', onClick: () => {} }, { label: 'Flights only', variant: 'primary', onClick: () => {} }]} />
      </div>
    ),
    typing: () => (
      <div className="relative w-[393px] h-[80px]">
        <AxelPanel typing message="" actions={[]} />
      </div>
    ),
    compact: () => (
      <div className="relative w-[393px] h-[70px]">
        <AxelPanel compact message="Searching flights..." />
      </div>
    ),
  },
  'step-progress': {
    default: () => <StepProgress steps={[{ emoji: 'Flight', label: 'Flights' }, { emoji: 'Hotel', label: 'Hotels' }, { emoji: 'Review', label: 'Review' }, { emoji: 'Book', label: 'Book' }]} current={1} completed={[0]} />,
  },
  'bottom-nav': {
    default: () => (
      <div className="relative w-[393px] h-[80px]">
        <BottomNav activeTab="trips" />
      </div>
    ),
  },
  'status-bar': {
    default: () => (
      <div className="relative w-[393px] h-[59px] bg-black">
        <StatusBar />
      </div>
    ),
  },
  'home-indicator': {
    default: () => (
      <div className="relative w-[393px] h-[30px] bg-black">
        <HomeIndicator />
      </div>
    ),
  },
  'quick-option-pills': {
    default: () => (
      <div className="w-[361px]">
        <QuickOptionPills onSelect={() => {}} />
      </div>
    ),
  },
  'trip-input-bar': {
    default: () => (
      <div className="w-[361px]">
        <TripInputBar value="" onChange={() => {}} onSubmit={() => {}} />
      </div>
    ),
  },
}

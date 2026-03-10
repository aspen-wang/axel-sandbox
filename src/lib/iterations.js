import fs from 'fs'
import path from 'path'

const ITERATIONS_PATH = path.join(process.cwd(), 'src/data/iterations.json')

// File path mappings for each iteratable item
const FILE_MAPPINGS = {
  'screen:importing': { dir: 'src/projects/axel-one/screens', baseName: 'Importing', ext: '.jsx' },
  'screen:flight-deals': { dir: 'src/projects/axel-one/screens', baseName: 'FlightDeals', ext: '.jsx' },
  'screen:home-member': { dir: 'src/projects/axel-one/screens', baseName: 'HomeMember', ext: '.jsx' },
  'screen:watch-created': { dir: 'src/projects/axel-one/screens', baseName: 'WatchCreated', ext: '.jsx' },
  'screen:flight-details': { dir: 'src/projects/axel-one/screens', baseName: 'FlightDetails', ext: '.jsx' },
  'screen:add-details': { dir: 'src/projects/axel-one/screens', baseName: 'AddDetails', ext: '.jsx' },
  'screen:select-passenger': { dir: 'src/projects/axel-one/screens', baseName: 'SelectPassenger', ext: '.jsx' },
  'screen:paywall': { dir: 'src/projects/axel-one/screens', baseName: 'Paywall', ext: '.jsx' },
  'screen:hotel-deals': { dir: 'src/projects/axel-one/screens', baseName: 'HotelDeals', ext: '.jsx' },
  'screen:home-hotel-watch': { dir: 'src/projects/axel-one/screens', baseName: 'HomeHotelWatch', ext: '.jsx' },
  'screen:trips-empty': { dir: 'src/projects/axel-one/screens', baseName: 'TripsEmpty', ext: '.jsx' },
  'screen:trips-list': { dir: 'src/projects/axel-one/screens', baseName: 'TripsList', ext: '.jsx' },
  'screen:new-trip-input': { dir: 'src/projects/axel-one/screens', baseName: 'NewTripInput', ext: '.jsx' },
  'screen:chat-thinking': { dir: 'src/projects/axel-one/screens', baseName: 'ChatThinking', ext: '.jsx' },
  'screen:chat-flights': { dir: 'src/projects/axel-one/screens', baseName: 'ChatFlights', ext: '.jsx' },
  'screen:chat-flight-booked': { dir: 'src/projects/axel-one/screens', baseName: 'ChatFlightBooked', ext: '.jsx' },
  'screen:chat-hotels': { dir: 'src/projects/axel-one/screens', baseName: 'ChatHotels', ext: '.jsx' },
  'screen:hotel-map': { dir: 'src/projects/axel-one/screens', baseName: 'HotelMap', ext: '.jsx' },
  'screen:hotel-detail': { dir: 'src/projects/axel-one/screens', baseName: 'HotelDetail', ext: '.jsx' },
  'screen:itinerary-summary': { dir: 'src/projects/axel-one/screens', baseName: 'ItinerarySummary', ext: '.jsx' },
  'screen:trip-paywall': { dir: 'src/projects/axel-one/screens', baseName: 'TripPaywall', ext: '.jsx' },
  'screen:trip-payment': { dir: 'src/projects/axel-one/screens', baseName: 'TripPayment', ext: '.jsx' },
  'screen:trip-confirmation': { dir: 'src/projects/axel-one/screens', baseName: 'TripConfirmation', ext: '.jsx' },
  'screen:trip-flow-interactive': { dir: 'src/projects/axel-one/screens', baseName: 'TripFlowInteractive', ext: '.jsx' },
  'screen:trip-flow-v2-interactive': { dir: 'src/projects/axel-one/screens', baseName: 'TripFlowV2', ext: '.jsx' },
  'component:flight-card': { dir: 'src/components', baseName: 'FlightCard', ext: '.jsx' },
  'component:price-chart': { dir: 'src/components', baseName: 'PriceChart', ext: '.jsx' },
  'component:cta-button': { dir: 'src/components', baseName: 'CTAButton', ext: '.jsx' },
  'component:flight-deal-card': { dir: 'src/components', baseName: 'FlightDealCard', ext: '.jsx' },
  'component:flight-results-list': { dir: 'src/components', baseName: 'FlightResultsList', ext: '.jsx' },
  'component:hotel-deal-card': { dir: 'src/components', baseName: 'HotelDealCard', ext: '.jsx' },
  'component:watch-card': { dir: 'src/components', baseName: 'WatchCard', ext: '.jsx' },
  'component:hotel-watch-card': { dir: 'src/components', baseName: 'HotelWatchCard', ext: '.jsx' },
  'component:thinking-bubble': { dir: 'src/components', baseName: 'ThinkingBubble', ext: '.jsx' },
  'component:trip-card': { dir: 'src/components', baseName: 'TripCard', ext: '.jsx' },
  'component:confirmed-flight-card': { dir: 'src/components', baseName: 'ConfirmedFlightCard', ext: '.jsx' },
  'component:price-breakdown-card': { dir: 'src/components', baseName: 'PriceBreakdownCard', ext: '.jsx' },
  'component:confirmed-booking-card': { dir: 'src/components', baseName: 'ConfirmedBookingCard', ext: '.jsx' },
  'component:order-summary-card': { dir: 'src/components', baseName: 'OrderSummaryCard', ext: '.jsx' },
  'component:paywall-card': { dir: 'src/components', baseName: 'PaywallCard', ext: '.jsx' },
  'component:hotel-map-peek-card': { dir: 'src/components', baseName: 'HotelMapPeekCard', ext: '.jsx' },
  'component:saved-payment-card': { dir: 'src/components', baseName: 'SavedPaymentCard', ext: '.jsx' },
  'component:axel-panel': { dir: 'src/components', baseName: 'AxelPanel', ext: '.jsx' },
  'component:step-progress': { dir: 'src/components', baseName: 'StepProgress', ext: '.jsx' },
  'component:axel-chat-container': { dir: 'src/components', baseName: 'AxelChatContainer', ext: '.jsx' },
}

export function readIterations() {
  const raw = fs.readFileSync(ITERATIONS_PATH, 'utf-8')
  return JSON.parse(raw)
}

export function writeIterations(data) {
  fs.writeFileSync(ITERATIONS_PATH, JSON.stringify(data, null, 2))
}

export function getFileMapping(key) {
  return FILE_MAPPINGS[key] || null
}

export function getFilePath(key, version) {
  const mapping = FILE_MAPPINGS[key]
  if (!mapping) return null
  const fileName = version && version !== 'A'
    ? `${mapping.baseName}.${version}${mapping.ext}`
    : `${mapping.baseName}${mapping.ext}`
  return path.join(process.cwd(), mapping.dir, fileName)
}

export function getArchiveDir(key) {
  const mapping = FILE_MAPPINGS[key]
  if (!mapping) return null
  return path.join(process.cwd(), mapping.dir, 'archive')
}

export function nextLabel(versions) {
  if (versions.length === 0) return 'A'
  const labels = versions.map((v) => v.label)
  const lastCode = Math.max(...labels.map((l) => l.charCodeAt(0)))
  return String.fromCharCode(lastCode + 1)
}

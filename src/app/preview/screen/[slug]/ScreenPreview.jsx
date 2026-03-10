'use client'

import dynamic from 'next/dynamic'
import Importing from '@/projects/axel-one/screens/Importing'
import FlightDeals from '@/projects/axel-one/screens/FlightDeals'
import HomeMember from '@/projects/axel-one/screens/HomeMember'
import WatchCreated from '@/projects/axel-one/screens/WatchCreated'
import FlightDetails from '@/projects/axel-one/screens/FlightDetails'
import AddDetails from '@/projects/axel-one/screens/AddDetails'
import SelectPassenger from '@/projects/axel-one/screens/SelectPassenger'
import Paywall from '@/projects/axel-one/screens/Paywall'
import HotelDeals from '@/projects/axel-one/screens/HotelDeals'
import HomeHotelWatch from '@/projects/axel-one/screens/HomeHotelWatch'
import TripsEmpty from '@/projects/axel-one/screens/TripsEmpty'
import TripsList from '@/projects/axel-one/screens/TripsList'
import NewTripInput from '@/projects/axel-one/screens/NewTripInput'
import ChatThinking from '@/projects/axel-one/screens/ChatThinking'
import ChatFlights from '@/projects/axel-one/screens/ChatFlights'
import ChatFlightBooked from '@/projects/axel-one/screens/ChatFlightBooked'
import ChatHotels from '@/projects/axel-one/screens/ChatHotels'
import HotelMap from '@/projects/axel-one/screens/HotelMap'
import HotelDetail from '@/projects/axel-one/screens/HotelDetail'
import ItinerarySummary from '@/projects/axel-one/screens/ItinerarySummary'
import TripPaywall from '@/projects/axel-one/screens/TripPaywall'
import TripPayment from '@/projects/axel-one/screens/TripPayment'
import TripConfirmation from '@/projects/axel-one/screens/TripConfirmation'
import TripFlowInteractive from '@/projects/axel-one/screens/TripFlowInteractive'
import TripFlowV2 from '@/projects/axel-one/screens/TripFlowV2'
import Walkthrough from '@/projects/axel-one/screens/Walkthrough'
import CompetitiveComparison from '@/projects/axel-one/screens/CompetitiveComparison'
import CompetitiveUX from '@/projects/axel-one/screens/CompetitiveUX'

const mainComponents = {
  importing: Importing,
  'flight-deals': FlightDeals,
  'home-member': HomeMember,
  'watch-created': WatchCreated,
  'flight-details': FlightDetails,
  'add-details': AddDetails,
  'select-passenger': SelectPassenger,
  paywall: Paywall,
  'hotel-deals': HotelDeals,
  'home-hotel-watch': HomeHotelWatch,
  'trips-empty': TripsEmpty,
  'trips-list': TripsList,
  'new-trip-input': NewTripInput,
  'chat-thinking': ChatThinking,
  'chat-flights': ChatFlights,
  'chat-flight-booked': ChatFlightBooked,
  'chat-hotels': ChatHotels,
  'hotel-map': HotelMap,
  'hotel-detail': HotelDetail,
  'itinerary-summary': ItinerarySummary,
  'trip-paywall': TripPaywall,
  'trip-payment': TripPayment,
  'trip-confirmation': TripConfirmation,
  'trip-flow-interactive': TripFlowInteractive,
  'scene-new-trip': TripFlowInteractive,
  'scene-context': TripFlowInteractive,
  'scene-cached': TripFlowInteractive,
  'scene-updates': TripFlowInteractive,
  'scene-decision': TripFlowInteractive,
  'trip-flow-v2-interactive': TripFlowV2,
  'v2-trip-input': TripFlowV2,
  'v2-searching': TripFlowV2,
  'v2-question': TripFlowV2,
  'v2-flight-results': TripFlowV2,
  'v2-flight-selected': TripFlowV2,
  'v2-hotel-results': TripFlowV2,
  'v2-hotel-selected': TripFlowV2,
  'v2-itinerary': TripFlowV2,
  'v2-payment': TripFlowV2,
  'v2-confirmation': TripFlowV2,
  walkthrough: Walkthrough,
  'competitive-comparison': CompetitiveComparison,
  'competitive-ux': CompetitiveUX,
}

const fileNames = {
  importing: 'Importing',
  'flight-deals': 'FlightDeals',
  'home-member': 'HomeMember',
  'watch-created': 'WatchCreated',
  'flight-details': 'FlightDetails',
  'add-details': 'AddDetails',
  'select-passenger': 'SelectPassenger',
  paywall: 'Paywall',
  'hotel-deals': 'HotelDeals',
  'home-hotel-watch': 'HomeHotelWatch',
  'trips-empty': 'TripsEmpty',
  'trips-list': 'TripsList',
  'new-trip-input': 'NewTripInput',
  'chat-thinking': 'ChatThinking',
  'chat-flights': 'ChatFlights',
  'chat-flight-booked': 'ChatFlightBooked',
  'chat-hotels': 'ChatHotels',
  'hotel-map': 'HotelMap',
  'hotel-detail': 'HotelDetail',
  'itinerary-summary': 'ItinerarySummary',
  'trip-paywall': 'TripPaywall',
  'trip-payment': 'TripPayment',
  'trip-confirmation': 'TripConfirmation',
  'trip-flow-interactive': 'TripFlowInteractive',
  'scene-new-trip': 'TripFlowInteractive',
  'scene-context': 'TripFlowInteractive',
  'scene-cached': 'TripFlowInteractive',
  'scene-updates': 'TripFlowInteractive',
  'scene-decision': 'TripFlowInteractive',
  'trip-flow-v2-interactive': 'TripFlowV2',
  'v2-trip-input': 'TripFlowV2',
  'v2-searching': 'TripFlowV2',
  'v2-question': 'TripFlowV2',
  'v2-flight-results': 'TripFlowV2',
  'v2-flight-selected': 'TripFlowV2',
  'v2-hotel-results': 'TripFlowV2',
  'v2-hotel-selected': 'TripFlowV2',
  'v2-itinerary': 'TripFlowV2',
  'v2-payment': 'TripFlowV2',
  'v2-confirmation': 'TripFlowV2',
  walkthrough: 'Walkthrough',
  'competitive-comparison': 'CompetitiveComparison',
  'competitive-ux': 'CompetitiveUX',
}

function loadVersioned(slug, version) {
  const baseName = fileNames[slug]
  return dynamic(
    () => import(`@/projects/axel-one/screens/${baseName}.${version}`).catch(() => ({
      default: () => <div className="text-text-2 text-center p-4">Version {version} not found</div>,
    })),
    { ssr: false }
  )
}

export default function ScreenPreview({ slug, version }) {
  const Component = (!version || version === 'A')
    ? mainComponents[slug]
    : loadVersioned(slug, version)

  if (!Component) return null

  return (
    <div className="bg-black flex items-center justify-center min-h-screen">
      <Component slug={slug} onNext={() => {}} onSelectFlight={() => {}} onTapWatch={() => {}} />
    </div>
  )
}

'use client'

import { useState, useEffect } from 'react'
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
import { flows } from '@/dashboard.config'
import Link from 'next/link'

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

export default function ScreenView({ slug, version }) {
  const isVersioned = version && version !== 'A'
  const Component = isVersioned
    ? loadVersioned(slug, version)
    : mainComponents[slug]

  // Detect if we're inside an iframe (dashboard preview) vs direct navigation
  const [isEmbed, setIsEmbed] = useState(true)
  useEffect(() => {
    setIsEmbed(window.self !== window.top)
  }, [])

  if (!Component) return null

  const showBackBar = !isEmbed
  const parentFlow = flows.find((f) => f.steps.includes(slug))

  return (
    <div className="min-h-screen bg-black flex flex-col items-center">
      {showBackBar && (
        <div className="w-full flex items-center justify-between px-[24px] py-[8px] bg-bg-2/50">
          <Link href="/" className="text-text-2 text-[12px] hover:text-text-1 transition">
            &larr; Dashboard
          </Link>
          {isVersioned && (
            <span className="text-orange text-[12px] font-medium">
              Editing version {version}
            </span>
          )}
          {parentFlow ? (
            <Link
              href={`/preview/flow-export/${parentFlow.slug}`}
              target="_blank"
              className="flex items-center gap-[6px] px-[12px] py-[5px] rounded-[6px] bg-main/10 text-main text-[12px] font-medium hover:bg-main/20 transition"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 9V10H10V9M6 2V7.5M6 7.5L3.5 5M6 7.5L8.5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Export Flow ({parentFlow.steps.filter((s) => !s.endsWith('-interactive')).length})
            </Link>
          ) : (
            <div className="w-[80px]" />
          )}
        </div>
      )}
      <div className="flex-1 flex items-center justify-center">
        <div id="figma-export-root">
          <Component slug={slug} onNext={() => {}} onSelectFlight={() => {}} onTapWatch={() => {}} />
        </div>
      </div>
    </div>
  )
}

'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense, useState, useEffect, useMemo } from 'react'
import dynamic from 'next/dynamic'
import { components } from '@/dashboard.config'
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
import AxelPanel from '@/components/AxelPanel'
import StepProgress from '@/components/StepProgress'
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
  'axel-panel': AxelPanel,
  'step-progress': StepProgress,
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
  'axel-panel': 'AxelPanel',
  'step-progress': 'StepProgress',
}

function loadVersioned(slug, version) {
  const baseName = fileNames[slug]
  if (!baseName) return null
  return dynamic(
    () => import(`@/components/${baseName}.${version}`).catch(() => ({
      default: () => <div style={{ padding: 16, color: '#666', fontSize: 12 }}>Version {version} not found</div>,
    })),
    { ssr: false }
  )
}

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
    case 'axel-panel':
      return { message: 'I found 3 great flight options for you!', actions: [{ label: 'Show flights', variant: 'primary' }, { label: 'Change dates' }] }
    case 'step-progress':
      return {}
    default:
      return {}
  }
}

const CARD_W = 345
const H_GAP = 24
const V_GAP = 16
const PAD = 48

// Renders one version of a component
function VersionCard({ slug, version, label, isMain, notes, category, compName }) {
  const Component = (!version || version === 'A') ? mainComponents[slug] : loadVersioned(slug, version)
  if (!Component) return null
  const props = getSampleProps(slug)

  return (
    <div style={{ marginRight: H_GAP, marginBottom: V_GAP }}>
      <div style={{ fontSize: 12, color: '#999', marginBottom: 8, whiteSpace: 'nowrap' }}>
        {category}/{compName}/{label}{isMain ? ' (main)' : ''}{notes ? ` — ${notes}` : ''}
      </div>
      <div style={{ width: CARD_W, background: '#181818', borderRadius: 12, overflow: 'hidden', padding: 16 }}>
        <Component {...props} />
      </div>
    </div>
  )
}

function ComponentExportInner() {
  const searchParams = useSearchParams()
  const slugsParam = searchParams.get('slugs') || ''
  const slugs = slugsParam.split(',').filter(Boolean)

  const [iterations, setIterations] = useState(null)
  const [deletedItems, setDeletedItems] = useState([])

  useEffect(() => {
    fetch('/api/iterations').then((r) => r.json()).then(setIterations).catch(() => setIterations({}))
    fetch('/api/deleted-items').then((r) => r.json()).then(setDeletedItems).catch(() => setDeletedItems([]))
  }, [])

  if (!iterations) {
    return <div style={{ padding: 40, color: '#999', fontSize: 14 }}>Loading...</div>
  }

  const isDeleted = (type, slug) => deletedItems.some((d) => d.type === type && d.slug === slug)

  const selected = slugs
    .map((s) => components.find((c) => c.slug === s))
    .filter(Boolean)
    .filter((c) => !isDeleted('component', c.slug))

  if (selected.length === 0) {
    return <div style={{ padding: 40, color: '#999', fontSize: 14 }}>No components selected.</div>
  }

  // Group by category
  const grouped = {}
  for (const comp of selected) {
    const cat = comp.category || 'Other'
    if (!grouped[cat]) grouped[cat] = []
    grouped[cat].push(comp)
  }

  return (
    <div
      id="figma-export-root"
      style={{
        background: '#F5F5F5',
        fontFamily: "'Lato', 'Inter', system-ui, sans-serif",
        padding: PAD,
      }}
    >
      {Object.entries(grouped).map(([category, comps]) => (
        <div key={category} style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 16, fontWeight: 600, color: '#333', marginBottom: 16 }}>
            {category}
          </div>

          {comps.map((comp) => {
            const iterKey = `component:${comp.slug}`
            const versions = iterations[iterKey]?.versions || [{ label: 'A', isMain: true, notes: '' }]

            return (
              <div key={comp.slug} style={{ marginBottom: 24 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#555', marginBottom: 12 }}>
                  {comp.name} — {versions.length} variant{versions.length !== 1 ? 's' : ''}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                  {versions.map((v) => (
                    <VersionCard
                      key={v.label}
                      slug={comp.slug}
                      version={v.label}
                      label={v.label}
                      isMain={v.isMain}
                      notes={v.notes}
                      category={category}
                      compName={comp.name}
                    />
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}

export default function ComponentExportPage() {
  return (
    <Suspense fallback={<div style={{ padding: 40, color: '#999' }}>Loading...</div>}>
      <ComponentExportInner />
    </Suspense>
  )
}

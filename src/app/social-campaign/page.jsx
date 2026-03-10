'use client'

import { useState, useEffect, useCallback } from 'react'

// ─────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────

const LOGO = 'https://www.figma.com/api/mcp/asset/99c5338d-0c44-4566-ab59-66caa9dcc1ea'

const CHART = {
  line:    'https://www.figma.com/api/mcp/asset/58211c1b-12c6-4778-82f6-43a06d43c38a',
  dotLow:  'https://www.figma.com/api/mcp/asset/030b9cd8-7066-4139-9bf9-34c941f953e6',
  dotHigh: 'https://www.figma.com/api/mcp/asset/690cd41f-4bc7-43e2-8ed2-08e48f361043',
}

// CSS-only backgrounds — no images required
const BACKGROUNDS = {
  // Rose aurora — warm pink radials with deep magenta base
  pink: {
    color: '#0e0508',
    image: [
      'radial-gradient(ellipse 85% 65% at 92% 6%,  rgba(225,55,125,0.62) 0%, transparent 52%)',
      'radial-gradient(ellipse 55% 70% at 4% 92%,  rgba(170,20,72,0.38) 0%, transparent 52%)',
      'radial-gradient(ellipse 55% 45% at 48% 50%, rgba(55,8,28,0.55)   0%, transparent 68%)',
    ].join(', '),
  },
  // Blueprint grid — deep navy with fine grid lines and blue glow
  grid: {
    color: '#050810',
    image: [
      'repeating-linear-gradient(rgba(255,255,255,0.032) 0px, rgba(255,255,255,0.032) 1px, transparent 1px, transparent 26px)',
      'repeating-linear-gradient(90deg, rgba(255,255,255,0.032) 0px, rgba(255,255,255,0.032) 1px, transparent 1px, transparent 26px)',
      'radial-gradient(ellipse 72% 52% at 82% 8%,  rgba(50,100,235,0.42) 0%, transparent 58%)',
      'radial-gradient(ellipse 42% 58% at 8%  85%, rgba(18,58,185,0.24) 0%, transparent 54%)',
    ].join(', '),
  },
  // Emerald — dark forest with teal radial light
  green: {
    color: '#040b06',
    image: [
      'radial-gradient(ellipse 72% 62% at 18% 18%, rgba(11,224,155,0.34) 0%, transparent 54%)',
      'radial-gradient(ellipse 52% 68% at 88% 82%, rgba(0,185,115,0.22) 0%, transparent 54%)',
      'radial-gradient(ellipse 45% 42% at 54% 48%, rgba(0,90,55,0.32)   0%, transparent 65%)',
    ].join(', '),
  },
  // Amber — warm dusk with golden radials
  leaf: {
    color: '#0b0703',
    image: [
      'radial-gradient(ellipse 72% 58% at 18% 14%, rgba(215,130,22,0.48) 0%, transparent 54%)',
      'radial-gradient(ellipse 58% 72% at 88% 88%, rgba(165,82,12,0.30) 0%, transparent 54%)',
      'radial-gradient(ellipse 48% 38% at 62% 52%, rgba(80,38,8,0.40)   0%, transparent 62%)',
    ].join(', '),
  },
  // Cosmic — deep indigo with violet nebula
  abstract: {
    color: '#05060f',
    image: [
      'radial-gradient(ellipse 92% 58% at 50% -4%,  rgba(62,92,225,0.46) 0%, transparent 54%)',
      'radial-gradient(ellipse 58% 52% at 97% 92%,  rgba(118,42,205,0.34) 0%, transparent 54%)',
      'radial-gradient(ellipse 42% 48% at 4%  56%,  rgba(22,112,215,0.24) 0%, transparent 54%)',
    ].join(', '),
  },
}
const BG_KEYS = Object.keys(BACKGROUNDS)

const GREEN  = '#0be09b'
const G_TINT = 'rgba(11,224,155,0.14)'
const G_TINT2= 'rgba(79,198,96,0.17)'
const NEUTRAL_CARD = 'rgba(255,255,255,0.07)'
const L = 'var(--font-lato), Lato, sans-serif'
const R = 'var(--font-raleway), Raleway, sans-serif'
const w = (o) => `rgba(255,255,255,${o})`

const FORMATS = [
  { id: 'square',     label: '1 : 1',    desc: '1080 × 1080', w: 320, h: 320 },
  { id: 'portrait',   label: '4 : 3',    desc: '1080 × 1440', w: 240, h: 320 },
  { id: 'horizontal', label: 'Facebook', desc: '1200 × 628',  w: 500, h: 261 },
]

const CATEGORIES = [
  { id: 'all',    label: 'All' },
  { id: 'flight', label: 'Flight' },
  { id: 'hotel',  label: 'Hotel' },
  { id: 'both',   label: 'Flights + Hotels' },
]

// ─────────────────────────────────────────────
// AD DATA
// ─────────────────────────────────────────────

const ADS = [
  // FLIGHT — Price Tracking (before booking)
  {
    id: 'flight-track-1', category: 'flight',
    eyebrow: 'FLIGHT · PRICE TRACKING',
    headline: ['Stop Watching', 'Flight Prices'],
    tagline: 'Set your price. Axel grabs the flight when it drops.',
    visual: 'price-chart',
    visualData: { route: 'SFO → JFK', low: '$280' },
    defaultBg: 'pink',
  },
  {
    id: 'flight-track-2', category: 'flight',
    eyebrow: 'FLIGHT · PRICE TRACKING',
    headline: ['Name Your Price', 'for a Flight'],
    tagline: 'Axel tracks it and holds it when it hits your target.',
    visual: 'watch-card',
    visualData: { route: 'LAX → ORD', current: '$387', low: '$249' },
    defaultBg: 'grid',
  },
  // FLIGHT — Axel Deals
  {
    id: 'flight-deal-1', category: 'flight',
    eyebrow: 'FLIGHT · AXEL DEALS',
    headline: ["Flights You Won't", 'Find Anywhere'],
    tagline: 'Axel uncovers hidden airfare deals.',
    visual: 'flight-route-card',
    visualData: { airline: 'HAWAIIAN AIRLINES', from: 'SFO', fromCity: 'San Francisco', to: 'HNL', toCity: 'Honolulu', oldPrice: '$1,250', newPrice: '$840', back: '+$410 back' },
    defaultBg: 'green',
  },
  {
    id: 'flight-deal-2', category: 'flight',
    eyebrow: 'FLIGHT · AXEL DEALS',
    headline: ['Secret', 'Flight Deals'],
    tagline: 'Axel scans the internet for unusually low fares.',
    visual: 'price-drop-rows',
    visualData: { route: 'JFK → SFO', paid: '$649', found: '$445' },
    defaultBg: 'leaf',
  },
  // FLIGHT — Booking Journey
  {
    id: 'flight-journey-1', category: 'flight',
    eyebrow: 'FLIGHT · BOOKING JOURNEY',
    headline: ['Book Your Flight.', 'Axel Watches the Price.'],
    tagline: 'If it drops later, Axel gets the difference back.',
    visual: 'journey-card',
    visualData: { steps: ['Axel finds low fare', 'You book', 'Price drops', 'You get money back'] },
    defaultBg: 'abstract',
  },
  {
    id: 'flight-journey-2', category: 'flight',
    eyebrow: 'FLIGHT · BOOKING JOURNEY',
    headline: ['Save before booking.', 'Save after, too.'],
    tagline: 'Book with Axel, and save twice.',
    visual: 'calendar-card',
    visualData: { bookedDay: 1, savedDay: 7, savings: '+$410' },
    defaultBg: 'pink',
  },
  // FLIGHT — Repricing
  {
    id: 'flight-reprice-1', category: 'flight',
    eyebrow: 'FLIGHT · REPRICING',
    headline: ['Already Booked', 'Your Flight?'],
    tagline: 'Axel keeps watching the price for drops.',
    visual: 'price-drop-rows',
    visualData: { route: 'JFK → SFO', paid: '$649', found: '$445', back: '+$204 back' },
    defaultBg: 'green',
  },
  {
    id: 'flight-reprice-2', category: 'flight',
    eyebrow: 'FLIGHT · REPRICING',
    headline: ['Flight Prices Change.', "Axel Doesn't Miss It."],
    tagline: 'Upload your booking and Axel hunts for savings.',
    visual: 'watch-card',
    visualData: { route: 'BOS → MIA', current: '$512', low: '$341' },
    defaultBg: 'abstract',
  },
  // HOTEL — Price Tracking (before booking)
  {
    id: 'hotel-track-1', category: 'hotel',
    eyebrow: 'HOTEL · PRICE TRACKING',
    headline: ['Stop Checking', 'Hotel Prices'],
    tagline: 'Set your target. Axel grabs the room when it drops.',
    visual: 'price-chart',
    visualData: { route: 'The Westin Maui', low: '$215' },
    defaultBg: 'grid',
  },
  {
    id: 'hotel-track-2', category: 'hotel',
    eyebrow: 'HOTEL · PRICE TRACKING',
    headline: ['Name Your Price', 'for a Hotel'],
    tagline: 'Axel tracks the rate and locks it when it hits.',
    visual: 'watch-card',
    visualData: { route: 'Grand Hyatt NYC', current: '$399', low: '$269' },
    defaultBg: 'leaf',
  },
  // HOTEL — Axel Deals
  {
    id: 'hotel-deal-1', category: 'hotel',
    eyebrow: 'HOTEL · AXEL DEALS',
    headline: ['Hotel Deals', 'Most People Miss'],
    tagline: 'Axel finds unusually low prices across the web.',
    visual: 'flight-route-card',
    visualData: { airline: 'THE WESTIN MAUI', from: '$269', fromCity: 'per night before', to: '$189', toCity: 'per night now', oldPrice: '$269/nt', newPrice: '$189/nt', back: '+$80/nt' },
    defaultBg: 'green',
  },
  {
    id: 'hotel-deal-2', category: 'hotel',
    eyebrow: 'HOTEL · AXEL DEALS',
    headline: ['Hidden', 'Hotel Prices'],
    tagline: 'Axel surfaces deals that rarely stay around long.',
    visual: 'price-drop-rows',
    visualData: { route: 'Four Seasons LA', paid: '$520/nt', found: '$310/nt' },
    defaultBg: 'abstract',
  },
  // HOTEL — Booking Journey
  {
    id: 'hotel-journey-1', category: 'hotel',
    eyebrow: 'HOTEL · BOOKING JOURNEY',
    headline: ['Book Your Hotel.', 'Axel Watches the Price.'],
    tagline: 'If the rate drops later, Axel captures the savings.',
    visual: 'journey-card',
    visualData: { steps: ['Axel finds low rate', 'You book', 'Rate drops', 'You get money back'] },
    defaultBg: 'pink',
  },
  {
    id: 'hotel-journey-2', category: 'hotel',
    eyebrow: 'HOTEL · BOOKING JOURNEY',
    headline: ['Your Hotel Price', 'Should Only Go Down'],
    tagline: 'Book on Axel. Save when the price drops.',
    visual: 'calendar-card',
    visualData: { bookedDay: 1, savedDay: 7, savings: '+$520' },
    defaultBg: 'grid',
  },
  // HOTEL — Repricing
  {
    id: 'hotel-reprice-1', category: 'hotel',
    eyebrow: 'HOTEL · REPRICING',
    headline: ['Already Booked', 'a Hotel?'],
    tagline: 'Axel keeps tracking the rate for drops.',
    visual: 'price-drop-rows',
    visualData: { route: 'The Westin Maui', paid: '$289/nt', found: '$199/nt', back: '+$360 back' },
    defaultBg: 'leaf',
  },
  {
    id: 'hotel-reprice-2', category: 'hotel',
    eyebrow: 'HOTEL · REPRICING',
    headline: ['Hotel Prices', 'Change Constantly'],
    tagline: 'Axel keeps watching after you book.',
    visual: 'watch-card',
    visualData: { route: 'Four Seasons LA', current: '$520/nt', low: '$310/nt' },
    defaultBg: 'abstract',
  },
  // BOTH — Plan the Whole Trip
  {
    id: 'both-plan-1', category: 'both',
    eyebrow: 'FLIGHTS + HOTELS',
    headline: ['Let Axel', 'Plan Your Trip'],
    tagline: 'Flights and hotels optimized for the lowest price.',
    visual: 'trip-summary-card',
    visualData: { flight: 'SFO → HNL · $287', hotel: 'The Westin · $189/nt', total: '$620 saved' },
    defaultBg: 'abstract',
  },
  {
    id: 'both-plan-2', category: 'both',
    eyebrow: 'FLIGHTS + HOTELS',
    headline: ['Your Entire', 'Trip, Smarter'],
    tagline: 'Axel finds the best flights and hotels automatically.',
    visual: 'chat-result',
    visualData: { query: 'Hawaii next month', flight: '$287', hotel: '$189/nt' },
    defaultBg: 'pink',
  },
  // BOTH — Whole Trip Deals
  {
    id: 'both-deal', category: 'both',
    eyebrow: 'FLIGHTS + HOTELS',
    headline: ['Deals Across', 'Your Whole Trip'],
    tagline: 'Flights and hotels optimized by Axel.',
    visual: 'trip-savings-card',
    visualData: { flightSavings: '$320 off', hotelSavings: '$180 off', total: '$500 saved' },
    defaultBg: 'green',
  },
  // BOTH — Savings After Booking
  {
    id: 'both-reprice', category: 'both',
    eyebrow: 'FLIGHTS + HOTELS',
    headline: ['Save on Flights', 'and Hotels. Twice.'],
    tagline: 'Axel gets you the best price, even after finding you a great price.',
    visual: 'calendar-card',
    visualData: { bookedDay: 1, savedDay: 7, savings: '+$490' },
    defaultBg: 'leaf',
  },
]

// ─────────────────────────────────────────────
// VISUAL COMPONENTS (Figma-exact)
// ─────────────────────────────────────────────

// 1. FlightRouteCard — matches Figma 456:554
function FlightRouteCard({ data, s }) {
  const { airline, from, fromCity, to, toCity, oldPrice, newPrice, back } = data
  const routeSize   = Math.round(17 * s)
  const citySize    = Math.round(9 * s)
  const airlineSize = Math.round(8 * s)
  const labelSize   = Math.round(8 * s)
  const priceSize   = Math.round(14 * s)
  const p           = Math.round(11 * s)
  const ph          = Math.round(13 * s)

  return (
    <div style={{ width: '100%', borderRadius: 7, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.07)' }}>
      {/* Top section */}
      <div style={{ padding: `${p}px ${ph}px`, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ fontFamily: R, fontSize: airlineSize, fontWeight: 300, color: w(0.35), letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: Math.round(7 * s) }}>
          {airline}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: Math.round(4 * s) }}>
          <span style={{ fontFamily: R, fontSize: routeSize, fontWeight: 600, color: w(1), letterSpacing: '-0.025em', lineHeight: 1 }}>{from}</span>
          <span style={{ fontFamily: R, fontSize: Math.round(9 * s), fontWeight: 300, color: w(0.2), letterSpacing: '0.04em' }}>——</span>
          <span style={{ fontFamily: R, fontSize: routeSize, fontWeight: 600, color: w(1), letterSpacing: '-0.025em', lineHeight: 1 }}>{to}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: R, fontSize: citySize, fontWeight: 300, color: w(0.28) }}>{fromCity}</span>
          <span style={{ fontFamily: R, fontSize: citySize, fontWeight: 300, color: w(0.28) }}>{toCity}</span>
        </div>
      </div>
      {/* Bottom section — green tint */}
      <div style={{ background: G_TINT, padding: `${p}px ${ph}px` }}>
        <div style={{ fontFamily: R, fontSize: labelSize, fontWeight: 300, color: GREEN, opacity: 0.7, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: Math.round(5 * s) }}>
          Price drop
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: Math.round(7 * s) }}>
            <span style={{ fontFamily: L, fontSize: priceSize, fontWeight: 300, color: w(0.3), textDecoration: 'line-through', letterSpacing: '-0.01em' }}>{oldPrice}</span>
            <span style={{ fontFamily: L, fontSize: Math.round(18 * s), fontWeight: 400, color: GREEN, letterSpacing: '-0.02em' }}>{newPrice}</span>
          </div>
          {back && (
            <span style={{ fontFamily: R, fontSize: Math.round(9 * s), fontWeight: 300, color: GREEN, opacity: 0.75 }}>{back}</span>
          )}
        </div>
      </div>
    </div>
  )
}

// 2. PriceDropRows — matches Figma 456:654
function PriceDropRows({ data, s }) {
  const { route, paid, found, back } = data
  const routeSize = Math.round(8 * s)
  const paidSize  = Math.round(16 * s)
  const foundSize = Math.round(18 * s)
  const labelSize = Math.round(8 * s)
  const rowPadV   = Math.round(7 * s)
  const rowPadH   = Math.round(13 * s)

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: Math.round(5 * s) }}>
      {route && (
        <div style={{ fontFamily: R, fontSize: routeSize, fontWeight: 300, color: w(0.35), letterSpacing: '0.06em', marginBottom: Math.round(3 * s) }}>{route}</div>
      )}
      {/* Row 1 — you paid */}
      <div style={{
        background: NEUTRAL_CARD,
        borderRadius: 999,
        padding: `${rowPadV}px ${rowPadH}px`,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        border: '1px solid rgba(255,255,255,0.05)',
      }}>
        <span style={{ fontFamily: L, fontSize: paidSize, fontWeight: 300, color: w(0.28), textDecoration: 'line-through', letterSpacing: '-0.01em' }}>{paid}</span>
        <span style={{ fontFamily: R, fontSize: labelSize, fontWeight: 300, color: w(0.3), letterSpacing: '0.05em' }}>You paid</span>
      </div>
      {/* Row 2 — price drop */}
      <div style={{
        background: G_TINT2,
        borderRadius: 999,
        padding: `${rowPadV}px ${rowPadH}px`,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        border: `1px solid rgba(11,224,155,0.18)`,
      }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: Math.round(5 * s) }}>
          <span style={{ fontFamily: L, fontSize: Math.round(9 * s), fontWeight: 400, color: GREEN, opacity: 0.7 }}>✦</span>
          <span style={{ fontFamily: L, fontSize: foundSize, fontWeight: 400, color: GREEN, letterSpacing: '-0.02em' }}>{found}</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 2 }}>
          <span style={{ fontFamily: R, fontSize: labelSize, fontWeight: 300, color: GREEN, letterSpacing: '0.07em', textTransform: 'uppercase', opacity: 0.8 }}>Price drop</span>
          {back && <span style={{ fontFamily: R, fontSize: Math.round(7 * s), fontWeight: 300, color: GREEN, opacity: 0.55 }}>{back}</span>}
        </div>
      </div>
    </div>
  )
}

// 3. CalendarCard — matches Figma 456:579
function CalendarCard({ data, s }) {
  const { bookedDay, savedDay, savings } = data
  const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
  const dayNums = Array.from({ length: 7 }, (_, i) => i + 1)
  const cellH      = Math.round(26 * s)
  const labelSize  = Math.round(9 * s)
  const headerSize = Math.round(8 * s)
  const savingsSize = Math.round(10 * s)

  return (
    <div style={{ width: '100%', background: NEUTRAL_CARD, borderRadius: 7, padding: `${Math.round(9 * s)}px ${Math.round(11 * s)}px`, border: '1px solid rgba(255,255,255,0.06)' }}>
      {/* Day headers */}
      <div style={{ display: 'flex', gap: 2, marginBottom: Math.round(3 * s) }}>
        {DAYS.map(d => (
          <div key={d} style={{ flex: 1, textAlign: 'center', fontFamily: L, fontSize: headerSize, fontWeight: 300, color: w(0.25) }}>{d}</div>
        ))}
      </div>
      {/* Day cells */}
      <div style={{ display: 'flex', gap: 2, marginBottom: Math.round(7 * s) }}>
        {dayNums.map(n => {
          const isBooked = n === bookedDay
          const isSaved  = n === savedDay
          return (
            <div key={n} style={{
              flex: 1,
              height: cellH,
              borderRadius: 3,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: isSaved ? G_TINT : 'transparent',
              border: isBooked ? '1px solid rgba(255,255,255,0.35)' : isSaved ? `1px solid rgba(11,224,155,0.4)` : '1px solid transparent',
            }}>
              <span style={{
                fontFamily: L,
                fontSize: Math.round(10 * s),
                fontWeight: 300,
                color: isBooked ? w(0.9) : isSaved ? GREEN : w(0.18),
                letterSpacing: '-0.01em',
              }}>{n}</span>
            </div>
          )
        })}
      </div>
      {/* Labels */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: Math.round(7 * s) }}>
        <span style={{ fontFamily: R, fontSize: labelSize, fontWeight: 300, color: w(0.35) }}>Booked</span>
        <span style={{ fontFamily: R, fontSize: labelSize, fontWeight: 300, color: GREEN, opacity: 0.8 }}>Saved</span>
      </div>
      {/* Savings line */}
      <div style={{ textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: Math.round(6 * s) }}>
        <span style={{ fontFamily: R, fontSize: savingsSize, fontWeight: 300, color: w(0.4) }}>Axel saved you </span>
        <span style={{ fontFamily: L, fontSize: savingsSize, fontWeight: 400, color: GREEN, letterSpacing: '-0.02em' }}>{savings}</span>
      </div>
    </div>
  )
}

// 4. WatchCard
function WatchCard({ data, s }) {
  const { route, current, low } = data
  const priceSize = Math.round(18 * s)
  const labelSize = Math.round(8 * s)

  return (
    <div style={{ width: '100%', background: NEUTRAL_CARD, border: '1px solid rgba(255,255,255,0.06)', borderRadius: 7, padding: `${Math.round(10 * s)}px ${Math.round(13 * s)}px` }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: Math.round(10 * s) }}>
        <span style={{ fontFamily: R, fontSize: Math.round(8 * s), fontWeight: 300, color: w(0.28), letterSpacing: '0.05em' }}>{route}</span>
        <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, padding: '2px 7px' }}>
          <span style={{ fontFamily: R, fontSize: Math.round(7 * s), fontWeight: 300, color: w(0.3), letterSpacing: '0.05em' }}>Watching</span>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <div style={{ fontFamily: R, fontSize: labelSize, fontWeight: 300, color: w(0.25), marginBottom: 3, letterSpacing: '0.04em' }}>Current</div>
          <div style={{ fontFamily: L, fontSize: priceSize, fontWeight: 300, color: w(0.35), letterSpacing: '-0.02em' }}>{current}</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontFamily: R, fontSize: labelSize, fontWeight: 300, color: GREEN, opacity: 0.6, marginBottom: 3, letterSpacing: '0.04em' }}>All-time low</div>
          <div style={{ fontFamily: L, fontSize: priceSize, fontWeight: 400, color: GREEN, letterSpacing: '-0.02em' }}>{low}</div>
        </div>
      </div>
    </div>
  )
}

// 5. PriceChartCard
function PriceChartCard({ data, s, cardW }) {
  const { route, low } = data
  const W = cardW - Math.round(26 * s)
  const H = Math.round((W / 1222) * 354)
  const dotHighX = (440.5 / 1222) * W
  const dotHighY = (53   / 354)  * H
  const dotLowX  = (572.5 / 1222) * W
  const dotLowY  = (230  / 354)  * H
  const dotSize  = Math.max(9, Math.round(14 * s))
  const labelSize = Math.round(8 * s)

  return (
    <div style={{ width: '100%', background: NEUTRAL_CARD, border: '1px solid rgba(255,255,255,0.06)', borderRadius: 7, padding: `${Math.round(9 * s)}px ${Math.round(13 * s)}px` }}>
      <div style={{ fontFamily: R, fontSize: labelSize, fontWeight: 300, color: w(0.25), letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: Math.round(7 * s) }}>
        {route}
      </div>
      <div style={{ position: 'relative', width: W, height: H + Math.round(22 * s) }}>
        <img src={CHART.line} alt="" style={{ position: 'absolute', top: 0, left: 0, width: W, height: H, objectFit: 'fill' }} />
        <img src={CHART.dotHigh} alt="" style={{ position: 'absolute', left: dotHighX - dotSize / 2, top: dotHighY - dotSize / 2, width: dotSize, height: dotSize, objectFit: 'contain' }} />
        <img src={CHART.dotLow}  alt="" style={{ position: 'absolute', left: dotLowX  - dotSize / 2, top: dotLowY  - dotSize / 2, width: dotSize, height: dotSize, objectFit: 'contain' }} />
        <div style={{
          position: 'absolute', bottom: 0, left: dotLowX - Math.round(20 * s),
          background: G_TINT, border: `1px solid rgba(11,224,155,0.25)`, borderRadius: 4,
          padding: `2px ${Math.round(5 * s)}px`, whiteSpace: 'nowrap',
        }}>
          <span style={{ fontFamily: L, fontSize: labelSize, fontWeight: 400, color: GREEN, letterSpacing: '-0.02em' }}>{low}</span>
        </div>
        <div style={{ position: 'absolute', bottom: 0, right: 0 }}>
          <span style={{ fontFamily: R, fontSize: Math.round(7 * s), fontWeight: 300, color: GREEN, opacity: 0.5 }}>Axel saved you</span>
        </div>
      </div>
    </div>
  )
}

// 6. JourneyCard
function JourneyCard({ data, s }) {
  const { steps } = data
  const stepSize = Math.round(9 * s)
  const numSize  = Math.round(8 * s)
  const dotSize  = Math.round(18 * s)

  return (
    <div style={{ width: '100%', background: NEUTRAL_CARD, border: '1px solid rgba(255,255,255,0.06)', borderRadius: 7, padding: `${Math.round(10 * s)}px ${Math.round(13 * s)}px`, display: 'flex', flexDirection: 'column', gap: Math.round(8 * s) }}>
      {steps.map((step, i) => {
        const isLast = i === steps.length - 1
        return (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: Math.round(9 * s) }}>
            <div style={{
              width: dotSize, height: dotSize, borderRadius: '50%', flexShrink: 0,
              background: isLast ? G_TINT : 'transparent',
              border: `1px solid ${isLast ? 'rgba(11,224,155,0.35)' : w(0.1)}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ fontFamily: R, fontSize: numSize, fontWeight: 300, color: isLast ? GREEN : w(0.25) }}>{i + 1}</span>
            </div>
            <span style={{ fontFamily: R, fontSize: stepSize, fontWeight: 300, color: isLast ? GREEN : w(0.4), letterSpacing: '0.01em' }}>{step}</span>
          </div>
        )
      })}
    </div>
  )
}

// 7. TripSummaryCard
function TripSummaryCard({ data, s }) {
  const { flight, hotel, total } = data
  const labelSize = Math.round(8 * s)
  const textSize  = Math.round(9 * s)
  const totalSize = Math.round(13 * s)

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: Math.round(4 * s) }}>
      {[['Flight', flight], ['Hotel', hotel]].map(([label, val]) => (
        <div key={label} style={{ background: NEUTRAL_CARD, border: '1px solid rgba(255,255,255,0.06)', borderRadius: 6, padding: `${Math.round(7 * s)}px ${Math.round(12 * s)}px`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontFamily: R, fontSize: labelSize, fontWeight: 300, color: w(0.25), letterSpacing: '0.05em' }}>{label}</span>
          <span style={{ fontFamily: R, fontSize: textSize, fontWeight: 300, color: w(0.6) }}>{val}</span>
        </div>
      ))}
      <div style={{ background: G_TINT, border: `1px solid rgba(11,224,155,0.2)`, borderRadius: 6, padding: `${Math.round(7 * s)}px ${Math.round(12 * s)}px`, textAlign: 'center' }}>
        <span style={{ fontFamily: L, fontSize: totalSize, fontWeight: 400, color: GREEN, letterSpacing: '-0.02em' }}>{total}</span>
      </div>
    </div>
  )
}

// 8. ChatResult
function ChatResultVisual({ data, s }) {
  const { query, flight, hotel } = data
  const querySize = Math.round(8 * s)
  const priceSize = Math.round(15 * s)
  const labelSize = Math.round(8 * s)

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: Math.round(5 * s) }}>
      <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, borderBottomRightRadius: 3, padding: `${Math.round(5 * s)}px ${Math.round(10 * s)}px`, alignSelf: 'flex-end' }}>
        <span style={{ fontFamily: R, fontSize: querySize, fontWeight: 300, color: w(0.45) }}>{query}</span>
      </div>
      <div style={{ background: NEUTRAL_CARD, border: '1px solid rgba(255,255,255,0.06)', borderRadius: 7, padding: `${Math.round(9 * s)}px ${Math.round(13 * s)}px`, display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontFamily: R, fontSize: labelSize, fontWeight: 300, color: w(0.25), marginBottom: 3, letterSpacing: '0.04em' }}>Best flight</div>
          <div style={{ fontFamily: L, fontSize: priceSize, fontWeight: 400, color: GREEN, letterSpacing: '-0.02em' }}>{flight}</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontFamily: R, fontSize: labelSize, fontWeight: 300, color: w(0.25), marginBottom: 3, letterSpacing: '0.04em' }}>Best hotel</div>
          <div style={{ fontFamily: L, fontSize: priceSize, fontWeight: 400, color: GREEN, letterSpacing: '-0.02em' }}>{hotel}</div>
        </div>
      </div>
    </div>
  )
}

// 9. TripSavingsCard
function TripSavingsCard({ data, s }) {
  const { flightSavings, hotelSavings, total } = data
  const savSize   = Math.round(11 * s)
  const labelSize = Math.round(8 * s)
  const totalSize = Math.round(14 * s)

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: Math.round(4 * s) }}>
      <div style={{ display: 'flex', gap: Math.round(4 * s) }}>
        {[['Flights', flightSavings], ['Hotel', hotelSavings]].map(([label, val]) => (
          <div key={label} style={{ flex: 1, background: NEUTRAL_CARD, border: '1px solid rgba(255,255,255,0.06)', borderRadius: 6, padding: `${Math.round(7 * s)}px ${Math.round(10 * s)}px` }}>
            <div style={{ fontFamily: R, fontSize: labelSize, fontWeight: 300, color: w(0.25), marginBottom: Math.round(3 * s), letterSpacing: '0.05em' }}>{label}</div>
            <div style={{ fontFamily: L, fontSize: savSize, fontWeight: 400, color: GREEN, letterSpacing: '-0.02em' }}>{val}</div>
          </div>
        ))}
      </div>
      <div style={{ background: G_TINT, border: `1px solid rgba(11,224,155,0.2)`, borderRadius: 6, padding: `${Math.round(7 * s)}px ${Math.round(12 * s)}px`, textAlign: 'center' }}>
        <div style={{ fontFamily: R, fontSize: labelSize, fontWeight: 300, color: GREEN, opacity: 0.55, marginBottom: 3, letterSpacing: '0.05em' }}>Total saved</div>
        <div style={{ fontFamily: L, fontSize: totalSize, fontWeight: 400, color: GREEN, letterSpacing: '-0.02em' }}>{total}</div>
      </div>
    </div>
  )
}

function AdVisual({ visual, data, s, cardW }) {
  const p = { data, s, cardW }
  switch (visual) {
    case 'flight-route-card':  return <FlightRouteCard  {...p} />
    case 'price-drop-rows':    return <PriceDropRows    {...p} />
    case 'calendar-card':      return <CalendarCard     {...p} />
    case 'watch-card':         return <WatchCard        {...p} />
    case 'price-chart':        return <PriceChartCard   {...p} />
    case 'journey-card':       return <JourneyCard      {...p} />
    case 'trip-summary-card':  return <TripSummaryCard  {...p} />
    case 'chat-result':        return <ChatResultVisual {...p} />
    case 'trip-savings-card':  return <TripSavingsCard  {...p} />
    default: return null
  }
}

// ─────────────────────────────────────────────
// BACKGROUND PICKER
// ─────────────────────────────────────────────

function BgPicker({ adId, current, onChange }) {
  return (
    <div style={{ display: 'flex', gap: 4 }}>
      {BG_KEYS.map(key => {
        const bg = BACKGROUNDS[key]
        const active = current === key
        return (
          <button
            key={key}
            title={key}
            onClick={() => onChange(adId, key)}
            style={{
              width: 18, height: 24, borderRadius: 3, border: 'none', cursor: 'pointer',
              padding: 0, flexShrink: 0,
              outline: active ? `2px solid rgba(255,255,255,0.7)` : `1px solid rgba(255,255,255,0.12)`,
              outlineOffset: active ? 1 : 0,
              transition: 'outline 0.1s',
              backgroundColor: bg.color, backgroundImage: bg.image,
            }}
          />
        )
      })}
    </div>
  )
}

// ─────────────────────────────────────────────
// SOCIAL AD CARD
// ─────────────────────────────────────────────

function SocialAd({ ad, fmt, bgKey, textData, onClick, interactive = true }) {
  const isHoriz  = fmt.id === 'horizontal'
  const isSquare = fmt.id === 'square'
  const bg       = BACKGROUNDS[bgKey] || BACKGROUNDS[ad.defaultBg] || BACKGROUNDS.pink

  const pad    = isHoriz ? 22 : 18
  const innerW = fmt.w - pad * 2
  const cardW  = Math.round(innerW * 0.94)

  const s = isHoriz
    ? (fmt.h / 320) * 0.82
    : isSquare
      ? (fmt.w / 240) * 0.80
      : fmt.w / 240

  const hlSize = isHoriz
    ? Math.round(fmt.h * 0.073)
    : Math.round(fmt.w * 0.088)

  const logoW = isHoriz
    ? 36
    : Math.round(innerW * 0.30)

  const blurPx = Math.round(fmt.w * 0.17)

  const { eyebrow, headline, tagline } = textData

  return (
    <div
      onClick={interactive ? onClick : undefined}
      style={{
        width: fmt.w, height: fmt.h,
        borderRadius: 12, overflow: 'hidden',
        position: 'relative', background: '#090909',
        flexShrink: 0,
        cursor: interactive ? 'pointer' : 'default',
      }}
    >
      {/* Background */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundColor: bg.color, backgroundImage: bg.image,
        pointerEvents: 'none',
      }} />
      {/* Vignette */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 35%, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.52) 100%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '30%', background: 'linear-gradient(transparent, rgba(0,0,0,0.6))', pointerEvents: 'none' }} />

      {/* Corner glows */}
      <div style={{ position: 'absolute', top: '-8%', right: '-12%', width: '48%', height: '14%', background: 'white', filter: `blur(${blurPx}px)`, transform: 'rotate(180deg)', opacity: 0.35, pointerEvents: 'none', zIndex: 1 }} />
      <div style={{ position: 'absolute', bottom: '-8%', left: '-10%', width: '50%', height: '14%', background: 'white', filter: `blur(${blurPx}px)`, transform: 'rotate(180deg)', opacity: 0.35, pointerEvents: 'none', zIndex: 1 }} />

      {isHoriz ? (
        /* Facebook horizontal layout */
        (() => {
          const textColW  = 195
          const gutter    = 20
          const divider   = 1
          const horizCardW = fmt.w - pad * 2 - textColW - gutter - divider - gutter
          const horizS    = (fmt.h / 320) * 0.72
          return (
            <div style={{ position: 'absolute', inset: 0, zIndex: 2, display: 'flex', alignItems: 'stretch', padding: pad }}>
              {/* Left — text block */}
              <div style={{ width: textColW, flexShrink: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', paddingRight: gutter }}>
                {/* Top: logo + eyebrow + headline */}
                <div>
                  <img src={LOGO} alt="Axel" style={{ width: logoW, height: Math.round(logoW / 4.05), objectFit: 'contain', objectPosition: 'left', display: 'block', marginBottom: 8 }} />
                  <div style={{ fontFamily: R, fontSize: 8, fontWeight: 300, color: w(0.25), letterSpacing: '0.09em', textTransform: 'uppercase', marginBottom: 9 }}>{eyebrow}</div>
                  <div>
                    {headline.filter(Boolean).map((line, i) => (
                      <div key={i} style={{ fontFamily: R, fontSize: hlSize, fontWeight: 300, color: w(0.93), lineHeight: 1.15, letterSpacing: '-0.028em' }}>{line}</div>
                    ))}
                  </div>
                </div>
                {/* Bottom: tagline */}
                <div style={{ fontFamily: R, fontSize: 9, fontWeight: 300, color: w(0.38), lineHeight: 1.5, maxWidth: textColW }}>{tagline}</div>
              </div>

              {/* Vertical divider */}
              <div style={{ width: divider, background: 'rgba(255,255,255,0.08)', flexShrink: 0, marginBlock: 2 }} />

              {/* Right — visual */}
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', paddingLeft: gutter, overflow: 'hidden' }}>
                <div style={{ width: horizCardW }}>
                  <AdVisual visual={ad.visual} data={ad.visualData} s={horizS} cardW={horizCardW} />
                </div>
              </div>
            </div>
          )
        })()
      ) : (
        /* Portrait / Square — center aligned */
        <div style={{
          position: 'absolute', inset: 0, zIndex: 2,
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          padding: `${pad}px ${pad}px ${pad}px`,
          textAlign: 'center',
        }}>
          {/* Logo */}
          <img src={LOGO} alt="Axel" style={{ width: logoW, height: Math.round(logoW / 4.05), objectFit: 'contain' }} />

          {/* Eyebrow */}
          <div style={{
            fontFamily: R, fontSize: 8, fontWeight: 400,
            color: w(0.28), letterSpacing: '0.09em',
            textTransform: 'uppercase',
            marginTop: 7, marginBottom: 5,
          }}>
            {eyebrow}
          </div>

          {/* Headline */}
          <div style={{ marginBottom: isSquare ? 10 : 8 }}>
            {headline.filter(Boolean).map((line, i) => (
              <div key={i} style={{
                fontFamily: R, fontSize: hlSize, fontWeight: 300,
                color: w(0.92), lineHeight: 1.12,
                letterSpacing: '-0.03em', whiteSpace: 'nowrap',
              }}>
                {line}
              </div>
            ))}
          </div>

          {/* Visual — fills remaining space */}
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', minHeight: 0 }}>
            <div style={{ width: cardW }}>
              <AdVisual visual={ad.visual} data={ad.visualData} s={s} cardW={cardW} />
            </div>
          </div>

          {/* Tagline */}
          <div style={{
            fontFamily: R, fontSize: 9, fontWeight: 400,
            color: w(0.30), lineHeight: 1.4,
            marginTop: 7,
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '100%',
          }}>
            {tagline}
          </div>
        </div>
      )}
    </div>
  )
}

// ─────────────────────────────────────────────
// TEXT EDITOR PANEL (preview right side)
// ─────────────────────────────────────────────

function TextEditorPanel({ ad, textData, onFieldChange, onUndo, onRedo, canUndo, canRedo }) {
  const inputStyle = {
    width: '100%', background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.1)', borderRadius: 6,
    color: w(0.85), fontFamily: R, fontSize: 13, fontWeight: 400,
    padding: '8px 10px', outline: 'none', boxSizing: 'border-box',
    letterSpacing: '0.01em',
  }
  const labelStyle = {
    fontFamily: R, fontSize: 11, fontWeight: 400, color: w(0.3),
    marginBottom: 5, display: 'block', textTransform: 'uppercase', letterSpacing: '0.07em',
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      <div>
        <label style={labelStyle}>Eyebrow</label>
        <input style={inputStyle} value={textData.eyebrow} onChange={e => onFieldChange('eyebrow', e.target.value)} />
      </div>
      <div>
        <label style={labelStyle}>Headline Line 1</label>
        <input style={inputStyle} value={textData.headline[0] || ''} onChange={e => {
          const h = [...textData.headline]
          h[0] = e.target.value
          onFieldChange('headline', h)
        }} />
      </div>
      <div>
        <label style={labelStyle}>Headline Line 2</label>
        <input style={inputStyle} value={textData.headline[1] || ''} onChange={e => {
          const h = [...textData.headline]
          h[1] = e.target.value
          onFieldChange('headline', h)
        }} />
      </div>
      <div>
        <label style={labelStyle}>Tagline</label>
        <input style={inputStyle} value={textData.tagline} onChange={e => onFieldChange('tagline', e.target.value)} />
      </div>

      {/* Undo / Redo */}
      <div style={{ display: 'flex', gap: 8, paddingTop: 4 }}>
        <button
          onClick={onUndo}
          disabled={!canUndo}
          style={{
            flex: 1, padding: '8px 0', borderRadius: 6, border: '1px solid rgba(255,255,255,0.1)',
            background: 'rgba(255,255,255,0.04)', color: canUndo ? w(0.65) : w(0.2),
            fontFamily: R, fontSize: 12, fontWeight: 400, cursor: canUndo ? 'pointer' : 'not-allowed',
            letterSpacing: '0.02em',
          }}
        >
          Undo
        </button>
        <button
          onClick={onRedo}
          disabled={!canRedo}
          style={{
            flex: 1, padding: '8px 0', borderRadius: 6, border: '1px solid rgba(255,255,255,0.1)',
            background: 'rgba(255,255,255,0.04)', color: canRedo ? w(0.65) : w(0.2),
            fontFamily: R, fontSize: 12, fontWeight: 400, cursor: canRedo ? 'pointer' : 'not-allowed',
            letterSpacing: '0.02em',
          }}
        >
          Redo
        </button>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// PREVIEW MODAL
// ─────────────────────────────────────────────

function PreviewModal({ adId, filteredAds, format, globalBg, onGlobalBgChange, textHistory, onClose, onNavChange, onTextFieldChange, onUndo, onRedo, getAdText, historyIdx }) {
  const fmt = FORMATS.find(f => f.id === format) || FORMATS[1]
  const currentIdx = filteredAds.findIndex(a => a.id === adId)
  const ad = filteredAds[currentIdx]

  const scale = fmt.id === 'portrait' ? 2.2 : fmt.id === 'square' ? 2.0 : 1.5

  const scaledW = Math.round(fmt.w * scale)
  const scaledH = Math.round(fmt.h * scale)

  const textData = getAdText(ad)

  const history = historyIdx[ad.id]
  const hist    = textHistory[ad.id]
  const canUndo = history !== undefined && history > 0
  const canRedo = hist !== undefined && history !== undefined && history < hist.length - 1

  const goTo = useCallback((delta) => {
    const newIdx = currentIdx + delta
    if (newIdx >= 0 && newIdx < filteredAds.length) return filteredAds[newIdx].id
    return null
  }, [currentIdx, filteredAds])

  // Handle keyboard
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') { onClose(); return }
      if (e.key === 'ArrowLeft')  { const id = goTo(-1); if (id) onNavChange('__nav', id) }
      if (e.key === 'ArrowRight') { const id = goTo(1);  if (id) onNavChange('__nav', id) }
      if ((e.metaKey || e.ctrlKey) && !e.shiftKey && e.key === 'z') { e.preventDefault(); onUndo(ad.id) }
      if ((e.metaKey || e.ctrlKey) &&  e.shiftKey && e.key === 'z') { e.preventDefault(); onRedo(ad.id) }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose, goTo, onNavChange, onUndo, onRedo, ad.id])

  const prevId = goTo(-1)
  const nextId = goTo(1)

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 200,
      background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(12px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{ display: 'flex', gap: 40, alignItems: 'flex-start', maxHeight: '90vh' }}>

        {/* Prev arrow */}
        <button onClick={() => prevId && onNavChange('__nav', prevId)} disabled={!prevId} style={{
          width: 40, height: 40, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.12)',
          background: 'rgba(255,255,255,0.04)', color: prevId ? w(0.6) : w(0.15),
          fontSize: 18, cursor: prevId ? 'pointer' : 'not-allowed', display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0, marginTop: scaledH / 2 - 20,
        }}>&#8592;</button>

        {/* Ad (non-interactive, scaled) */}
        <div style={{ flexShrink: 0, position: 'relative' }}>
          <div style={{ transform: `scale(${scale})`, transformOrigin: 'top left', width: fmt.w, height: fmt.h }}>
            <SocialAd ad={ad} fmt={fmt} bgKey={globalBg} textData={textData} interactive={false} />
          </div>
          {/* Invisible spacer so parent sees scaled size */}
          <div style={{ width: scaledW, height: scaledH, pointerEvents: 'none' }} />
        </div>

        {/* Next arrow */}
        <button onClick={() => nextId && onNavChange('__nav', nextId)} disabled={!nextId} style={{
          width: 40, height: 40, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.12)',
          background: 'rgba(255,255,255,0.04)', color: nextId ? w(0.6) : w(0.15),
          fontSize: 18, cursor: nextId ? 'pointer' : 'not-allowed', display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0, marginTop: scaledH / 2 - 20,
        }}>&#8594;</button>

        {/* Right panel — text editor */}
        <div style={{ width: 280, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 0, maxHeight: scaledH + 2, overflowY: 'auto' }}>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <div>
              <div style={{ fontFamily: R, fontSize: 12, fontWeight: 400, color: w(0.7) }}>{ad.eyebrow}</div>
              <div style={{ fontFamily: R, fontSize: 11, fontWeight: 300, color: w(0.25), marginTop: 2 }}>{ad.id}</div>
            </div>
            <button onClick={onClose} style={{
              width: 30, height: 30, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.1)',
              background: 'rgba(255,255,255,0.04)', color: w(0.5), cursor: 'pointer', fontSize: 16,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>&#215;</button>
          </div>

          {/* Background picker */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontFamily: R, fontSize: 11, fontWeight: 400, color: w(0.3), textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 8 }}>Background</div>
            <div style={{ display: 'flex', gap: 5 }}>
              {BG_KEYS.map(key => {
                const bg = BACKGROUNDS[key]
                const active = globalBg === key
                return (
                  <button key={key} onClick={() => onGlobalBgChange(key)} style={{
                    width: 28, height: 36, borderRadius: 4, border: 'none', cursor: 'pointer', padding: 0,
                    outline: active ? '2px solid rgba(255,255,255,0.7)' : '1px solid rgba(255,255,255,0.12)',
                    outlineOffset: active ? 1 : 0,
                    backgroundColor: bg.color, backgroundImage: bg.image,
                  }} />
                )
              })}
            </div>
          </div>

          {/* Text editor */}
          <div style={{ fontFamily: R, fontSize: 11, fontWeight: 400, color: w(0.3), textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 12 }}>Text</div>
          <TextEditorPanel
            ad={ad}
            textData={textData}
            onFieldChange={(field, value) => onTextFieldChange(ad.id, field, value)}
            onUndo={() => onUndo(ad.id)}
            onRedo={() => onRedo(ad.id)}
            canUndo={canUndo}
            canRedo={canRedo}
          />

          {/* Counter */}
          <div style={{ fontFamily: R, fontSize: 11, fontWeight: 300, color: w(0.2), marginTop: 20, textAlign: 'center' }}>
            {currentIdx + 1} / {filteredAds.length}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────

export default function SocialCampaignPage() {
  const [category,  setCategory]  = useState('all')
  const [format,    setFormat]    = useState('portrait')
  const [globalBg,  setGlobalBg]  = useState('pink')
  const [preview,   setPreview]   = useState(null)  // adId | null

  // Text editing state
  const [textOverrides, setTextOverrides] = useState({})
  const [textHistory,   setTextHistory]   = useState({})   // { adId: [snapshots] }
  const [historyIdx,    setHistoryIdx]    = useState({})   // { adId: number }

  const fmt = FORMATS.find(f => f.id === format) || FORMATS[1]

  const filtered = category === 'all' ? ADS : ADS.filter(a => a.category === category)

  const grouped = ['flight', 'hotel', 'both'].reduce((acc, cat) => {
    const ads = filtered.filter(a => a.category === cat)
    if (ads.length) acc[cat] = ads
    return acc
  }, {})

  const catLabels = { flight: 'Flight', hotel: 'Hotel', both: 'Flights + Hotels' }

  // ── Preview nav (reuses bg change sentinel from modal) ──
  function handleNavChange(adId, key) {
    if (adId === '__nav') setPreview(key)
  }

  // ── Text helpers ──
  function getAdText(ad) {
    const ov = textOverrides[ad.id]
    return {
      eyebrow:  ov?.eyebrow  ?? ad.eyebrow,
      headline: ov?.headline ?? ad.headline,
      tagline:  ov?.tagline  ?? ad.tagline,
    }
  }

  function applyTextChange(adId, field, value) {
    const ad = ADS.find(a => a.id === adId)
    if (!ad) return

    const currentText = getAdText(ad)
    const snapshot    = { ...currentText }

    setTextHistory(prev => {
      const hist = prev[adId] || [snapshot]
      const idx  = historyIdx[adId] ?? hist.length - 1
      const trimmed = hist.slice(0, idx + 1)
      return { ...prev, [adId]: [...trimmed, snapshot] }
    })
    setHistoryIdx(prev => {
      const hist = textHistory[adId] || [snapshot]
      const idx  = prev[adId] ?? hist.length - 1
      return { ...prev, [adId]: idx + 1 }
    })
    setTextOverrides(prev => ({
      ...prev,
      [adId]: { ...currentText, [field]: value },
    }))
  }

  function undoText(adId) {
    const hist = textHistory[adId]
    if (!hist) return
    const idx = historyIdx[adId] ?? hist.length - 1
    if (idx <= 0) return
    const newIdx = idx - 1
    setHistoryIdx(prev => ({ ...prev, [adId]: newIdx }))
    setTextOverrides(prev => ({ ...prev, [adId]: hist[newIdx] }))
  }

  function redoText(adId) {
    const hist = textHistory[adId]
    if (!hist) return
    const idx = historyIdx[adId] ?? 0
    if (idx >= hist.length - 1) return
    const newIdx = idx + 1
    setHistoryIdx(prev => ({ ...prev, [adId]: newIdx }))
    setTextOverrides(prev => ({ ...prev, [adId]: hist[newIdx] }))
  }

  const R_STR = 'var(--font-raleway), Raleway, sans-serif'

  return (
    <div style={{ background: '#060606', minHeight: '100vh', fontFamily: R_STR }}>

      {/* ── Sticky Header ── */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: 'rgba(6,6,6,0.93)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        padding: '13px 28px',
        display: 'flex', alignItems: 'center', gap: 14,
      }}>
        <div>
          <div style={{ fontFamily: R_STR, fontSize: 14, fontWeight: 400, color: w(0.72), letterSpacing: '0.01em' }}>Social Campaign</div>
          <div style={{ fontFamily: R_STR, fontSize: 11, fontWeight: 300, color: w(0.2), marginTop: 2 }}>{ADS.length} ads · 3 formats · {FORMATS.length} sizes</div>
        </div>

        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8, alignItems: 'center' }}>
          {/* Category tabs */}
          <div style={{ display: 'flex', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 8, padding: 3, gap: 1 }}>
            {CATEGORIES.map(c => (
              <button key={c.id} onClick={() => setCategory(c.id)} style={{
                padding: '5px 12px', borderRadius: 5, border: 'none', cursor: 'pointer',
                fontFamily: R_STR, fontSize: 12, fontWeight: category === c.id ? 400 : 300,
                background: category === c.id ? 'rgba(255,255,255,0.08)' : 'transparent',
                color: category === c.id ? w(0.8) : w(0.3),
                transition: 'all 0.12s', letterSpacing: '0.01em',
              }}>{c.label}</button>
            ))}
          </div>

          <div style={{ width: 1, height: 20, background: w(0.06) }} />

          {/* Format switcher */}
          <div style={{ display: 'flex', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 8, padding: 3, gap: 1 }}>
            {FORMATS.map(f => (
              <button key={f.id} onClick={() => setFormat(f.id)} style={{
                padding: '5px 12px', borderRadius: 5, border: 'none', cursor: 'pointer',
                fontFamily: R_STR, fontSize: 12, fontWeight: format === f.id ? 400 : 300,
                background: format === f.id ? 'rgba(255,255,255,0.08)' : 'transparent',
                color: format === f.id ? w(0.8) : w(0.3),
                transition: 'all 0.12s', letterSpacing: '0.01em',
              }}>{f.label}</button>
            ))}
          </div>

          <div style={{ fontFamily: R_STR, fontSize: 11, fontWeight: 300, color: w(0.18), minWidth: 80, textAlign: 'right' }}>{fmt.desc}</div>

          <div style={{ width: 1, height: 20, background: w(0.06) }} />

          {/* Global background picker */}
          <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
            {BG_KEYS.map(key => {
              const bg = BACKGROUNDS[key]
              const active = globalBg === key
              return (
                <button
                  key={key}
                  title={key}
                  onClick={() => setGlobalBg(key)}
                  style={{
                    width: 20, height: 26, borderRadius: 4, border: 'none', cursor: 'pointer', padding: 0, flexShrink: 0,
                    outline: active ? '2px solid rgba(255,255,255,0.65)' : '1px solid rgba(255,255,255,0.1)',
                    outlineOffset: active ? 1 : 0,
                    transition: 'outline 0.1s',
                    backgroundColor: bg.color, backgroundImage: bg.image,
                  }}
                />
              )
            })}
          </div>
        </div>
      </div>

      {/* ── Grid ── */}
      <div style={{ padding: '36px 28px', display: 'flex', flexDirection: 'column', gap: 52 }}>
        {Object.entries(grouped).map(([cat, ads]) => (
          <div key={cat}>
            {/* Category header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 22 }}>
              <span style={{ fontFamily: R_STR, fontSize: 10, fontWeight: 300, color: w(0.22), textTransform: 'uppercase', letterSpacing: '0.09em', whiteSpace: 'nowrap' }}>{catLabels[cat]}</span>
              <div style={{ flex: 1, height: 1, background: w(0.06) }} />
              <span style={{ fontFamily: R_STR, fontSize: 10, fontWeight: 300, color: w(0.12) }}>{ads.length}</span>
            </div>

            {/* Ad row */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, alignItems: 'flex-start' }}>
              {ads.map(ad => {
                const textData = getAdText(ad)
                return (
                  <div key={ad.id} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <SocialAd
                      ad={ad}
                      fmt={fmt}
                      bgKey={globalBg}
                      textData={textData}
                      onClick={() => setPreview(ad.id)}
                    />
                    <span style={{ fontFamily: R_STR, fontSize: 10, fontWeight: 300, color: w(0.18), paddingLeft: 2 }}>{ad.id}</span>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {/* ── Preview Modal ── */}
      {preview && (
        <PreviewModal
          adId={preview}
          filteredAds={filtered}
          format={format}
          globalBg={globalBg}
          onGlobalBgChange={setGlobalBg}
          textHistory={textHistory}
          onClose={() => setPreview(null)}
          onNavChange={handleNavChange}
          onTextFieldChange={applyTextChange}
          onUndo={undoText}
          onRedo={redoText}
          getAdText={getAdText}
          historyIdx={historyIdx}
        />
      )}
    </div>
  )
}

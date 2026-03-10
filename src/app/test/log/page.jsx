'use client'

import Link from 'next/link'
import { useState } from 'react'

const FEATURE_LOG = [
  {
    area: 'Layout',
    icon: 'M3 3h4v4H3V3zm6 0h4v4H9V3zm6 0h4v4h-4V3zM3 9h4v4H3V9zm6 0h4v4H9V9zm6 0h4v4h-4V9z',
    items: [
      'Three-panel layout: left sidebar, center preview, right sidebar',
      'Top nav with Axel One branding',
    ],
  },
  {
    area: 'Left Sidebar',
    icon: 'M4 3h2v14H4V3zm5 0h7v4H9V3zm0 6h7v4H9V9z',
    items: [
      'Tabs: Flows / Screens / Components / Log',
      'Collapsible flow groups (Flight Hold Opportunity, Trip Flow)',
      'Click screen to preview in center panel',
      '"View flow" link per flow group',
      'Export section at bottom of sidebar',
      'Batch component export with Figma naming (Category/Name/Property=Value)',
      'Component select mode with Select All / Cancel',
    ],
  },
  {
    area: 'Center Preview',
    icon: 'M5 2a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V4a2 2 0 00-2-2H5zm5 14a1 1 0 100-2 1 1 0 000 2z',
    items: [
      'Mobile device frame (393x852)',
      'Live component rendering via iframe',
      '"Run Demo" button to play interactive flow',
      'Screen name + file path display',
      'Component grid view with thumbnails',
      'Flow overview — all screens side by side',
    ],
  },
  {
    area: 'Figma Integration',
    icon: 'M5 2a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V4a2 2 0 00-2-2H5zm6 0a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V4a2 2 0 00-2-2h-2zm-6 8a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zm6 0a2 2 0 00-2 2v4a2 2 0 002 2 2 2 0 002-2v-4a2 2 0 00-2-2z',
    items: [
      'Sync from Figma via MCP',
      'Export to Figma via capture pool + popup window',
      'Batch component export with component set naming',
      'Auto layout + TEXT nodes (no unnecessary frame wrapping)',
      'Flow export as single section capture',
      'Component export page at /preview/component-export',
      'Queue-based capture requests via /api/figma-capture',
    ],
  },
  {
    area: 'Flows',
    icon: 'M4 4l4 4-4 4M10 16h6',
    items: [
      'Flight Hold Opportunity (7 screens: Watch Created, Home, Flight Details, Add Details, Opportunity Found, Select Passenger, Paywall)',
      'Trip Flow (13 screens: Interactive, Trips List, New Trip Input, Chat Thinking, Chat Flights, Chat Flight Booked, Chat Hotels, Hotel Map, Hotel Detail, Itinerary Summary, Trip Paywall, Trip Payment, Trip Confirmation)',
    ],
  },
  {
    area: 'Components',
    icon: 'M4 4h6v6H4V4zm0 8h6v6H4v-6zm8-8h6v6h-6V4zm0 8h6v6h-6v-6z',
    items: [
      'FlightCard (3 variants: default, nonstop, one-stop)',
      'PriceChart, CTAButton, ThinkingBubble, StepProgress',
      'FlightDealCard (6 variants), HotelDealCard (5 variants)',
      'FlightResultsList, WatchCard, HotelWatchCard',
      'TripCard (5 variants: monitoring, price-drop, booked, completed, loading)',
      'ConfirmedFlightCard, PriceBreakdownCard, ConfirmedBookingCard',
      'OrderSummaryCard, PaywallCard, HotelMapPeekCard, SavedPaymentCard',
      'AxelPanel (3 variants: default, typing, compact)',
    ],
  },
  {
    area: 'Iteration System',
    icon: 'M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1-.25 1.94-.7 2.77l1.46 1.46A7.93 7.93 0 0020 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1 .25-1.94.7-2.77L5.24 7.77A7.93 7.93 0 004 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z',
    items: [
      'Versioned components and screens (A, B, C, D, E...)',
      'Side-by-side version comparison in preview panel',
      'Save version as main, archive others',
      'Version notes via API',
      'Dressroom: isolated component iteration environment',
    ],
  },
  {
    area: 'Delete + Trash',
    icon: 'M6 2l-1 1H2v2h16V3h-3l-1-1H6zM4 7v11a2 2 0 002 2h8a2 2 0 002-2V7H4z',
    items: [
      'Soft delete with localStorage-backed trash',
      'Restore from trash via header icon',
      'Permanent delete via "Empty Trash" with server persistence',
    ],
  },
]

const CHANGELOG = [
  {
    date: '2026-03-04',
    time: '23:20',
    title: 'Fix Export to Figma — actually sends to Figma now',
    details: 'Replaced broken iframe capture approach with window.open() popup that triggers the Figma capture script. Export button consumes a fresh capture ID from the pool, opens the target page in a popup with Figma hash params, and the capture.js script auto-submits the DOM to Figma. Popup auto-closes after capture completes.',
    tag: 'fix',
  },
  {
    date: '2026-03-04',
    time: '23:10',
    title: 'Replace pool+iframe system with queue-based capture API',
    details: 'Removed captureViaIframe function (loaded pages in hidden iframes with hash params but never actually submitted to Figma). Removed finite pool availability UI (captures left counter, per-page counts in modal). Export button now always enabled. Added component type support to /api/figma-capture and dimensions field to capture data.',
    tag: 'fix',
  },
  {
    date: '2026-03-04',
    time: '23:00',
    title: 'Purge expired capture IDs from pool',
    details: 'Old capture IDs in capture-pool.json had expired (Figma sessions have a short TTL). Removed stale available captures and replenished with 10 fresh IDs for the Axel Chat page. Pool now returns valid IDs first.',
    tag: 'fix',
  },
  {
    date: '2026-03-04',
    time: '18:00',
    title: 'Add Log page',
    details: 'Added /test/log page with feature reference and changelog. Added "Log" link to top nav bar and sidebar tabs.',
    tag: 'feature',
  },
  {
    date: '2026-03-04',
    time: '17:30',
    title: 'Batch component export to Figma',
    details: 'Added component select mode in sidebar and grid view with checkboxes. "Export Selected" button opens export modal with component count and variant summary. Single-capture sheet renders all selected components grouped by category with Figma component set naming labels.',
    tag: 'feature',
  },
  {
    date: '2026-03-04',
    time: '17:00',
    title: 'Add category and figmaVariants metadata',
    details: 'Added category (Card, Chart, UI, List) and figmaVariants mapping to each component in dashboard.config.js. Used for Figma component set naming during export.',
    tag: 'feature',
  },
  {
    date: '2026-03-04',
    time: '16:30',
    title: 'Component export preview page',
    details: 'New page at /preview/component-export?slugs=... that renders selected components with dark containers and naming labels. Uses margin/padding (not gap) for spacing to preserve layout during Figma capture.',
    tag: 'feature',
  },
]

const TAG_STYLES = {
  feature: 'bg-green/15 text-green',
  fix: 'bg-orange/15 text-orange',
  refactor: 'bg-[#0090FF]/15 text-[#0090FF]',
  design: 'bg-main/15 text-main',
}

const TAG_DOTS = {
  feature: 'bg-green',
  fix: 'bg-orange',
  refactor: 'bg-[#0090FF]',
  design: 'bg-main',
}

export default function LogPage() {
  const [activeSection, setActiveSection] = useState('changelog')

  const featureCount = FEATURE_LOG.reduce((sum, s) => sum + s.items.length, 0)
  const fixCount = CHANGELOG.filter((e) => e.tag === 'fix').length
  const featChangeCount = CHANGELOG.filter((e) => e.tag === 'feature').length

  return (
    <div className="min-h-screen bg-bg text-text-1">
      {/* Header */}
      <header className="flex items-center justify-between py-[12px] px-[24px] border-b border-text-2/10">
        <div className="flex items-center gap-[10px]">
          <Link href="/" className="text-text-2/50 text-[12px] hover:text-text-1 transition flex items-center gap-[6px]">
            <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
              <path d="M12 15l-5-5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Dashboard
          </Link>
          <span className="text-text-2/15">/</span>
          <h1 className="text-text-1 text-[15px] font-medium">Log</h1>
        </div>
        <div className="flex items-center gap-[16px]">
          <div className="flex items-center gap-[6px]">
            <div className="w-[6px] h-[6px] rounded-full bg-green" />
            <span className="text-[11px] text-text-2/40">{featChangeCount} features</span>
          </div>
          <div className="flex items-center gap-[6px]">
            <div className="w-[6px] h-[6px] rounded-full bg-orange" />
            <span className="text-[11px] text-text-2/40">{fixCount} fixes</span>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar nav */}
        <div className="w-[200px] shrink-0 border-r border-text-2/10 p-[16px] flex flex-col gap-[4px]">
          <button
            onClick={() => setActiveSection('changelog')}
            className={`w-full flex items-center gap-[8px] px-[12px] py-[8px] rounded-[8px] text-left transition text-[13px] ${
              activeSection === 'changelog'
                ? 'bg-text-2/8 text-text-1'
                : 'text-text-2/50 hover:text-text-1 hover:bg-text-2/5'
            }`}
          >
            <svg width="14" height="14" viewBox="0 0 20 20" fill="none" className="shrink-0 opacity-50">
              <path d="M6 4h8M6 8h8M6 12h5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
            Changelog
            <span className="ml-auto text-[11px] text-text-2/30">{CHANGELOG.length}</span>
          </button>
          <button
            onClick={() => setActiveSection('features')}
            className={`w-full flex items-center gap-[8px] px-[12px] py-[8px] rounded-[8px] text-left transition text-[13px] ${
              activeSection === 'features'
                ? 'bg-text-2/8 text-text-1'
                : 'text-text-2/50 hover:text-text-1 hover:bg-text-2/5'
            }`}
          >
            <svg width="14" height="14" viewBox="0 0 20 20" fill="none" className="shrink-0 opacity-50">
              <path d="M4 4h4v4H4V4zm6 0h4v4h-4V4zM4 10h4v4H4v-4zm6 0h4v4h-4v-4z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Features
            <span className="ml-auto text-[11px] text-text-2/30">{featureCount}</span>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 49px)' }}>
          <div className="max-w-[680px] mx-auto px-[32px] py-[24px] pb-[80px]">
            {activeSection === 'changelog' ? (
              <div>
                <h2 className="text-[18px] text-text-1 font-semibold mb-[4px]">Changelog</h2>
                <p className="text-[13px] text-text-2/40 mb-[24px]">Recent updates, fixes, and improvements</p>

                {/* Timeline */}
                <div className="relative">
                  {/* Vertical line */}
                  <div className="absolute left-[5px] top-[8px] bottom-[8px] w-[1px] bg-text-2/10" />

                  <div className="flex flex-col gap-[0px]">
                    {CHANGELOG.map((entry, i) => {
                      const prevEntry = CHANGELOG[i - 1]
                      const showDate = !prevEntry || prevEntry.date !== entry.date
                      return (
                        <div key={i}>
                          {showDate && (
                            <div className="flex items-center gap-[12px] mb-[12px] mt-[4px]">
                              <div className="w-[11px] h-[11px] rounded-full border-[2px] border-text-2/20 bg-bg relative z-10" />
                              <span className="text-[12px] text-text-2/50 font-medium">
                                {new Date(entry.date + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                              </span>
                            </div>
                          )}
                          <div className="flex gap-[12px] mb-[16px]">
                            {/* Dot */}
                            <div className="relative z-10 mt-[6px]">
                              <div className={`w-[11px] h-[11px] rounded-full ${TAG_DOTS[entry.tag] || 'bg-text-2/30'}`} style={{ opacity: 0.6 }} />
                            </div>
                            {/* Card */}
                            <div className="flex-1 border border-text-2/8 rounded-[10px] bg-[#0d0d0d] overflow-hidden hover:border-text-2/15 transition">
                              <div className="px-[16px] py-[14px]">
                                <div className="flex items-center gap-[8px] mb-[6px]">
                                  <span
                                    className={`text-[10px] font-semibold uppercase tracking-[0.05em] px-[6px] py-[2px] rounded-[4px] ${
                                      TAG_STYLES[entry.tag] || 'bg-text-2/10 text-text-2'
                                    }`}
                                  >
                                    {entry.tag}
                                  </span>
                                  <span className="text-[11px] text-text-2/25 font-mono">{entry.time}</span>
                                </div>
                                <h3 className="text-[14px] text-text-1 font-medium leading-[1.4] mb-[6px]">{entry.title}</h3>
                                <p className="text-[12px] text-text-2/45 leading-[1.65]">{entry.details}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <h2 className="text-[18px] text-text-1 font-semibold mb-[4px]">Features</h2>
                <p className="text-[13px] text-text-2/40 mb-[24px]">{featureCount} capabilities across {FEATURE_LOG.length} areas</p>

                <div className="grid grid-cols-2 gap-[12px]">
                  {FEATURE_LOG.map((section) => (
                    <div
                      key={section.area}
                      className="border border-text-2/8 rounded-[10px] bg-[#0d0d0d] p-[16px] hover:border-text-2/15 transition"
                    >
                      <div className="flex items-center gap-[8px] mb-[12px]">
                        <div className="w-[28px] h-[28px] rounded-[7px] bg-text-2/6 flex items-center justify-center">
                          <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
                            <path d={section.icon} stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="text-text-2/50" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-[13px] text-text-1 font-medium leading-[1.2]">{section.area}</h3>
                          <span className="text-[11px] text-text-2/30">{section.items.length} item{section.items.length !== 1 ? 's' : ''}</span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-[6px]">
                        {section.items.map((item, i) => (
                          <div
                            key={i}
                            className="flex items-start gap-[6px] text-[12px] text-text-2/50 leading-[1.5]"
                          >
                            <span className="text-text-2/15 shrink-0 mt-[6px] w-[3px] h-[3px] rounded-full bg-text-2/25" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

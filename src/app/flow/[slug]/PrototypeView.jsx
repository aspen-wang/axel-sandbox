'use client'

import { useState, useEffect, useCallback } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { screens } from '@/dashboard.config'

const screenLoaders = {
  importing: dynamic(() => import('@/projects/axel-one/screens/Importing'), { ssr: false }),
  'flight-deals': dynamic(() => import('@/projects/axel-one/screens/FlightDeals'), { ssr: false }),
  'home-member': dynamic(() => import('@/projects/axel-one/screens/HomeMember'), { ssr: false }),
  'watch-created': dynamic(() => import('@/projects/axel-one/screens/WatchCreated'), { ssr: false }),
  'flight-details': dynamic(() => import('@/projects/axel-one/screens/FlightDetails'), { ssr: false }),
  'add-details': dynamic(() => import('@/projects/axel-one/screens/AddDetails'), { ssr: false }),
  'select-passenger': dynamic(() => import('@/projects/axel-one/screens/SelectPassenger'), { ssr: false }),
  paywall: dynamic(() => import('@/projects/axel-one/screens/Paywall'), { ssr: false }),
  'hotel-deals': dynamic(() => import('@/projects/axel-one/screens/HotelDeals'), { ssr: false }),
  'home-hotel-watch': dynamic(() => import('@/projects/axel-one/screens/HomeHotelWatch'), { ssr: false }),
  'trips-empty': dynamic(() => import('@/projects/axel-one/screens/TripsEmpty'), { ssr: false }),
  'trips-list': dynamic(() => import('@/projects/axel-one/screens/TripsList'), { ssr: false }),
  'new-trip-input': dynamic(() => import('@/projects/axel-one/screens/NewTripInput'), { ssr: false }),
  'chat-thinking': dynamic(() => import('@/projects/axel-one/screens/ChatThinking'), { ssr: false }),
  'chat-flights': dynamic(() => import('@/projects/axel-one/screens/ChatFlights'), { ssr: false }),
  'chat-flight-booked': dynamic(() => import('@/projects/axel-one/screens/ChatFlightBooked'), { ssr: false }),
  'chat-hotels': dynamic(() => import('@/projects/axel-one/screens/ChatHotels'), { ssr: false }),
  'hotel-map': dynamic(() => import('@/projects/axel-one/screens/HotelMap'), { ssr: false }),
  'hotel-detail': dynamic(() => import('@/projects/axel-one/screens/HotelDetail'), { ssr: false }),
  'itinerary-summary': dynamic(() => import('@/projects/axel-one/screens/ItinerarySummary'), { ssr: false }),
  'trip-paywall': dynamic(() => import('@/projects/axel-one/screens/TripPaywall'), { ssr: false }),
  'trip-payment': dynamic(() => import('@/projects/axel-one/screens/TripPayment'), { ssr: false }),
  'trip-confirmation': dynamic(() => import('@/projects/axel-one/screens/TripConfirmation'), { ssr: false }),
  'trip-flow-interactive': dynamic(() => import('@/projects/axel-one/screens/TripFlowInteractive'), { ssr: false }),
}

export default function PrototypeView({ flow, graph, onClose }) {
  const [step, setStep] = useState(0)

  const orderedNodes = [...graph.nodes].sort((a, b) => a.x - b.x)
  const totalSteps = orderedNodes.length
  const currentNode = orderedNodes[step]

  const goToScreen = useCallback((slug) => {
    const idx = orderedNodes.findIndex((n) => {
      const nodeSlug = n.screenSlug || n.id
      return nodeSlug === slug || n.id === slug
    })
    if (idx >= 0) setStep(idx)
  }, [orderedNodes])

  function goNext() {
    if (step < totalSteps - 1) setStep(step + 1)
  }

  function goPrev() {
    if (step > 0) setStep(step - 1)
  }

  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') goNext()
      if (e.key === 'ArrowLeft') goPrev()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  })

  // Find the edge label leading to the current node
  const incomingEdge = graph.edges.find((e) => e.target === currentNode?.id)

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col">
      {/* Top bar */}
      <div className="flex items-center justify-between px-[24px] py-[12px]">
        <div className="flex items-center gap-[12px] min-w-[140px]">
          <Link href="/" className="text-text-2 text-[13px] hover:text-text-1 transition">&larr;</Link>
          <p className="text-text-1 text-[14px] font-medium">{flow.name}</p>
        </div>
        <div className="flex items-center gap-[4px]">
          {orderedNodes.map((node, i) => (
            <button
              key={node.id}
              onClick={() => setStep(i)}
              className={`rounded-full transition ${
                i === step ? 'bg-main w-[18px] h-[6px]' : i < step ? 'bg-green w-[6px] h-[6px]' : 'bg-text-2/20 w-[6px] h-[6px]'
              }`}
              title={node.label}
            />
          ))}
        </div>
        <button
          onClick={onClose}
          className="text-text-2 text-[13px] hover:text-text-1 transition min-w-[140px] text-right"
        >
          Close
        </button>
      </div>

      {/* Screen area */}
      <div className="flex-1 flex items-center justify-center overflow-hidden relative">
        {/* Left click zone */}
        <button
          onClick={goPrev}
          disabled={step === 0}
          className="absolute left-0 top-0 bottom-0 w-[80px] z-10 opacity-0 hover:opacity-100 transition flex items-center justify-center disabled:hidden"
        >
          <div className="w-[32px] h-[32px] rounded-full bg-text-2/10 flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 3L5 8l5 5" />
            </svg>
          </div>
        </button>

        {/* Right click zone */}
        <button
          onClick={goNext}
          disabled={step === totalSteps - 1}
          className="absolute right-0 top-0 bottom-0 w-[80px] z-10 opacity-0 hover:opacity-100 transition flex items-center justify-center disabled:hidden"
        >
          <div className="w-[32px] h-[32px] rounded-full bg-text-2/10 flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 3l5 5-5 5" />
            </svg>
          </div>
        </button>

        <div className="relative" style={{ width: 393, height: 852 }}>
          <div
            className="flex h-full transition-transform duration-400 ease-in-out"
            style={{
              width: totalSteps * 393,
              transform: `translateX(-${step * 393}px)`,
            }}
          >
            {orderedNodes.map((node) => {
              const nodeSlug = node.screenSlug || node.id
              const screen = screens.find((s) => s.slug === nodeSlug)
              const isBuilt = screen && screen.component
              const Component = screenLoaders[nodeSlug]

              return (
                <div key={node.id} className="w-[393px] h-[852px] flex-shrink-0">
                  {isBuilt && Component ? (
                    <Component
                      onNext={goNext}
                      onSelectFlight={goNext}
                      onTapWatch={() => goToScreen('flight-details')}
                    />
                  ) : (
                    <div className="w-full h-full bg-bg-2 rounded-[30px] flex flex-col items-center justify-center gap-[16px]">
                      <p className="text-text-2 text-[14px]">{node.label}</p>
                      <p className="text-text-2/50 text-[12px]">Screen not yet built</p>
                      <button
                        onClick={goNext}
                        className="px-[16px] py-[8px] rounded-[8px] bg-bg text-green text-[12px] font-medium hover:bg-green/10 transition"
                      >
                        Skip to next
                      </button>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="flex items-center justify-between px-[24px] py-[10px]">
        <button
          onClick={goPrev}
          disabled={step === 0}
          className="px-[14px] py-[6px] rounded-[8px] bg-bg-2 text-text-2 text-[12px] disabled:opacity-30 hover:text-text-1 transition flex items-center gap-[6px]"
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6.5 1.5L3 5l3.5 3.5" />
          </svg>
          Back
        </button>
        <div className="flex flex-col items-center">
          <p className="text-text-1 text-[12px] font-medium">{currentNode?.label}</p>
          <div className="flex items-center gap-[6px]">
            <span className="text-text-2/40 text-[10px]">{step + 1} of {totalSteps}</span>
            {incomingEdge?.label && (
              <>
                <span className="text-text-2/20 text-[10px]">&middot;</span>
                <span className="text-main/60 text-[10px]">{incomingEdge.label}</span>
              </>
            )}
          </div>
        </div>
        <button
          onClick={goNext}
          disabled={step === totalSteps - 1}
          className="px-[14px] py-[6px] rounded-[8px] bg-bg-2 text-text-2 text-[12px] disabled:opacity-30 hover:text-text-1 transition flex items-center gap-[6px]"
        >
          Next
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3.5 1.5L7 5l-3.5 3.5" />
          </svg>
        </button>
      </div>
    </div>
  )
}

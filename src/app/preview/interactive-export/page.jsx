'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

const FRAME_W = 393
const FRAME_H = 852
const FRAME_R = 30
const GAP = 80
const LABEL_H = 48
const PAD = 60

const SCREENS = [
  { key: 'trips-list', label: 'Trips List' },
  { key: 'new-trip', label: 'New Trip' },
  { key: 'chat-thinking', label: 'Chat Thinking' },
  { key: 'chat-flights', label: 'Chat Flights' },
  { key: 'chat-hotel-thinking', label: 'Hotel Thinking' },
  { key: 'chat-hotels', label: 'Chat Hotels' },
  { key: 'hotel-map', label: 'Hotel Map' },
  { key: 'hotel-detail', label: 'Hotel Detail' },
  { key: 'itinerary', label: 'Itinerary' },
  { key: 'paywall', label: 'Paywall' },
  { key: 'payment', label: 'Payment' },
  { key: 'confirmation', label: 'Confirmation' },
]

function InteractiveExportInner() {
  const searchParams = useSearchParams()
  const v = searchParams.get('v') || ''
  const comboName = searchParams.get('name') || ''

  const totalW = PAD * 2 + SCREENS.length * FRAME_W + (SCREENS.length - 1) * GAP
  const totalH = PAD + LABEL_H + FRAME_H + PAD

  return (
    <div
      id="figma-export-root"
      style={{
        width: totalW,
        height: totalH,
        background: '#F5F5F5',
        position: 'relative',
        fontFamily: 'Inter, system-ui, sans-serif',
      }}
    >
      {/* Section label */}
      <div
        style={{
          position: 'absolute',
          top: PAD - 32,
          left: PAD,
          fontSize: 18,
          fontWeight: 600,
          color: '#333',
          letterSpacing: '-0.01em',
        }}
      >
        Trip Flow
        {comboName && (
          <span style={{ fontSize: 13, color: '#999', marginLeft: 12, fontWeight: 400 }}>
            {comboName}
          </span>
        )}
      </div>

      {/* Frames row */}
      <div
        style={{
          position: 'absolute',
          top: PAD + LABEL_H,
          left: PAD,
          display: 'flex',
        }}
      >
        {SCREENS.map((screen, i) => (
          <div
            key={screen.key}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginRight: i < SCREENS.length - 1 ? GAP : 0,
            }}
          >
            {/* Frame label */}
            <div
              style={{
                marginBottom: 12,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <span
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: '50%',
                  background: '#E0E0E0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 11,
                  fontWeight: 600,
                  color: '#666',
                  marginRight: 8,
                }}
              >
                {i + 1}
              </span>
              <span style={{ fontSize: 13, fontWeight: 500, color: '#555' }}>
                {screen.label}
              </span>
            </div>

            {/* Phone frame */}
            <div
              style={{
                width: FRAME_W,
                height: FRAME_H,
                borderRadius: FRAME_R,
                overflow: 'hidden',
                background: '#000',
                boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
              }}
            >
              <iframe
                src={`/preview/screen/trip-flow-interactive?s=${screen.key}${v ? `&v=${encodeURIComponent(v)}` : ''}`}
                style={{
                  border: 'none',
                  width: FRAME_W,
                  height: FRAME_H,
                  overflow: 'hidden',
                }}
                scrolling="no"
                tabIndex={-1}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function InteractiveExportPage() {
  return (
    <Suspense fallback={<div style={{ padding: 40, color: '#999' }}>Loading...</div>}>
      <InteractiveExportInner />
    </Suspense>
  )
}

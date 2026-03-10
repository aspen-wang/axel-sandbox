'use client'

import { useParams } from 'next/navigation'
import { flows, screens } from '@/dashboard.config'

const FRAME_W = 393
const FRAME_H = 852
const FRAME_R = 30
const GAP = 80
const LABEL_H = 48
const PAD = 60

export default function FlowExportPage() {
  const { slug } = useParams()
  const flow = flows.find((f) => f.slug === slug)
  if (!flow) return <div>Flow not found</div>

  const flowScreens = flow.steps
    .filter((s) => s !== slug + '-interactive' && !s.endsWith('-interactive'))
    .map((s) => screens.find((sc) => sc.slug === s))
    .filter(Boolean)
  const totalW = PAD * 2 + flowScreens.length * FRAME_W + (flowScreens.length - 1) * GAP
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
        {flow.name}
      </div>

      {/* Frames row */}
      <div
        style={{
          position: 'absolute',
          top: PAD + LABEL_H,
          left: PAD,
          display: 'flex',
          gap: GAP,
        }}
      >
        {flowScreens.map((screen, i) => (
          <div key={screen.slug} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {/* Frame label */}
            <div
              style={{
                marginBottom: 12,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
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
                }}
              >
                {i + 1}
              </span>
              <span style={{ fontSize: 13, fontWeight: 500, color: '#555' }}>
                {screen.name}
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
                src={`/preview/screen/${screen.slug}`}
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

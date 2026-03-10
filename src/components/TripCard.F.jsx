'use client'

import { useState } from 'react'

// ─── Variant F: Minimal Tag ────────────────────────────────────────
// Ultra-compact pill/tag style, ~44px height. Single line with
// status dot, route, date, price. Hover expands to show more info.
// Completed = muted text.

const DEFAULT_TRIP = {
  title: 'Seattle → San Francisco',
  tripType: 'flight+hotel',
  dates: 'Apr 15 - 18, 2026',
  travelers: 2,
  status: 'monitoring',
  price: 358,
  originalPrice: 478,
  axelLastChecked: '2 min ago',
  airlineName: 'United Airlines',
  hotelName: 'The Westin SF',
}

const STATUS_CONFIG = {
  monitoring: { label: 'Monitoring', color: '#EF508D', dot: 'pulse' },
  'price-drop': { label: 'Price Drop Found', color: '#4FC660', dot: 'solid' },
  booked: { label: 'Booked', color: '#FFFFFF', dot: 'check' },
  completed: { label: 'Completed', color: '#888888', dot: 'check' },
}

function Skeleton() {
  return (
    <div
      className="flex items-center animate-pulse rounded-[12px]"
      style={{
        backgroundColor: '#111111',
        border: '1px solid #222222',
        padding: '10px 14px',
        height: '44px',
      }}
    >
      <div className="rounded-full mr-[8px]" style={{ width: '6px', height: '6px', backgroundColor: '#222222' }} />
      <div className="h-[12px] w-[100px] rounded mr-[8px]" style={{ backgroundColor: '#222222' }} />
      <div className="h-[10px] w-[60px] rounded mr-[8px]" style={{ backgroundColor: '#1A1A1A' }} />
      <div className="flex-1" />
      <div className="h-[14px] w-[40px] rounded" style={{ backgroundColor: '#222222' }} />
    </div>
  )
}

export default function TripCard({ trip = DEFAULT_TRIP, loading = false, onClick }) {
  const [hovered, setHovered] = useState(false)

  if (loading) return <Skeleton />

  const status = STATUS_CONFIG[trip.status] || STATUS_CONFIG.monitoring
  const isCompleted = trip.status === 'completed'

  const textColor = isCompleted ? '#666666' : '#FFFFFF'
  const secondaryColor = isCompleted ? '#444444' : '#AAAAAA'

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="w-full text-left rounded-[12px] transition-all"
      style={{
        backgroundColor: '#111111',
        border: '1px solid #222222',
        padding: hovered ? '10px 14px 10px 14px' : '10px 14px',
        minHeight: '44px',
        opacity: isCompleted ? 0.7 : 1,
      }}
    >
      {/* Main row: [dot] Route · Date · Price */}
      <div className="flex items-center">
        {/* Status dot */}
        <div className="shrink-0 mr-[8px]">
          {status.dot === 'pulse' && (
            <div className="relative" style={{ width: '6px', height: '6px' }}>
              <div
                className="absolute inset-0 rounded-full animate-ping"
                style={{ backgroundColor: status.color, opacity: 0.4 }}
              />
              <div
                className="absolute inset-0 rounded-full"
                style={{ backgroundColor: status.color }}
              />
            </div>
          )}
          {status.dot === 'solid' && (
            <div
              className="rounded-full"
              style={{ width: '6px', height: '6px', backgroundColor: status.color }}
            />
          )}
          {status.dot === 'check' && (
            <svg
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ stroke: status.color }}
            >
              <path d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          )}
        </div>

        {/* Route */}
        <span
          className="font-['Lato',system-ui,sans-serif] leading-[1] truncate mr-[6px]"
          style={{ fontSize: '14px', fontWeight: 600, color: textColor }}
        >
          {trip.title}
        </span>

        {/* Separator */}
        <span
          className="shrink-0 mr-[6px]"
          style={{ color: '#333333', fontSize: '12px' }}
        >
          ·
        </span>

        {/* Date */}
        <span
          className="font-['Lato',system-ui,sans-serif] leading-[1] shrink-0 mr-[6px]"
          style={{ fontSize: '12px', fontWeight: 400, color: secondaryColor }}
        >
          {trip.dates}
        </span>

        {/* Flexible spacer */}
        <div className="flex-1" />

        {/* Price always visible on right */}
        {trip.price && (
          <span
            className="font-['Lato',system-ui,sans-serif] leading-[1] shrink-0"
            style={{ fontSize: '14px', fontWeight: 600, color: isCompleted ? '#666666' : '#4FC660' }}
          >
            ${trip.price}
          </span>
        )}
      </div>

      {/* Expanded info on hover */}
      {hovered && (
        <div className="flex items-center mt-[8px]">
          {/* Status label */}
          <span
            className="font-['Lato',system-ui,sans-serif] leading-[1] mr-[10px]"
            style={{ fontSize: '11px', fontWeight: 400, color: status.color }}
          >
            {status.label}
          </span>

          {/* Airline / Hotel */}
          <span
            className="font-['Lato',system-ui,sans-serif] leading-[1] truncate mr-[10px]"
            style={{ fontSize: '11px', fontWeight: 400, color: '#666666' }}
          >
            {[trip.airlineName, trip.hotelName].filter(Boolean).join(' · ')}
          </span>

          {/* Travelers */}
          {trip.travelers && (
            <span
              className="font-['Lato',system-ui,sans-serif] leading-[1] shrink-0 mr-[10px]"
              style={{ fontSize: '11px', fontWeight: 400, color: '#666666' }}
            >
              {trip.travelers} traveler{trip.travelers !== 1 ? 's' : ''}
            </span>
          )}

          <div className="flex-1" />

          {/* Original price strikethrough */}
          {trip.originalPrice && trip.originalPrice !== trip.price && (
            <span
              className="font-['Lato',system-ui,sans-serif] line-through leading-[1] shrink-0"
              style={{ fontSize: '11px', fontWeight: 400, color: '#888888' }}
            >
              ${trip.originalPrice}
            </span>
          )}
        </div>
      )}
    </button>
  )
}

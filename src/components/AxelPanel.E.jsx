'use client'

import { useState, useEffect } from 'react'

const STACKED_MESSAGES = [
  'Here are some hotel deals near Shibuya...',
  'I can also check availability for...',
]

export default function AxelPanelE({ message, actions, typing = false, compact = false }) {
  return (
    <div className="absolute bottom-0 left-0 right-0 z-20 px-[16px] pb-[38px]">
      <div className="relative" style={{ paddingTop: '16px' }}>
        {/* Stacked cards behind (deepest first) */}
        {STACKED_MESSAGES.map((text, i) => (
          <div
            key={i}
            className="absolute left-0 right-0 bg-[#1E1E1E] rounded-[14px] px-[14px] py-[10px]"
            style={{
              bottom: `${(STACKED_MESSAGES.length - i) * 6}px`,
              transform: `rotate(${(STACKED_MESSAGES.length - i) * (i % 2 === 0 ? -1.2 : 1)}deg) scale(${1 - (STACKED_MESSAGES.length - i) * 0.03})`,
              opacity: 0.25 + i * 0.15,
              zIndex: i,
              border: '1px solid #2A2A2A',
            }}
          >
            <p className="font-['Lato',sans-serif] text-[11px] text-text-2 leading-[1.3] truncate">
              {text}
            </p>
          </div>
        ))}

        {/* Main card */}
        <div
          className="relative bg-[#1A1A1A] rounded-[14px] px-[16px] pt-[14px] pb-[14px]"
          style={{
            zIndex: STACKED_MESSAGES.length + 1,
            borderTop: '3px solid #EF508D',
            boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
          }}
        >
          <div className="flex items-start">
            {/* Axel Avatar */}
            <div className="w-[24px] h-[24px] rounded-full bg-main/15 flex items-center justify-center shrink-0 mr-[10px] mt-[1px]">
              <span className="font-bold text-[11px] text-main leading-none">A</span>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              {typing ? (
                <TypingDots />
              ) : (
                <p className="font-['Lato',sans-serif] text-[13px] text-text-1 leading-[1.4]">
                  {message}
                </p>
              )}

              {/* Actions */}
              {!compact && actions && actions.length > 0 && !typing && (
                <div className="flex flex-wrap mt-[10px]" style={{ gap: '8px' }}>
                  {actions.map((action, i) => (
                    <button
                      key={i}
                      onClick={action.onClick}
                      className={`px-[14px] py-[7px] rounded-full text-[11px] font-medium font-['Lato',sans-serif] transition hover:brightness-110 ${
                        action.variant === 'primary'
                          ? 'bg-blue text-white'
                          : 'border border-blue/40 text-blue'
                      }`}
                    >
                      {action.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Card count indicator */}
          <div className="flex items-center justify-center mt-[10px]" style={{ gap: '4px' }}>
            {[...STACKED_MESSAGES, 'current'].map((_, i) => (
              <div
                key={i}
                className={`rounded-full ${i === STACKED_MESSAGES.length ? 'w-[14px] bg-main' : 'w-[5px] bg-[#444]'}`}
                style={{ height: '3px', transition: 'all 0.3s ease' }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function TypingDots() {
  return (
    <div className="flex items-center h-[18px]">
      <style>{`
        @keyframes axelBounceE {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-6px); }
        }
      `}</style>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="w-[6px] h-[6px] rounded-full bg-main mr-[4px]"
          style={{
            animation: 'axelBounceE 0.9s ease-in-out infinite',
            animationDelay: `${i * 0.15}s`,
          }}
        />
      ))}
    </div>
  )
}

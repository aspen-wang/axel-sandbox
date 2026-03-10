'use client'

import { useState, useEffect } from 'react'

export default function AxelPanel({ message, actions, typing = false, compact = false }) {
  return (
    <div className="absolute bottom-0 left-0 right-0 z-20">
      <div
        className="bg-[#1A1A1A] rounded-t-[20px] px-[16px] pt-[14px] pb-[38px]"
        style={{ borderLeft: '3px solid #EF508D' }}
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
              <p className="font-['Lato',sans-serif] text-[13px] text-text-1 leading-[1.4] line-clamp-2">
                {message}
              </p>
            )}

            {/* Action buttons */}
            {!compact && actions && actions.length > 0 && !typing && (
              <div className="flex flex-wrap mt-[10px]" style={{ gap: '8px' }}>
                {actions.map((action, i) => (
                  <button
                    key={i}
                    onClick={action.onClick}
                    className={`px-[14px] py-[7px] rounded-full text-[11px] font-medium transition hover:brightness-110 ${
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
      </div>
    </div>
  )
}

function TypingDots() {
  return (
    <div className="flex items-center h-[18px]">
      <style>{`
        @keyframes axelBounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-6px); }
        }
      `}</style>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="w-[6px] h-[6px] rounded-full bg-main mr-[4px]"
          style={{
            animation: 'axelBounce 0.9s ease-in-out infinite',
            animationDelay: `${i * 0.15}s`,
          }}
        />
      ))}
    </div>
  )
}

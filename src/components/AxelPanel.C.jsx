'use client'

import { useState, useEffect } from 'react'

const MOCK_MESSAGES = [
  { from: 'user', text: 'Find me flights to Tokyo' },
  { from: 'axel', text: 'I found 3 great options for you!' },
]

export default function AxelPanelC({ message, actions, typing = false, compact = false }) {
  return (
    <div className="absolute bottom-0 left-0 right-0 z-20">
      <div
        className="bg-[#1A1A1A] rounded-t-[20px] pt-[14px] pb-[38px]"
        style={{ borderTop: '2px solid rgba(239, 80, 141, 0.3)' }}
      >
        {/* Thread header */}
        <div className="px-[16px] pb-[10px] mb-[10px]" style={{ borderBottom: '1px solid #2A2A2A' }}>
          <div className="flex items-center">
            <div className="w-[20px] h-[20px] rounded-full bg-main/15 flex items-center justify-center shrink-0 mr-[8px]">
              <span className="font-bold text-[9px] text-main leading-none">A</span>
            </div>
            <span className="font-['Lato',sans-serif] text-[12px] font-semibold text-text-1">Axel</span>
            <span className="font-['Lato',sans-serif] text-[10px] text-text-2 ml-[8px]">AI Travel Assistant</span>
          </div>
        </div>

        {/* Message thread */}
        <div className="px-[16px] max-h-[180px] overflow-y-auto" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {MOCK_MESSAGES.map((msg, i) => (
            <div key={i} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[75%] px-[12px] py-[8px] font-['Lato',sans-serif] text-[12px] leading-[1.4] ${
                  msg.from === 'user'
                    ? 'bg-blue/15 text-text-1 rounded-[14px] rounded-br-[4px]'
                    : 'bg-[#222] text-text-1 rounded-[14px] rounded-bl-[4px]'
                }`}
                style={{
                  borderLeft: msg.from === 'axel' ? '2px solid #EF508D' : 'none',
                  borderRight: msg.from === 'user' ? '2px solid #0090FF' : 'none',
                }}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {/* Latest Axel message */}
          <div className="flex justify-start">
            <div
              className="max-w-[75%] px-[12px] py-[8px] bg-[#222] rounded-[14px] rounded-bl-[4px]"
              style={{ borderLeft: '2px solid #EF508D' }}
            >
              {typing ? (
                <TypingDots />
              ) : (
                <p className="font-['Lato',sans-serif] text-[12px] text-text-1 leading-[1.4]">
                  {message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Quick-reply chips */}
        {!compact && actions && actions.length > 0 && !typing && (
          <div className="px-[16px] mt-[10px] flex flex-wrap" style={{ gap: '6px' }}>
            {actions.map((action, i) => (
              <button
                key={i}
                onClick={action.onClick}
                className={`px-[12px] py-[6px] rounded-full text-[10px] font-medium font-['Lato',sans-serif] transition hover:brightness-110 ${
                  action.variant === 'primary'
                    ? 'bg-blue text-white'
                    : 'border border-blue/30 text-blue'
                }`}
              >
                {action.label}
              </button>
            ))}
          </div>
        )}

        {/* Input field (non-functional) */}
        <div className="px-[16px] mt-[10px]">
          <div
            className="flex items-center bg-[#222] rounded-full px-[14px] py-[9px]"
            style={{ border: '1px solid #333' }}
          >
            <span className="font-['Lato',sans-serif] text-[12px] text-[#555] flex-1">Ask Axel anything...</span>
            <div className="w-[24px] h-[24px] rounded-full bg-main/20 flex items-center justify-center shrink-0 ml-[8px]">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#EF508D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </div>
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
        @keyframes axelBounceC {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-6px); }
        }
      `}</style>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="w-[6px] h-[6px] rounded-full bg-main mr-[4px]"
          style={{
            animation: 'axelBounceC 0.9s ease-in-out infinite',
            animationDelay: `${i * 0.15}s`,
          }}
        />
      ))}
    </div>
  )
}

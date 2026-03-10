'use client'

import { useState, useEffect } from 'react'

export default function AxelPanelF({ message, actions, typing = false, compact = false }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setOpen(true), 50)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="absolute inset-0 z-20 flex" style={{ pointerEvents: open ? 'auto' : 'none' }}>
      {/* Backdrop */}
      <div
        className="flex-none"
        onClick={() => setOpen(false)}
        style={{
          width: '30%',
          background: open ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0)',
          transition: 'background 0.3s ease',
          cursor: 'pointer',
        }}
      />

      {/* Drawer */}
      <div
        className="flex-none bg-[#1A1A1A] flex flex-col"
        style={{
          width: '70%',
          height: '100%',
          transform: open ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
          borderLeft: '1px solid #2A2A2A',
          boxShadow: '-8px 0 24px rgba(0,0,0,0.3)',
        }}
      >
        {/* Header */}
        <div
          className="flex items-center px-[16px] py-[14px] shrink-0"
          style={{ borderBottom: '1px solid #2A2A2A' }}
        >
          <div className="w-[28px] h-[28px] rounded-full bg-main/15 flex items-center justify-center shrink-0 mr-[10px]">
            <span className="font-bold text-[12px] text-main leading-none">A</span>
          </div>
          <div className="flex-1 min-w-0">
            <span className="font-['Lato',sans-serif] text-[14px] font-semibold text-text-1">Axel</span>
            <span className="font-['Lato',sans-serif] text-[10px] text-text-2 ml-[8px]">AI Assistant</span>
          </div>

          {/* Close button */}
          <button
            onClick={() => setOpen(false)}
            className="w-[28px] h-[28px] rounded-full flex items-center justify-center shrink-0 hover:bg-white/5 transition"
            style={{ background: 'rgba(255,255,255,0.05)', border: 'none', cursor: 'pointer' }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <line x1="1" y1="1" x2="11" y2="11" stroke="#888" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="11" y1="1" x2="1" y2="11" stroke="#888" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Message area */}
        <div className="flex-1 overflow-y-auto px-[16px] py-[16px]">
          <div
            className="bg-[#222] rounded-[12px] px-[14px] py-[12px]"
            style={{ borderLeft: '2px solid #EF508D' }}
          >
            {typing ? (
              <TypingDots />
            ) : (
              <p className="font-['Lato',sans-serif] text-[13px] text-text-1 leading-[1.5]">
                {message}
              </p>
            )}
          </div>

          {/* Timestamp */}
          {!typing && (
            <p className="font-['Lato',sans-serif] text-[10px] text-[#555] mt-[8px] ml-[4px]">
              Just now
            </p>
          )}
        </div>

        {/* Action buttons (full-width) */}
        {!compact && actions && actions.length > 0 && !typing && (
          <div
            className="shrink-0 px-[16px] pb-[38px] pt-[12px]"
            style={{ borderTop: '1px solid #2A2A2A', display: 'flex', flexDirection: 'column', gap: '8px' }}
          >
            {actions.map((action, i) => (
              <button
                key={i}
                onClick={action.onClick}
                className={`w-full py-[11px] rounded-[10px] text-[12px] font-semibold font-['Lato',sans-serif] transition hover:brightness-110 ${
                  action.variant === 'primary'
                    ? 'bg-blue text-white'
                    : 'bg-transparent text-blue'
                }`}
                style={{
                  border: action.variant === 'primary' ? 'none' : '1px solid rgba(0, 144, 255, 0.3)',
                  cursor: 'pointer',
                }}
              >
                {action.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function TypingDots() {
  return (
    <div className="flex items-center h-[18px]">
      <style>{`
        @keyframes axelBounceF {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-6px); }
        }
      `}</style>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="w-[6px] h-[6px] rounded-full bg-main mr-[4px]"
          style={{
            animation: 'axelBounceF 0.9s ease-in-out infinite',
            animationDelay: `${i * 0.15}s`,
          }}
        />
      ))}
    </div>
  )
}

'use client'

import { useState, useEffect } from 'react'

export default function AxelPanelD({ message, actions, typing = false, compact = false }) {
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 50)
    return () => clearTimeout(t)
  }, [])

  if (dismissed) return null

  return (
    <div className="absolute bottom-0 left-0 right-0 z-20 px-[12px] pb-[40px]">
      <div
        className="bg-[#1A1A1A] rounded-[12px] h-[44px] flex items-center px-[12px]"
        style={{
          borderLeft: '3px solid #EF508D',
          boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.35s ease, transform 0.35s ease',
        }}
      >
        {/* Axel icon */}
        <div className="w-[22px] h-[22px] rounded-full bg-main/15 flex items-center justify-center shrink-0 mr-[10px]">
          <span className="font-bold text-[10px] text-main leading-none">A</span>
        </div>

        {/* Message */}
        <div className="flex-1 min-w-0">
          {typing ? (
            <TypingDots />
          ) : (
            <p className="font-['Lato',sans-serif] text-[12px] text-text-1 leading-none truncate">
              {message}
            </p>
          )}
        </div>

        {/* Dismiss X */}
        <button
          onClick={() => {
            setVisible(false)
            setTimeout(() => setDismissed(true), 300)
          }}
          className="w-[22px] h-[22px] flex items-center justify-center shrink-0 ml-[8px] rounded-full hover:bg-white/5 transition"
          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <line x1="1" y1="1" x2="9" y2="9" stroke="#888" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="9" y1="1" x2="1" y2="9" stroke="#888" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>
  )
}

function TypingDots() {
  return (
    <div className="flex items-center h-[18px]">
      <style>{`
        @keyframes axelBounceD {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-6px); }
        }
      `}</style>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="w-[5px] h-[5px] rounded-full bg-main mr-[3px]"
          style={{
            animation: 'axelBounceD 0.9s ease-in-out infinite',
            animationDelay: `${i * 0.15}s`,
          }}
        />
      ))}
    </div>
  )
}

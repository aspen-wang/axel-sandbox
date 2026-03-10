'use client'

import { useState, useEffect } from 'react'

export default function AxelPanelB({ message, actions, typing = false, compact = false }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 50)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="absolute bottom-0 left-0 right-0 z-20 flex justify-start px-[16px] pb-[48px]">
      <div
        className="relative max-w-[320px]"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(12px)',
          transition: 'opacity 0.3s ease, transform 0.3s ease',
        }}
      >
        {/* Bubble */}
        <div
          className="bg-[#1A1A1A] rounded-[20px] px-[14px] py-[12px]"
          style={{
            boxShadow: '0 0 20px rgba(239, 80, 141, 0.2), 0 4px 12px rgba(0,0,0,0.4)',
            border: '1px solid rgba(239, 80, 141, 0.15)',
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

              {/* Inline text actions */}
              {!compact && actions && actions.length > 0 && !typing && (
                <div className="flex flex-wrap mt-[8px]" style={{ gap: '12px' }}>
                  {actions.map((action, i) => (
                    <button
                      key={i}
                      onClick={action.onClick}
                      className={`text-[11px] font-semibold font-['Lato',sans-serif] transition hover:brightness-125 ${
                        action.variant === 'primary' ? 'text-blue' : 'text-blue/70'
                      }`}
                      style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
                    >
                      {action.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tail / Arrow */}
        <div
          className="absolute left-[24px] bottom-[-8px]"
          style={{
            width: 0,
            height: 0,
            borderLeft: '8px solid transparent',
            borderRight: '8px solid transparent',
            borderTop: '8px solid #1A1A1A',
            filter: 'drop-shadow(0 2px 4px rgba(239, 80, 141, 0.15))',
          }}
        />
      </div>
    </div>
  )
}

function TypingDots() {
  return (
    <div className="flex items-center h-[18px]">
      <style>{`
        @keyframes axelBounceB {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-6px); }
        }
      `}</style>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="w-[6px] h-[6px] rounded-full bg-main mr-[4px]"
          style={{
            animation: 'axelBounceB 0.9s ease-in-out infinite',
            animationDelay: `${i * 0.15}s`,
          }}
        />
      ))}
    </div>
  )
}

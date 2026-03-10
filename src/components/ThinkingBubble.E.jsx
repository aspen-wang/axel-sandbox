'use client'

import { useState, useEffect } from 'react'

export default function ThinkingBubble({ label = 'Thinking...' }) {
  const [chars, setChars] = useState(0)
  useEffect(() => {
    if (chars < label.length) {
      const t = setTimeout(() => setChars(c => c + 1), 60 + Math.random() * 40)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => setChars(0), 1500)
    return () => clearTimeout(t)
  }, [chars, label])

  return (
    <div>
      <p className="text-[11px] font-medium text-main tracking-[0.05em] mb-[6px]">AXEL</p>
      <div className="bg-[#212121] rounded-[16px] rounded-tl-[4px] px-[14px] py-[12px] max-w-[280px]">
        <style>{`
          @keyframes tbBlink { 0%,100% { opacity: 1; } 50% { opacity: 0; } }
        `}</style>
        <p className="font-['Lato',sans-serif] text-[12px] text-text-2 leading-[1.4]">
          {label.slice(0, chars)}
          <span className="inline-block w-[2px] h-[13px] bg-main ml-[1px] align-middle"
            style={{ animation: 'tbBlink 0.8s step-end infinite' }} />
        </p>
      </div>
    </div>
  )
}

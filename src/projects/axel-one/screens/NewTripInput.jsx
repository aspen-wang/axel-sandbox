'use client'

import { useState } from 'react'
import StatusBar from '@/components/StatusBar'
import QuickOptionPills from '@/components/QuickOptionPills'
import TripInputBar from '@/components/TripInputBar'
import HomeIndicator from '@/components/HomeIndicator'

export default function NewTripInput({ onNext }) {
  const [text, setText] = useState('')

  return (
    <div className="bg-black overflow-clip relative rounded-[30px] w-[393px] h-[852px] font-['Lato',sans-serif]">
      <StatusBar />

      {/* Header */}
      <div className="absolute left-[16px] top-[66px] right-[16px]">
        <div className="flex items-center gap-[10px]">
          <svg width="12" height="18" viewBox="0 0 12 18" fill="none">
            <path d="M10 2L3 9L10 16" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <p className="font-semibold text-[20px] text-white leading-normal">New trip plan</p>
        </div>
      </div>

      {/* Center -- Mascot + prompt */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-[40px]" style={{ marginTop: '-40px' }}>
        <img
          src="/axel-mascot.png"
          alt="Axel"
          className="w-[180px] h-[180px] object-contain mb-[16px]"
        />
        <p className="text-[14px] text-[#888] text-center leading-[1.5]">
          Tell me about your trip -- where, when, and what matters to you.
        </p>
      </div>

      {/* Bottom -- Quick options + input */}
      <div className="absolute left-[16px] right-[16px] bottom-[32px]">
        <div className="mb-[12px]">
          <QuickOptionPills onSelect={(opt) => { setText(opt); onNext?.() }} />
        </div>
        <TripInputBar
          value={text}
          onChange={(e) => setText(e.target.value)}
          onSubmit={() => text && onNext?.()}
        />
      </div>

      <HomeIndicator />
    </div>
  )
}

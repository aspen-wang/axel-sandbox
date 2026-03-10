'use client'

import { useState, useEffect } from 'react'
import statusIcons from '@/assets/status-icons.svg'

export default function ChatFlightBooked({ onNext }) {
  const [dotPhase, setDotPhase] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setDotPhase((p) => (p + 1) % 4), 400)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="bg-bg overflow-clip relative rounded-[30px] w-[393px] h-[852px] font-['Inter',sans-serif]">
      {/* Status Bar */}
      <div className="absolute top-0 left-0 right-0 flex h-[59px] items-center justify-between px-[28px] py-[15px]">
        <p className="font-['SF_Pro_Text',sans-serif] font-bold text-[15px] text-text-1 tracking-[-0.045px] leading-[18px] w-[54px]">9:41</p>
        <div className="relative shrink-0 w-[66.16px] h-[11px]">
          <img alt="" className="block max-w-none w-full h-full" src={statusIcons.src || statusIcons} />
        </div>
      </div>

      {/* Header */}
      <div className="absolute left-[16px] top-[72px] right-[16px] flex items-center gap-[8px]">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#989898" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
        <p className="text-[13px] text-[#989898]">Trips</p>
      </div>

      {/* Chat Messages */}
      <div className="absolute left-[16px] top-[104px] right-[16px] bottom-[88px] overflow-y-auto">
        {/* User Message */}
        <div className="flex justify-end mb-[16px]">
          <div className="bg-[#2A2A2A] rounded-[16px] rounded-tr-[4px] px-[14px] py-[10px] max-w-[280px]">
            <p className="font-['Lato',sans-serif] text-[14px] text-text-1 leading-relaxed">
              Book the 7:12am United flight
            </p>
          </div>
        </div>

        {/* Axel Response */}
        <div className="mb-[16px]">
          <p className="text-[11px] font-medium text-main tracking-[0.05em] mb-[6px]">AXEL</p>
          <p className="font-['Lato',sans-serif] text-[14px] text-text-1 leading-relaxed mb-[12px] max-w-[300px]">
            Got it, booked the 7:12am United flight.
          </p>

          {/* Confirmed Flight Card */}
          <div className="bg-[#242424] rounded-[12px] px-[14px] py-[12px] max-w-[280px] mb-[12px]">
            <div className="flex items-center justify-between mb-[6px]">
              <p className="font-medium text-[14px] text-text-1">United Airlines</p>
              <div className="flex items-center">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="mr-[4px]">
                  <circle cx="12" cy="12" r="10" fill="#4fc660" />
                  <path d="M8 12l3 3 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <p className="text-[12px] text-green font-medium">Confirmed</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <p className="font-['Lato',sans-serif] text-[13px] text-text-1">SEA → SFO</p>
              <p className="font-['Lato',sans-serif] text-[12px] text-[#989898]">7:12am → 9:30am</p>
            </div>
            <div className="flex items-center justify-between mt-[4px]">
              <p className="font-['Lato',sans-serif] text-[12px] text-[#989898]">Apr 15 · 2h 18m</p>
              <p className="font-medium text-[14px] text-text-1">$218</p>
            </div>
          </div>

          <p className="font-['Lato',sans-serif] text-[14px] text-text-1 leading-relaxed mb-[12px] max-w-[300px]">
            Now let me find hotels in SF for those dates.
          </p>

          {/* Thinking Indicator */}
          <div className="bg-[#212121] rounded-[16px] rounded-tl-[4px] px-[14px] py-[12px] max-w-[280px]">
            <div className="flex items-center gap-[6px]">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-[8px] h-[8px] rounded-full transition-all duration-300"
                  style={{
                    backgroundColor: i <= dotPhase ? '#EF508D' : '#474747',
                    transform: i === dotPhase % 3 ? 'scale(1.3)' : 'scale(1)',
                  }}
                />
              ))}
              <p className="text-[12px] text-[#474747] ml-[4px] font-['Lato',sans-serif]">Searching hotels...</p>
            </div>
            <div className="mt-[10px] h-[3px] bg-[#2A2A2A] rounded-full overflow-hidden">
              <div
                className="h-full bg-main/60 rounded-full"
                style={{
                  width: `${40 + dotPhase * 15}%`,
                  transition: 'width 0.4s ease',
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Input Bar */}
      <div className="absolute left-[16px] right-[16px] bottom-[40px]">
        <div className="bg-[#212121] border border-[#474747] rounded-[30px] flex items-center px-[16px] py-[10px]">
          <input readOnly placeholder="Your response..." className="flex-1 bg-transparent text-[14px] text-text-1 outline-none placeholder:text-[#474747] font-['Lato',sans-serif]" onClick={onNext} />
          <button onClick={onNext} className="ml-[8px] px-[16px] py-[6px] rounded-[30px] bg-main text-white text-[13px] font-medium">Reply</button>
        </div>
      </div>

      <div className="absolute bottom-[8px] left-1/2 -translate-x-1/2 w-[134px] h-[5px] rounded-full bg-text-1" />
    </div>
  )
}

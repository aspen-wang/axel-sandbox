'use client'

import { useState } from 'react'
import statusIcons from '@/assets/status-icons.svg'

const FLIGHTS = [
  { airline: 'United Airlines', route: 'SEA → SFO', depart: '7:12am', arrive: '9:30am', duration: '2h 18m', stops: 'Nonstop', price: '$218' },
  { airline: 'Alaska Airlines', route: 'SEA → SFO', depart: '8:45am', arrive: '11:02am', duration: '2h 17m', stops: 'Nonstop', price: '$234' },
  { airline: 'Delta Air Lines', route: 'SEA → SFO', depart: '10:30am', arrive: '12:48pm', duration: '2h 18m', stops: 'Nonstop', price: '$247' },
  { airline: 'United Airlines', route: 'SEA → SFO', depart: '2:15pm', arrive: '4:31pm', duration: '2h 16m', stops: 'Nonstop', price: '$209' },
]

export default function ChatFlights({ onNext }) {
  const [selected, setSelected] = useState(null)

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

      {/* Chat */}
      <div className="absolute left-[16px] top-[104px] right-[16px] bottom-[88px] overflow-y-auto">
        {/* User Message */}
        <div className="flex justify-end mb-[16px]">
          <div className="bg-[#2A2A2A] rounded-[16px] rounded-tr-[4px] px-[14px] py-[10px] max-w-[280px]">
            <p className="font-['Lato',sans-serif] text-[14px] text-text-1 leading-relaxed">business trip to sf. seattle to sf flights apr 15 - 18</p>
          </div>
        </div>

        {/* Axel Response */}
        <div className="mb-[16px]">
          <p className="text-[11px] font-medium text-main tracking-[0.05em] mb-[6px]">AXEL</p>
          <p className="font-['Lato',sans-serif] text-[14px] text-text-1 leading-relaxed mb-[12px] max-w-[300px]">
            Lots of nonstops to choose from — all about 2h15m. The morning ones are the sweet spot for a business trip:
          </p>

          {/* Flight Cards */}
          <div className="flex flex-col gap-[8px] mb-[12px]">
            {FLIGHTS.map((f, i) => (
              <button
                key={i}
                onClick={() => { setSelected(i); onNext?.() }}
                className={`w-full bg-[#242424] rounded-[12px] px-[14px] py-[12px] text-left transition ${
                  selected === i ? 'ring-1 ring-green/40' : 'hover:bg-[#2A2A2A]'
                }`}
              >
                <div className="flex items-center justify-between mb-[6px]">
                  <p className="font-medium text-[14px] text-text-1">{f.airline}</p>
                  <p className="font-medium text-[14px] text-text-1">{f.price}</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-[8px]">
                    <p className="font-['Lato',sans-serif] text-[13px] text-text-1">{f.route}</p>
                    <p className="font-['Lato',sans-serif] text-[12px] text-[#989898]">{f.depart} → {f.arrive}</p>
                  </div>
                </div>
                <div className="flex items-center gap-[8px] mt-[4px]">
                  <p className="font-['Lato',sans-serif] text-[12px] text-[#989898]">{f.duration}</p>
                  <p className="font-['Lato',sans-serif] text-[12px] text-green font-medium">{f.stops}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Suggested Actions */}
          <div className="flex gap-[8px]">
            <button onClick={onNext} className="border border-main rounded-[30px] px-[14px] py-[8px]">
              <p className="text-[12px] font-medium text-main">Yes, need a hotel</p>
            </button>
            <button className="border border-main rounded-[30px] px-[14px] py-[8px]">
              <p className="text-[12px] font-medium text-main">Flights only</p>
            </button>
          </div>
        </div>
      </div>

      {/* Input Bar */}
      <div className="absolute left-[16px] right-[16px] bottom-[40px]">
        <div className="bg-[#212121] border border-[#474747] rounded-[30px] flex items-center px-[16px] py-[10px]">
          <input readOnly placeholder="Your response..." className="flex-1 bg-transparent text-[14px] text-text-1 outline-none placeholder:text-[#474747] font-['Lato',sans-serif]" />
          <button onClick={onNext} className="ml-[8px] px-[16px] py-[6px] rounded-[30px] bg-main text-white text-[13px] font-medium">Reply</button>
        </div>
      </div>

      <div className="absolute bottom-[8px] left-1/2 -translate-x-1/2 w-[134px] h-[5px] rounded-full bg-text-1" />
    </div>
  )
}

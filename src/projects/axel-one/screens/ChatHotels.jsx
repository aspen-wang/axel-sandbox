'use client'

import { useState } from 'react'
import statusIcons from '@/assets/status-icons.svg'

const HOTELS = [
  { name: 'Hotel Nikko SF', neighborhood: 'Union Square', stars: 4, price: 189, marketPrice: 245, savings: 56 },
  { name: 'The Marker', neighborhood: 'Market Street', stars: 4, price: 167, marketPrice: 245, savings: 78 },
  { name: 'Hyatt Regency SF', neighborhood: 'Embarcadero', stars: 4.5, price: 212, marketPrice: 245, savings: 33 },
]

function Stars({ count }) {
  const full = Math.floor(count)
  const half = count % 1 >= 0.5
  return (
    <div className="flex items-center">
      {Array.from({ length: full }, (_, i) => (
        <span key={i} className="text-[#F5C518] text-[12px] leading-none">&#9733;</span>
      ))}
      {half && <span className="text-[#F5C518] text-[12px] leading-none opacity-50">&#9733;</span>}
    </div>
  )
}

export default function ChatHotels({ onNext }) {
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

      {/* Chat Messages */}
      <div className="absolute left-[16px] top-[104px] right-[16px] bottom-[88px] overflow-y-auto">
        {/* Previous Context Collapsed */}
        <div className="mb-[12px]">
          <p className="font-['Lato',sans-serif] text-[12px] text-[#989898] leading-relaxed">
            Flight confirmed: United SEA → SFO, Apr 15
          </p>
        </div>

        {/* Axel Response */}
        <div className="mb-[16px]">
          <p className="text-[11px] font-medium text-main tracking-[0.05em] mb-[6px]">AXEL</p>
          <p className="font-['Lato',sans-serif] text-[14px] text-text-1 leading-relaxed mb-[12px] max-w-[300px]">
            Found some great options near your meeting area:
          </p>

          {/* Hotel Cards */}
          <div className="flex flex-col gap-[8px] mb-[12px]">
            {HOTELS.map((h, i) => (
              <button
                key={i}
                onClick={() => { setSelected(i); onNext?.() }}
                className={`w-full bg-[#242424] rounded-[12px] px-[14px] py-[12px] text-left transition ${
                  selected === i ? 'ring-1 ring-green/40' : 'hover:bg-[#2A2A2A]'
                }`}
              >
                {/* Image Placeholder */}
                <div className="h-[80px] bg-[#2A2A2A] rounded-[8px] mb-[8px] flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#474747" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <path d="M21 15l-5-5L5 21" />
                  </svg>
                </div>
                <p className="font-bold text-[14px] text-text-1 leading-[1.3]">{h.name}</p>
                <p className="font-['Lato',sans-serif] text-[12px] text-[#989898] mt-[2px]">{h.neighborhood}</p>
                <div className="flex items-center justify-between mt-[8px]">
                  <Stars count={h.stars} />
                  <div className="flex items-center gap-[8px]">
                    <p className="font-bold text-[14px] text-text-1">${h.price}<span className="font-normal text-[11px] text-[#989898]">/night</span></p>
                    <p className="font-['Lato',sans-serif] text-[12px] text-[#989898] line-through">${h.marketPrice}</p>
                    <div className="bg-green/10 px-[8px] py-[3px] rounded-full">
                      <p className="text-[11px] font-medium text-green leading-[1]">Save ${h.savings}</p>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Suggested Actions */}
          <div className="flex gap-[8px]">
            <button onClick={onNext} className="border border-main rounded-[30px] px-[14px] py-[8px]">
              <p className="text-[12px] font-medium text-main">Show on map</p>
            </button>
            <button className="border border-main rounded-[30px] px-[14px] py-[8px]">
              <p className="text-[12px] font-medium text-main">More options</p>
            </button>
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

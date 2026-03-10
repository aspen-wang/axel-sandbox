'use client'

import { useState } from 'react'
import statusIcons from '@/assets/status-icons.svg'

const AMENITIES = [
  { label: 'WiFi' },
  { label: 'Pool' },
  { label: 'Gym' },
  { label: 'Restaurant' },
  { label: 'Bar' },
  { label: 'Parking' },
]

export default function HotelDetail({ onNext }) {
  const [galleryIndex, setGalleryIndex] = useState(0)

  return (
    <div className="bg-bg overflow-clip relative rounded-[30px] w-[393px] h-[852px] font-['Inter',sans-serif]">
      {/* Status Bar */}
      <div className="absolute top-0 left-0 right-0 flex h-[59px] items-center justify-between px-[28px] py-[15px] z-10">
        <p className="font-['SF_Pro_Text',sans-serif] font-bold text-[15px] text-text-1 tracking-[-0.045px] leading-[18px] w-[54px]">9:41</p>
        <div className="relative shrink-0 w-[66.16px] h-[11px]">
          <img alt="" className="block max-w-none w-full h-full" src={statusIcons.src || statusIcons} />
        </div>
      </div>

      {/* Header */}
      <div className="absolute left-[16px] top-[72px] right-[16px] flex items-center gap-[8px] z-10">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#989898" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
        <p className="text-[15px] font-medium text-text-1">Hotel Nikko SF</p>
      </div>

      {/* Scrollable Content */}
      <div className="absolute left-0 top-[104px] w-full bottom-[88px] overflow-y-auto">
        <div className="px-[16px] pb-[16px]">
          {/* Image Gallery */}
          <div className="overflow-x-auto flex gap-[8px] pb-[8px] -mx-[16px] px-[16px]" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-[200px] w-[300px] bg-[#2A2A2A] rounded-[12px] shrink-0 flex items-center justify-center"
                onClick={() => setGalleryIndex(i)}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#474747" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path d="M21 15l-5-5L5 21" />
                </svg>
              </div>
            ))}
          </div>

          {/* Dot Indicators */}
          <div className="flex items-center justify-center gap-[6px] mt-[8px] mb-[16px]">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className={`w-[6px] h-[6px] rounded-full transition ${i === galleryIndex ? 'bg-white' : 'bg-[#474747]'}`}
              />
            ))}
          </div>

          {/* Hotel Info */}
          <p className="font-bold text-[20px] text-text-1 leading-[1.3]">Hotel Nikko SF</p>
          <div className="flex items-center mt-[4px] mb-[2px]">
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className="text-[#F5C518] text-[14px] leading-none">&#9733;</span>
            ))}
          </div>
          <p className="font-['Lato',sans-serif] text-[13px] text-[#989898] mt-[2px]">Union Square, San Francisco</p>

          {/* Rating Badge */}
          <div className="flex items-center mt-[10px] mb-[16px]">
            <div className="bg-green/15 px-[10px] py-[4px] rounded-full">
              <p className="text-[13px] font-bold text-green leading-[1]">4.2</p>
            </div>
          </div>

          {/* Amenities Grid */}
          <div className="grid grid-cols-3 gap-x-[16px] gap-y-[12px] mb-[16px]">
            {AMENITIES.map((a) => (
              <div key={a.label} className="flex items-center gap-[8px]">
                <div className="w-[24px] h-[24px] rounded-full bg-[#474747]/30 shrink-0" />
                <p className="font-['Lato',sans-serif] text-[11px] text-[#989898] leading-[1]">{a.label}</p>
              </div>
            ))}
          </div>

          {/* Room Info Card */}
          <div className="bg-[#242424] rounded-[12px] px-[14px] py-[12px] mb-[12px]">
            <p className="font-bold text-[14px] text-text-1 leading-[1.3]">Standard King</p>
            <p className="font-['Lato',sans-serif] text-[12px] text-[#989898] mt-[4px]">1 King Bed · City View</p>
            <p className="font-['Lato',sans-serif] text-[12px] text-[#989898] mt-[2px]">Apr 15–18 (3 nights)</p>
          </div>

          {/* Price Breakdown Card */}
          <div className="bg-[#242424] rounded-[12px] px-[14px] py-[12px]">
            <div className="flex items-center justify-between mb-[8px]">
              <p className="font-['Lato',sans-serif] text-[13px] text-text-1">3 nights × $189</p>
              <p className="font-['Lato',sans-serif] text-[13px] text-text-1">$567</p>
            </div>
            <div className="flex items-center justify-between mb-[8px]">
              <p className="font-['Lato',sans-serif] text-[13px] text-[#989898]">Taxes & fees</p>
              <p className="font-['Lato',sans-serif] text-[13px] text-[#989898]">$68</p>
            </div>
            <div className="h-[1px] bg-[#474747]/30 mb-[8px]" />
            <div className="flex items-center justify-between mb-[8px]">
              <p className="font-bold text-[14px] text-text-1">Total</p>
              <p className="font-bold text-[14px] text-text-1">$635</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="font-bold text-[14px] text-green">You save</p>
              <p className="font-bold text-[14px] text-green">$168</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="absolute left-[16px] right-[16px] bottom-[40px]">
        <button onClick={onNext} className="w-full bg-main flex items-center justify-center py-[14px] rounded-[30px] hover:brightness-110 transition">
          <p className="font-medium text-[14px] text-white text-center leading-normal">Select this hotel</p>
        </button>
      </div>

      <div className="absolute bottom-[8px] left-1/2 -translate-x-1/2 w-[134px] h-[5px] rounded-full bg-text-1" />
    </div>
  )
}

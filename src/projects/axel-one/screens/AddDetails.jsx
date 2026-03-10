'use client'

import { useState } from 'react'
import statusIcons from '@/assets/status-icons.svg'

export default function AddDetails({ onNext }) {
  const [name, setName] = useState('Alex Morgan')
  const [email, setEmail] = useState('alex.morgan@gmail.com')
  const [stops, setStops] = useState('nonstop')
  const [threshold, setThreshold] = useState('400')

  return (
    <div className="bg-bg overflow-clip relative rounded-[30px] w-[393px] h-[852px] font-['Inter',sans-serif]">
      {/* System Status Bar */}
      <div className="absolute top-0 left-0 right-0 flex h-[59px] items-center justify-between overflow-clip px-[28px] py-[15px]">
        <p className="font-['SF_Pro_Text',sans-serif] font-bold text-[15px] text-text-1 text-center tracking-[-0.045px] leading-[18px] w-[54px] h-[18px] shrink-0">
          9:41
        </p>
        <div className="relative shrink-0 w-[66.16px] h-[11px]">
          <img alt="" className="block max-w-none w-full h-full" src={statusIcons.src || statusIcons} />
        </div>
      </div>

      {/* Content */}
      <div className="absolute left-[24px] top-[80px] w-[345px]">
        {/* Back + Title */}
        <div className="flex items-center mb-[8px]">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="mr-[8px]">
            <path d="M13 4l-6 6 6 6" stroke="#989898" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <p className="font-medium text-[16px] text-text-1 leading-normal">Alert Details</p>
        </div>
        <p className="font-normal text-[13px] text-text-2 leading-normal mb-[24px]">
          Set your preferences for this price alert
        </p>

        {/* Route preview */}
        <div className="bg-card-bg w-full rounded-[8px] px-[16px] py-[12px] mb-[16px]">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <p className="font-['Lato',sans-serif] font-medium text-[15px] text-text-1 leading-normal mr-[8px]">SEA</p>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M10 5l3 3-3 3" stroke="#4fc660" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p className="font-['Lato',sans-serif] font-medium text-[15px] text-text-1 leading-normal ml-[8px]">ATL</p>
            </div>
            <p className="font-['Lato',sans-serif] text-[12px] text-text-2 leading-normal">Mar 15</p>
          </div>
        </div>

        {/* Name Field */}
        <div className="mb-[16px]">
          <p className="font-medium text-[12px] text-text-2 leading-normal mb-[6px]">Traveler name</p>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-card-bg rounded-[8px] px-[12px] py-[10px] text-[13px] text-text-1 outline-none border border-transparent focus:border-green/30 transition"
          />
        </div>

        {/* Email Field */}
        <div className="mb-[16px]">
          <p className="font-medium text-[12px] text-text-2 leading-normal mb-[6px]">Email for alerts</p>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-card-bg rounded-[8px] px-[12px] py-[10px] text-[13px] text-text-1 outline-none border border-transparent focus:border-green/30 transition"
          />
        </div>

        {/* Stops filter */}
        <div className="mb-[16px]">
          <p className="font-medium text-[12px] text-text-2 leading-normal mb-[6px]">Stops</p>
          <div className="flex bg-bg-2 rounded-[8px] p-[3px]">
            {['nonstop', 'any', '1 stop'].map((opt) => (
              <button
                key={opt}
                onClick={() => setStops(opt)}
                className={`flex-1 py-[8px] rounded-[6px] text-[12px] font-medium capitalize transition ${
                  stops === opt ? 'bg-card-bg text-text-1' : 'text-text-2'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Price threshold */}
        <div className="mb-[16px]">
          <p className="font-medium text-[12px] text-text-2 leading-normal mb-[6px]">Price threshold</p>
          <div className="flex items-center bg-card-bg rounded-[8px] px-[12px] py-[10px]">
            <span className="text-text-2 text-[13px] mr-[4px]">$</span>
            <input
              value={threshold}
              onChange={(e) => setThreshold(e.target.value)}
              className="flex-1 bg-transparent text-[13px] text-text-1 outline-none"
              type="number"
            />
          </div>
          <p className="font-['Lato',sans-serif] text-[11px] text-text-2/60 leading-normal mt-[4px]">
            Axel will alert you when the price drops below this amount
          </p>
        </div>

        {/* Airline preference */}
        <div className="mb-[16px]">
          <p className="font-medium text-[12px] text-text-2 leading-normal mb-[6px]">Airline preference</p>
          <div className="bg-card-bg rounded-[8px] px-[12px] py-[10px]">
            <p className="text-[13px] text-text-1">Any airline</p>
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <div onClick={onNext} className="absolute left-1/2 -translate-x-1/2 top-[711px] w-[345px] bg-green flex items-center justify-center px-[8px] py-[14px] rounded-[30px] cursor-pointer hover:brightness-110 transition">
        <p className="font-medium text-[14px] text-bg text-center leading-normal shrink-0">
          Save alert
        </p>
      </div>
    </div>
  )
}

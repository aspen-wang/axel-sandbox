'use client'

import { useState } from 'react'
import statusIcons from '@/assets/status-icons.svg'

export default function ItinerarySummary({ onNext }) {
  const [firstName, setFirstName] = useState('Alex')
  const [lastName, setLastName] = useState('Morgan')
  const [email, setEmail] = useState('alex@email.com')
  const [phone, setPhone] = useState('+1 (206) 555-0142')
  const [dob, setDob] = useState('1990-03-15')

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

      {/* Scrollable Content */}
      <div className="absolute left-0 top-[59px] w-full bottom-0 overflow-y-auto">
        <div className="px-[24px] pb-[120px]">
          {/* Header: Back + Trip Summary */}
          <div className="flex items-center mt-[12px] mb-[20px]">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="mr-[8px]">
              <path d="M13 4l-6 6 6 6" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p className="font-medium text-[16px] text-text-1 leading-normal">Trip Summary</p>
          </div>

          {/* Flight Card */}
          <div className="bg-[#242424] rounded-[12px] px-[16px] py-[14px] mb-[12px]">
            <div className="flex items-center mb-[8px]">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mr-[6px] shrink-0">
                <path d="M3 8l3 3 7-7" stroke="#4fc660" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p className="text-[13px] text-green font-medium leading-normal">Flight Confirmed</p>
            </div>
            <p className="font-bold text-[14px] text-text-1 leading-normal mb-[4px]">United Airlines UA 224</p>
            <p className="text-[13px] text-text-1 leading-normal mb-[2px]">SEA → SFO</p>
            <p className="text-[12px] text-text-2 leading-normal mb-[2px]">Apr 15 · 7:12am – 9:30am</p>
            <p className="text-[12px] text-text-2 leading-normal">Economy · 2h 18m · Nonstop</p>
          </div>

          {/* Hotel Card */}
          <div className="bg-[#242424] rounded-[12px] px-[16px] py-[14px] mb-[12px]">
            <div className="flex items-center mb-[8px]">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mr-[6px] shrink-0">
                <path d="M3 8l3 3 7-7" stroke="#4fc660" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p className="text-[13px] text-green font-medium leading-normal">Hotel Confirmed</p>
            </div>
            <p className="font-bold text-[14px] text-text-1 leading-normal mb-[4px]">Hotel Nikko SF</p>
            <p className="text-[12px] text-text-2 leading-normal mb-[2px]">Union Square, San Francisco</p>
            <p className="text-[12px] text-text-2 leading-normal mb-[2px]">Apr 15–18 · 3 nights</p>
            <p className="text-[12px] text-text-2 leading-normal">Standard King · City View</p>
          </div>

          {/* Price Summary */}
          <div className="bg-[#242424] rounded-[12px] px-[16px] py-[14px] mb-[20px]">
            <div className="flex items-center justify-between mb-[8px]">
              <p className="text-[13px] text-text-2 leading-normal">Flight</p>
              <p className="text-[13px] text-text-1 leading-normal">$218</p>
            </div>
            <div className="flex items-center justify-between mb-[8px]">
              <p className="text-[13px] text-text-2 leading-normal">Hotel (3 nights)</p>
              <p className="text-[13px] text-text-1 leading-normal">$567</p>
            </div>
            <div className="flex items-center justify-between mb-[8px]">
              <p className="text-[13px] text-text-2 leading-normal">Taxes & fees</p>
              <p className="text-[13px] text-text-2 leading-normal">$94</p>
            </div>
            <div className="h-[1px] bg-[#474747] my-[8px]" />
            <div className="flex items-center justify-between mb-[8px]">
              <p className="font-bold text-[16px] text-text-1 leading-normal">Total</p>
              <p className="font-bold text-[16px] text-text-1 leading-normal">$879</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="font-bold text-[14px] text-green leading-normal">You save</p>
              <p className="font-bold text-[14px] text-green leading-normal">$224</p>
            </div>
          </div>

          {/* Traveler Details */}
          <p className="font-medium text-[16px] text-text-1 leading-normal mb-[16px]">Traveler Details</p>

          {/* First Name */}
          <div className="mb-[12px]">
            <p className="text-[12px] text-[#989898] font-medium mb-[4px]">First Name</p>
            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full bg-[#2A2A2A] border border-[#474747] rounded-[8px] px-[12px] py-[10px] text-[13px] text-text-1 outline-none focus:border-main/50 transition"
            />
          </div>

          {/* Last Name */}
          <div className="mb-[12px]">
            <p className="text-[12px] text-[#989898] font-medium mb-[4px]">Last Name</p>
            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full bg-[#2A2A2A] border border-[#474747] rounded-[8px] px-[12px] py-[10px] text-[13px] text-text-1 outline-none focus:border-main/50 transition"
            />
          </div>

          {/* Email */}
          <div className="mb-[12px]">
            <p className="text-[12px] text-[#989898] font-medium mb-[4px]">Email</p>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="w-full bg-[#2A2A2A] border border-[#474747] rounded-[8px] px-[12px] py-[10px] text-[13px] text-text-1 outline-none focus:border-main/50 transition"
            />
          </div>

          {/* Phone */}
          <div className="mb-[12px]">
            <p className="text-[12px] text-[#989898] font-medium mb-[4px]">Phone</p>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="tel"
              className="w-full bg-[#2A2A2A] border border-[#474747] rounded-[8px] px-[12px] py-[10px] text-[13px] text-text-1 outline-none focus:border-main/50 transition"
            />
          </div>

          {/* Date of Birth */}
          <div className="mb-[24px]">
            <p className="text-[12px] text-[#989898] font-medium mb-[4px]">Date of Birth</p>
            <input
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              type="date"
              className="w-full bg-[#2A2A2A] border border-[#474747] rounded-[8px] px-[12px] py-[10px] text-[13px] text-text-1 outline-none focus:border-main/50 transition"
            />
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="absolute bottom-0 left-0 right-0 px-[24px] pb-[36px] pt-[16px] bg-gradient-to-t from-bg via-bg to-transparent">
        <div onClick={onNext} className="w-full bg-main flex items-center justify-center py-[14px] rounded-[30px] cursor-pointer hover:brightness-110 transition">
          <p className="font-medium text-[14px] text-white text-center leading-normal">Continue</p>
        </div>
      </div>
    </div>
  )
}

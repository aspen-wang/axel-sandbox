'use client'

import statusIcons from '@/assets/status-icons.svg'
import { getTravelers } from '@/lib/data'

const travelers = getTravelers()

export default function SelectPassenger({ onNext }) {
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
          <p className="font-medium text-[16px] text-text-1 leading-normal">Select Passenger</p>
        </div>
        <p className="font-normal text-[13px] text-text-2 leading-normal mb-[24px]">
          Choose a traveler for this booking
        </p>

        {/* Flight summary */}
        <div className="bg-green/5 w-full rounded-[8px] px-[16px] py-[10px] mb-[20px]">
          <div className="flex items-center justify-between">
            <p className="font-['Lato',sans-serif] text-[13px] text-text-1 leading-normal">
              Alaska Airlines <span className="text-text-2">AS 1247</span>
            </p>
            <p className="font-medium text-[14px] text-green leading-normal">$318</p>
          </div>
          <p className="font-['Lato',sans-serif] text-[11px] text-text-2 leading-normal mt-[4px]">
            SEA → LAX &middot; Nonstop &middot; Mar 5
          </p>
        </div>

        {/* Saved Travelers */}
        <p className="font-medium text-[12px] text-text-2 leading-normal mb-[10px] uppercase tracking-wider">
          Saved travelers
        </p>

        {travelers.map((traveler, i) => (
          <div
            key={traveler.id}
            onClick={onNext}
            className={`bg-card-bg w-full rounded-[8px] px-[16px] py-[14px] cursor-pointer hover:brightness-110 transition${i < travelers.length - 1 ? ' mb-[12px]' : ''}`}
          >
            <div className="flex items-center mb-[8px]">
              <div className="w-[36px] h-[36px] rounded-full bg-bg-2 flex items-center justify-center mr-[12px]">
                <p className="font-medium text-[16px] text-green">
                  {traveler.first_name[0]}
                </p>
              </div>
              <div className="flex-1">
                <p className="font-medium text-[14px] text-text-1 leading-normal">
                  {traveler.first_name} {traveler.last_name}
                </p>
                <p className="font-['Lato',sans-serif] text-[11px] text-text-2 leading-normal">
                  {traveler.email}
                </p>
              </div>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 4l4 4-4 4" stroke="#989898" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="flex items-center justify-between pl-[48px]">
              <p className="font-['Lato',sans-serif] text-[11px] text-text-2 leading-normal">
                {traveler.passport}
              </p>
              <p className="font-['Lato',sans-serif] text-[11px] text-text-2 leading-normal">
                {traveler.frequent_flyer.split(' ').slice(0, 2).join(' ')}
              </p>
            </div>
          </div>
        ))}

        {/* Add new traveler */}
        <div className="w-full rounded-[8px] border border-dashed border-grey px-[16px] py-[14px] mt-[12px] cursor-pointer hover:border-green/40 transition flex items-center justify-center">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mr-[8px]">
            <path d="M8 3v10M3 8h10" stroke="#989898" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          <p className="font-medium text-[13px] text-text-2 leading-normal">Add new traveler</p>
        </div>
      </div>

      {/* CTA Button */}
      <div onClick={onNext} className="absolute left-1/2 -translate-x-1/2 top-[711px] w-[345px] bg-bg-2 flex items-center justify-center px-[8px] py-[14px] rounded-[30px] cursor-pointer hover:brightness-110 transition">
        <p className="font-normal text-[14px] text-text-1 text-center leading-normal shrink-0">
          Confirm booking
        </p>
      </div>
    </div>
  )
}

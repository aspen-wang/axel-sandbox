'use client'

import statusIcons from '@/assets/status-icons.svg'

export default function WatchCreated({ onNext }) {
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
      <div className="absolute left-[24px] top-[180px] w-[345px] flex flex-col items-center">
        {/* Success Checkmark */}
        <div className="w-[64px] h-[64px] rounded-full bg-green/10 flex items-center justify-center mb-[24px]">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M8 16l6 6 10-12" stroke="#4fc660" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {/* Title */}
        <p className="font-medium text-[20px] text-text-1 leading-normal text-center mb-[4px]">
          Watch Created
        </p>
        <p className="font-normal text-[14px] text-text-2 leading-normal text-center mb-[32px]">
          Axel is now monitoring this route for you
        </p>

        {/* Flight Details Card */}
        <div className="bg-card-bg w-full rounded-[8px] px-[16px] py-[16px] mb-[16px]">
          {/* Route */}
          <div className="flex items-center justify-between mb-[12px]">
            <div className="flex flex-col items-start">
              <p className="font-['Lato',sans-serif] font-medium text-[18px] text-text-1 leading-normal">SEA</p>
              <p className="font-['Lato',sans-serif] text-[12px] text-text-2 leading-normal">Seattle, WA</p>
            </div>
            <svg width="40" height="16" viewBox="0 0 40 16" fill="none">
              <path d="M0 8h36M33 4l4 4-4 4" stroke="#4fc660" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div className="flex flex-col items-end">
              <p className="font-['Lato',sans-serif] font-medium text-[18px] text-text-1 leading-normal">ATL</p>
              <p className="font-['Lato',sans-serif] text-[12px] text-text-2 leading-normal">Atlanta, GA</p>
            </div>
          </div>

          {/* Details */}
          <div className="border-t border-bg-2 pt-[12px]">
            <div className="flex items-center justify-between mb-[8px]">
              <p className="font-['Lato',sans-serif] text-[12px] text-text-2 leading-normal">Travel date</p>
              <p className="font-['Lato',sans-serif] text-[12px] text-text-1 leading-normal">Mar 15</p>
            </div>
            <div className="flex items-center justify-between mb-[8px]">
              <p className="font-['Lato',sans-serif] text-[12px] text-text-2 leading-normal">Target price</p>
              <p className="font-['Lato',sans-serif] text-[12px] text-green font-medium leading-normal">$400</p>
            </div>
            <div className="flex items-center justify-between mb-[8px]">
              <p className="font-['Lato',sans-serif] text-[12px] text-text-2 leading-normal">Current price</p>
              <p className="font-['Lato',sans-serif] text-[12px] text-green font-medium leading-normal">$478</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="font-['Lato',sans-serif] text-[12px] text-text-2 leading-normal">Airline</p>
              <p className="font-['Lato',sans-serif] text-[12px] text-text-1 leading-normal">Any</p>
            </div>
          </div>
        </div>

        {/* Info box */}
        <div className="bg-green/5 w-full rounded-[8px] px-[16px] py-[12px]">
          <p className="font-['Lato',sans-serif] text-[12px] text-text-2 leading-[18px]">
            Axel will check prices hourly and notify you when the price drops below <span className="text-green font-medium">$400</span>. When it does, we&apos;ll hold the price for 48 hours.
          </p>
        </div>
      </div>

      {/* CTA Button */}
      <div onClick={onNext} className="absolute left-1/2 -translate-x-1/2 top-[711px] w-[345px] bg-bg-2 flex items-center justify-center px-[8px] py-[14px] rounded-[30px] cursor-pointer hover:brightness-110 transition">
        <p className="font-normal text-[14px] text-text-1 text-center leading-normal shrink-0">
          View my watches
        </p>
      </div>
    </div>
  )
}

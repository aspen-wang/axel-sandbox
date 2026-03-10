'use client'

import statusIcons from '@/assets/status-icons.svg'

export default function TripConfirmation({ onNext }) {
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

      {/* Centered Content */}
      <div className="absolute left-0 right-0 top-[59px] bottom-0 flex flex-col items-center justify-center px-[24px]">
        {/* Green Check */}
        <div className="w-[72px] h-[72px] rounded-full bg-green/20 flex items-center justify-center mb-[16px]">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M8 16l6 6 10-12" stroke="#4fc660" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {/* Title */}
        <p className="font-bold text-[20px] text-text-1 leading-normal mt-[16px] mb-[8px]">Trip booked!</p>

        {/* Trip summary */}
        <p className="text-[14px] text-text-2 leading-normal mb-[2px]">SF Business Trip</p>
        <p className="text-[13px] text-text-2 leading-normal mb-[20px]">Apr 15–18</p>

        {/* One-liners with green left border */}
        <div className="w-full max-w-[300px] mb-[20px]">
          <div className="border-l-2 border-green pl-[10px] mb-[10px]">
            <p className="text-[12px] text-text-2 leading-normal">United SEA → SFO · Apr 15 · 7:12am</p>
          </div>
          <div className="border-l-2 border-green pl-[10px]">
            <p className="text-[12px] text-text-2 leading-normal">Hotel Nikko SF · 3 nights</p>
          </div>
        </div>

        {/* Confirmation code */}
        <p className="text-[11px] text-text-2 font-['monospace'] tracking-[0.5px] mt-[20px] mb-[32px]">
          Confirmation #AX-48291
        </p>

        {/* CTA */}
        <div onClick={onNext} className="bg-main flex items-center justify-center px-[32px] py-[14px] rounded-[30px] cursor-pointer hover:brightness-110 transition">
          <p className="font-medium text-[14px] text-white text-center leading-normal">View trip</p>
        </div>

        {/* Back to trips */}
        <p className="text-[13px] text-text-2 text-center mt-[12px] cursor-pointer hover:text-text-1 transition">
          Back to trips
        </p>
      </div>
    </div>
  )
}

'use client'

import statusIcons from '@/assets/status-icons.svg'

export default function TripPayment({ onNext }) {
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
          {/* Header: Back + Complete booking */}
          <div className="flex items-center mt-[12px] mb-[20px]">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="mr-[8px]">
              <path d="M13 4l-6 6 6 6" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p className="font-medium text-[16px] text-text-1 leading-normal">Complete booking</p>
          </div>

          {/* Order Summary Card */}
          <div className="bg-[#242424] rounded-[12px] px-[16px] py-[14px] mb-[20px]">
            <p className="font-bold text-[14px] text-text-1 leading-normal mb-[4px]">SF Business Trip</p>
            <p className="text-[12px] text-text-2 leading-normal mb-[10px]">Apr 15–18 · 1 traveler</p>
            <div className="h-[1px] bg-[#474747] mb-[10px]" />
            <p className="text-[12px] text-text-2 leading-normal mb-[4px]">United SEA→SFO</p>
            <p className="text-[12px] text-text-2 leading-normal">Hotel Nikko SF, 3 nights</p>
          </div>

          {/* Payment Method */}
          <p className="font-medium text-[16px] text-text-1 leading-normal mt-[20px] mb-[12px]">Payment Method</p>

          {/* Saved Card */}
          <div className="bg-[#242424] rounded-[12px] px-[16px] py-[14px] flex items-center border border-green/40 mb-[10px]">
            {/* Card Icon */}
            <svg width="24" height="18" viewBox="0 0 24 18" fill="none" className="mr-[12px] shrink-0">
              <rect x="0.5" y="0.5" width="23" height="17" rx="2.5" stroke="#989898" />
              <rect x="0" y="4" width="24" height="4" fill="#474747" />
            </svg>
            <div className="flex-1">
              <p className="text-[14px] text-text-1 leading-normal">•••• •••• •••• 4242</p>
            </div>
            <p className="text-[12px] text-text-2 leading-normal ml-[8px]">Visa</p>
          </div>

          {/* New card link */}
          <p className="text-[12px] text-text-2 leading-normal mb-[20px] cursor-pointer hover:text-text-1 transition">
            Or pay with new card
          </p>

          {/* Price Breakdown */}
          <div className="bg-[#242424] rounded-[12px] px-[16px] py-[14px]">
            <div className="flex items-center justify-between mb-[8px]">
              <p className="text-[13px] text-text-2 leading-normal">Subtotal</p>
              <p className="text-[13px] text-text-1 leading-normal">$785</p>
            </div>
            <div className="flex items-center justify-between mb-[8px]">
              <p className="text-[13px] text-text-2 leading-normal">Taxes & fees</p>
              <p className="text-[13px] text-text-2 leading-normal">$94</p>
            </div>
            <div className="flex items-center justify-between mb-[8px]">
              <p className="text-[13px] text-text-2 leading-normal">Member discount</p>
              <p className="text-[13px] text-green font-medium leading-normal">−$47</p>
            </div>
            <div className="h-[1px] bg-[#474747] my-[8px]" />
            <div className="flex items-center justify-between">
              <p className="font-bold text-[16px] text-text-1 leading-normal">Total</p>
              <p className="font-bold text-[16px] text-text-1 leading-normal">$832</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="absolute bottom-0 left-0 right-0 px-[24px] pb-[36px] pt-[16px] bg-gradient-to-t from-bg via-bg to-transparent">
        <div onClick={onNext} className="w-full bg-main flex items-center justify-center py-[14px] rounded-[30px] cursor-pointer hover:brightness-110 transition">
          <p className="font-medium text-[14px] text-white text-center leading-normal">Pay $832</p>
        </div>
        <p className="text-[11px] text-text-2 text-center mt-[8px]">Free cancellation within 24 hours</p>
      </div>
    </div>
  )
}

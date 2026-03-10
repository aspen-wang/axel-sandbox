'use client'

import statusIcons from '@/assets/status-icons.svg'

export default function TripPaywall({ onNext }) {
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
        {/* Logo */}
        <div className="w-[48px] h-[48px] rounded-[12px] bg-main/20 flex items-center justify-center mb-[8px]">
          <p className="text-main font-bold text-[20px] leading-none">A</p>
        </div>
        <p className="text-main text-[11px] font-medium tracking-[2px] uppercase mb-[24px]">AXEL</p>

        {/* Message */}
        <p className="text-text-1 text-[18px] font-medium text-center leading-[24px] max-w-[280px] mb-[32px]">
          You must be a member to book this fare
        </p>

        {/* Benefits */}
        <div className="w-full max-w-[300px] mb-[32px]">
          {[
            'Average $284 savings per booking',
            'Price monitoring on all trips',
            'Automatic rebooking when prices drop',
            'Free cancellation within 24 hours',
          ].map((item, i) => (
            <div key={i} className="flex items-start mb-[14px] last:mb-0">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="mr-[10px] mt-[2px] shrink-0">
                <path d="M3 7l3 3 5-6" stroke="#4fc660" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p className="font-['Lato',sans-serif] text-[13px] text-text-1 leading-[18px]">{item}</p>
            </div>
          ))}
        </div>

        {/* Price */}
        <p className="font-bold text-[24px] text-text-1 leading-none mb-[4px]">$9.99/month</p>
        <p className="text-[12px] text-text-2 leading-normal mb-[32px]">Cancel anytime</p>

        {/* CTA */}
        <div onClick={onNext} className="w-full bg-main flex items-center justify-center py-[14px] rounded-[30px] cursor-pointer hover:brightness-110 transition">
          <p className="font-medium text-[14px] text-white text-center leading-normal">Become a member</p>
        </div>

        {/* Maybe later */}
        <p className="text-[13px] text-[#989898] text-center mt-[12px] cursor-pointer hover:text-text-1 transition">
          Maybe later
        </p>
      </div>
    </div>
  )
}

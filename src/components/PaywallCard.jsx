'use client'

export default function PaywallCard({ benefits, price, period, ctaLabel, onCta, onSkip }) {
  return (
    <div className="flex flex-col items-center justify-center px-[24px]">
      <div className="w-[44px] h-[44px] rounded-[12px] bg-main/20 flex items-center justify-center mb-[6px]"><p className="text-main font-bold text-[18px] leading-none">A</p></div>
      <p className="text-main text-[10px] font-medium tracking-[2px] uppercase mb-[20px]">AXEL</p>
      <p className="text-text-1 text-[17px] font-medium text-center leading-[22px] max-w-[260px] mb-[24px]">You must be a member to book this fare</p>
      <div className="w-full max-w-[280px] mb-[24px]">
        {benefits.map((item, i) => (
          <div key={i} className="flex items-start mb-[10px] last:mb-0">
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" className="mr-[8px] mt-[2px] shrink-0"><path d="M3 7l3 3 5-6" stroke="#4fc660" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            <p className="font-['Lato',sans-serif] text-[12px] text-text-1 leading-[16px]">{item}</p>
          </div>
        ))}
      </div>
      <p className="font-bold text-[22px] text-text-1 leading-none mb-[3px]">{price}/{period}</p>
      <p className="text-[11px] text-text-2 leading-normal mb-[24px]">Cancel anytime</p>
      <button onClick={onCta} className="w-full flex items-center justify-center py-[12px] rounded-[30px] cursor-pointer hover:brightness-110 transition bg-main">
        <p className="font-medium text-[13px] text-center leading-normal text-white">{ctaLabel}</p>
      </button>
      {onSkip && <button onClick={onSkip} className="mt-[10px]"><p className="text-[12px] text-[#989898] text-center hover:text-text-1 transition">Maybe later</p></button>}
    </div>
  )
}

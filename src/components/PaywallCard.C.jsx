'use client'

export default function PaywallCard({ benefits, price, period, ctaLabel, onCta, onSkip }) {
  return (
    <div className="flex flex-col items-center justify-center px-[24px]">
      {/* Minimal — price first, social proof */}
      <p className="text-main text-[10px] font-medium tracking-[2px] uppercase mb-[16px]">AXEL MEMBERSHIP</p>
      <p className="font-bold text-[32px] text-text-1 leading-none mb-[2px]">{price}</p>
      <p className="text-[12px] text-text-2 mb-[20px]">per {period} &middot; Cancel anytime</p>
      {/* Benefits as pills */}
      <div className="flex flex-wrap gap-[6px] justify-center max-w-[280px] mb-[24px]">
        {benefits.map((item, i) => (
          <div key={i} className="bg-[#1a1a1a] border border-[#333] rounded-full px-[10px] py-[5px]">
            <p className="font-['Lato',sans-serif] text-[11px] text-text-1">{item}</p>
          </div>
        ))}
      </div>
      <button onClick={onCta} className="w-full flex items-center justify-center py-[14px] rounded-[30px] cursor-pointer hover:brightness-110 transition bg-main">
        <p className="font-medium text-[14px] text-center leading-normal text-white">{ctaLabel}</p>
      </button>
      {onSkip && <button onClick={onSkip} className="mt-[12px]"><p className="text-[12px] text-[#989898] text-center hover:text-text-1 transition">Not now</p></button>}
      <p className="text-[10px] text-[#555] mt-[16px]">Trusted by 50,000+ travelers</p>
    </div>
  )
}

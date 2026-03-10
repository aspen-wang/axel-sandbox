'use client'

export default function PaywallCard({ benefits, price, period, ctaLabel, onCta, onSkip }) {
  return (
    <div className="flex flex-col items-center justify-center px-[24px]">
      {/* Gradient ring logo */}
      <div className="w-[48px] h-[48px] rounded-full bg-gradient-to-br from-main to-[#ff8a65] flex items-center justify-center mb-[8px]">
        <p className="text-white font-bold text-[20px] leading-none">A</p>
      </div>
      <p className="text-text-1 text-[18px] font-bold text-center leading-[24px] max-w-[260px] mb-[4px]">Unlock Axel Pro</p>
      <p className="text-text-2 text-[12px] text-center mb-[20px]">Get exclusive fares and premium features</p>
      {/* Benefits in a card */}
      <div className="w-full max-w-[280px] bg-[#1a1a1a] rounded-[10px] px-[14px] py-[10px] mb-[20px]">
        {benefits.map((item, i) => (
          <div key={i} className="flex items-center gap-[8px] mb-[8px] last:mb-0">
            <div className="w-[18px] h-[18px] rounded-full bg-green/10 flex items-center justify-center shrink-0">
              <svg width="10" height="10" viewBox="0 0 14 14" fill="none"><path d="M3 7l3 3 5-6" stroke="#4fc660" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
            <p className="font-['Lato',sans-serif] text-[12px] text-text-1 leading-[16px]">{item}</p>
          </div>
        ))}
      </div>
      {/* Pricing */}
      <div className="flex items-baseline gap-[4px] mb-[4px]">
        <p className="font-bold text-[28px] text-text-1 leading-none">{price}</p>
        <p className="text-[13px] text-text-2">/{period}</p>
      </div>
      <p className="text-[11px] text-text-2 leading-normal mb-[20px]">Cancel anytime</p>
      <button onClick={onCta} className="w-full flex items-center justify-center py-[12px] rounded-[30px] cursor-pointer hover:brightness-110 transition bg-gradient-to-r from-main to-[#ff6b8a]">
        <p className="font-medium text-[13px] text-center leading-normal text-white">{ctaLabel}</p>
      </button>
      {onSkip && <button onClick={onSkip} className="mt-[10px]"><p className="text-[12px] text-[#989898] text-center hover:text-text-1 transition">Maybe later</p></button>}
    </div>
  )
}

'use client'

import statusIcons from '@/assets/status-icons.svg'
import { getPlans } from '@/lib/data'

const plans = getPlans()

export default function Paywall({ onNext }) {
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
        {/* Header */}
        <p className="font-medium text-[20px] text-text-1 leading-normal mb-[4px]">
          Unlock Axel Pro
        </p>
        <p className="font-normal text-[13px] text-text-2 leading-normal mb-[20px]">
          Hold prices and save more with a Pro plan
        </p>

        {/* Savings summary */}
        <div className="bg-green/10 w-full rounded-[8px] px-[16px] py-[12px] mb-[20px]">
          <div className="flex items-center justify-between mb-[4px]">
            <p className="font-medium text-[14px] text-green leading-normal">Pro members save</p>
            <p className="font-medium text-[20px] text-green leading-normal">$127</p>
          </div>
          <p className="font-['Lato',sans-serif] text-[11px] text-text-2 leading-normal">
            Average savings per booking with price holds
          </p>
        </div>

        {/* Plan Cards */}
        <div className="flex flex-col">
          {plans.map((plan, i) => (
            <div
              key={plan.id}
              onClick={plan.highlight ? onNext : undefined}
              className={`w-full rounded-[8px] px-[16px] py-[14px] ${
                plan.highlight
                  ? 'bg-card-bg border border-green/30 cursor-pointer hover:brightness-110 transition'
                  : 'bg-card-bg border border-transparent'
              }${i < plans.length - 1 ? ' mb-[12px]' : ''}`}
            >
              <div className="flex items-center justify-between mb-[8px]">
                <div className="flex items-center">
                  <p className="font-medium text-[15px] text-text-1 leading-normal mr-[8px]">
                    {plan.name}
                  </p>
                  {plan.highlight && (
                    <span className="bg-green/20 text-green text-[10px] font-medium px-[6px] py-[2px] rounded-[4px]">
                      Popular
                    </span>
                  )}
                </div>
                <p className="font-medium text-[16px] leading-normal">
                  {plan.price === 0 ? (
                    <span className="text-text-2">Free</span>
                  ) : (
                    <>
                      <span className="text-text-1">${plan.price}</span>
                      <span className="text-text-2 text-[12px] font-normal">/{plan.period}</span>
                    </>
                  )}
                </p>
              </div>

              {/* Features */}
              {plan.features.map((feature, j) => (
                <div key={j} className="flex items-start mb-[4px]">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="mr-[8px] mt-[1px] shrink-0">
                    <path d="M3 7l3 3 5-6" stroke={plan.highlight ? '#4fc660' : '#989898'} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <p className={`font-['Lato',sans-serif] text-[12px] leading-[18px] ${
                    plan.highlight ? 'text-text-1' : 'text-text-2'
                  }`}>
                    {feature}
                  </p>
                </div>
              ))}

              {plan.savings_avg > 0 && (
                <div className="mt-[8px] pt-[8px] border-t border-bg-2">
                  <p className="font-['Lato',sans-serif] text-[11px] text-text-2 leading-normal">
                    Avg savings: <span className="text-green font-medium">${plan.savings_avg}/booking</span>
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* CTA Button */}
      <div onClick={onNext} className="absolute left-1/2 -translate-x-1/2 top-[711px] w-[345px] bg-green flex items-center justify-center px-[8px] py-[14px] rounded-[30px] cursor-pointer hover:brightness-110 transition">
        <p className="font-medium text-[14px] text-bg text-center leading-normal shrink-0">
          Start Pro &mdash; $9.99/mo
        </p>
      </div>

      {/* Skip link */}
      <div className="absolute left-1/2 -translate-x-1/2 top-[770px]">
        <p onClick={onNext} className="font-normal text-[12px] text-text-2 text-center leading-normal cursor-pointer hover:text-text-1 transition">
          Maybe later
        </p>
      </div>
    </div>
  )
}

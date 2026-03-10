'use client'

// R3 — Table rows. Both legs as compact single-line rows. Ultra tight. No tear line, no subtitle.

function Checkmark() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-green shrink-0">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  )
}

function LegRow({ from, to, stops, duration, date }) {
  return (
    <div className="flex items-center justify-between py-[8px]">
      <div className="flex items-center">
        <p className="font-['Lato',sans-serif] font-bold text-[13px] text-text-1 leading-[1] w-[32px]">{from}</p>
        <svg width="12" height="6" viewBox="0 0 12 6" className="mx-[4px] text-text-2/40">
          <path d="M0 3h10M8 1l2 2-2 2" stroke="currentColor" strokeWidth="0.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <p className="font-['Lato',sans-serif] font-bold text-[13px] text-text-1 leading-[1] w-[32px]">{to}</p>
        <p className="font-['Lato',sans-serif] text-[11px] text-text-2/50 leading-[1] ml-[8px]">{stops}</p>
      </div>
      <div className="flex items-baseline">
        <p className="font-['Lato',sans-serif] text-[11px] text-text-2 leading-[1]">{duration}</p>
        <p className="font-['Lato',sans-serif] text-[11px] text-text-2/40 leading-[1] ml-[8px]">{date}</p>
      </div>
    </div>
  )
}

export default function WatchCardR3({ watch, state, onClick }) {
  return (
    <div className="bg-bg-2 rounded-[16px] overflow-hidden" onClick={onClick}>
      {/* Status bar */}
      <div className="bg-green/10 flex items-center px-[16px] py-[12px]">
        <Checkmark />
        <p className="font-['Lato',sans-serif] text-[12px] text-green leading-[1.5] ml-[8px]">
          Axel found a deal! Price dropped below $390
        </p>
      </div>

      {/* Flight legs — table rows */}
      <div className="px-[16px] pt-[4px]">
        <LegRow from="SEA" to="LAX" stops="2 stops" duration="6h 45m" date="Mar 5" />
        <div className="border-t border-text-2/8" />
        <LegRow from="LAX" to="SEA" stops="Nonstop" duration="2h 30m" date="Mar 9" />
      </div>

      {/* Price — inline compact */}
      <div className="px-[16px] pt-[8px] pb-[16px]">
        <div className="flex items-center justify-between">
          <div className="flex items-baseline">
            <p className="font-['Inter',sans-serif] font-medium text-[20px] text-text-1 leading-[1]">$372</p>
            <p className="font-['Lato',sans-serif] text-[12px] text-text-2/40 leading-[1] line-through ml-[8px]">$420</p>
          </div>
          <span className="inline-flex items-center px-[8px] py-[4px] rounded-[6px] bg-green/10">
            <p className="font-['Lato',sans-serif] text-[11px] text-green leading-[1]">Save $48</p>
          </span>
        </div>
      </div>
    </div>
  )
}

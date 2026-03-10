'use client'

// R2 — No tear line. Thin divider. Both legs compact. Stops as "via DEN, SFO".

function Arrow() {
  return (
    <svg width="16" height="6" viewBox="0 0 16 6" className="mx-[6px] text-text-2/60">
      <path d="M0 3h14M12 1l2 2-2 2" stroke="currentColor" strokeWidth="0.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function Checkmark() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-green shrink-0">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  )
}

export default function WatchCardR2({ watch, state, onClick }) {
  return (
    <div className="bg-bg-2 rounded-[16px] overflow-hidden" onClick={onClick}>
      {/* Status bar */}
      <div className="bg-green/10 flex items-center px-[16px] py-[12px]">
        <Checkmark />
        <p className="font-['Lato',sans-serif] text-[12px] text-green leading-[1.5] ml-[8px]">
          Axel found a deal! Price dropped below $390
        </p>
      </div>

      {/* Flight legs — no tear line, simple divider */}
      <div className="px-[16px] pt-[14px]">
        {/* Outbound */}
        <div className="flex items-baseline justify-between">
          <div className="flex items-baseline">
            <p className="font-['Lato',sans-serif] font-bold text-[13px] text-text-1 leading-[1]">SEA</p>
            <Arrow />
            <p className="font-['Lato',sans-serif] font-bold text-[13px] text-text-1 leading-[1]">LAX</p>
            <p className="font-['Lato',sans-serif] text-[11px] text-text-2/60 leading-[1] ml-[8px]">2 stops</p>
          </div>
          <p className="font-['Lato',sans-serif] text-[11px] text-text-2 leading-[1]">6h 45m · Mar 5</p>
        </div>
        <p className="font-['Lato',sans-serif] text-[10px] text-text-2/40 leading-[1.5] mt-[2px]">
          via Denver, San Francisco
        </p>

        {/* Divider */}
        <div className="border-t border-text-2/10 my-[10px]" />

        {/* Return */}
        <div className="flex items-baseline justify-between">
          <div className="flex items-baseline">
            <p className="font-['Lato',sans-serif] font-bold text-[13px] text-text-1 leading-[1]">LAX</p>
            <Arrow />
            <p className="font-['Lato',sans-serif] font-bold text-[13px] text-text-1 leading-[1]">SEA</p>
            <p className="font-['Lato',sans-serif] text-[11px] text-text-2/60 leading-[1] ml-[8px]">Nonstop</p>
          </div>
          <p className="font-['Lato',sans-serif] text-[11px] text-text-2 leading-[1]">2h 30m · Mar 9</p>
        </div>
      </div>

      {/* Price — minimal */}
      <div className="px-[16px] pt-[14px] pb-[16px]">
        <div className="flex items-baseline justify-between">
          <p className="font-['Inter',sans-serif] font-medium text-[20px] text-text-1 leading-[1]">$372</p>
          <p className="font-['Lato',sans-serif] text-[13px] text-text-2/50 leading-[1] line-through">$420</p>
        </div>
        <div className="mt-[8px]">
          <span className="inline-flex items-center px-[8px] py-[4px] rounded-[6px] bg-green/10">
            <p className="font-['Lato',sans-serif] text-[11px] text-green leading-[1]">Save $48 (11%)</p>
          </span>
        </div>
      </div>
    </div>
  )
}

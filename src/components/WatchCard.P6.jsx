'use client'

// P6 — Inline. One compact row: price, down arrow, savings, strikethrough. No pill, no button, card tappable.

function SmallArrow() {
  return (
    <svg width="12" height="6" viewBox="0 0 12 6" className="mx-[4px] text-text-2/40">
      <path d="M0 3h10M8 1l2 2-2 2" stroke="currentColor" strokeWidth="0.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function Arrow() {
  return (
    <svg width="20" height="8" viewBox="0 0 20 8" className="mx-[8px] text-text-2">
      <path d="M0 4h18M15 1l3 3-3 3" stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round" strokeLinejoin="round" />
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

function DownArrowSmall() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-green mx-[4px] shrink-0">
      <path d="M12 5v14M19 12l-7 7-7-7" />
    </svg>
  )
}

export default function WatchCardP6({ watch, state, onClick }) {
  return (
    <div className="bg-bg-2 rounded-[16px] overflow-hidden" onClick={onClick}>
      {/* Status bar */}
      <div className="bg-green/10 flex items-center px-[16px] py-[12px]">
        <Checkmark />
        <p className="font-['Lato',sans-serif] text-[12px] text-green leading-[1.5] ml-[8px]">
          Axel found a deal! Price dropped below $390
        </p>
      </div>

      {/* Outbound — 1 stop */}
      <div className="px-[16px] pt-[16px]">
        <div className="flex items-baseline justify-between">
          <div className="flex items-baseline">
            <p className="font-['Lato',sans-serif] font-bold text-[14px] text-text-1 leading-[1]">SEA</p>
            <SmallArrow />
            <p className="font-['Lato',sans-serif] text-[12px] text-text-2 leading-[1]">DEN</p>
            <SmallArrow />
            <p className="font-['Lato',sans-serif] font-bold text-[14px] text-text-1 leading-[1]">LAX</p>
          </div>
          <p className="font-['Lato',sans-serif] text-[12px] text-text-2 leading-[1]">6h 45m</p>
        </div>
        <p className="font-['Lato',sans-serif] text-[11px] text-text-2 leading-[1.5] mt-[4px]">
          1 stop · 2h 15m in Denver · Mar 5
        </p>
      </div>

      {/* Tear line */}
      <div className="relative my-[16px]">
        <div className="border-t border-dashed border-text-2/20 mx-[16px]" />
        <div className="absolute left-[-6px] top-1/2 -translate-y-1/2 w-[12px] h-[12px] rounded-full bg-bg" />
        <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-[12px] h-[12px] rounded-full bg-bg" />
      </div>

      {/* Return — nonstop */}
      <div className="px-[16px]">
        <div className="flex items-baseline justify-between">
          <div className="flex items-baseline">
            <p className="font-['Lato',sans-serif] font-bold text-[14px] text-text-1 leading-[1]">LAX</p>
            <Arrow />
            <p className="font-['Lato',sans-serif] font-bold text-[14px] text-text-1 leading-[1]">SEA</p>
          </div>
          <p className="font-['Lato',sans-serif] text-[12px] text-text-2 leading-[1]">5:30 PM</p>
        </div>
        <p className="font-['Lato',sans-serif] text-[11px] text-text-2 leading-[1.5] mt-[4px]">
          Nonstop · Mar 9
        </p>
      </div>

      {/* Price — Inline: one compact row */}
      <div className="px-[16px] pt-[16px] pb-[16px]">
        <div className="flex items-center">
          <p className="font-['Inter',sans-serif] font-medium text-[20px] text-text-1 leading-[1]">$372</p>
          <DownArrowSmall />
          <p className="font-['Lato',sans-serif] text-[13px] text-green leading-[1]">$48 less</p>
          <p className="font-['Lato',sans-serif] text-[13px] text-text-2/40 leading-[1] ml-[6px]">·</p>
          <p className="font-['Lato',sans-serif] text-[13px] text-text-2/40 leading-[1] line-through ml-[6px]">$420</p>
        </div>
      </div>
    </div>
  )
}

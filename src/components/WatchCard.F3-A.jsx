'use client'

// F3-A — Watching · Nonstop · Cleanest version, maximum whitespace

function Arrow() {
  return (
    <svg width="20" height="8" viewBox="0 0 20 8" className="mx-[8px] text-text-2">
      <path d="M0 4h18M15 1l3 3-3 3" stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function Sparkle({ className = '' }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0l2.5 8.5L24 12l-9.5 3.5L12 24l-2.5-8.5L0 12l9.5-3.5z" />
    </svg>
  )
}

export default function WatchCardF3A({ watch, state, onClick }) {
  return (
    <div className="bg-bg-2 rounded-[16px] overflow-hidden" onClick={onClick}>
      {/* Status bar */}
      <div className="bg-text-2/5 flex items-center px-[16px] py-[12px]">
        <Sparkle className="text-text-2 shrink-0" />
        <p className="font-['Lato',sans-serif] text-[12px] text-text-2 leading-[1.5] ml-[8px]">
          Axel is watching for prices under $390
        </p>
      </div>

      {/* Outbound */}
      <div className="px-[16px] pt-[16px]">
        <div className="flex items-baseline justify-between">
          <div className="flex items-baseline">
            <p className="font-['Lato',sans-serif] font-bold text-[14px] text-text-1 leading-[1]">SEA</p>
            <Arrow />
            <p className="font-['Lato',sans-serif] font-bold text-[14px] text-text-1 leading-[1]">LAX</p>
          </div>
          <p className="font-['Lato',sans-serif] text-[12px] text-text-2 leading-[1]">2h 30m</p>
        </div>
        <p className="font-['Lato',sans-serif] text-[11px] text-text-2 leading-[1.5] mt-[4px]">
          Nonstop · Mar 5
        </p>
      </div>

      {/* Tear line */}
      <div className="relative my-[16px]">
        <div className="border-t border-dashed border-text-2/20 mx-[16px]" />
        <div className="absolute left-[-6px] top-1/2 -translate-y-1/2 w-[12px] h-[12px] rounded-full bg-bg" />
        <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-[12px] h-[12px] rounded-full bg-bg" />
      </div>

      {/* Return */}
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

      {/* Price */}
      <div className="px-[16px] pt-[16px] pb-[16px]">
        <div className="flex items-baseline justify-between">
          <p className="font-['Inter',sans-serif] font-medium text-[20px] text-text-1 leading-[1]">$380</p>
          <p className="font-['Lato',sans-serif] text-[11px] text-text-2 leading-[1]">Economy</p>
        </div>

        <div className="bg-green/8 rounded-[10px] px-[12px] py-[10px] mt-[12px] flex items-center justify-between">
          <div className="flex items-center">
            <Sparkle className="text-green mr-[6px] shrink-0 w-[12px] h-[12px]" />
            <p className="font-['Lato',sans-serif] text-[12px] text-text-2 leading-[1]">Save $40 (10%)</p>
          </div>
          <p className="font-['Lato',sans-serif] text-[12px] text-text-2/50 leading-[1]">$420 market</p>
        </div>
      </div>
    </div>
  )
}

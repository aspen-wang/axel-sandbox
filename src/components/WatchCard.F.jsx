'use client'

const STATE_CONFIG = {
  watching: { text: 'text-main', bg: 'bg-main', label: 'Monitoring' },
  price_dropping: { text: 'text-green', bg: 'bg-green', label: 'Dropping' },
  deal_found: { text: 'text-green', bg: 'bg-green', label: 'Deal found' },
}

function LegRow({ from, to, time, date }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <p className="font-['Lato',sans-serif] font-medium text-[13px] text-text-1 leading-[1] w-[32px]">{from}</p>
        <svg width="16" height="8" viewBox="0 0 16 8" className="mx-[6px] text-text-2">
          <path d="M0 4h14M11 1l3 3-3 3" stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <p className="font-['Lato',sans-serif] font-medium text-[13px] text-text-1 leading-[1] w-[32px]">{to}</p>
      </div>
      <div className="flex items-center">
        <p className="font-['Lato',sans-serif] text-[11px] text-text-2 leading-[1]">{time}</p>
        <p className="font-['Lato',sans-serif] text-[11px] text-text-2 leading-[1] ml-[8px]">{date}</p>
      </div>
    </div>
  )
}

export default function WatchCardF({ watch, state = 'watching', onClick }) {
  const s = STATE_CONFIG[state] || STATE_CONFIG.watching
  const diff = watch.current_price - watch.grab_price
  const belowTarget = diff <= 0

  return (
    <div className="bg-bg-2 rounded-[16px] overflow-hidden" onClick={onClick}>
      {/* Top: status badge + price */}
      <div className="flex items-center justify-between px-[14px] pt-[12px] pb-[10px]">
        <div className="flex items-center">
          <div className={`${s.bg} w-[6px] h-[6px] rounded-full mr-[6px] shrink-0`} />
          <p className={`font-['Lato',sans-serif] text-[11px] leading-[1] ${s.text}`}>{s.label}</p>
          <p className="font-['Lato',sans-serif] text-[11px] text-text-2 leading-[1] ml-[6px]">
            · {watch.checks_today} checks
          </p>
        </div>
        <div className="flex items-baseline">
          <p className={`font-bold text-[18px] leading-[1] ${state === 'deal_found' ? 'text-green' : 'text-text-1'}`}>
            ${watch.current_price}
          </p>
          <p className="font-['Lato',sans-serif] text-[11px] text-text-2 leading-[1] ml-[3px]">/pp</p>
        </div>
      </div>

      {/* Outbound leg */}
      <div className="px-[14px]">
        <LegRow from={watch.from} to={watch.to} time={watch.depart_time} date={watch.depart_date} />
      </div>

      {/* Dashed divider — boarding pass tear line */}
      <div className="relative my-[8px]">
        <div className="border-t border-dashed border-text-2/20 mx-[14px]" />
        {/* Notches */}
        <div className="absolute left-[-6px] top-1/2 -translate-y-1/2 w-[12px] h-[12px] rounded-full bg-bg" />
        <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-[12px] h-[12px] rounded-full bg-bg" />
      </div>

      {/* Return leg */}
      <div className="px-[14px]">
        <LegRow from={watch.to} to={watch.from} time={watch.return_depart_time} date={watch.return_date} />
      </div>

      {/* Bottom bar */}
      <div className="flex items-center justify-between px-[14px] pt-[10px] pb-[12px]">
        <p className="font-['Lato',sans-serif] text-[11px] text-text-2 leading-[1]">
          {watch.stops} · {watch.cabin_class}
        </p>
        <p className={`font-['Lato',sans-serif] font-bold text-[11px] leading-[1] ${belowTarget ? 'text-green' : 'text-text-2'}`}>
          {belowTarget ? 'Below target!' : `$${diff} above target`}
        </p>
      </div>

      {/* Deal CTA */}
      {state === 'deal_found' && (
        <div className="px-[14px] pb-[12px]">
          <div className="flex items-center justify-center w-full py-[9px] bg-green rounded-[10px]">
            <p className="font-medium text-[12px] text-white leading-[1]">View deal</p>
          </div>
        </div>
      )}
    </div>
  )
}

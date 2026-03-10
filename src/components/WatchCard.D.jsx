'use client'

const STATE_CONFIG = {
  watching: {
    accent: 'from-main to-main/40',
    text: 'text-main',
    label: 'Monitoring',
  },
  price_dropping: {
    accent: 'from-green to-green/40',
    text: 'text-green',
    label: 'Dropping',
  },
  deal_found: {
    accent: 'from-green to-green/40',
    text: 'text-green',
    label: 'Deal found',
  },
}

export default function WatchCardD({ watch, state = 'watching', onClick }) {
  const s = STATE_CONFIG[state] || STATE_CONFIG.watching
  const diff = watch.current_price - watch.grab_price
  const belowTarget = diff <= 0

  return (
    <div className="bg-bg-2 rounded-[16px] overflow-hidden flex" onClick={onClick}>
      {/* Left gradient accent bar */}
      <div className={`w-[4px] shrink-0 bg-gradient-to-b ${s.accent}`} />

      <div className="flex-1 px-[14px] py-[12px]">
        {/* Route + status */}
        <div className="flex items-center justify-between">
          <p className="font-medium text-[16px] text-text-1 leading-[1]">
            {watch.from}
            <span className="text-text-2 mx-[6px]">&rarr;</span>
            {watch.to}
          </p>
          <p className={`font-['Lato',sans-serif] text-[11px] leading-[1] ${s.text}`}>{s.label}</p>
        </div>

        {/* Date + stops */}
        <p className="font-['Lato',sans-serif] text-[11px] text-text-2 leading-[1] mt-[6px]">
          {watch.depart_date} &ndash; {watch.return_date} · {watch.stops} · {watch.cabin_class}
        </p>

        {/* Price row */}
        <div className="flex items-end justify-between mt-[10px]">
          <div className="flex items-baseline">
            <p className={`font-bold text-[22px] leading-[1] ${state === 'deal_found' ? 'text-green' : 'text-text-1'}`}>
              ${watch.current_price}
            </p>
            <p className="font-['Lato',sans-serif] text-[11px] text-text-2 leading-[1] ml-[4px]">now</p>
          </div>
          <div className="text-right">
            <p className="font-['Lato',sans-serif] text-[11px] text-text-2 leading-[1]">
              Target <span className="text-green font-medium">${watch.grab_price}</span>
            </p>
            <p className={`font-['Lato',sans-serif] font-bold text-[11px] leading-[1] mt-[3px] ${belowTarget ? 'text-green' : 'text-text-2'}`}>
              {belowTarget ? 'Below target!' : `$${diff} above`}
            </p>
          </div>
        </div>

        {/* Deal CTA */}
        {state === 'deal_found' && (
          <div className="flex items-center justify-center w-full py-[8px] bg-green rounded-[10px] mt-[10px]">
            <p className="font-medium text-[12px] text-white leading-[1]">View deal</p>
          </div>
        )}
      </div>
    </div>
  )
}

'use client'

const STATE_CONFIG = {
  watching: { text: 'text-main', bar: 'bg-main', label: 'Monitoring' },
  price_dropping: { text: 'text-green', bar: 'bg-green', label: 'Dropping' },
  deal_found: { text: 'text-green', bar: 'bg-green', label: 'Deal found!' },
}

export default function WatchCardE({ watch, state = 'watching', onClick }) {
  const s = STATE_CONFIG[state] || STATE_CONFIG.watching
  const diff = watch.current_price - watch.grab_price
  const belowTarget = diff <= 0

  // Progress: how close current price is to target relative to highest historical price
  const highest = watch.price_history ? Math.max(...watch.price_history) : watch.current_price + 50
  const range = highest - watch.grab_price
  const progress = range > 0 ? Math.min(1, Math.max(0, (highest - watch.current_price) / range)) : (belowTarget ? 1 : 0)
  const pct = Math.round(progress * 100)

  return (
    <div className="bg-bg-2 rounded-[16px] overflow-hidden px-[14px] py-[12px]" onClick={onClick}>
      {/* Header: route + status */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <p className="font-medium text-[14px] text-text-1 leading-[1]">
            {watch.from} <span className="text-text-2">&rarr;</span> {watch.to}
          </p>
          <p className="font-['Lato',sans-serif] text-[11px] text-text-2 leading-[1] ml-[8px]">
            {watch.depart_date}
          </p>
        </div>
        <p className={`font-['Lato',sans-serif] text-[11px] leading-[1] ${s.text}`}>{s.label}</p>
      </div>

      {/* Price + target */}
      <div className="flex items-baseline justify-between mt-[10px]">
        <div className="flex items-baseline">
          <p className={`font-bold text-[20px] leading-[1] ${state === 'deal_found' ? 'text-green' : 'text-text-1'}`}>
            ${watch.current_price}
          </p>
          <p className="font-['Lato',sans-serif] text-[11px] text-text-2 leading-[1] ml-[4px]">now</p>
        </div>
        <p className="font-['Lato',sans-serif] text-[11px] text-text-2 leading-[1]">
          Target ${watch.grab_price}
        </p>
      </div>

      {/* Progress bar */}
      <div className="mt-[10px]">
        <div className="w-full h-[6px] bg-bg rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full ${s.bar} transition-all`}
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className="flex items-center justify-between mt-[4px]">
          <p className="font-['Lato',sans-serif] text-[10px] text-text-2 leading-[1]">
            ${highest} start
          </p>
          <p className={`font-['Lato',sans-serif] font-bold text-[10px] leading-[1] ${belowTarget ? 'text-green' : s.text}`}>
            {belowTarget ? 'Below target!' : `${pct}% there`}
          </p>
          <p className="font-['Lato',sans-serif] text-[10px] text-text-2 leading-[1]">
            ${watch.grab_price} target
          </p>
        </div>
      </div>

      {/* Bottom: stops + checks */}
      <div className="flex items-center mt-[8px]">
        <p className="font-['Lato',sans-serif] text-[11px] text-text-2 leading-[1]">
          {watch.stops} · {watch.cabin_class} · {watch.checks_today} checks today
        </p>
      </div>

      {/* Deal CTA */}
      {state === 'deal_found' && (
        <div className="flex items-center justify-center w-full py-[8px] bg-green rounded-[10px] mt-[10px]">
          <p className="font-medium text-[12px] text-white leading-[1]">View deal</p>
        </div>
      )}
    </div>
  )
}

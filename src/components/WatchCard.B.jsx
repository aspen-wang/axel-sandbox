'use client'

const STATE_DOT = {
  watching: { dot: 'bg-main', text: 'text-main' },
  price_dropping: { dot: 'bg-green', text: 'text-green' },
  deal_found: { dot: 'bg-green', text: 'text-green' },
}

const STATE_LABEL = {
  watching: 'Monitoring',
  price_dropping: 'Dropping',
  deal_found: 'Deal found',
}

export default function WatchCardB({ watch, state = 'watching', onClick }) {
  const dot = STATE_DOT[state] || STATE_DOT.watching
  const diff = watch.current_price - watch.grab_price
  const belowTarget = diff <= 0

  return (
    <div className="bg-bg-2 rounded-[12px] overflow-hidden px-[14px] py-[12px]" onClick={onClick}>
      {/* Top row: status dot + route + date */}
      <div className="flex items-center">
        <div className={`w-[6px] h-[6px] rounded-full ${dot.dot} mr-[8px] shrink-0`} />
        <p className="font-medium text-[14px] text-text-1 leading-[1]">
          {watch.from}
          <span className="text-text-2 mx-[6px]">&rarr;</span>
          {watch.to}
        </p>
        <p className="font-['Lato',sans-serif] text-[12px] text-text-2 leading-[1] ml-[8px]">
          {watch.stops} · {watch.depart_date}
        </p>
      </div>

      {/* Middle row: price + target + difference */}
      <div className="flex items-center justify-between mt-[8px]">
        <div className="flex items-baseline">
          <p className={`font-bold text-[16px] leading-[1] ${state === 'deal_found' ? 'text-green' : 'text-text-1'}`}>
            ${watch.current_price}
          </p>
          <p className="font-['Lato',sans-serif] text-[11px] text-text-2 leading-[1] ml-[3px]">now</p>
          <p className="font-['Lato',sans-serif] text-[11px] text-text-2 leading-[1] mx-[6px]">·</p>
          <p className="font-['Lato',sans-serif] text-[11px] text-text-2 leading-[1]">Target ${watch.grab_price}</p>
        </div>
        <p className={`font-['Lato',sans-serif] font-bold text-[11px] leading-[1] ${belowTarget ? 'text-green' : dot.text}`}>
          {belowTarget ? 'Below!' : `$${diff} above`}
        </p>
      </div>

      {/* Status line */}
      <div className="flex items-center mt-[6px]">
        <p className={`font-['Lato',sans-serif] text-[11px] leading-[1] ${dot.text}`}>{STATE_LABEL[state]}</p>
        <p className="font-['Lato',sans-serif] text-[11px] text-text-2 leading-[1] ml-[6px]">
          · {watch.checks_today} checks today
        </p>
      </div>

      {/* Deal CTA inline */}
      {state === 'deal_found' && (
        <div className="flex items-center justify-center w-full py-[8px] bg-green rounded-[10px] mt-[10px]">
          <p className="font-medium text-[12px] text-white leading-[1]">View deal</p>
        </div>
      )}
    </div>
  )
}

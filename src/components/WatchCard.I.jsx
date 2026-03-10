'use client'

// I — Route Hero: large route typography anchors the card, schedule + price below

const STATE_CONFIG = {
  watching: { text: 'text-main', bg: 'bg-main', label: 'Monitoring' },
  price_dropping: { text: 'text-green', bg: 'bg-green', label: 'Dropping' },
  deal_found: { text: 'text-green', bg: 'bg-green', label: 'Deal found' },
}

function getLayovers(watch) {
  if (!watch.layover) return []
  return Array.isArray(watch.layover) ? watch.layover : [watch.layover]
}

export default function WatchCardI({ watch, state = 'watching', onClick }) {
  const s = STATE_CONFIG[state] || STATE_CONFIG.watching
  const diff = watch.current_price - watch.grab_price
  const belowTarget = diff <= 0
  const layovers = getLayovers(watch)
  const stopsLabel = layovers.length === 0 ? 'Nonstop' : layovers.length === 1 ? '1 stop' : `${layovers.length} stops`
  const axelPrice = watch.axel_price
  const axelSaved = axelPrice ? watch.current_price - axelPrice : 0
  const axelPct = axelPrice ? Math.round((axelSaved / watch.current_price) * 100) : 0

  return (
    <div className="bg-bg-2 rounded-[16px] overflow-hidden" onClick={onClick}>
      {/* Status */}
      <div className="flex items-center px-[16px] pt-[16px]">
        <div className={`${s.bg} w-[6px] h-[6px] rounded-full mr-[6px] shrink-0`} />
        <p className={`font-['Lato',sans-serif] text-[11px] leading-[1] ${s.text}`}>{s.label}</p>
        <p className="font-['Lato',sans-serif] text-[11px] text-text-2 leading-[1] ml-[6px]">&middot; {watch.checks_today} checks</p>
      </div>

      {/* Hero route */}
      <div className="px-[16px] pt-[16px] pb-[14px]">
        <div className="flex items-center">
          <p className="font-['Inter',sans-serif] font-medium text-[24px] text-text-1 leading-[1]">{watch.from}</p>
          <svg width="28" height="10" viewBox="0 0 28 10" className="mx-[12px] text-text-2">
            <path d="M0 5h26M22 1l4 4-4 4" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <p className="font-['Inter',sans-serif] font-medium text-[24px] text-text-1 leading-[1]">{watch.to}</p>
        </div>
        <p className="font-['Lato',sans-serif] text-[12px] text-text-2 leading-[1] mt-[8px]">
          {stopsLabel} &middot; {watch.cabin_class}
          {layovers.length > 0 && <span className="text-text-2/50"> &middot; via {layovers.map(c => c.connection).join(', ')}</span>}
        </p>
      </div>

      {/* Divider */}
      <div className="border-t border-text-2/10 mx-[16px]" />

      {/* Schedule */}
      <div className="px-[16px] pt-[14px]">
        <div className="flex items-center justify-between">
          <p className="font-['Lato',sans-serif] text-[10px] text-text-2/50 leading-[1] uppercase tracking-[0.08em]">Outbound</p>
          <p className="font-['Lato',sans-serif] text-[12px] text-text-2 leading-[1]">{watch.depart_date}</p>
        </div>
        <p className="font-['Lato',sans-serif] font-medium text-[14px] text-text-1 leading-[1] mt-[8px]">
          {watch.depart_time}{watch.arrive_time ? ` \u2013 ${watch.arrive_time}` : ''}
        </p>
        {watch.total_duration && (
          <p className="font-['Lato',sans-serif] text-[11px] text-text-2/50 leading-[1] mt-[4px]">{watch.total_duration}</p>
        )}
      </div>

      <div className="px-[16px] pt-[14px] pb-[14px]">
        <div className="flex items-center justify-between">
          <p className="font-['Lato',sans-serif] text-[10px] text-text-2/50 leading-[1] uppercase tracking-[0.08em]">Return</p>
          <p className="font-['Lato',sans-serif] text-[12px] text-text-2 leading-[1]">{watch.return_date}</p>
        </div>
        <p className="font-['Lato',sans-serif] font-medium text-[14px] text-text-1 leading-[1] mt-[8px]">{watch.return_depart_time}</p>
      </div>

      {/* Divider */}
      <div className="border-t border-text-2/10 mx-[16px]" />

      {/* Price */}
      <div className="flex items-center justify-between px-[16px] pt-[14px] pb-[16px]">
        <div className="flex items-baseline">
          {axelPrice ? (
            <>
              <p className="font-['Lato',sans-serif] text-[12px] text-text-2/40 line-through leading-[1] mr-[6px]">${watch.current_price}</p>
              <p className={`font-bold text-[20px] leading-[1] ${state === 'deal_found' ? 'text-green' : 'text-text-1'}`}>${axelPrice}</p>
            </>
          ) : (
            <p className={`font-bold text-[20px] leading-[1] ${state === 'deal_found' ? 'text-green' : 'text-text-1'}`}>${watch.current_price}</p>
          )}
          <p className="font-['Lato',sans-serif] text-[11px] text-text-2 leading-[1] ml-[3px]">/pp</p>
        </div>
        {axelPrice && axelSaved > 0 ? (
          <p className="font-['Lato',sans-serif] font-bold text-[12px] text-green leading-[1]">Save ${axelSaved} ({axelPct}%)</p>
        ) : (
          <p className={`font-['Lato',sans-serif] font-bold text-[11px] leading-[1] ${belowTarget ? 'text-green' : 'text-text-2'}`}>
            {belowTarget ? 'Below target!' : `$${diff} above target`}
          </p>
        )}
      </div>

      {state === 'deal_found' && (
        <div className="px-[16px] pb-[16px]">
          <div className="flex items-center justify-center w-full py-[10px] bg-green rounded-[10px]">
            <p className="font-medium text-[12px] text-white leading-[1]">View deal</p>
          </div>
        </div>
      )}
    </div>
  )
}

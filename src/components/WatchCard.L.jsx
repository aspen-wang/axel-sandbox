'use client'

// L — Left Accent: colored accent bar on left edge, editorial vertical flow

const STATE_CONFIG = {
  watching: { text: 'text-main', bg: 'bg-main', label: 'Monitoring' },
  price_dropping: { text: 'text-green', bg: 'bg-green', label: 'Dropping' },
  deal_found: { text: 'text-green', bg: 'bg-green', label: 'Deal found' },
}

function getLayovers(watch) {
  if (!watch.layover) return []
  return Array.isArray(watch.layover) ? watch.layover : [watch.layover]
}

export default function WatchCardL({ watch, state = 'watching', onClick }) {
  const s = STATE_CONFIG[state] || STATE_CONFIG.watching
  const diff = watch.current_price - watch.grab_price
  const belowTarget = diff <= 0
  const layovers = getLayovers(watch)
  const stopsLabel = layovers.length === 0 ? 'Nonstop' : layovers.length === 1 ? '1 stop' : `${layovers.length} stops`
  const axelPrice = watch.axel_price
  const axelSaved = axelPrice ? watch.current_price - axelPrice : 0
  const axelPct = axelPrice ? Math.round((axelSaved / watch.current_price) * 100) : 0

  return (
    <div className="bg-bg-2 rounded-[16px] overflow-hidden flex" onClick={onClick}>
      {/* Left accent bar */}
      <div className={`w-[4px] ${s.bg} shrink-0`} />

      {/* Content */}
      <div className="flex-1 min-w-0">
        {/* Status + checks */}
        <div className="flex items-center justify-between px-[14px] pt-[16px]">
          <p className={`font-['Lato',sans-serif] font-medium text-[11px] leading-[1] ${s.text}`}>{s.label}</p>
          <p className="font-['Lato',sans-serif] text-[11px] text-text-2 leading-[1]">{watch.checks_today} checks</p>
        </div>

        {/* Route + price row */}
        <div className="flex items-end justify-between px-[14px] pt-[14px] pb-[14px]">
          <div>
            <div className="flex items-center">
              <p className="font-['Inter',sans-serif] font-medium text-[18px] text-text-1 leading-[1]">{watch.from}</p>
              <svg width="24" height="8" viewBox="0 0 24 8" className="mx-[10px] text-text-2">
                <path d="M0 4h22M19 1l3 3-3 3" stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p className="font-['Inter',sans-serif] font-medium text-[18px] text-text-1 leading-[1]">{watch.to}</p>
            </div>
            <p className="font-['Lato',sans-serif] text-[11px] text-text-2 leading-[1] mt-[6px]">{stopsLabel} &middot; {watch.cabin_class}</p>
          </div>
          <div className="text-right shrink-0 ml-[12px]">
            {axelPrice ? (
              <>
                <p className="font-['Lato',sans-serif] text-[11px] text-text-2/40 line-through leading-[1] mb-[4px]">${watch.current_price}</p>
                <p className={`font-bold text-[20px] leading-[1] ${state === 'deal_found' ? 'text-green' : 'text-text-1'}`}>${axelPrice}</p>
              </>
            ) : (
              <p className={`font-bold text-[20px] leading-[1] ${state === 'deal_found' ? 'text-green' : 'text-text-1'}`}>${watch.current_price}</p>
            )}
            <p className="font-['Lato',sans-serif] text-[11px] text-text-2 leading-[1] mt-[2px]">/pp</p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-text-2/10 mx-[14px]" />

        {/* Schedule: outbound */}
        <div className="flex items-center justify-between px-[14px] pt-[12px]">
          <div>
            <p className="font-['Lato',sans-serif] text-[12px] text-text-1 leading-[1]">
              {watch.depart_time}{watch.arrive_time ? ` \u2013 ${watch.arrive_time}` : ''}
            </p>
            {layovers.length > 0 && (
              <p className="font-['Lato',sans-serif] text-[10px] text-text-2/50 leading-[1] mt-[4px]">
                via {layovers.map(c => c.connection).join(', ')}
                {watch.total_duration ? ` \u00b7 ${watch.total_duration}` : ''}
              </p>
            )}
          </div>
          <p className="font-['Lato',sans-serif] text-[11px] text-text-2 leading-[1]">{watch.depart_date}</p>
        </div>

        {/* Schedule: return */}
        <div className="flex items-center justify-between px-[14px] pt-[10px] pb-[14px]">
          <p className="font-['Lato',sans-serif] text-[12px] text-text-1 leading-[1]">{watch.return_depart_time}</p>
          <p className="font-['Lato',sans-serif] text-[11px] text-text-2 leading-[1]">{watch.return_date}</p>
        </div>

        {/* Savings or target */}
        {axelPrice && axelSaved > 0 ? (
          <div className="px-[14px] pb-[14px]">
            <div className="bg-green/8 rounded-[10px] px-[12px] py-[10px] flex items-center justify-between">
              <p className="font-['Lato',sans-serif] text-[11px] text-text-2 leading-[1]">Axel saves</p>
              <p className="font-['Lato',sans-serif] font-bold text-[12px] text-green leading-[1]">${axelSaved} ({axelPct}%)</p>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between px-[14px] pb-[14px]">
            <p className={`font-['Lato',sans-serif] font-bold text-[11px] leading-[1] ${belowTarget ? 'text-green' : 'text-text-2'}`}>
              {belowTarget ? 'Below target!' : `$${diff} above target`}
            </p>
          </div>
        )}

        {state === 'deal_found' && (
          <div className="px-[14px] pb-[14px]">
            <div className="flex items-center justify-center w-full py-[10px] bg-green rounded-[10px]">
              <p className="font-medium text-[12px] text-white leading-[1]">View deal</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

'use client'

// M — Centered: symmetric layout, large centered route, depart/return columns

const STATE_CONFIG = {
  watching: { text: 'text-main', bg: 'bg-main', label: 'Monitoring' },
  price_dropping: { text: 'text-green', bg: 'bg-green', label: 'Dropping' },
  deal_found: { text: 'text-green', bg: 'bg-green', label: 'Deal found' },
}

function getLayovers(watch) {
  if (!watch.layover) return []
  return Array.isArray(watch.layover) ? watch.layover : [watch.layover]
}

export default function WatchCardM({ watch, state = 'watching', onClick }) {
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
      {/* Status centered */}
      <div className="flex items-center justify-center px-[16px] pt-[16px]">
        <div className={`${s.bg} w-[6px] h-[6px] rounded-full mr-[6px] shrink-0`} />
        <p className={`font-['Lato',sans-serif] text-[11px] leading-[1] ${s.text}`}>{s.label}</p>
      </div>

      {/* Centered route hero */}
      <div className="flex items-center justify-center px-[16px] pt-[16px] pb-[6px]">
        <div className="text-center">
          <p className="font-['Inter',sans-serif] font-medium text-[28px] text-text-1 leading-[1]">{watch.from}</p>
          <p className="font-['Lato',sans-serif] text-[11px] text-text-2/60 leading-[1] mt-[6px]">{watch.from_city}</p>
        </div>
        <div className="mx-[20px]">
          <svg width="32" height="10" viewBox="0 0 32 10" className="text-text-2">
            <path d="M0 5h30M26 1l4 4-4 4" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <p className="font-['Lato',sans-serif] text-[10px] text-text-2/40 leading-[1] text-center mt-[6px]">{stopsLabel}</p>
        </div>
        <div className="text-center">
          <p className="font-['Inter',sans-serif] font-medium text-[28px] text-text-1 leading-[1]">{watch.to}</p>
          <p className="font-['Lato',sans-serif] text-[11px] text-text-2/60 leading-[1] mt-[6px]">{watch.to_city}</p>
        </div>
      </div>

      {layovers.length > 0 && (
        <p className="font-['Lato',sans-serif] text-[10px] text-text-2/40 leading-[1] text-center px-[16px] mt-[4px]">
          {layovers.map((c, i) => <span key={i}>{i > 0 ? ' \u00b7 ' : ''}{c.duration} in {c.city}</span>)}
        </p>
      )}

      {/* Schedule: two columns */}
      <div className="flex px-[16px] pt-[18px] pb-[14px]">
        <div className="flex-1 text-center">
          <p className="font-['Lato',sans-serif] text-[10px] text-text-2/40 leading-[1] uppercase tracking-[0.08em] mb-[8px]">Depart</p>
          <p className="font-['Lato',sans-serif] font-medium text-[13px] text-text-1 leading-[1]">{watch.depart_time}</p>
          <p className="font-['Lato',sans-serif] text-[11px] text-text-2 leading-[1] mt-[4px]">{watch.depart_date}</p>
        </div>
        <div className="w-[1px] bg-text-2/10" />
        <div className="flex-1 text-center">
          <p className="font-['Lato',sans-serif] text-[10px] text-text-2/40 leading-[1] uppercase tracking-[0.08em] mb-[8px]">Return</p>
          <p className="font-['Lato',sans-serif] font-medium text-[13px] text-text-1 leading-[1]">{watch.return_depart_time}</p>
          <p className="font-['Lato',sans-serif] text-[11px] text-text-2 leading-[1] mt-[4px]">{watch.return_date}</p>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-text-2/10 mx-[16px]" />

      {/* Price row */}
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

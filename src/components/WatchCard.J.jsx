'use client'

// J — Price Hero: dominant price at top, route info beneath

const STATE_CONFIG = {
  watching: { text: 'text-main', bg: 'bg-main', label: 'Monitoring' },
  price_dropping: { text: 'text-green', bg: 'bg-green', label: 'Dropping' },
  deal_found: { text: 'text-green', bg: 'bg-green', label: 'Deal found' },
}

function getLayovers(watch) {
  if (!watch.layover) return []
  return Array.isArray(watch.layover) ? watch.layover : [watch.layover]
}

export default function WatchCardJ({ watch, state = 'watching', onClick }) {
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
      {/* Price hero section */}
      <div className="px-[16px] pt-[20px] pb-[16px]">
        <div className="flex items-start justify-between">
          <div>
            {axelPrice ? (
              <>
                <div className="flex items-baseline">
                  <p className={`font-bold text-[32px] leading-[1] ${state === 'deal_found' ? 'text-green' : 'text-text-1'}`}>${axelPrice}</p>
                  <p className="font-['Lato',sans-serif] text-[13px] text-text-2 leading-[1] ml-[4px]">/pp</p>
                </div>
                <p className="font-['Lato',sans-serif] text-[12px] text-text-2/40 line-through leading-[1] mt-[6px]">${watch.current_price} retail</p>
              </>
            ) : (
              <div className="flex items-baseline">
                <p className={`font-bold text-[32px] leading-[1] ${state === 'deal_found' ? 'text-green' : 'text-text-1'}`}>${watch.current_price}</p>
                <p className="font-['Lato',sans-serif] text-[13px] text-text-2 leading-[1] ml-[4px]">/pp</p>
              </div>
            )}
          </div>
          <div className="text-right pt-[4px]">
            <div className="flex items-center justify-end">
              <div className={`${s.bg} w-[6px] h-[6px] rounded-full mr-[6px] shrink-0`} />
              <p className={`font-['Lato',sans-serif] text-[11px] leading-[1] ${s.text}`}>{s.label}</p>
            </div>
            {axelPrice && axelSaved > 0 && (
              <p className="font-['Lato',sans-serif] font-bold text-[14px] text-green leading-[1] mt-[10px]">
                Save {axelPct}%
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-text-2/10 mx-[16px]" />

      {/* Route section */}
      <div className="px-[16px] pt-[14px] pb-[14px]">
        {/* Outbound */}
        <div>
          <p className="font-['Lato',sans-serif] text-[10px] text-text-2/50 leading-[1] uppercase tracking-[0.08em] mb-[8px]">Outbound &middot; {watch.depart_date}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <p className="font-['Lato',sans-serif] font-medium text-[14px] text-text-1 leading-[1]">{watch.from}</p>
              <svg width="20" height="8" viewBox="0 0 20 8" className="mx-[8px] text-text-2">
                <path d="M0 4h18M15 1l3 3-3 3" stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p className="font-['Lato',sans-serif] font-medium text-[14px] text-text-1 leading-[1]">{watch.to}</p>
            </div>
            <p className="font-['Lato',sans-serif] text-[12px] text-text-2 leading-[1]">{watch.depart_time}</p>
          </div>
          {layovers.length > 0 && (
            <p className="font-['Lato',sans-serif] text-[10px] text-text-2/50 leading-[1] mt-[6px]">
              via {layovers.map(c => c.city).join(', ')}
              {watch.total_duration ? ` \u00b7 ${watch.total_duration}` : ''}
            </p>
          )}
        </div>

        {/* Return */}
        <div className="mt-[16px]">
          <p className="font-['Lato',sans-serif] text-[10px] text-text-2/50 leading-[1] uppercase tracking-[0.08em] mb-[8px]">Return &middot; {watch.return_date}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <p className="font-['Lato',sans-serif] font-medium text-[14px] text-text-1 leading-[1]">{watch.to}</p>
              <svg width="20" height="8" viewBox="0 0 20 8" className="mx-[8px] text-text-2">
                <path d="M0 4h18M15 1l3 3-3 3" stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p className="font-['Lato',sans-serif] font-medium text-[14px] text-text-1 leading-[1]">{watch.from}</p>
            </div>
            <p className="font-['Lato',sans-serif] text-[12px] text-text-2 leading-[1]">{watch.return_depart_time}</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-[16px] pb-[16px]">
        <p className="font-['Lato',sans-serif] text-[11px] text-text-2 leading-[1]">{stopsLabel} &middot; {watch.cabin_class} &middot; {watch.checks_today} checks</p>
        <p className={`font-['Lato',sans-serif] font-bold text-[11px] leading-[1] ${belowTarget ? 'text-green' : 'text-text-2'}`}>
          {belowTarget ? 'Below target!' : `$${diff} above target`}
        </p>
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

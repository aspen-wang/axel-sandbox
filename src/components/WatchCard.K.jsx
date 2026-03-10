'use client'

// K — Card Stack: nested sub-cards for outbound + return legs

const STATE_CONFIG = {
  watching: { text: 'text-main', bg: 'bg-main', label: 'Monitoring' },
  price_dropping: { text: 'text-green', bg: 'bg-green', label: 'Dropping' },
  deal_found: { text: 'text-green', bg: 'bg-green', label: 'Deal found' },
}

function getLayovers(watch) {
  if (!watch.layover) return []
  return Array.isArray(watch.layover) ? watch.layover : [watch.layover]
}

function LegCard({ label, from, to, time, date, subtitle }) {
  return (
    <div className="bg-bg/40 rounded-[12px] px-[14px] py-[12px]">
      <p className="font-['Lato',sans-serif] text-[10px] text-text-2/50 leading-[1] uppercase tracking-[0.08em] mb-[10px]">{label}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <p className="font-['Lato',sans-serif] font-medium text-[15px] text-text-1 leading-[1]">{from}</p>
          <svg width="20" height="8" viewBox="0 0 20 8" className="mx-[8px] text-text-2">
            <path d="M0 4h18M15 1l3 3-3 3" stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <p className="font-['Lato',sans-serif] font-medium text-[15px] text-text-1 leading-[1]">{to}</p>
        </div>
        <div className="text-right">
          <p className="font-['Lato',sans-serif] text-[12px] text-text-1 leading-[1]">{time}</p>
          <p className="font-['Lato',sans-serif] text-[11px] text-text-2/50 leading-[1] mt-[4px]">{date}</p>
        </div>
      </div>
      {subtitle && (
        <p className="font-['Lato',sans-serif] text-[10px] text-text-2/50 leading-[1] mt-[8px]">{subtitle}</p>
      )}
    </div>
  )
}

export default function WatchCardK({ watch, state = 'watching', onClick }) {
  const s = STATE_CONFIG[state] || STATE_CONFIG.watching
  const diff = watch.current_price - watch.grab_price
  const belowTarget = diff <= 0
  const layovers = getLayovers(watch)
  const stopsLabel = layovers.length === 0 ? 'Nonstop' : layovers.length === 1 ? '1 stop' : `${layovers.length} stops`
  const axelPrice = watch.axel_price
  const axelSaved = axelPrice ? watch.current_price - axelPrice : 0
  const axelPct = axelPrice ? Math.round((axelSaved / watch.current_price) * 100) : 0

  const layoverNote = layovers.length > 0
    ? layovers.map(c => `${c.duration} in ${c.city}`).join(' \u00b7 ') + (watch.total_duration ? ` \u00b7 ${watch.total_duration}` : '')
    : null

  return (
    <div className="bg-bg-2 rounded-[16px] overflow-hidden" onClick={onClick}>
      {/* Header: status + price */}
      <div className="flex items-center justify-between px-[16px] pt-[16px] pb-[12px]">
        <div className="flex items-center">
          <div className={`${s.bg} w-[6px] h-[6px] rounded-full mr-[6px] shrink-0`} />
          <p className={`font-['Lato',sans-serif] text-[11px] leading-[1] ${s.text}`}>{s.label}</p>
        </div>
        <div className="flex items-baseline">
          {axelPrice ? (
            <>
              <p className="font-['Lato',sans-serif] text-[12px] text-text-2/40 line-through leading-[1] mr-[6px]">${watch.current_price}</p>
              <p className={`font-bold text-[18px] leading-[1] ${state === 'deal_found' ? 'text-green' : 'text-text-1'}`}>${axelPrice}</p>
            </>
          ) : (
            <p className={`font-bold text-[18px] leading-[1] ${state === 'deal_found' ? 'text-green' : 'text-text-1'}`}>${watch.current_price}</p>
          )}
          <p className="font-['Lato',sans-serif] text-[11px] text-text-2 leading-[1] ml-[3px]">/pp</p>
        </div>
      </div>

      {/* Outbound sub-card */}
      <div className="px-[12px]">
        <LegCard
          label="Outbound"
          from={watch.from}
          to={watch.to}
          time={watch.depart_time}
          date={watch.depart_date}
          subtitle={layoverNote}
        />
      </div>

      {/* Return sub-card */}
      <div className="px-[12px] pt-[8px]">
        <LegCard
          label="Return"
          from={watch.to}
          to={watch.from}
          time={watch.return_depart_time}
          date={watch.return_date}
        />
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-[16px] pt-[14px]">
        <p className="font-['Lato',sans-serif] text-[11px] text-text-2 leading-[1]">{stopsLabel} &middot; {watch.cabin_class}</p>
        <p className={`font-['Lato',sans-serif] font-bold text-[11px] leading-[1] ${belowTarget ? 'text-green' : 'text-text-2'}`}>
          {belowTarget ? 'Below target!' : `$${diff} above target`}
        </p>
      </div>

      {/* Savings strip */}
      {axelPrice && axelSaved > 0 ? (
        <div className="px-[12px] pt-[10px] pb-[14px]">
          <div className="bg-green/8 rounded-[10px] px-[12px] py-[10px] flex items-center justify-between">
            <div className="flex items-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-green mr-[8px] shrink-0">
                <path d="M12 0l2.5 8.5L24 12l-9.5 3.5L12 24l-2.5-8.5L0 12l9.5-3.5z" fill="currentColor" />
              </svg>
              <p className="font-['Lato',sans-serif] text-[12px] text-text-2 leading-[1]">
                Axel price <span className="font-bold text-text-1">${axelPrice}</span>
              </p>
            </div>
            <p className="font-['Lato',sans-serif] font-bold text-[12px] text-green leading-[1]">
              Save ${axelSaved} ({axelPct}%)
            </p>
          </div>
        </div>
      ) : (
        <div className="pb-[14px]" />
      )}

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

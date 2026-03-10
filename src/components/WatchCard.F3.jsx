'use client'

// F3 — Boarding Pass + Stops + Axel Savings: full info, airy layout

const STATE_CONFIG = {
  watching: { text: 'text-main', bg: 'bg-main', label: 'Monitoring' },
  price_dropping: { text: 'text-green', bg: 'bg-green', label: 'Dropping' },
  deal_found: { text: 'text-green', bg: 'bg-green', label: 'Deal found' },
}

function getLayovers(watch) {
  if (!watch.layover) return []
  return Array.isArray(watch.layover) ? watch.layover : [watch.layover]
}

function DirectLeg({ from, to, time, date }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <p className="font-['Lato',sans-serif] font-medium text-[14px] text-text-1 leading-[1]">{from}</p>
        <svg width="20" height="8" viewBox="0 0 20 8" className="mx-[8px] text-text-2">
          <path d="M0 4h18M15 1l3 3-3 3" stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <p className="font-['Lato',sans-serif] font-medium text-[14px] text-text-1 leading-[1]">{to}</p>
      </div>
      <div className="text-right">
        <p className="font-['Lato',sans-serif] text-[12px] text-text-2 leading-[1]">{time}</p>
        <p className="font-['Lato',sans-serif] text-[11px] text-text-2/60 leading-[1] mt-[4px]">{date}</p>
      </div>
    </div>
  )
}

function ConnectingLeg({ from, connections, to, departTime, arriveTime, date, totalDuration }) {
  const points = [from, ...connections.map((c) => c.connection), to]

  return (
    <div>
      {/* Dot-line route map */}
      <div className="flex items-start">
        <div className="flex-1">
          <div className="flex items-center px-[4px]">
            {points.map((code, i) => {
              const isFirst = i === 0
              const isLast = i === points.length - 1
              const isConnection = !isFirst && !isLast
              return (
                <div key={i} className="contents">
                  {i > 0 && <div className="h-[1.5px] flex-1 bg-grey" />}
                  <div className="flex flex-col items-center shrink-0" style={{ width: 32 }}>
                    <div className={`rounded-full shrink-0 ${isConnection ? 'w-[6px] h-[6px] bg-text-2/40 mt-[1px]' : 'w-[8px] h-[8px]'} ${isFirst ? 'bg-blue' : ''} ${isLast ? 'bg-main' : ''}`} />
                    <p className={`font-['Lato',sans-serif] leading-[1] mt-[8px] ${isConnection ? 'text-[11px] text-text-2' : 'text-[12px] font-medium text-text-1'}`}>
                      {code}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Layover summary */}
          <p className="font-['Lato',sans-serif] text-[10px] text-text-2/50 leading-[1] mt-[10px]">
            {connections.map((c, i) => (
              <span key={i}>{i > 0 ? ' · ' : ''}{c.duration} in {c.city}</span>
            ))}
            {totalDuration ? <span> · {totalDuration} total</span> : null}
          </p>
        </div>

        {/* Time + date */}
        <div className="text-right ml-[16px] shrink-0">
          <p className="font-['Lato',sans-serif] text-[12px] text-text-2 leading-[1]">{departTime}</p>
          <p className="font-['Lato',sans-serif] text-[12px] text-text-2 leading-[1] mt-[6px]">{arriveTime}</p>
          <p className="font-['Lato',sans-serif] text-[11px] text-text-2/60 leading-[1] mt-[6px]">{date}</p>
        </div>
      </div>
    </div>
  )
}

export default function WatchCardF3({ watch, state = 'watching', onClick }) {
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
      {/* Status + price */}
      <div className="flex items-center justify-between px-[16px] pt-[14px] pb-[12px]">
        <div className="flex items-center">
          <div className={`${s.bg} w-[6px] h-[6px] rounded-full mr-[6px] shrink-0`} />
          <p className={`font-['Lato',sans-serif] text-[11px] leading-[1] ${s.text}`}>{s.label}</p>
          <p className="font-['Lato',sans-serif] text-[11px] text-text-2 leading-[1] ml-[6px]">· {watch.checks_today} checks</p>
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

      {/* Outbound */}
      <div className="px-[16px] pb-[4px]">
        {layovers.length > 0 ? (
          <ConnectingLeg
            from={watch.from}
            connections={layovers}
            to={watch.to}
            departTime={watch.depart_time}
            arriveTime={watch.arrive_time}
            date={watch.depart_date}
            totalDuration={watch.total_duration}
          />
        ) : (
          <DirectLeg from={watch.from} to={watch.to} time={watch.depart_time} date={watch.depart_date} />
        )}
      </div>

      {/* Tear line */}
      <div className="relative my-[12px]">
        <div className="border-t border-dashed border-text-2/20 mx-[16px]" />
        <div className="absolute left-[-6px] top-1/2 -translate-y-1/2 w-[12px] h-[12px] rounded-full bg-bg" />
        <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-[12px] h-[12px] rounded-full bg-bg" />
      </div>

      {/* Return */}
      <div className="px-[16px]">
        <DirectLeg from={watch.to} to={watch.from} time={watch.return_depart_time} date={watch.return_date} />
      </div>

      {/* Footer: route info */}
      <div className="flex items-center justify-between px-[16px] pt-[14px]">
        <p className="font-['Lato',sans-serif] text-[11px] text-text-2 leading-[1]">{stopsLabel} · {watch.cabin_class}</p>
        <p className={`font-['Lato',sans-serif] font-bold text-[11px] leading-[1] ${belowTarget ? 'text-green' : 'text-text-2'}`}>
          {belowTarget ? 'Below target!' : `$${diff} above target`}
        </p>
      </div>

      {/* Axel savings strip */}
      {axelPrice && axelSaved > 0 ? (
        <div className="px-[16px] pt-[10px] pb-[14px]">
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
        <div className="px-[16px] pb-[14px]">
          <div className="flex items-center justify-center w-full py-[10px] bg-green rounded-[10px]">
            <p className="font-medium text-[12px] text-white leading-[1]">View deal</p>
          </div>
        </div>
      )}
    </div>
  )
}

'use client'

// F1 — Boarding Pass + Stops: horizontal dot-line route map, airy layout

const STATE_CONFIG = {
  watching: { text: 'text-main', bg: 'bg-main', label: 'Monitoring' },
  price_dropping: { text: 'text-green', bg: 'bg-green', label: 'Dropping' },
  deal_found: { text: 'text-green', bg: 'bg-green', label: 'Deal found' },
}

// Normalize layover to always be an array
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

function ConnectingLeg({ from, connections, to, departTime, arriveTime, date, stops, totalDuration }) {
  // Build array of all points: [from, ...connections, to]
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

          {/* Layover summary below the map */}
          <p className="font-['Lato',sans-serif] text-[10px] text-text-2/50 leading-[1] mt-[10px]">
            {connections.map((c, i) => (
              <span key={i}>{i > 0 ? ' · ' : ''}{c.duration} in {c.city}</span>
            ))}
            {totalDuration ? <span> · {totalDuration} total</span> : null}
          </p>
        </div>

        {/* Time + date right-aligned */}
        <div className="text-right ml-[16px] shrink-0 pt-[0px]">
          <p className="font-['Lato',sans-serif] text-[12px] text-text-2 leading-[1]">{departTime}</p>
          <p className="font-['Lato',sans-serif] text-[12px] text-text-2 leading-[1] mt-[6px]">{arriveTime}</p>
          <p className="font-['Lato',sans-serif] text-[11px] text-text-2/60 leading-[1] mt-[6px]">{date}</p>
        </div>
      </div>
    </div>
  )
}

export default function WatchCardF1({ watch, state = 'watching', onClick }) {
  const s = STATE_CONFIG[state] || STATE_CONFIG.watching
  const diff = watch.current_price - watch.grab_price
  const belowTarget = diff <= 0
  const layovers = getLayovers(watch)
  const stopsLabel = layovers.length === 0 ? 'Nonstop' : layovers.length === 1 ? '1 stop' : `${layovers.length} stops`

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
          <p className={`font-bold text-[18px] leading-[1] ${state === 'deal_found' ? 'text-green' : 'text-text-1'}`}>${watch.current_price}</p>
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
            stops={watch.stops}
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

      {/* Footer */}
      <div className="flex items-center justify-between px-[16px] pt-[14px] pb-[14px]">
        <p className="font-['Lato',sans-serif] text-[11px] text-text-2 leading-[1]">{stopsLabel} · {watch.cabin_class}</p>
        <p className={`font-['Lato',sans-serif] font-bold text-[11px] leading-[1] ${belowTarget ? 'text-green' : 'text-text-2'}`}>
          {belowTarget ? 'Below target!' : `$${diff} above target`}
        </p>
      </div>

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

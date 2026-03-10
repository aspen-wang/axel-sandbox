'use client'

const STATE_CONFIG = {
  watching: {
    bg: 'bg-main/10',
    text: 'text-main',
    label: 'Monitoring',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0l2.5 8.5L24 12l-9.5 3.5L12 24l-2.5-8.5L0 12l9.5-3.5z" />
      </svg>
    ),
  },
  price_dropping: {
    bg: 'bg-green/10',
    text: 'text-green',
    label: 'Dropping',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 5v14M19 12l-7 7-7-7" />
      </svg>
    ),
  },
  deal_found: {
    bg: 'bg-green/10',
    text: 'text-green',
    label: 'Deal found!',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 6L9 17l-5-5" />
      </svg>
    ),
  },
}

function Sparkline({ data, color = 'currentColor', width = 80, height = 24 }) {
  if (!data || data.length < 2) return null
  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width
    const y = height - 2 - ((v - min) / range) * (height - 4)
    return `${x},${y}`
  }).join(' ')

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="shrink-0">
      <polyline points={points} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function WatchCardC({ watch, state = 'watching', onClick }) {
  const s = STATE_CONFIG[state] || STATE_CONFIG.watching
  const diff = watch.current_price - watch.grab_price
  const belowTarget = diff <= 0

  const sparkColor = state === 'deal_found' ? '#4FC660' : state === 'price_dropping' ? '#4FC660' : '#EF508D'

  return (
    <div className="bg-bg-2 rounded-[16px] overflow-hidden" onClick={onClick}>
      {/* Header: status + price */}
      <div className="flex items-start justify-between px-[14px] pt-[14px]">
        <div className="flex items-center">
          <span className={s.text}>{s.icon}</span>
          <p className={`font-['Lato',sans-serif] text-[12px] leading-[1.5] ml-[6px] ${s.text}`}>{s.label}</p>
        </div>
        <div className="text-right">
          <p className={`font-bold text-[22px] leading-[1] ${state === 'deal_found' ? 'text-green' : 'text-text-1'}`}>
            ${watch.current_price}
          </p>
          <p className="font-['Lato',sans-serif] text-[11px] text-text-2 leading-[1.5]">now</p>
        </div>
      </div>

      {/* Sparkline + price stats */}
      <div className="px-[14px] mt-[10px]">
        <Sparkline data={watch.price_history} color={sparkColor} width={200} height={28} />
        <div className="flex items-center mt-[6px]">
          <p className="font-['Lato',sans-serif] text-[11px] text-text-2 leading-[1]">
            Target <span className="text-green font-medium">${watch.grab_price}</span>
          </p>
          <p className="font-['Lato',sans-serif] text-[11px] text-text-2 leading-[1] ml-[10px]">
            Low <span className="text-text-1 font-medium">${watch.lowest_price}</span>
          </p>
          <p className="font-['Lato',sans-serif] text-[11px] text-text-2 leading-[1] ml-[10px]">
            {watch.checks_today} checks
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-text-2/10 mx-[14px] mt-[12px]" />

      {/* Both legs visible */}
      <div className="px-[14px] py-[10px]">
        {/* Outbound */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-[4px] h-[4px] rounded-full bg-secondary mr-[8px] shrink-0" />
            <p className="font-['Lato',sans-serif] text-[12px] text-text-1 leading-[1]">
              {watch.from} {watch.depart_time}
            </p>
            <p className="font-['Lato',sans-serif] text-[12px] text-text-2 leading-[1] mx-[6px]">&rarr;</p>
            <p className="font-['Lato',sans-serif] text-[12px] text-text-1 leading-[1]">
              {watch.to} {watch.arrive_time}
            </p>
          </div>
          <p className="font-['Lato',sans-serif] text-[11px] text-text-2 leading-[1]">{watch.depart_date}</p>
        </div>
        {/* Return */}
        <div className="flex items-center justify-between mt-[6px]">
          <div className="flex items-center">
            <div className="w-[4px] h-[4px] rounded-full bg-secondary mr-[8px] shrink-0" />
            <p className="font-['Lato',sans-serif] text-[12px] text-text-1 leading-[1]">
              {watch.to} {watch.return_depart_time}
            </p>
            <p className="font-['Lato',sans-serif] text-[12px] text-text-2 leading-[1] mx-[6px]">&rarr;</p>
            <p className="font-['Lato',sans-serif] text-[12px] text-text-1 leading-[1]">
              {watch.from} {watch.return_arrive_time}
            </p>
          </div>
          <p className="font-['Lato',sans-serif] text-[11px] text-text-2 leading-[1]">{watch.return_date}</p>
        </div>
      </div>

      {/* Bottom: stops + cabin + price diff */}
      <div className="flex items-center justify-between px-[14px] pb-[12px]">
        <p className="font-['Lato',sans-serif] text-[11px] text-text-2 leading-[1]">{watch.stops} · {watch.cabin_class}</p>
        <p className={`font-['Lato',sans-serif] font-bold text-[11px] leading-[1] ${belowTarget ? 'text-green' : 'text-text-2'}`}>
          {belowTarget ? 'Below target!' : `$${diff} above target`}
        </p>
      </div>

      {/* Deal CTA */}
      {state === 'deal_found' && (
        <div className="px-[14px] pb-[14px]">
          <div className="flex items-center justify-center w-full py-[10px] bg-green rounded-[12px]">
            <p className="font-medium text-[13px] text-white leading-[1]">View this deal</p>
          </div>
        </div>
      )}
    </div>
  )
}

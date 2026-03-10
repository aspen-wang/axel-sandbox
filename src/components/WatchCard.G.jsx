'use client'

const STATE_CONFIG = {
  watching: {
    bg: 'bg-main/10',
    border: 'border-main/20',
    text: 'text-main',
    title: 'Monitoring this route',
    subtitle: 'Axel is checking prices automatically',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0l2.5 8.5L24 12l-9.5 3.5L12 24l-2.5-8.5L0 12l9.5-3.5z" />
      </svg>
    ),
  },
  price_dropping: {
    bg: 'bg-green/10',
    border: 'border-green/20',
    text: 'text-green',
    title: 'Price is dropping!',
    subtitle: 'Getting closer to your target',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 5v14M19 12l-7 7-7-7" />
      </svg>
    ),
  },
  deal_found: {
    bg: 'bg-green/10',
    border: 'border-green/20',
    text: 'text-green',
    title: 'Deal found!',
    subtitle: 'Price dropped below your target',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 6L9 17l-5-5" />
      </svg>
    ),
  },
}

export default function WatchCardG({ watch, state = 'watching', onClick }) {
  const s = STATE_CONFIG[state] || STATE_CONFIG.watching
  const diff = watch.current_price - watch.grab_price
  const belowTarget = diff <= 0

  return (
    <div className={`${s.bg} border ${s.border} rounded-[16px] overflow-hidden`} onClick={onClick}>
      {/* Alert header — large icon + message */}
      <div className="px-[14px] pt-[14px] pb-[10px]">
        <div className="flex items-start">
          <div className={`w-[32px] h-[32px] rounded-[10px] bg-bg-2 flex items-center justify-center shrink-0 ${s.text}`}>
            {s.icon}
          </div>
          <div className="ml-[10px] flex-1">
            <p className={`font-medium text-[14px] leading-[1.2] ${s.text}`}>{s.title}</p>
            <p className="font-['Lato',sans-serif] text-[12px] text-text-2 leading-[1.4] mt-[2px]">{s.subtitle}</p>
          </div>
          <p className={`font-bold text-[20px] leading-[1] ${state === 'deal_found' ? 'text-green' : 'text-text-1'}`}>
            ${watch.current_price}
          </p>
        </div>
      </div>

      {/* Details row */}
      <div className="bg-bg-2 px-[14px] py-[10px]">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <p className="font-['Lato',sans-serif] text-[12px] text-text-1 leading-[1]">
              {watch.from} <span className="text-text-2">&rarr;</span> {watch.to}
            </p>
            <p className="font-['Lato',sans-serif] text-[11px] text-text-2 leading-[1] ml-[8px]">
              {watch.depart_date}
            </p>
          </div>
          <p className="font-['Lato',sans-serif] text-[11px] text-text-2 leading-[1]">
            {watch.stops} · {watch.cabin_class}
          </p>
        </div>
        <div className="flex items-center justify-between mt-[6px]">
          <p className="font-['Lato',sans-serif] text-[11px] text-text-2 leading-[1]">
            Target <span className="text-green font-medium">${watch.grab_price}</span>
            <span className="mx-[4px]">·</span>
            Low <span className="text-text-1 font-medium">${watch.lowest_price}</span>
            <span className="mx-[4px]">·</span>
            {watch.checks_today} checks
          </p>
          <p className={`font-['Lato',sans-serif] font-bold text-[11px] leading-[1] ${belowTarget ? 'text-green' : 'text-text-2'}`}>
            {belowTarget ? 'Below!' : `+$${diff}`}
          </p>
        </div>
      </div>

      {/* Deal CTA */}
      {state === 'deal_found' && (
        <div className="bg-bg-2 px-[14px] pb-[12px]">
          <div className="flex items-center justify-center w-full py-[9px] bg-green rounded-[10px]">
            <p className="font-medium text-[12px] text-white leading-[1]">View deal</p>
          </div>
        </div>
      )}
    </div>
  )
}

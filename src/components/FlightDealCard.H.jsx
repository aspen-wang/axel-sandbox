'use client'

// H — Route Header + Compact Rows: big route at top, both legs as compact info rows

FlightDealCardH.showLegToggle = false
export default function FlightDealCardH({ deal, mode = 'list', leg, onClick }) {
  const pctOff = Math.round((deal.saved / deal.original_price) * 100)
  const airlineCode = deal.flight_number.split(' ')[0]
  const r = deal.return || {}
  const hasReturn = !!deal.return

  if (mode === 'detail') return null

  return (
    <div className="bg-card-bg rounded-[12px] overflow-hidden" onClick={onClick}>
      {/* Route hero */}
      <div className="px-[14px] pt-[14px] pb-[10px]">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <p className="font-medium text-[18px] text-text-1 leading-[1]">{deal.from}</p>
            <div className="flex items-center mx-[8px]">
              <div className="w-[4px] h-[4px] rounded-full bg-text-2/40 shrink-0" />
              <div className="w-[20px] h-[1px] bg-text-2/30 mx-[2px]" />
              <svg width="10" height="10" viewBox="0 0 24 24" className="text-text-2" fill="currentColor">
                <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 00-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
              </svg>
              <div className="w-[20px] h-[1px] bg-text-2/30 mx-[2px]" />
              <div className="w-[4px] h-[4px] rounded-full bg-text-2/40 shrink-0" />
            </div>
            <p className="font-medium text-[18px] text-text-1 leading-[1]">{deal.to}</p>
          </div>
          <p className="font-medium text-[22px] text-green leading-[1]">${deal.price}</p>
        </div>
        <div className="flex items-center justify-between mt-[4px]">
          <p className="font-['Lato',sans-serif] text-[11px] text-text-2 leading-[1]">
            {deal.airline} · {deal.cabin_class}
          </p>
          <p className="font-['Lato',sans-serif] text-[11px] text-secondary line-through leading-[1]">${deal.original_price}</p>
        </div>
      </div>

      {/* Outbound row */}
      <div className="bg-bg-2/50 px-[14px] py-[10px]">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-[4px] h-[4px] rounded-full bg-blue mr-[8px] shrink-0" />
            <p className="font-['Lato',sans-serif] text-[12px] text-text-1 leading-[1]">
              {deal.from} {deal.depart_time}
            </p>
            <p className="font-['Lato',sans-serif] text-[12px] text-text-2 leading-[1] mx-[6px]">&rarr;</p>
            <p className="font-['Lato',sans-serif] text-[12px] text-text-1 leading-[1]">
              {deal.to} {deal.arrive_time}
            </p>
          </div>
          <p className="font-['Lato',sans-serif] text-[11px] text-text-2 leading-[1]">{deal.date}</p>
        </div>
        <p className="font-['Lato',sans-serif] text-[10px] text-text-2/60 leading-[1] mt-[4px] ml-[12px]">
          {deal.flight_number} · {deal.duration} · {deal.stops}
        </p>
      </div>

      {/* Return row */}
      {hasReturn && (
        <div className="bg-bg-2/30 px-[14px] py-[10px]">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-[4px] h-[4px] rounded-full bg-main mr-[8px] shrink-0" />
              <p className="font-['Lato',sans-serif] text-[12px] text-text-1 leading-[1]">
                {deal.to} {r.depart_time}
              </p>
              <p className="font-['Lato',sans-serif] text-[12px] text-text-2 leading-[1] mx-[6px]">&rarr;</p>
              <p className="font-['Lato',sans-serif] text-[12px] text-text-1 leading-[1]">
                {deal.from} {r.arrive_time}
              </p>
            </div>
            <p className="font-['Lato',sans-serif] text-[11px] text-text-2 leading-[1]">{r.date}</p>
          </div>
          <p className="font-['Lato',sans-serif] text-[10px] text-text-2/60 leading-[1] mt-[4px] ml-[12px]">
            {r.flight_number} · {r.duration} · {r.stops}
          </p>
        </div>
      )}

      {/* Bottom savings bar */}
      <div className="flex items-center justify-center bg-green/10 py-[8px]">
        <p className="font-['Lato',sans-serif] font-bold text-[11px] text-green leading-[1]">
          Save ${deal.saved} · {pctOff}% off vs {deal.comparison_source}
        </p>
      </div>
    </div>
  )
}

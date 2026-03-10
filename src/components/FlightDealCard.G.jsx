'use client'

// G — Continuous Timeline: vertical flow from outbound depart → arrive → return depart → arrive

FlightDealCardG.showLegToggle = false
export default function FlightDealCardG({ deal, mode = 'list', leg, onClick }) {
  const pctOff = Math.round((deal.saved / deal.original_price) * 100)
  const airlineCode = deal.flight_number.split(' ')[0]
  const r = deal.return || {}
  const hasReturn = !!deal.return

  if (mode === 'detail') return null

  // Timeline stops
  const stops = [
    { code: deal.from, time: deal.depart_time, date: deal.date, label: 'Depart', color: 'bg-blue' },
    { code: deal.to, time: deal.arrive_time, date: deal.date, label: 'Arrive', color: 'bg-main' },
  ]
  if (hasReturn) {
    stops.push(
      { code: deal.to, time: r.depart_time, date: r.date, label: 'Return', color: 'bg-blue' },
      { code: deal.from, time: r.arrive_time, date: r.date, label: 'Arrive', color: 'bg-main' },
    )
  }

  return (
    <div className="bg-card-bg rounded-[12px] overflow-hidden" onClick={onClick}>
      {/* Header */}
      <div className="flex items-center justify-between px-[14px] pt-[12px] pb-[10px]">
        <div className="flex items-center">
          <div className="w-[28px] h-[28px] rounded-full bg-bg-2 flex items-center justify-center mr-[8px] shrink-0">
            <p className="font-bold text-[10px] text-text-1 leading-[1]">{airlineCode}</p>
          </div>
          <div>
            <p className="font-['Lato',sans-serif] text-[12px] text-text-1 leading-[1]">{deal.airline}</p>
            <p className="font-['Lato',sans-serif] text-[10px] text-text-2 leading-[1] mt-[2px]">{deal.cabin_class} · {deal.fare_type}</p>
          </div>
        </div>
        <div className="bg-green/10 rounded-[12px] px-[8px] py-[2px]">
          <p className="font-medium text-[10px] text-green leading-[15px]">Save {pctOff}%</p>
        </div>
      </div>

      {/* Vertical timeline */}
      <div className="px-[14px] pb-[10px]">
        {stops.map((stop, i) => {
          const isLast = i === stops.length - 1
          const isGap = i === 1 && hasReturn // gap between arrive and return depart
          return (
            <div key={i}>
              <div className="flex items-start">
                {/* Dot + line */}
                <div className="flex flex-col items-center w-[10px] mr-[10px] shrink-0">
                  <div className={`w-[8px] h-[8px] rounded-full ${stop.color} shrink-0`} />
                  {!isLast && <div className={`w-[1px] h-[24px] ${isGap ? 'border-l border-dashed border-text-2/30' : 'bg-grey'}`} />}
                </div>
                {/* Info */}
                <div className="flex items-center justify-between flex-1 pb-[4px]">
                  <div className="flex items-baseline">
                    <p className="font-['Lato',sans-serif] font-medium text-[13px] text-text-1 leading-[1]">{stop.code}</p>
                    <p className="font-['Lato',sans-serif] text-[10px] text-text-2 leading-[1] ml-[6px]">{stop.label}</p>
                  </div>
                  <div className="flex items-center">
                    <p className="font-['Lato',sans-serif] text-[12px] text-text-1 leading-[1]">{stop.time}</p>
                    <p className="font-['Lato',sans-serif] text-[10px] text-text-2 leading-[1] ml-[6px]">{stop.date}</p>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Duration + stops info */}
      <div className="flex items-center px-[14px] pb-[8px]">
        <p className="font-['Lato',sans-serif] text-[10px] text-text-2 leading-[1]">
          {deal.duration} outbound{hasReturn ? ` · ${r.duration} return` : ''} · {deal.stops}
        </p>
      </div>

      {/* Price bar */}
      <div className="flex items-center justify-between border-t border-text-2/10 px-[14px] py-[10px]">
        <p className="font-['Lato',sans-serif] text-[11px] text-text-2 leading-[1]">
          <span className="text-secondary line-through">${deal.original_price}</span>
          <span className="ml-[4px]">{deal.comparison_source}</span>
        </p>
        <p className="font-medium text-[20px] text-green leading-[1]">${deal.price}</p>
      </div>
    </div>
  )
}

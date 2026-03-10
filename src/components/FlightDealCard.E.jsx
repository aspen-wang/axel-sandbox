'use client'

// E — Side by Side: outbound left column, return right column

function LegColumn({ label, from, to, departTime, arriveTime, date, duration, stops }) {
  return (
    <div className="flex-1">
      <p className="font-medium text-[10px] text-text-2 leading-[1] uppercase tracking-wider mb-[8px]">{label}</p>
      <div className="flex items-center mb-[4px]">
        <p className="font-['Lato',sans-serif] font-medium text-[14px] text-text-1 leading-[1]">{from}</p>
        <svg width="12" height="6" viewBox="0 0 12 6" className="mx-[4px] text-text-2">
          <path d="M0 3h10M8 1l2 2-2 2" stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <p className="font-['Lato',sans-serif] font-medium text-[14px] text-text-1 leading-[1]">{to}</p>
      </div>
      <p className="font-['Lato',sans-serif] text-[11px] text-text-2 leading-[1.4]">{departTime} &ndash; {arriveTime}</p>
      <p className="font-['Lato',sans-serif] text-[10px] text-text-2/60 leading-[1.4]">{date} · {duration}</p>
      <p className="font-['Lato',sans-serif] text-[10px] text-text-2/60 leading-[1.4]">{stops}</p>
    </div>
  )
}

FlightDealCardE.showLegToggle = false
export default function FlightDealCardE({ deal, mode = 'list', leg, onClick }) {
  const pctOff = Math.round((deal.saved / deal.original_price) * 100)
  const airlineCode = deal.flight_number.split(' ')[0]
  const r = deal.return || {}

  if (mode === 'detail') return null

  return (
    <div className="bg-card-bg rounded-[12px] overflow-hidden" onClick={onClick}>
      {/* Airline header */}
      <div className="bg-text-2/5 h-[53px] flex items-center px-[14px]">
        <div className="w-[28px] h-[28px] rounded-full bg-bg-2 flex items-center justify-center mr-[10px] shrink-0">
          <p className="font-bold text-[10px] text-text-1 leading-[15px]">{airlineCode}</p>
        </div>
        <div className="flex-1">
          <p className="font-['Lato',sans-serif] text-[12px] text-text-1 leading-[18px]">{deal.airline}</p>
          <p className="font-['Lato',sans-serif] text-[10px] text-text-2 leading-[15px]">{deal.cabin_class} · {deal.fare_type}</p>
        </div>
        <p className="font-medium text-[20px] text-green leading-[20px]">${deal.price}</p>
      </div>

      {/* Two-column legs */}
      <div className="flex px-[14px] py-[12px]">
        <LegColumn
          label="Outbound"
          from={deal.from}
          to={deal.to}
          departTime={deal.depart_time}
          arriveTime={deal.arrive_time}
          date={deal.date}
          duration={deal.duration}
          stops={deal.stops}
        />
        {/* Vertical divider */}
        <div className="w-[1px] bg-text-2/10 mx-[12px] shrink-0" />
        {deal.return ? (
          <LegColumn
            label="Return"
            from={deal.to}
            to={deal.from}
            departTime={r.depart_time}
            arriveTime={r.arrive_time}
            date={r.date}
            duration={r.duration}
            stops={r.stops}
          />
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <p className="font-['Lato',sans-serif] text-[11px] text-text-2 leading-[1]">One-way</p>
          </div>
        )}
      </div>

      {/* Bottom bar — savings */}
      <div className="flex items-center justify-between border-t border-text-2/10 px-[14px] py-[9px]">
        <p className="font-['Lato',sans-serif] text-[11px] text-text-2 leading-[1]">
          <span className="text-secondary line-through">${deal.original_price}</span>
          <span className="mx-[4px]">on {deal.comparison_source}</span>
        </p>
        <div className="bg-green/10 rounded-[12px] px-[8px] py-[2px]">
          <p className="font-medium text-[10px] text-green leading-[15px]">Save ${deal.saved} · {pctOff}%</p>
        </div>
      </div>
    </div>
  )
}

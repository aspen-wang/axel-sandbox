'use client'

// F — Boarding Pass: ticket-style with dashed tear line between outbound and return

function LegRow({ from, to, departTime, arriveTime, date, flightNum }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <div className="flex items-center">
          <p className="font-['Lato',sans-serif] font-medium text-[14px] text-text-1 leading-[1] w-[32px]">{from}</p>
          <svg width="16" height="8" viewBox="0 0 16 8" className="mx-[6px] text-text-2">
            <path d="M0 4h14M11 1l3 3-3 3" stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <p className="font-['Lato',sans-serif] font-medium text-[14px] text-text-1 leading-[1] w-[32px]">{to}</p>
        </div>
        <p className="font-['Lato',sans-serif] text-[11px] text-text-2 leading-[1] mt-[4px]">{departTime} &ndash; {arriveTime}</p>
      </div>
      <div className="text-right">
        <p className="font-['Lato',sans-serif] text-[11px] text-text-2 leading-[1]">{date}</p>
        <p className="font-['Lato',sans-serif] text-[10px] text-text-2/60 leading-[1] mt-[3px]">{flightNum}</p>
      </div>
    </div>
  )
}

FlightDealCardF.showLegToggle = false
export default function FlightDealCardF({ deal, mode = 'list', leg, onClick }) {
  const pctOff = Math.round((deal.saved / deal.original_price) * 100)
  const airlineCode = deal.flight_number.split(' ')[0]
  const r = deal.return || {}

  if (mode === 'detail') return null

  return (
    <div className="bg-card-bg rounded-[12px] overflow-hidden" onClick={onClick}>
      {/* Airline header */}
      <div className="flex items-center justify-between px-[14px] pt-[12px] pb-[10px]">
        <div className="flex items-center">
          <div className="w-[28px] h-[28px] rounded-full bg-bg-2 flex items-center justify-center mr-[8px] shrink-0">
            <p className="font-bold text-[10px] text-text-1 leading-[1]">{airlineCode}</p>
          </div>
          <div>
            <p className="font-['Lato',sans-serif] text-[12px] text-text-1 leading-[1]">{deal.airline}</p>
            <p className="font-['Lato',sans-serif] text-[10px] text-text-2 leading-[1] mt-[2px]">{deal.duration} · {deal.stops}</p>
          </div>
        </div>
        <div className="flex items-baseline">
          <p className="font-medium text-[20px] text-green leading-[1]">${deal.price}</p>
          <p className="font-['Lato',sans-serif] text-[11px] text-text-2 leading-[1] ml-[3px]">/pp</p>
        </div>
      </div>

      {/* Outbound */}
      <div className="px-[14px]">
        <LegRow
          from={deal.from}
          to={deal.to}
          departTime={deal.depart_time}
          arriveTime={deal.arrive_time}
          date={deal.date}
          flightNum={deal.flight_number}
        />
      </div>

      {/* Dashed tear line with notches */}
      {deal.return && (
        <div className="relative my-[10px]">
          <div className="border-t border-dashed border-text-2/20 mx-[14px]" />
          <div className="absolute left-[-6px] top-1/2 -translate-y-1/2 w-[12px] h-[12px] rounded-full bg-bg" />
          <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-[12px] h-[12px] rounded-full bg-bg" />
        </div>
      )}

      {/* Return */}
      {deal.return && (
        <div className="px-[14px]">
          <LegRow
            from={deal.to}
            to={deal.from}
            departTime={r.depart_time}
            arriveTime={r.arrive_time}
            date={r.date}
            flightNum={r.flight_number}
          />
        </div>
      )}

      {/* Bottom bar */}
      <div className="flex items-center justify-between border-t border-text-2/10 px-[14px] py-[9px] mt-[10px]">
        <p className="font-['Lato',sans-serif] text-[11px] text-text-2 leading-[1]">{deal.cabin_class}</p>
        <div className="bg-green/10 rounded-[12px] px-[8px] py-[2px]">
          <p className="font-medium text-[10px] text-green leading-[15px]">Save ${deal.saved} · {pctOff}%</p>
        </div>
      </div>
    </div>
  )
}

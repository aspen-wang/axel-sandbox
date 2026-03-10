'use client'

// D — Stacked Legs: both outbound + return visible with timeline dots

FlightDealCardD.showLegToggle = false
export default function FlightDealCardD({ deal, mode = 'list', leg, onClick }) {
  const pctOff = Math.round((deal.saved / deal.original_price) * 100)
  const airlineCode = deal.flight_number.split(' ')[0]
  const r = deal.return || {}

  if (mode === 'detail') {
    // Reuse same detail as A for now — the list card is the iteration focus
    return null
  }

  return (
    <div className="bg-card-bg rounded-[12px] overflow-hidden" onClick={onClick}>
      {/* Airline header */}
      <div className="bg-text-2/5 h-[53px] flex items-center px-[14px]">
        <div className="w-[28px] h-[28px] rounded-full bg-bg-2 flex items-center justify-center mr-[10px] shrink-0">
          <p className="font-bold text-[10px] text-text-1 leading-[15px]">{airlineCode}</p>
        </div>
        <div className="flex-1">
          <p className="font-['Lato',sans-serif] text-[12px] text-text-1 leading-[18px]">{deal.airline}</p>
          <p className="font-['Lato',sans-serif] text-[10px] text-text-2 leading-[15px]">{deal.flight_number}</p>
        </div>
        <div className="bg-green/10 rounded-[12px] px-[8px] py-[2px]">
          <p className="font-medium text-[10px] text-green leading-[15px]">Save ${deal.saved}</p>
        </div>
      </div>

      {/* Outbound leg */}
      <div className="px-[14px] pt-[12px]">
        <p className="font-medium text-[10px] text-text-2 leading-[1] uppercase tracking-wider mb-[8px]">Outbound · {deal.date}</p>
        <div className="flex items-start">
          <div className="flex flex-col items-center w-[6px] mr-[10px] shrink-0" style={{ height: 42 }}>
            <div className="w-[6px] h-[6px] rounded-full bg-blue shrink-0" />
            <div className="w-[1px] flex-1 bg-grey" />
            <div className="w-[6px] h-[6px] rounded-full bg-main shrink-0" />
          </div>
          <div className="flex flex-col flex-1" style={{ height: 42 }}>
            <div className="flex items-center justify-between flex-1">
              <p className="font-['Lato',sans-serif] font-medium text-[13px] text-text-1 leading-[1]">{deal.from}</p>
              <p className="font-['Lato',sans-serif] text-[11px] text-text-2 leading-[1]">{deal.depart_time}</p>
            </div>
            <div className="flex items-center justify-between flex-1">
              <p className="font-['Lato',sans-serif] font-medium text-[13px] text-text-1 leading-[1]">{deal.to}</p>
              <p className="font-['Lato',sans-serif] text-[11px] text-text-2 leading-[1]">{deal.arrive_time}</p>
            </div>
          </div>
        </div>
        <p className="font-['Lato',sans-serif] text-[10px] text-text-2 leading-[1] mt-[4px] ml-[16px]">{deal.duration} · {deal.stops}</p>
      </div>

      {/* Divider */}
      <div className="border-t border-text-2/10 mx-[14px] my-[10px]" />

      {/* Return leg */}
      {deal.return && (
        <div className="px-[14px] pb-[10px]">
          <p className="font-medium text-[10px] text-text-2 leading-[1] uppercase tracking-wider mb-[8px]">Return · {r.date}</p>
          <div className="flex items-start">
            <div className="flex flex-col items-center w-[6px] mr-[10px] shrink-0" style={{ height: 42 }}>
              <div className="w-[6px] h-[6px] rounded-full bg-blue shrink-0" />
              <div className="w-[1px] flex-1 bg-grey" />
              <div className="w-[6px] h-[6px] rounded-full bg-main shrink-0" />
            </div>
            <div className="flex flex-col flex-1" style={{ height: 42 }}>
              <div className="flex items-center justify-between flex-1">
                <p className="font-['Lato',sans-serif] font-medium text-[13px] text-text-1 leading-[1]">{deal.to}</p>
                <p className="font-['Lato',sans-serif] text-[11px] text-text-2 leading-[1]">{r.depart_time}</p>
              </div>
              <div className="flex items-center justify-between flex-1">
                <p className="font-['Lato',sans-serif] font-medium text-[13px] text-text-1 leading-[1]">{deal.from}</p>
                <p className="font-['Lato',sans-serif] text-[11px] text-text-2 leading-[1]">{r.arrive_time}</p>
              </div>
            </div>
          </div>
          <p className="font-['Lato',sans-serif] text-[10px] text-text-2 leading-[1] mt-[4px] ml-[16px]">{r.duration} · {r.stops}</p>
        </div>
      )}

      {/* Bottom bar */}
      <div className="flex items-center justify-between border-t border-text-2/10 px-[14px] py-[10px]">
        <p className="font-['Lato',sans-serif] text-[11px] text-text-2 leading-[1]">{deal.cabin_class} · {deal.stops}</p>
        <p className="font-medium text-[20px] text-green leading-[1]">${deal.price}</p>
      </div>
    </div>
  )
}

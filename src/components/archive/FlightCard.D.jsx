'use client'

// Version D: Minimal — outline card, no savings pill, muted palette
export default function FlightCard({ flight, onClick }) {
  return (
    <div
      onClick={() => onClick?.(flight)}
      className="border border-text-2/20 flex flex-col w-full px-[14px] py-[10px] rounded-[6px] cursor-pointer hover:border-text-2/40 transition bg-transparent"
    >
      {/* Single row: route + price */}
      <div className="flex items-center justify-between w-full mb-[6px]">
        <div className="flex items-center gap-[4px]">
          <p className="font-['Lato',sans-serif] font-medium text-[15px] text-text-1">{flight.from}</p>
          <span className="text-text-2 text-[13px]">&mdash;</span>
          <p className="font-['Lato',sans-serif] font-medium text-[15px] text-text-1">{flight.to}</p>
        </div>
        <p className="font-medium text-[18px] text-green leading-normal">
          ${flight.price}
        </p>
      </div>

      {/* Details row */}
      <div className="flex items-center justify-between w-full">
        <p className="font-['Lato',sans-serif] text-[11px] text-text-2 leading-normal">
          {flight.depart_time} &rarr; {flight.arrive_time} &middot; {flight.stops}
        </p>
        <p className="font-['Lato',sans-serif] text-[11px] text-text-2 leading-normal">
          {flight.airline} {flight.flight_number}
        </p>
      </div>
    </div>
  )
}

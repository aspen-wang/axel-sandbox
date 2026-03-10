'use client'

// Version C: Two-column — route block left, price+time block right
export default function FlightCard({ flight, onClick }) {
  return (
    <div
      onClick={() => onClick?.(flight)}
      className="bg-card-bg flex w-full rounded-[8px] cursor-pointer hover:brightness-110 transition overflow-hidden"
    >
      {/* Left: green accent bar + route */}
      <div className="w-[4px] bg-green shrink-0" />
      <div className="flex flex-col justify-center px-[14px] py-[12px] flex-1 min-w-0">
        <div className="flex items-center gap-[6px] mb-[4px]">
          <p className="font-['Lato',sans-serif] font-medium text-[16px] text-text-1">{flight.from}</p>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10M10 5l3 3-3 3" stroke="#4fc660" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <p className="font-['Lato',sans-serif] font-medium text-[16px] text-text-1">{flight.to}</p>
        </div>
        <p className="font-['Lato',sans-serif] text-[11px] text-text-2 leading-normal">
          {flight.airline} &middot; {flight.flight_number}
        </p>
        <p className="font-['Lato',sans-serif] text-[11px] text-text-2 leading-normal mt-[2px]">
          {flight.stops} &middot; {flight.date}
        </p>
      </div>

      {/* Right: price + times */}
      <div className="flex flex-col items-end justify-center px-[14px] py-[12px] border-l border-text-2/10">
        <p className="font-medium text-[22px] text-green leading-none mb-[4px]">
          ${flight.price}
        </p>
        <p className="font-['Lato',sans-serif] text-[11px] text-text-2 leading-normal">
          {flight.depart_time} &rarr; {flight.arrive_time}
        </p>
        <p className="font-medium text-[10px] text-green leading-normal mt-[4px]">
          Saved ${flight.saved}
        </p>
      </div>
    </div>
  )
}

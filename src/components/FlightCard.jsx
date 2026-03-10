'use client'

// Version E: Expanded — airline logo area, route visualization, separator lines
export default function FlightCard({ flight, onClick }) {
  const initials = flight.airline.split(' ').map(w => w[0]).join('')

  return (
    <div
      onClick={() => onClick?.(flight)}
      className="bg-card-bg flex flex-col w-full rounded-[12px] cursor-pointer hover:brightness-110 transition overflow-hidden"
    >
      {/* Header bar with airline */}
      <div className="flex items-center gap-[10px] px-[14px] py-[10px] bg-text-2/5">
        <div className="w-[28px] h-[28px] rounded-full bg-bg-2 flex items-center justify-center text-text-1 text-[10px] font-bold shrink-0">
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-['Lato',sans-serif] text-[12px] text-text-1 leading-normal truncate">
            {flight.airline}
          </p>
          <p className="font-['Lato',sans-serif] text-[10px] text-text-2 leading-normal">
            {flight.flight_number} &middot; {flight.confirmation}
          </p>
        </div>
        <div className="bg-green/10 px-[8px] py-[2px] rounded-[12px]">
          <p className="font-medium text-[10px] text-green leading-normal">
            Saved ${flight.saved}
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="px-[14px] py-[12px] flex flex-col gap-[10px]">
        {/* Route visualization */}
        <div className="flex items-center">
          <div className="flex flex-col items-center mr-[10px]">
            <div className="w-[6px] h-[6px] rounded-full bg-green" />
            <div className="w-px h-[20px] bg-text-2/20" />
            <div className="w-[6px] h-[6px] rounded-full bg-orange" />
          </div>
          <div className="flex flex-col gap-[8px] flex-1">
            <div className="flex items-center justify-between">
              <p className="font-['Lato',sans-serif] font-medium text-[14px] text-text-1">{flight.from}</p>
              <p className="font-['Lato',sans-serif] text-[12px] text-text-2">{flight.depart_time}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="font-['Lato',sans-serif] font-medium text-[14px] text-text-1">{flight.to}</p>
              <p className="font-['Lato',sans-serif] text-[12px] text-text-2">{flight.arrive_time}</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-[8px] border-t border-text-2/10">
          <div className="flex items-center gap-[8px] font-['Lato',sans-serif] text-[11px] text-text-2">
            <span>{flight.stops}</span>
            <span>&middot;</span>
            <span>{flight.date}</span>
          </div>
          <p className="font-bold text-[20px] text-green leading-none">
            ${flight.price}
          </p>
        </div>
      </div>
    </div>
  )
}

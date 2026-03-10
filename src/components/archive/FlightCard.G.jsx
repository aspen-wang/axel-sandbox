'use client'

export default function FlightCard({ flight, onClick }) {
  return (
    <div
      onClick={() => onClick?.(flight)}
      className="bg-card-bg flex flex-col w-full px-[16px] py-[12px] rounded-[8px] cursor-pointer hover:brightness-110 transition"
    >
      {/* Airline + Confirmation */}
      <div className="flex items-center justify-between w-full mb-[8px]">
        <p className="font-['Lato',sans-serif] text-[13px] text-text-1 leading-normal">
          {flight.airline} <span className="text-text-2">{flight.flight_number}</span>
        </p>
        <p className="font-['Lato',sans-serif] text-[11px] text-text-2 leading-normal">
          {flight.confirmation}
        </p>
      </div>

      {/* Route + Stops */}
      <div className="flex items-center justify-between w-full mb-[8px]">
        <div className="flex items-center">
          <p className="font-['Lato',sans-serif] font-medium text-[15px] text-text-1 leading-normal mr-[8px]">
            {flight.from}
          </p>
          <svg className="mr-[8px]" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10M10 5l3 3-3 3" stroke="#989898" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <p className="font-['Lato',sans-serif] font-medium text-[15px] text-text-1 leading-normal">
            {flight.to}
          </p>
        </div>
        <p className="font-['Lato',sans-serif] text-[12px] text-text-2 leading-normal">
          {flight.stops}
        </p>
      </div>

      {/* Times + Date */}
      <div className="flex items-center justify-between w-full mb-[8px]">
        <div className="flex items-center">
          <p className="font-['Lato',sans-serif] text-[13px] text-text-1 leading-normal mr-[8px]">
            {flight.depart_time}
          </p>
          <span className="font-['Lato',sans-serif] text-[13px] text-text-2 leading-normal mr-[8px]">&rarr;</span>
          <p className="font-['Lato',sans-serif] text-[13px] text-text-1 leading-normal">
            {flight.arrive_time}
          </p>
        </div>
        <p className="font-['Lato',sans-serif] text-[12px] text-text-2 leading-normal">
          {flight.date}
        </p>
      </div>

      {/* Price + Savings */}
      <div className="flex items-center justify-between w-full">
        <p className="font-medium text-[20px] text-green leading-normal">
          ${flight.price}
        </p>
        <div className="bg-green/10 flex items-center px-[10px] py-[3px] rounded-[20px]">
          <p className="font-medium text-[12px] text-green leading-normal">
            Axel saved ${flight.saved}
          </p>
        </div>
      </div>
    </div>
  )
}

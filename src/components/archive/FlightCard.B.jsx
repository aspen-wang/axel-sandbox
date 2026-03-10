'use client'

// Version B: Price-first — big price at top, compact details below
export default function FlightCard({ flight, onClick }) {
  return (
    <div
      onClick={() => onClick?.(flight)}
      className="bg-card-bg flex flex-col w-full px-[16px] py-[14px] rounded-[12px] cursor-pointer hover:brightness-110 transition"
    >
      {/* Price + Savings — hero row */}
      <div className="flex items-end justify-between w-full mb-[12px]">
        <p className="font-bold text-[28px] text-green leading-none">
          ${flight.price}
        </p>
        <div className="bg-green/10 flex items-center px-[10px] py-[4px] rounded-[20px]">
          <p className="font-medium text-[11px] text-green leading-normal">
            -{Math.round((flight.saved / (flight.price + flight.saved)) * 100)}%
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-text-2/10 mb-[10px]" />

      {/* Route row */}
      <div className="flex items-center gap-[6px] mb-[6px]">
        <p className="font-['Lato',sans-serif] font-medium text-[14px] text-text-1 leading-normal">
          {flight.from}
        </p>
        <svg width="20" height="8" viewBox="0 0 20 8" fill="none">
          <line x1="0" y1="4" x2="16" y2="4" stroke="#989898" strokeWidth="1" strokeDasharray="2 2" />
          <path d="M14 1l3 3-3 3" stroke="#989898" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
        <p className="font-['Lato',sans-serif] font-medium text-[14px] text-text-1 leading-normal">
          {flight.to}
        </p>
        <span className="text-text-2 text-[11px] ml-auto">{flight.stops}</span>
      </div>

      {/* Compact details row */}
      <div className="flex items-center gap-[12px] text-text-2 font-['Lato',sans-serif] text-[11px] leading-normal">
        <span>{flight.airline}</span>
        <span>{flight.depart_time} &rarr; {flight.arrive_time}</span>
        <span>{flight.date}</span>
      </div>
    </div>
  )
}

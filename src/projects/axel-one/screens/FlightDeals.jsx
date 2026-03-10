'use client'

import statusIcons from '@/assets/status-icons.svg'
import { getFlights } from '@/lib/data'

const flights = getFlights()

export default function FlightDeals({ onNext, onSelectFlight }) {
  return (
    <div className="bg-bg overflow-clip relative rounded-[30px] w-[393px] h-[852px] font-['Inter',sans-serif]">
      {/* System Status Bar */}
      <div className="absolute top-0 left-0 right-0 flex h-[59px] items-center justify-between overflow-clip px-[28px] py-[15px]">
        <p className="font-['SF_Pro_Text',sans-serif] font-bold text-[15px] text-text-1 text-center tracking-[-0.045px] leading-[18px] w-[54px] h-[18px] shrink-0">
          9:41
        </p>
        <div className="relative shrink-0 w-[66.16px] h-[11px]">
          <img alt="" className="block max-w-none w-full h-full" src={statusIcons.src || statusIcons} />
        </div>
      </div>

      {/* Content Container — matches Importing: left-24, top-107, w-345, gap-16 */}
      <div className="absolute left-[24px] top-[107px] w-[345px] flex flex-col">
        {/* Header — gap-4 between lines, px-2, mb-16 to next section */}
        <div className="flex flex-col w-full font-medium text-[20px] leading-normal px-[2px] mb-[16px]">
          <p className="text-green mb-[4px]">
            Congrats
          </p>
          <p className="text-text-1">
            Axel found {flights.length} flights under $400
          </p>
        </div>

        {/* Flight Deal Cards — mb-16 between each card (matches main gap-16) */}
        {flights.map((flight, i) => (
          <div
            key={flight.id}
            onClick={() => onSelectFlight?.(flight)}
            className={`bg-card-bg flex flex-col w-full px-[16px] py-[12px] rounded-[8px] cursor-pointer hover:brightness-110 transition${i < flights.length - 1 ? ' mb-[16px]' : ''}`}
          >
            {/* Airline + Confirmation — gap-8 to next row */}
            <div className="flex items-center justify-between w-full mb-[8px]">
              <p className="font-['Lato',sans-serif] text-[13px] text-text-1 leading-normal">
                {flight.airline} <span className="text-text-2">{flight.flight_number}</span>
              </p>
              <p className="font-['Lato',sans-serif] text-[11px] text-text-2 leading-normal">
                {flight.confirmation}
              </p>
            </div>

            {/* Route + Stops — gap-8 to next row */}
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

            {/* Times + Date — gap-8 to next row */}
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

            {/* Price + Savings — last row, no mb */}
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
        ))}
      </div>

      {/* CTA Button — matches Importing: absolute, top-711, px-8, py-14, rounded-30 */}
      <div onClick={onNext} className="absolute left-1/2 -translate-x-1/2 top-[711px] w-[345px] bg-bg-2 flex items-center justify-center px-[8px] py-[14px] rounded-[30px] cursor-pointer hover:brightness-110 transition">
        <p className="font-normal text-[14px] text-text-1 text-center leading-normal">
          Select a flight
        </p>
      </div>
    </div>
  )
}

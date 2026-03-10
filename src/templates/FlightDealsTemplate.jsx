'use client'

import statusIcons from '@/assets/status-icons.svg'
import { getFlights } from '@/lib/data'
import FlightCard from '@/components/FlightCard'

const flights = getFlights()

export default function FlightDealsTemplate({ FlightCardComponent = FlightCard, onNext, onSelectFlight }) {
  const Card = FlightCardComponent
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

      {/* Content Container */}
      <div className="absolute left-[24px] top-[107px] w-[345px] flex flex-col">
        {/* Header */}
        <div className="flex flex-col w-full font-medium text-[20px] leading-normal px-[2px] mb-[16px]">
          <p className="text-green mb-[4px]">
            Congrats
          </p>
          <p className="text-text-1">
            Axel found {flights.length} flights under $400
          </p>
        </div>

        {/* Flight Deal Cards — swappable component */}
        {flights.map((flight, i) => (
          <div key={flight.id} className={i < flights.length - 1 ? 'mb-[16px]' : ''}>
            <Card flight={flight} onClick={() => onSelectFlight?.(flight)} />
          </div>
        ))}
      </div>

      {/* CTA Button */}
      <div onClick={onNext} className="absolute left-1/2 -translate-x-1/2 top-[711px] w-[345px] bg-bg-2 flex items-center justify-center px-[8px] py-[14px] rounded-[30px] cursor-pointer hover:brightness-110 transition">
        <p className="font-normal text-[14px] text-text-1 text-center leading-normal">
          Select a flight
        </p>
      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'
import statusIcons from '@/assets/status-icons.svg'
import { getFlightDeals } from '@/lib/data'
import FlightDealCard from '@/components/FlightDealCard'
import FlightResultsList from '@/components/FlightResultsList'

const deals = getFlightDeals()

export default function DealsListTemplate({
  FlightDealCardComponent = FlightDealCard,
  FlightResultsListComponent,
}) {
  const Card = FlightDealCardComponent
  const List = FlightResultsListComponent
  const [activeLeg, setActiveLeg] = useState('depart')
  const showToggle = Card.showLegToggle !== false

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
        <div className="flex flex-col w-full px-[2px] mb-[16px]">
          <p className="font-medium text-[20px] text-text-1 leading-[30px]">
            Congrats
          </p>
          <p className="font-normal text-[14px] text-text-2 leading-[30px]">
            Axel found {deals.length} flights under $400
          </p>
        </div>

        {/* Depart / Return Toggle */}
        {showToggle && (
          <div className="flex items-center bg-bg-2 rounded-[30px] p-[4px] mb-[16px]">
            <button
              onClick={() => setActiveLeg('depart')}
              className={`flex-1 py-[8px] rounded-[26px] text-center text-[14px] font-medium leading-[21px] transition-colors ${
                activeLeg === 'depart'
                  ? 'bg-card-bg text-text-1'
                  : 'text-text-2'
              }`}
            >
              Depart
            </button>
            <button
              onClick={() => setActiveLeg('return')}
              className={`flex-1 py-[8px] rounded-[26px] text-center text-[14px] font-medium leading-[21px] transition-colors ${
                activeLeg === 'return'
                  ? 'bg-card-bg text-text-1'
                  : 'text-text-2'
              }`}
            >
              Return
            </button>
          </div>
        )}

        {/* Content — list component or default card rendering */}
        {List ? (
          <List FlightResultCardComponent={Card} deals={deals} leg={activeLeg} />
        ) : (
          deals.map((deal, i) => (
            <div key={deal.id} className={i < deals.length - 1 ? 'mb-[16px]' : ''}>
              <Card deal={deal} leg={activeLeg} />
            </div>
          ))
        )}
      </div>
    </div>
  )
}

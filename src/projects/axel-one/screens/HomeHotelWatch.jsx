'use client'

import { useState } from 'react'
import statusIcons from '@/assets/status-icons.svg'
import { getHotelWatches } from '@/lib/data'
import HotelWatchCard from '@/components/HotelWatchCard'

const watches = getHotelWatches()

export default function HomeHotelWatch({ onNext, onTapWatch }) {
  const [tab, setTab] = useState('hotels')

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

      {/* Header: Hotels / Flights tabs + Add button */}
      <div className="absolute left-[24px] top-[72px] right-[24px] flex items-center">
        <div className="flex items-baseline">
          <button
            onClick={() => setTab('hotels')}
            className={`font-medium leading-normal transition ${
              tab === 'hotels'
                ? 'text-[20px] text-text-1'
                : 'text-[16px] text-text-2'
            }`}
          >
            Hotels
          </button>
          <button
            onClick={() => setTab('flights')}
            className={`ml-[12px] font-medium leading-normal transition ${
              tab === 'flights'
                ? 'text-[20px] text-text-1'
                : 'text-[16px] text-text-2'
            }`}
          >
            Flights
          </button>
        </div>
        <div className="ml-auto">
          <button className="w-[28px] h-[28px] rounded-full border border-text-2/30 flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 2v10M2 7h10" stroke="#989898" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* Watch Cards - Scrollable area */}
      <div className="absolute left-0 top-[116px] w-full bottom-[90px] overflow-y-auto px-[24px]">
        {tab === 'hotels' && watches.map((watch, i) => (
          <div
            key={watch.id}
            onClick={() => onTapWatch ? onTapWatch(watch) : onNext?.()}
            className={`cursor-pointer${i < watches.length - 1 ? ' mb-[12px]' : ''}`}
          >
            <HotelWatchCard watch={watch} state={watch.status} />
          </div>
        ))}

        {tab === 'flights' && (
          <div className="flex flex-col items-center justify-center py-[40px]">
            <p className="text-text-2 text-[14px]">No flight watches</p>
            <p className="text-text-2/50 text-[12px] mt-[4px]">Switch to hotels to see your watches</p>
          </div>
        )}
      </div>

      {/* Bottom Navigation — pill-shaped bar */}
      <div className="absolute bottom-[24px] left-1/2 -translate-x-1/2">
        <div className="flex items-center bg-card-bg border border-grey/30 rounded-[64px] px-[32px] py-[12px]">
          <button className="flex items-center justify-center mx-[16px]">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M3 8.5l8-6 8 6V19a1 1 0 01-1 1H4a1 1 0 01-1-1V8.5z" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
          </button>
          <button className="flex items-center justify-center mx-[16px]">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <circle cx="11" cy="11" r="3" stroke="#989898" strokeWidth="1.5" fill="none" />
              <path d="M11 1.5v2M11 18.5v2M1.5 11h2M18.5 11h2M4.3 4.3l1.4 1.4M16.3 16.3l1.4 1.4M4.3 17.7l1.4-1.4M16.3 5.7l1.4-1.4" stroke="#989898" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

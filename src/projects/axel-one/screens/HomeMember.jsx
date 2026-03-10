'use client'

import { useState } from 'react'
import statusIcons from '@/assets/status-icons.svg'
import { getWatches } from '@/lib/data'

const watches = getWatches()

export default function HomeMember({ onNext, onTapWatch }) {
  const [tab, setTab] = useState('watches')

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

      {/* Header: Watch / Bookings tabs + Add button */}
      <div className="absolute left-[24px] top-[72px] right-[24px] flex items-center">
        <div className="flex items-baseline">
          <button
            onClick={() => setTab('watches')}
            className={`font-medium leading-normal transition ${
              tab === 'watches'
                ? 'text-[20px] text-text-1'
                : 'text-[16px] text-text-2'
            }`}
          >
            Watch
          </button>
          <button
            onClick={() => setTab('bookings')}
            className={`ml-[12px] font-medium leading-normal transition ${
              tab === 'bookings'
                ? 'text-[20px] text-text-1'
                : 'text-[16px] text-text-2'
            }`}
          >
            Bookings
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
        {tab === 'watches' && watches.map((watch, i) => (
          <div
            key={watch.id}
            onClick={() => onTapWatch ? onTapWatch(watch) : onNext?.()}
            className={`bg-bg-2 flex flex-col w-full rounded-[16px] cursor-pointer hover:brightness-110 transition${i < watches.length - 1 ? ' mb-[16px]' : ''}`}
          >
            {/* Price bar */}
            <div className="mx-[12px] mt-[12px] bg-bg rounded-[12px] flex items-center justify-between px-[14px] py-[8px]">
              <p className="text-[13px] leading-normal">
                <span className="text-text-2 font-normal">Now </span>
                <span className="text-green font-medium">${watch.current_price}</span>
              </p>
              <p className="text-[13px] leading-normal">
                <span className="text-text-2 font-normal">Grab at </span>
                <span className="text-green font-medium">${watch.grab_price}</span>
              </p>
            </div>

            {/* Route */}
            <div className="flex items-start justify-between px-[16px] mt-[14px]">
              <div className="flex flex-col">
                <p className="font-['Lato',sans-serif] font-bold text-[20px] text-text-1 leading-normal">
                  {watch.from}
                </p>
                <p className="font-['Lato',sans-serif] text-[12px] text-text-2 leading-normal mt-[2px]">
                  {watch.from_city}
                </p>
              </div>
              <div className="flex flex-col items-end">
                <p className="font-['Lato',sans-serif] font-bold text-[20px] text-text-1 leading-normal">
                  {watch.to}
                </p>
                <p className="font-['Lato',sans-serif] text-[12px] text-text-2 leading-normal mt-[2px]">
                  {watch.to_city}
                </p>
              </div>
            </div>

            {/* Airline pills */}
            {watch.airlines && watch.airlines.length > 0 && (
              <div className="flex items-center px-[16px] mt-[12px] pb-[14px]">
                {watch.airlines.map((airline) => (
                  <span
                    key={airline}
                    className="bg-white/[0.03] text-text-2 text-[12px] leading-normal px-[10px] py-[4px] rounded-[20px] mr-[8px] last:mr-0"
                  >
                    {airline}
                  </span>
                ))}
              </div>
            )}

            {/* No pills spacer */}
            {(!watch.airlines || watch.airlines.length === 0) && (
              <div className="pb-[14px]" />
            )}
          </div>
        ))}

        {tab === 'bookings' && (
          <div className="flex flex-col items-center justify-center py-[40px]">
            <p className="text-text-2 text-[14px]">No bookings yet</p>
            <p className="text-text-2/50 text-[12px] mt-[4px]">Your confirmed flights will appear here</p>
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

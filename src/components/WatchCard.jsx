'use client'

import { useState } from 'react'

const STATE_CONFIG = {
  watching: {
    bg: 'bg-main/10',
    text: 'text-main',
    message: 'Axel is monitoring this route',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0l2.5 8.5L24 12l-9.5 3.5L12 24l-2.5-8.5L0 12l9.5-3.5z" />
      </svg>
    ),
  },
  price_dropping: {
    bg: 'bg-green/10',
    text: 'text-green',
    message: 'Price is dropping! Getting closer',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 5v14M19 12l-7 7-7-7" />
      </svg>
    ),
  },
  deal_found: {
    bg: 'bg-green/10',
    text: 'text-green',
    message: 'Deal found! Price below target',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 6L9 17l-5-5" />
      </svg>
    ),
  },
}

export default function WatchCard({ watch, state = 'watching', onClick }) {
  const [leg, setLeg] = useState('outbound')
  const s = STATE_CONFIG[state] || STATE_CONFIG.watching

  const diff = watch.current_price - watch.grab_price
  const belowTarget = diff <= 0

  const isReturn = leg === 'return'
  const legFrom = isReturn ? watch.to : watch.from
  const legTo = isReturn ? watch.from : watch.to
  const legDepart = isReturn ? watch.return_depart_time : watch.depart_time
  const legArrive = isReturn ? watch.return_arrive_time : watch.arrive_time
  const legDate = isReturn ? watch.return_date : watch.depart_date

  return (
    <div className="bg-bg-2 rounded-[16px] overflow-hidden" onClick={onClick}>
      {/* Status message */}
      <div className={`${s.bg} flex items-center px-[14px] py-[10px]`}>
        <span className={s.text}>{s.icon}</span>
        <p className={`font-['Lato',sans-serif] text-[12px] leading-[1.5] ml-[8px] ${s.text}`}>
          {s.message}
          {!belowTarget && state === 'watching' && (
            <span className="text-text-2"> · Target ${watch.grab_price}</span>
          )}
        </p>
      </div>

      {/* Outbound / Return toggle */}
      <div className="px-[14px] pt-[12px]">
        <div className="flex items-center bg-bg rounded-[20px] p-[3px]">
          <button
            onClick={(e) => { e.stopPropagation(); setLeg('outbound') }}
            className={`flex-1 py-[6px] rounded-[17px] text-center text-[12px] font-medium leading-[1] transition-colors ${
              leg === 'outbound' ? 'bg-card-bg text-text-1' : 'text-text-2'
            }`}
          >
            Outbound
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); setLeg('return') }}
            className={`flex-1 py-[6px] rounded-[17px] text-center text-[12px] font-medium leading-[1] transition-colors ${
              leg === 'return' ? 'bg-card-bg text-text-1' : 'text-text-2'
            }`}
          >
            Return
          </button>
        </div>
      </div>

      {/* Route timeline */}
      <div className="px-[14px] py-[12px]">
        <div className="flex items-start">
          {/* Timeline dots */}
          <div className="flex flex-col items-center w-[6px] mr-[10px] shrink-0" style={{ height: 50 }}>
            <div className="w-[6px] h-[6px] rounded-full bg-secondary shrink-0" />
            <div className="w-[1px] flex-1 bg-grey" />
            <div className="w-[6px] h-[6px] rounded-full bg-secondary shrink-0" />
          </div>
          {/* Route info */}
          <div className="flex flex-col flex-1" style={{ height: 50 }}>
            <div className="flex items-center justify-between flex-1">
              <p className="font-['Lato',sans-serif] font-medium text-[14px] text-text-1 leading-[1]">{legFrom}</p>
              <p className="font-['Lato',sans-serif] text-[12px] text-text-2 leading-[1]">{legDepart} · {legDate}</p>
            </div>
            <div className="flex items-center justify-between flex-1">
              <p className="font-['Lato',sans-serif] font-medium text-[14px] text-text-1 leading-[1]">{legTo}</p>
              <p className="font-['Lato',sans-serif] text-[12px] text-text-2 leading-[1]">{legArrive}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-text-2/10 mx-[14px]" />

      {/* Bottom row */}
      <div className="flex items-end justify-between px-[14px] py-[10px]">
        <div>
          <p className="font-['Lato',sans-serif] text-[12px] text-text-2 leading-[1.5]">{watch.stops} · {watch.cabin_class}</p>
          <p className={`font-['Lato',sans-serif] text-[11px] leading-[1.5] mt-[1px] ${belowTarget ? 'text-green font-bold' : 'text-text-2'}`}>
            {belowTarget ? 'Below target!' : `$${diff} above target`}
          </p>
        </div>
        <p className={`font-bold text-[20px] leading-[1] ${state === 'deal_found' ? 'text-green' : 'text-text-1'}`}>
          ${watch.current_price}
        </p>
      </div>

      {/* Deal CTA */}
      {state === 'deal_found' && (
        <div className="px-[14px] pb-[14px]">
          <div className="flex items-center justify-center w-full py-[10px] bg-green rounded-[12px]">
            <p className="font-medium text-[13px] text-white leading-[1]">View this deal</p>
          </div>
        </div>
      )}
    </div>
  )
}

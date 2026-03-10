'use client'

export default function ConfirmedFlightCard({ flight }) {
  return (
    <div className="bg-[#242424] rounded-[10px] px-[12px] py-[10px] max-w-[260px]">
      <div className="flex items-center justify-between mb-[4px]">
        <p className="font-medium text-[13px] text-text-1">{flight.airline}</p>
        <div className="flex items-center gap-[4px]">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#4fc660" /><path d="M8 12l3 3 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          <p className="text-[11px] text-green font-medium">Confirmed</p>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <p className="font-['Lato',sans-serif] text-[12px] text-text-1">{flight.from} &rarr; {flight.to}</p>
        <p className="font-['Lato',sans-serif] text-[11px] text-[#989898]">{flight.departTime} &rarr; {flight.arriveTime}</p>
      </div>
      <div className="flex items-center justify-between mt-[2px]">
        <p className="font-['Lato',sans-serif] text-[11px] text-[#989898]">{flight.date} &middot; {flight.duration}</p>
        <p className="font-medium text-[13px] text-text-1">${flight.price}</p>
      </div>
    </div>
  )
}

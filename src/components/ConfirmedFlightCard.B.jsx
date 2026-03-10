'use client'

export default function ConfirmedFlightCard({ flight }) {
  return (
    <div className="bg-[#242424] rounded-[12px] px-[14px] py-[12px] max-w-[260px] border border-green/20">
      {/* Boarding-pass style top strip */}
      <div className="flex items-center gap-[6px] mb-[8px]">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M2 14l7-2 3-9 3 9 7 2-7 2-3 9-3-9-7-2z" fill="#4fc660" /></svg>
        <p className="text-[10px] font-medium text-green tracking-[1.5px] uppercase">Boarding Pass</p>
      </div>
      <p className="font-bold text-[14px] text-text-1 mb-[6px]">{flight.airline}</p>
      {/* Route — large codes */}
      <div className="flex items-center gap-[8px] mb-[6px]">
        <p className="font-bold text-[18px] text-text-1">{flight.from}</p>
        <div className="flex-1 flex items-center">
          <div className="flex-1 h-[1px] bg-[#474747]" />
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="mx-[4px] shrink-0"><path d="M5 12h14m-4-4l4 4-4 4" stroke="#989898" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          <div className="flex-1 h-[1px] bg-[#474747]" />
        </div>
        <p className="font-bold text-[18px] text-text-1">{flight.to}</p>
      </div>
      {/* Details row */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] text-[#989898] uppercase tracking-[0.5px]">Depart</p>
          <p className="font-['Lato',sans-serif] text-[12px] text-text-1 font-medium">{flight.departTime}</p>
        </div>
        <div>
          <p className="text-[10px] text-[#989898] uppercase tracking-[0.5px]">Arrive</p>
          <p className="font-['Lato',sans-serif] text-[12px] text-text-1 font-medium">{flight.arriveTime}</p>
        </div>
        <div>
          <p className="text-[10px] text-[#989898] uppercase tracking-[0.5px]">Duration</p>
          <p className="font-['Lato',sans-serif] text-[12px] text-text-1 font-medium">{flight.duration}</p>
        </div>
      </div>
      {/* Dashed divider */}
      <div className="border-t border-dashed border-[#474747] my-[8px]" />
      <div className="flex items-center justify-between">
        <p className="font-['Lato',sans-serif] text-[11px] text-[#989898]">{flight.date}</p>
        <p className="font-bold text-[15px] text-green">${flight.price}</p>
      </div>
    </div>
  )
}

'use client'

export default function ConfirmedFlightCard({ flight }) {
  return (
    <div className="bg-[#242424] rounded-[10px] px-[12px] py-[10px] max-w-[260px]">
      {/* Timeline-style layout */}
      <div className="flex items-center justify-between mb-[8px]">
        <p className="font-medium text-[13px] text-text-1">{flight.airline}</p>
        <p className="font-bold text-[14px] text-text-1">${flight.price}</p>
      </div>
      {/* Vertical timeline */}
      <div className="flex gap-[8px]">
        <div className="flex flex-col items-center">
          <div className="w-[8px] h-[8px] rounded-full bg-green" />
          <div className="flex-1 w-[1px] bg-[#474747] my-[2px]" />
          <div className="w-[8px] h-[8px] rounded-full border-2 border-green bg-transparent" />
        </div>
        <div className="flex-1 flex flex-col justify-between py-[0px]">
          <div className="flex items-center justify-between">
            <p className="font-['Lato',sans-serif] text-[12px] text-text-1 font-medium">{flight.departTime}</p>
            <p className="font-['Lato',sans-serif] text-[12px] text-text-1">{flight.from}</p>
          </div>
          <p className="font-['Lato',sans-serif] text-[10px] text-[#989898] ml-[0px] my-[2px]">{flight.duration} &middot; Nonstop</p>
          <div className="flex items-center justify-between">
            <p className="font-['Lato',sans-serif] text-[12px] text-text-1 font-medium">{flight.arriveTime}</p>
            <p className="font-['Lato',sans-serif] text-[12px] text-text-1">{flight.to}</p>
          </div>
        </div>
      </div>
      {/* Footer */}
      <div className="flex items-center justify-between mt-[6px]">
        <p className="font-['Lato',sans-serif] text-[11px] text-[#989898]">{flight.date}</p>
        <div className="bg-green/10 px-[6px] py-[2px] rounded-full">
          <p className="text-[10px] font-medium text-green">Confirmed</p>
        </div>
      </div>
    </div>
  )
}

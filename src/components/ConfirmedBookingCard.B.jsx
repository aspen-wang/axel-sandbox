'use client'

export default function ConfirmedBookingCard({ type, title, details }) {
  return (
    <div className="bg-[#242424] rounded-[10px] px-[12px] py-[10px] border-l-[3px] border-green">
      <div className="flex items-center justify-between mb-[4px]">
        <p className="text-[10px] font-medium text-[#989898] tracking-[1px] uppercase">{type === 'flight' ? 'Flight' : 'Hotel'}</p>
        <div className="bg-green/10 px-[6px] py-[2px] rounded-full">
          <p className="text-[10px] font-medium text-green">Confirmed</p>
        </div>
      </div>
      <p className="font-bold text-[13px] text-text-1 leading-normal mb-[2px]">{title}</p>
      <p className="text-[11px] text-text-2 leading-normal">{details}</p>
    </div>
  )
}

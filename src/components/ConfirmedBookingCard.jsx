'use client'

export default function ConfirmedBookingCard({ type, title, details }) {
  return (
    <div className="bg-[#242424] rounded-[10px] px-[12px] py-[10px]">
      <div className="flex items-center mb-[4px]">
        <svg width="12" height="12" viewBox="0 0 16 16" fill="none" className="mr-[4px] shrink-0"><path d="M3 8l3 3 7-7" stroke="#4fc660" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        <p className="text-[11px] text-green font-medium">{type === 'flight' ? 'Flight' : 'Hotel'} Confirmed</p>
      </div>
      <p className="font-bold text-[13px] text-text-1 leading-normal">{title}</p>
      <p className="text-[11px] text-text-2 leading-normal">{details}</p>
    </div>
  )
}

'use client'

export default function ConfirmedBookingCard({ type, title, details }) {
  const icon = type === 'flight' ? (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 00-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" fill="#989898" /></svg>
  ) : (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6" stroke="#989898" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
  )

  return (
    <div className="bg-[#242424] rounded-[10px] px-[12px] py-[10px]">
      <div className="flex items-start gap-[10px]">
        <div className="w-[32px] h-[32px] rounded-[8px] bg-green/10 flex items-center justify-center shrink-0 mt-[2px]">
          {icon}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-[4px] mb-[2px]">
            <svg width="10" height="10" viewBox="0 0 16 16" fill="none"><path d="M3 8l3 3 7-7" stroke="#4fc660" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            <p className="text-[10px] text-green font-medium">{type === 'flight' ? 'Flight' : 'Hotel'} Confirmed</p>
          </div>
          <p className="font-bold text-[13px] text-text-1 leading-normal">{title}</p>
          <p className="text-[11px] text-text-2 leading-normal mt-[1px]">{details}</p>
        </div>
      </div>
    </div>
  )
}

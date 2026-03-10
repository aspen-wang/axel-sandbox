'use client'

export default function SavedPaymentCard({ last4, brand, selected }) {
  return (
    <div className={`bg-[#242424] rounded-[10px] px-[12px] py-[10px] ${selected ? 'border border-green/40' : ''}`}>
      <div className="flex items-center gap-[10px]">
        {/* Chip icon */}
        <div className="w-[36px] h-[24px] rounded-[4px] bg-gradient-to-br from-[#474747] to-[#333] flex items-center justify-center">
          <div className="w-[10px] h-[8px] rounded-[1px] border border-[#989898]" />
        </div>
        <div className="flex-1">
          <p className="text-[13px] text-text-1 font-medium leading-normal">{brand} &bull;&bull;&bull;&bull; {last4}</p>
          <p className="text-[10px] text-[#989898] leading-normal">Credit Card</p>
        </div>
        {selected && (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#4fc660" /><path d="M8 12l3 3 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        )}
      </div>
    </div>
  )
}

'use client'

export default function SavedPaymentCard({ last4, brand, selected }) {
  return (
    <div className={`rounded-[10px] overflow-hidden ${selected ? 'ring-1 ring-green/40' : ''}`}>
      {/* Card with gradient top accent */}
      <div className="h-[3px] bg-gradient-to-r from-blue to-main" />
      <div className="bg-[#242424] px-[12px] py-[10px] flex items-center">
        <svg width="24" height="18" viewBox="0 0 24 18" fill="none" className="mr-[10px] shrink-0">
          <rect x="0.5" y="0.5" width="23" height="17" rx="2.5" stroke="#989898" />
          <rect x="0" y="4" width="24" height="4" fill="#474747" />
          <rect x="3" y="11" width="8" height="2" rx="1" fill="#474747" />
        </svg>
        <div className="flex-1">
          <p className="text-[12px] text-text-1 leading-normal tracking-[2px]">&bull;&bull;&bull;&bull; {last4}</p>
        </div>
        <div className="flex items-center gap-[6px]">
          <p className="text-[11px] text-text-2 font-medium">{brand}</p>
          {selected && (
            <div className="w-[6px] h-[6px] rounded-full bg-green" />
          )}
        </div>
      </div>
    </div>
  )
}

'use client'

export default function HotelMapPeekCard({ hotel, ctaLabel, onCta }) {
  return (
    <div className="bg-[#242424] rounded-t-[20px] px-[16px] py-[12px]">
      {/* Horizontal layout with price prominent */}
      <div className="flex items-center gap-[12px] mb-[10px]">
        <div className="w-[48px] h-[48px] rounded-[10px] bg-[#1a1a1a] flex items-center justify-center shrink-0">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6" stroke="#989898" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </div>
        <div className="flex-1">
          <p className="font-bold text-[15px] text-text-1 leading-[1.3]">{hotel.name}</p>
          <p className="font-['Lato',sans-serif] text-[11px] text-[#989898] mt-[1px]">{hotel.area}</p>
        </div>
        <div className="flex flex-col items-end">
          <p className="font-bold text-[18px] text-text-1">${hotel.price}</p>
          <p className="text-[10px] text-[#989898]">/night</p>
        </div>
      </div>
      {/* Savings strip */}
      <div className="bg-green/10 rounded-[8px] px-[10px] py-[6px] flex items-center justify-center mb-[10px]">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="mr-[4px]"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" stroke="#4fc660" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        <p className="text-[11px] font-medium text-green">Save ${hotel.save} vs. booking direct</p>
      </div>
      <button onClick={onCta} className="w-full flex items-center justify-center py-[12px] rounded-[30px] cursor-pointer hover:brightness-110 transition bg-main">
        <p className="font-medium text-[13px] text-center leading-normal text-white">{ctaLabel}</p>
      </button>
      <div className="mt-[8px] mx-auto w-[134px] h-[5px] rounded-full bg-text-1" />
    </div>
  )
}

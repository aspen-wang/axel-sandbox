'use client'

export default function HotelMapPeekCard({ hotel, ctaLabel, onCta }) {
  return (
    <div className="bg-[#242424] rounded-t-[20px] px-[16px] py-[12px]">
      <div className="flex items-start justify-between mb-[8px]">
        <div>
          <p className="font-bold text-[15px] text-text-1 leading-[1.3]">{hotel.name}</p>
          <p className="font-['Lato',sans-serif] text-[11px] text-[#989898] mt-[2px]">{hotel.area}</p>
        </div>
        <div className="flex flex-col items-end">
          <p className="font-bold text-[15px] text-text-1">${hotel.price}<span className="font-normal text-[10px] text-[#989898]">/night</span></p>
          <div className="bg-green/10 px-[6px] py-[2px] rounded-full mt-[2px]"><p className="text-[10px] font-medium text-green leading-[1]">Save ${hotel.save}</p></div>
        </div>
      </div>
      <button onClick={onCta} className="w-full flex items-center justify-center py-[12px] rounded-[30px] cursor-pointer hover:brightness-110 transition bg-main">
        <p className="font-medium text-[13px] text-center leading-normal text-white">{ctaLabel}</p>
      </button>
      <div className="mt-[8px] mx-auto w-[134px] h-[5px] rounded-full bg-text-1" />
    </div>
  )
}

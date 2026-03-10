'use client'

export default function OrderSummaryCard({ title, subtitle, items }) {
  return (
    <div className="bg-[#242424] rounded-[10px] px-[12px] py-[10px]">
      {/* Horizontal header with item count */}
      <div className="flex items-center justify-between mb-[8px]">
        <div>
          <p className="font-bold text-[14px] text-text-1 leading-normal">{title}</p>
          <p className="text-[11px] text-text-2 leading-normal">{subtitle}</p>
        </div>
        <div className="w-[28px] h-[28px] rounded-full bg-main/10 flex items-center justify-center shrink-0">
          <p className="text-[11px] font-bold text-main">{items.length}</p>
        </div>
      </div>
      <div className="h-[1px] bg-[#474747]/30 mb-[8px]" />
      {/* Card rows with left accent */}
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-[8px] mb-[6px] last:mb-0 pl-[8px] border-l-[2px] border-[#474747]">
          <p className="text-[11px] text-text-1 leading-normal">{item.text}</p>
        </div>
      ))}
    </div>
  )
}

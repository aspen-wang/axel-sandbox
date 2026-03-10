'use client'

export default function OrderSummaryCard({ title, subtitle, items }) {
  return (
    <div className="bg-[#242424] rounded-[10px] px-[12px] py-[10px]">
      {/* Numbered checklist style */}
      <div className="flex items-center justify-between mb-[6px]">
        <p className="font-bold text-[13px] text-text-1 leading-normal">{title}</p>
        <p className="text-[10px] text-[#989898] font-medium">{items.length} items</p>
      </div>
      <p className="text-[11px] text-text-2 leading-normal mb-[8px]">{subtitle}</p>
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-[8px] mb-[6px] last:mb-0">
          <div className="w-[18px] h-[18px] rounded-full bg-green/10 flex items-center justify-center shrink-0">
            <p className="text-[9px] font-bold text-green">{i + 1}</p>
          </div>
          <p className="text-[11px] text-text-1 leading-normal">{item.icon} {item.text}</p>
        </div>
      ))}
    </div>
  )
}

'use client'

export default function OrderSummaryCard({ title, subtitle, items }) {
  return (
    <div className="bg-[#242424] rounded-[10px] px-[12px] py-[10px]">
      {/* Minimal — title inline with subtitle, stacked items */}
      <p className="font-bold text-[13px] text-text-1 leading-normal">{title} <span className="font-normal text-[11px] text-text-2">{subtitle}</span></p>
      <div className="mt-[8px] flex flex-wrap gap-[6px]">
        {items.map((item, i) => (
          <div key={i} className="bg-[#1a1a1a] border border-[#333] rounded-[6px] px-[8px] py-[4px]">
            <p className="text-[11px] text-text-1 leading-normal">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

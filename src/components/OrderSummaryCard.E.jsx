'use client'

export default function OrderSummaryCard({ title, subtitle, items }) {
  return (
    <div className="bg-[#242424] rounded-[10px] overflow-hidden">
      {/* Colored header strip */}
      <div className="bg-main/10 px-[12px] py-[8px]">
        <p className="font-bold text-[13px] text-text-1 leading-normal">{title}</p>
        <p className="text-[11px] text-text-2 leading-normal">{subtitle}</p>
      </div>
      {/* Items as compact table rows */}
      <div className="px-[12px] py-[8px]">
        {items.map((item, i) => (
          <div key={i} className="flex items-center justify-between py-[5px] border-b border-[#474747]/20 last:border-0">
            <p className="text-[11px] text-text-1 leading-normal">{item.text}</p>
            <svg width="10" height="10" viewBox="0 0 16 16" fill="none" className="shrink-0 ml-[6px]"><path d="M3 8l3 3 7-7" stroke="#4fc660" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
        ))}
      </div>
    </div>
  )
}

'use client'

export default function OrderSummaryCard({ title, subtitle, items }) {
  return (
    <div className="bg-[#242424] rounded-[10px] px-[12px] py-[10px]">
      <div className="flex items-center gap-[8px] mb-[6px]">
        <div className="w-[28px] h-[28px] rounded-[8px] bg-main/10 flex items-center justify-center shrink-0">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" stroke="#ef508d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </div>
        <div>
          <p className="font-bold text-[13px] text-text-1 leading-normal">{title}</p>
          <p className="text-[11px] text-text-2 leading-normal">{subtitle}</p>
        </div>
      </div>
      <div className="bg-[#1a1a1a] rounded-[6px] px-[8px] py-[6px]">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-[6px] mb-[4px] last:mb-0">
            <span className="text-[12px]">{item.icon}</span>
            <p className="text-[11px] text-text-2 leading-normal">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

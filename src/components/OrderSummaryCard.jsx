'use client'

export default function OrderSummaryCard({ title, subtitle, items }) {
  return (
    <div className="bg-[#242424] rounded-[10px] px-[12px] py-[10px]">
      <p className="font-bold text-[13px] text-text-1 leading-normal mb-[3px]">{title}</p>
      <p className="text-[11px] text-text-2 leading-normal mb-[6px]">{subtitle}</p>
      <div className="h-[1px] bg-[#474747] mb-[6px]" />
      {items.map((item, i) => (
        <p key={i} className="text-[11px] text-text-2 leading-normal mb-[2px] last:mb-0">{item.icon} {item.text}</p>
      ))}
    </div>
  )
}

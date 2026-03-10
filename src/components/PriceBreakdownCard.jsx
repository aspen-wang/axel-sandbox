'use client'

export default function PriceBreakdownCard({ lineItems, total, savings }) {
  return (
    <div className="bg-[#242424] rounded-[10px] px-[12px] py-[10px]">
      {lineItems.map((item, i) => (
        <div key={i} className="flex items-center justify-between mb-[4px]">
          <p className={`font-['Lato',sans-serif] text-[12px] leading-normal ${item.color === 'green' ? 'text-green font-medium' : item.color === 'muted' ? 'text-[#989898]' : 'text-text-1'}`}>{item.label}</p>
          <p className={`font-['Lato',sans-serif] text-[12px] leading-normal ${item.color === 'green' ? 'text-green font-medium' : item.color === 'muted' ? 'text-[#989898]' : 'text-text-1'}`}>{item.amount}</p>
        </div>
      ))}
      <div className="h-[1px] bg-[#474747]/30 my-[4px]" />
      <div className="flex items-center justify-between mb-[4px]">
        <p className="font-bold text-[13px] text-text-1">{total.label}</p>
        <p className="font-bold text-[13px] text-text-1">{total.amount}</p>
      </div>
      {savings && (
        <div className="flex items-center justify-between">
          <p className="font-bold text-[13px] text-green">{savings.label}</p>
          <p className="font-bold text-[13px] text-green">{savings.amount}</p>
        </div>
      )}
    </div>
  )
}

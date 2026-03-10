'use client'

export default function PriceBreakdownCard({ lineItems, total, savings }) {
  return (
    <div className="bg-[#242424] rounded-[10px] px-[12px] py-[10px]">
      <p className="text-[10px] font-medium text-[#989898] tracking-[1px] uppercase mb-[8px]">Price Breakdown</p>
      {/* Two-column comparison layout */}
      <div className="grid grid-cols-2 gap-x-[12px] gap-y-[4px] mb-[6px]">
        {lineItems.map((item, i) => (
          <div key={i} className={`${i % 2 === 0 ? '' : ''}`}>
            <p className={`font-['Lato',sans-serif] text-[10px] ${item.color === 'muted' ? 'text-[#989898]' : 'text-[#989898]'}`}>{item.label}</p>
            <p className={`font-['Lato',sans-serif] text-[13px] font-medium ${item.color === 'green' ? 'text-green' : item.color === 'muted' ? 'text-[#989898]' : 'text-text-1'}`}>{item.amount}</p>
          </div>
        ))}
      </div>
      <div className="h-[1px] bg-[#474747]/30 my-[6px]" />
      <div className="flex items-center justify-between">
        <p className="font-bold text-[14px] text-text-1">{total.label}</p>
        <p className="font-bold text-[16px] text-text-1">{total.amount}</p>
      </div>
      {savings && (
        <div className="flex items-center gap-[4px] mt-[4px]">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M12 2l3 7h7l-5.5 4.5 2 7L12 16l-6.5 4.5 2-7L2 9h7l3-7z" fill="#4fc660" /></svg>
          <p className="font-medium text-[12px] text-green">{savings.label} {savings.amount}</p>
        </div>
      )}
    </div>
  )
}

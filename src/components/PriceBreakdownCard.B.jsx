'use client'

export default function PriceBreakdownCard({ lineItems, total, savings }) {
  return (
    <div className="bg-[#242424] rounded-[10px] px-[12px] py-[10px]">
      {/* Visual bar chart style */}
      {lineItems.map((item, i) => {
        const numericAmount = parseFloat(item.amount.replace(/[^0-9.]/g, '')) || 0
        const numericTotal = parseFloat(total.amount.replace(/[^0-9.]/g, '')) || 1
        const pct = Math.min((numericAmount / numericTotal) * 100, 100)
        const barColor = item.color === 'green' ? 'bg-green/30' : item.color === 'muted' ? 'bg-[#474747]/30' : 'bg-blue/20'

        return (
          <div key={i} className="mb-[6px] last:mb-0">
            <div className="flex items-center justify-between mb-[2px]">
              <p className={`font-['Lato',sans-serif] text-[11px] ${item.color === 'green' ? 'text-green' : item.color === 'muted' ? 'text-[#989898]' : 'text-text-1'}`}>{item.label}</p>
              <p className={`font-['Lato',sans-serif] text-[11px] font-medium ${item.color === 'green' ? 'text-green' : item.color === 'muted' ? 'text-[#989898]' : 'text-text-1'}`}>{item.amount}</p>
            </div>
            <div className="w-full h-[3px] bg-[#474747]/20 rounded-full overflow-hidden">
              <div className={`h-full rounded-full ${barColor}`} style={{ width: `${pct}%` }} />
            </div>
          </div>
        )
      })}
      <div className="h-[1px] bg-[#474747]/30 my-[6px]" />
      <div className="flex items-center justify-between">
        <p className="font-bold text-[14px] text-text-1">{total.label}</p>
        <p className="font-bold text-[14px] text-text-1">{total.amount}</p>
      </div>
      {savings && (
        <div className="bg-green/10 rounded-[6px] px-[8px] py-[4px] mt-[6px] flex items-center justify-between">
          <p className="font-medium text-[12px] text-green">{savings.label}</p>
          <p className="font-bold text-[12px] text-green">{savings.amount}</p>
        </div>
      )}
    </div>
  )
}

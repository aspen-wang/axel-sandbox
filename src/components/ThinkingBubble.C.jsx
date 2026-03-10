'use client'

export default function ThinkingBubble({ label = 'Thinking...' }) {
  return (
    <div>
      <p className="text-[11px] font-medium text-main tracking-[0.05em] mb-[6px]">AXEL</p>
      <div className="bg-[#212121] rounded-[16px] rounded-tl-[4px] px-[14px] py-[12px] max-w-[280px]">
        <style>{`
          @keyframes tbShimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(200%); } }
        `}</style>
        <p className="font-['Lato',sans-serif] text-[12px] text-text-2 leading-[1.4] mb-[8px]">{label}</p>
        <div className="h-[4px] bg-[#2A2A2A] rounded-full overflow-hidden">
          <div className="h-full w-1/2 rounded-full"
            style={{ background: 'linear-gradient(90deg, transparent, #EF508D, transparent)', animation: 'tbShimmer 1.5s ease-in-out infinite' }} />
        </div>
      </div>
    </div>
  )
}

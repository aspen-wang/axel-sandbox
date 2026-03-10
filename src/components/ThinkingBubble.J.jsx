'use client'

export default function ThinkingBubble({ label = 'Thinking...' }) {
  return (
    <div>
      <p className="text-[11px] font-medium text-main tracking-[0.05em] mb-[6px]">AXEL</p>
      <div className="bg-[#212121] rounded-[16px] rounded-tl-[4px] px-[14px] py-[12px] max-w-[280px]">
        <style>{`
          @keyframes tbBreathe {
            0%,100% { transform: scale(0.8); opacity: 0.4; box-shadow: 0 0 0 0 rgba(239,80,141,0); }
            50% { transform: scale(1.2); opacity: 1; box-shadow: 0 0 12px 4px rgba(239,80,141,0.25); }
          }
        `}</style>
        <div className="flex items-center gap-[10px]">
          <div className="w-[12px] h-[12px] rounded-full bg-main shrink-0"
            style={{ animation: 'tbBreathe 2s ease-in-out infinite' }} />
          <p className="font-['Lato',sans-serif] text-[12px] text-text-2 leading-[1.4]">{label}</p>
        </div>
      </div>
    </div>
  )
}

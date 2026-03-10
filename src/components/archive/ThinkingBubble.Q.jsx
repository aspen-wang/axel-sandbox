'use client'

export default function ThinkingBubble({ label = 'Thinking...' }) {
  return (
    <div>
      <p className="text-[11px] font-medium text-main tracking-[0.05em] mb-[6px]">AXEL</p>
      <div className="bg-[#212121] rounded-[16px] rounded-tl-[4px] px-[14px] py-[12px] max-w-[280px]">
        <style>{`
          @keyframes tbBounce { 0%,60%,100% { transform: translateY(0); } 30% { transform: translateY(-8px); } }
        `}</style>
        <div className="flex items-center gap-[8px]">
          <div className="flex items-center gap-[5px]">
            {[0, 1, 2].map(i => (
              <div key={i} className="w-[8px] h-[8px] rounded-full bg-main"
                style={{ animation: 'tbBounce 0.9s ease-in-out infinite', animationDelay: `${i * 0.15}s` }} />
            ))}
          </div>
          <p className="font-['Lato',sans-serif] text-[12px] text-text-2 leading-[1.4]">{label}</p>
        </div>
      </div>
    </div>
  )
}

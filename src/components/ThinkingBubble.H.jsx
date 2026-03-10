'use client'

export default function ThinkingBubble({ label = 'Thinking...' }) {
  return (
    <div>
      <p className="text-[11px] font-medium text-main tracking-[0.05em] mb-[6px]">AXEL</p>
      <div className="bg-[#212121] rounded-[16px] rounded-tl-[4px] px-[14px] py-[12px] max-w-[280px]">
        <style>{`
          @keyframes tbMorph {
            0%,100% { width: 8px; border-radius: 50%; }
            50% { width: 20px; border-radius: 4px; }
          }
        `}</style>
        <div className="flex items-center gap-[8px]">
          <div className="flex items-center gap-[4px]">
            {[0, 1, 2].map(i => (
              <div key={i} className="h-[8px] bg-main"
                style={{ animation: 'tbMorph 1.2s ease-in-out infinite', animationDelay: `${i * 0.25}s` }} />
            ))}
          </div>
          <p className="font-['Lato',sans-serif] text-[12px] text-text-2 leading-[1.4]">{label}</p>
        </div>
      </div>
    </div>
  )
}

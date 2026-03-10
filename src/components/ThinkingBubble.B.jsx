'use client'

export default function ThinkingBubble({ label = 'Thinking...' }) {
  return (
    <div>
      <p className="text-[11px] font-medium text-main tracking-[0.05em] mb-[6px]">AXEL</p>
      <div className="bg-[#212121] rounded-[16px] rounded-tl-[4px] px-[14px] py-[12px] max-w-[280px]">
        <style>{`
          @keyframes tbWave { 0%,100% { transform: scale(0.6); opacity: 0.3; } 50% { transform: scale(1.2); opacity: 1; } }
        `}</style>
        <div className="flex items-center gap-[8px]">
          <div className="flex items-center gap-[6px]">
            {[0, 1, 2].map(i => (
              <div key={i} className="w-[8px] h-[8px] rounded-full bg-main"
                style={{ animation: 'tbWave 1.2s ease-in-out infinite', animationDelay: `${i * 0.2}s` }} />
            ))}
          </div>
          <p className="font-['Lato',sans-serif] text-[12px] text-text-2 leading-[1.4]">{label}</p>
        </div>
      </div>
    </div>
  )
}

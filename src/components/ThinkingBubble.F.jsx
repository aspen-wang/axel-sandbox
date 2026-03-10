'use client'

export default function ThinkingBubble({ label = 'Thinking...' }) {
  return (
    <div>
      <p className="text-[11px] font-medium text-main tracking-[0.05em] mb-[6px]">AXEL</p>
      <div className="bg-[#212121] rounded-[16px] rounded-tl-[4px] px-[14px] py-[12px] max-w-[280px]">
        <style>{`
          @keyframes tbPulseRing {
            0% { transform: scale(0.5); opacity: 0.8; }
            100% { transform: scale(2.2); opacity: 0; }
          }
        `}</style>
        <div className="flex items-center gap-[10px]">
          <div className="relative w-[28px] h-[28px] flex items-center justify-center shrink-0">
            <div className="w-[8px] h-[8px] rounded-full bg-main z-10" />
            {[0, 1, 2].map(i => (
              <div key={i} className="absolute inset-0 m-auto w-[8px] h-[8px] rounded-full border border-main"
                style={{ animation: 'tbPulseRing 2s ease-out infinite', animationDelay: `${i * 0.65}s` }} />
            ))}
          </div>
          <p className="font-['Lato',sans-serif] text-[12px] text-text-2 leading-[1.4]">{label}</p>
        </div>
      </div>
    </div>
  )
}

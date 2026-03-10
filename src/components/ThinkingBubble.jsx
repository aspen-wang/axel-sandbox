'use client'

export default function ThinkingBubble({ label = 'Thinking...' }) {
  return (
    <div>
      <p className="text-[11px] font-medium text-main tracking-[0.05em] mb-[6px]">AXEL</p>
      <div className="relative rounded-[16px] rounded-tl-[4px] px-[14px] py-[12px] max-w-[280px] overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1a1028, #212121 40%, #1a1a2e)' }}>
        <style>{`
          @keyframes tbNeonGlow {
            0%,100% { box-shadow: 0 0 8px rgba(239,80,141,0.15), inset 0 0 12px rgba(239,80,141,0.05); }
            50% { box-shadow: 0 0 20px rgba(239,80,141,0.35), inset 0 0 20px rgba(239,80,141,0.1); }
          }
          @keyframes tbNeonDot {
            0%,100% { transform: scale(1); box-shadow: 0 0 4px #EF508D; }
            50% { transform: scale(1.4); box-shadow: 0 0 14px #EF508D, 0 0 28px rgba(239,80,141,0.3); }
          }
          @keyframes tbNeonSweep {
            0% { transform: translateX(-100%) skewX(-15deg); }
            100% { transform: translateX(300%) skewX(-15deg); }
          }
          @keyframes tbNeonPulseText {
            0%,100% { opacity: 0.55; }
            50% { opacity: 0.85; }
          }
        `}</style>
        <div className="absolute inset-0 rounded-[16px] rounded-tl-[4px]"
          style={{ animation: 'tbNeonGlow 2s ease-in-out infinite' }} />
        <div className="absolute inset-0 opacity-[0.06]">
          <div className="absolute top-0 left-0 w-[40%] h-full bg-main/20"
            style={{ animation: 'tbNeonSweep 3s ease-in-out infinite' }} />
        </div>
        <div className="absolute inset-0 rounded-[16px] rounded-tl-[4px]"
          style={{ border: '1px solid rgba(239,80,141,0.08)' }} />
        <div className="relative flex items-center gap-[8px]">
          <div className="flex items-center gap-[5px]">
            {[0, 1, 2].map(i => (
              <div key={i} className="w-[8px] h-[8px] rounded-full bg-main"
                style={{ animation: 'tbNeonDot 1.4s ease-in-out infinite', animationDelay: `${i * 0.2}s` }} />
            ))}
          </div>
          <p className="font-['Lato',sans-serif] text-[12px] text-text-2 leading-[1.4]"
            style={{ animation: 'tbNeonPulseText 2s ease-in-out infinite' }}>{label}</p>
        </div>
      </div>
    </div>
  )
}

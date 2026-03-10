'use client'

export default function ThinkingBubble({ label = 'Thinking...' }) {
  const particles = [
    { x: 10, y: 8, s: 4, dur: 2.5, dx: 30, dy: -12 },
    { x: 60, y: 28, s: 3, dur: 3.0, dx: -20, dy: -18 },
    { x: 35, y: 5, s: 3, dur: 2.8, dx: 15, dy: 20 },
    { x: 80, y: 15, s: 4, dur: 2.2, dx: -25, dy: 10 },
    { x: 50, y: 32, s: 2, dur: 3.2, dx: 10, dy: -22 },
    { x: 20, y: 22, s: 3, dur: 2.6, dx: 25, dy: 8 },
    { x: 70, y: 6, s: 2, dur: 3.5, dx: -12, dy: 16 },
  ]

  return (
    <div>
      <p className="text-[11px] font-medium text-main tracking-[0.05em] mb-[6px]">AXEL</p>
      <div className="relative rounded-[16px] rounded-tl-[4px] px-[14px] py-[12px] max-w-[280px] overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #1a1028 0%, #212121 40%, #0f1a20 100%)' }}>
        <style>{`
          ${particles.map((p, i) => `
            @keyframes tbP${i} {
              0%,100% { transform: translate(0,0); opacity: 0.6; }
              25% { opacity: 1; }
              50% { transform: translate(${p.dx}px,${p.dy}px); opacity: 0.8; }
              75% { opacity: 0.3; }
            }
          `).join('')}
        `}</style>
        <div className="absolute inset-0">
          {particles.map((p, i) => (
            <div key={i} className="absolute rounded-full bg-main"
              style={{
                width: p.s, height: p.s, left: `${p.x}%`, top: `${p.y}px`,
                animation: `tbP${i} ${p.dur}s ease-in-out infinite`,
                animationDelay: `${i * 0.3}s`,
                boxShadow: `0 0 ${p.s * 2}px rgba(239,80,141,0.4)`,
              }} />
          ))}
        </div>
        <div className="relative flex items-center gap-[8px]">
          <p className="font-['Lato',sans-serif] text-[12px] text-text-2 leading-[1.4]">{label}</p>
        </div>
      </div>
    </div>
  )
}

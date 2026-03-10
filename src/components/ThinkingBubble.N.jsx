'use client'

export default function ThinkingBubble({ label = 'Thinking...' }) {
  return (
    <div>
      <p className="text-[11px] font-medium text-main tracking-[0.05em] mb-[6px]">AXEL</p>
      <div className="relative rounded-[16px] rounded-tl-[4px] px-[14px] py-[12px] max-w-[280px] overflow-hidden">
        <style>{`
          @keyframes tbAuroraFlow {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          @keyframes tbGlowText {
            0%,100% { background-position: -100% 0; }
            50% { background-position: 200% 0; }
          }
        `}</style>
        <div className="absolute inset-0 opacity-100"
          style={{
            background: 'linear-gradient(135deg, #1a1028, #18122b, #0f1a24, #1a1028, #21142a)',
            backgroundSize: '300% 300%',
            animation: 'tbAuroraFlow 6s ease-in-out infinite',
          }} />
        <div className="absolute inset-0 opacity-[0.07]"
          style={{
            background: 'radial-gradient(ellipse at 30% 50%, #EF508D, transparent 50%), radial-gradient(ellipse at 70% 50%, #7B61FF, transparent 50%)',
            backgroundSize: '200% 200%',
            animation: 'tbAuroraFlow 4s ease-in-out infinite reverse',
          }} />
        <div className="relative">
          <div className="flex items-center gap-[8px] mb-[6px]">
            <div className="flex items-center gap-[4px]">
              {[0, 1, 2].map(i => (
                <div key={i} className="w-[6px] h-[6px] rounded-full"
                  style={{ background: 'linear-gradient(135deg, #EF508D, #7B61FF)', opacity: 0.6 + i * 0.15 }} />
              ))}
            </div>
          </div>
          <p className="font-['Lato',sans-serif] text-[13px] font-medium leading-[1.4]"
            style={{
              background: 'linear-gradient(90deg, #989898 0%, #989898 30%, #EF508D 50%, #989898 70%, #989898 100%)',
              backgroundSize: '200% 100%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              animation: 'tbGlowText 3s ease-in-out infinite',
            }}>
            {label}
          </p>
        </div>
      </div>
    </div>
  )
}

'use client'

export default function ThinkingBubble({ label = 'Thinking...' }) {
  return (
    <div>
      <p className="text-[11px] font-medium text-main tracking-[0.05em] mb-[6px]">AXEL</p>
      <div className="relative rounded-[16px] rounded-tl-[4px] px-[14px] py-[12px] max-w-[280px] overflow-hidden"
        style={{ background: 'linear-gradient(145deg, #1a1028, #212121)' }}>
        <style>{`
          @keyframes tbCascade {
            0% { width: 0%; opacity: 0.4; }
            40% { width: 100%; opacity: 1; }
            60% { width: 100%; opacity: 1; }
            100% { width: 0%; opacity: 0.4; }
          }
          @keyframes tbPulseLabel {
            0%,100% { opacity: 0.6; }
            50% { opacity: 1; }
          }
        `}</style>
        <div className="relative mb-[10px]">
          <p className="font-['Lato',sans-serif] text-[12px] text-text-2 leading-[1.4]"
            style={{ animation: 'tbPulseLabel 2s ease-in-out infinite' }}>
            {label}
          </p>
        </div>
        <div className="flex flex-col gap-[4px]">
          {[0, 1, 2, 3].map(i => (
            <div key={i} className="h-[3px] rounded-full overflow-hidden bg-[#2A2A2A]">
              <div className="h-full rounded-full"
                style={{
                  background: `linear-gradient(90deg, #EF508D${i < 2 ? '' : '80'}, #7B61FF${i < 2 ? '' : '60'})`,
                  animation: 'tbCascade 2s ease-in-out infinite',
                  animationDelay: `${i * 0.25}s`,
                }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

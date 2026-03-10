'use client'

export default function ThinkingBubble({ label = 'Thinking...' }) {
  return (
    <div>
      <p className="text-[11px] font-medium text-main tracking-[0.05em] mb-[6px]">AXEL</p>
      <div className="relative rounded-[16px] rounded-tl-[4px] px-[14px] py-[12px] max-w-[280px] overflow-hidden"
        style={{ background: '#181818', border: '1px solid rgba(239,80,141,0.15)' }}>
        <style>{`
          @keyframes tbPulseRingP {
            0% { transform: scale(0.5); opacity: 0.8; }
            100% { transform: scale(2.5); opacity: 0; }
          }
          @keyframes tbOrbitP {
            0% { transform: rotate(0deg) translateX(12px) rotate(0deg); }
            100% { transform: rotate(360deg) translateX(12px) rotate(-360deg); }
          }
          @keyframes tbCorePulseP {
            0%,100% { transform: scale(1); box-shadow: 0 0 6px #EF508D; }
            50% { transform: scale(1.15); box-shadow: 0 0 16px #EF508D, 0 0 30px rgba(239,80,141,0.25); }
          }
          @keyframes tbFadeTextP {
            0%,100% { opacity: 0.5; }
            50% { opacity: 1; }
          }
        `}</style>
        <div className="relative flex items-center gap-[12px]">
          {/* Orbital animation */}
          <div className="relative w-[28px] h-[28px] flex-shrink-0">
            {/* Pulse rings */}
            {[0, 1, 2].map(i => (
              <div key={`ring-${i}`} className="absolute inset-0 rounded-full border border-main/30"
                style={{
                  animation: 'tbPulseRingP 2.4s ease-out infinite',
                  animationDelay: `${i * 0.8}s`,
                }} />
            ))}
            {/* Core dot */}
            <div className="absolute top-1/2 left-1/2 w-[8px] h-[8px] -mt-[4px] -ml-[4px] rounded-full bg-main"
              style={{ animation: 'tbCorePulseP 1.6s ease-in-out infinite' }} />
            {/* Orbiting particles */}
            {[0, 1, 2].map(i => (
              <div key={`orbit-${i}`} className="absolute top-1/2 left-1/2 w-0 h-0"
                style={{ animation: `tbOrbitP ${1.8 + i * 0.3}s linear infinite`, animationDelay: `${i * 0.6}s` }}>
                <div className="w-[3px] h-[3px] rounded-full -mt-[1.5px] -ml-[1.5px]"
                  style={{ background: i === 0 ? '#EF508D' : i === 1 ? '#4FC660' : '#FB7A29', boxShadow: `0 0 4px ${i === 0 ? '#EF508D' : i === 1 ? '#4FC660' : '#FB7A29'}` }} />
              </div>
            ))}
          </div>
          <p className="font-['Lato',sans-serif] text-[12px] text-text-2 leading-[1.4]"
            style={{ animation: 'tbFadeTextP 2s ease-in-out infinite' }}>{label}</p>
        </div>
      </div>
    </div>
  )
}

'use client'

export default function ThinkingBubble({ label = 'Thinking...' }) {
  return (
    <div>
      <p className="text-[11px] font-medium text-main tracking-[0.05em] mb-[6px]">AXEL</p>
      <div className="relative rounded-[16px] rounded-tl-[4px] px-[14px] py-[12px] max-w-[280px] overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1e1428, #212121 50%, #141a24)' }}>
        <style>{`
          @keyframes tbWaveFlow1 { 0% { transform: translateX(-50%); } 100% { transform: translateX(0%); } }
          @keyframes tbWaveFlow2 { 0% { transform: translateX(0%); } 100% { transform: translateX(-50%); } }
        `}</style>
        <div className="absolute bottom-0 left-0 right-0 h-[40px] opacity-[0.12]">
          <svg className="absolute bottom-0 w-[200%]" height="40" viewBox="0 0 800 40" fill="none"
            style={{ animation: 'tbWaveFlow1 3s linear infinite' }}>
            <path d="M0 25 Q50 10 100 25 T200 25 T300 25 T400 25 T500 25 T600 25 T700 25 T800 25" stroke="#EF508D" strokeWidth="2" fill="none" />
          </svg>
          <svg className="absolute bottom-[6px] w-[200%]" height="40" viewBox="0 0 800 40" fill="none"
            style={{ animation: 'tbWaveFlow2 2.5s linear infinite' }}>
            <path d="M0 20 Q50 35 100 20 T200 20 T300 20 T400 20 T500 20 T600 20 T700 20 T800 20" stroke="#EF508D" strokeWidth="1.5" fill="none" opacity="0.6" />
          </svg>
          <svg className="absolute bottom-[12px] w-[200%]" height="40" viewBox="0 0 800 40" fill="none"
            style={{ animation: 'tbWaveFlow1 4s linear infinite' }}>
            <path d="M0 22 Q40 12 80 22 T160 22 T240 22 T320 22 T400 22 T480 22 T560 22 T640 22 T720 22 T800 22" stroke="#EF508D" strokeWidth="1" fill="none" opacity="0.3" />
          </svg>
        </div>
        <div className="relative flex items-center gap-[10px]">
          <div className="relative w-[24px] h-[24px] flex items-center justify-center shrink-0">
            <div className="w-[20px] h-[20px] rounded-[5px] bg-main/20 flex items-center justify-center">
              <p className="text-main font-bold text-[9px] leading-none">A</p>
            </div>
          </div>
          <div>
            <p className="font-['Lato',sans-serif] text-[12px] text-text-2 leading-[1.4]">{label}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

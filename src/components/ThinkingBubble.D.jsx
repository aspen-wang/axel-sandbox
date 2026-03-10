'use client'

export default function ThinkingBubble({ label = 'Thinking...' }) {
  return (
    <div>
      <p className="text-[11px] font-medium text-main tracking-[0.05em] mb-[6px]">AXEL</p>
      <div className="bg-[#212121] rounded-[16px] rounded-tl-[4px] px-[14px] py-[12px] max-w-[280px]">
        <style>{`
          @keyframes tbOrbit { 0% { transform: rotate(0deg) translateX(16px) rotate(0deg); } 100% { transform: rotate(360deg) translateX(16px) rotate(-360deg); } }
        `}</style>
        <div className="flex items-center gap-[10px]">
          <div className="relative w-[36px] h-[36px] flex items-center justify-center shrink-0">
            <div className="w-[24px] h-[24px] rounded-[6px] bg-main/20 flex items-center justify-center">
              <p className="text-main font-bold text-[11px] leading-none">A</p>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[6px] h-[6px] rounded-full bg-main"
                style={{ animation: 'tbOrbit 1.5s linear infinite' }} />
            </div>
          </div>
          <p className="font-['Lato',sans-serif] text-[12px] text-text-2 leading-[1.4]">{label}</p>
        </div>
      </div>
    </div>
  )
}

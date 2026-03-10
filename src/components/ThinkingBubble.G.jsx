'use client'

export default function ThinkingBubble({ label = 'Thinking...' }) {
  return (
    <div>
      <p className="text-[11px] font-medium text-main tracking-[0.05em] mb-[6px]">AXEL</p>
      <div className="bg-[#212121] rounded-[16px] rounded-tl-[4px] px-[14px] py-[12px] max-w-[280px]">
        <style>{`
          @keyframes tbBar0 { 0%,100% { height: 4px; } 50% { height: 16px; } }
          @keyframes tbBar1 { 0%,100% { height: 8px; } 40% { height: 20px; } }
          @keyframes tbBar2 { 0%,100% { height: 6px; } 60% { height: 14px; } }
          @keyframes tbBar3 { 0%,100% { height: 10px; } 45% { height: 18px; } }
        `}</style>
        <div className="flex items-center gap-[10px]">
          <div className="flex items-end gap-[3px] h-[20px] shrink-0">
            {[0, 1, 2, 3].map(i => (
              <div key={i} className="w-[3px] rounded-full bg-main"
                style={{ animation: `tbBar${i} ${0.8 + i * 0.15}s ease-in-out infinite`, animationDelay: `${i * 0.1}s` }} />
            ))}
          </div>
          <p className="font-['Lato',sans-serif] text-[12px] text-text-2 leading-[1.4]">{label}</p>
        </div>
      </div>
    </div>
  )
}

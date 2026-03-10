'use client'

export default function ThinkingBubble({ label = 'Thinking...' }) {
  return (
    <div>
      <p className="text-[11px] font-medium text-main tracking-[0.05em] mb-[6px]">AXEL</p>
      <div className="bg-[#212121] rounded-[16px] rounded-tl-[4px] px-[14px] py-[12px] max-w-[280px]">
        <style>{`
          @keyframes tbSpin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        `}</style>
        <div className="flex items-center gap-[10px]">
          <div className="w-[22px] h-[22px] rounded-full border-2 border-[#2A2A2A] shrink-0"
            style={{ borderTopColor: '#EF508D', animation: 'tbSpin 0.8s linear infinite' }} />
          <p className="font-['Lato',sans-serif] text-[12px] text-text-2 leading-[1.4]">{label}</p>
        </div>
      </div>
    </div>
  )
}

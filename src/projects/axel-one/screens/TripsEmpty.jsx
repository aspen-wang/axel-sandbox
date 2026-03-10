'use client'

import statusIcons from '@/assets/status-icons.svg'

export default function TripsEmpty({ onNext }) {
  return (
    <div className="bg-bg overflow-clip relative rounded-[30px] w-[393px] h-[852px] font-['Inter',sans-serif]">
      {/* Status Bar */}
      <div className="absolute top-0 left-0 right-0 flex h-[59px] items-center justify-between px-[28px] py-[15px]">
        <p className="font-['SF_Pro_Text',sans-serif] font-bold text-[15px] text-text-1 tracking-[-0.045px] leading-[18px] w-[54px]">9:41</p>
        <div className="relative shrink-0 w-[66.16px] h-[11px]">
          <img alt="" className="block max-w-none w-full h-full" src={statusIcons.src || statusIcons} />
        </div>
      </div>

      {/* Header */}
      <div className="absolute left-[16px] top-[72px] right-[16px] flex items-center justify-between">
        <p className="font-medium text-[20px] text-text-1 leading-normal">Trips</p>
        <button onClick={onNext} className="bg-main px-[16px] py-[8px] rounded-[30px]">
          <p className="font-medium text-[13px] text-white leading-normal">+ New Trip</p>
        </button>
      </div>

      {/* Empty State */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-[40px]">
        <div className="w-[64px] h-[64px] rounded-full bg-[#242424] flex items-center justify-center mb-[16px]">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#474747" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
          </svg>
        </div>
        <p className="text-[16px] font-medium text-[#474747] mb-[4px]">No trips yet</p>
        <p className="text-[13px] text-[#474747] text-center mb-[24px]">Let Axel plan your next adventure</p>
        <button onClick={onNext} className="bg-main px-[32px] py-[14px] rounded-[30px] hover:brightness-110 transition">
          <p className="font-medium text-[14px] text-white">+ Start a Trip</p>
        </button>
      </div>

      {/* Bottom Nav */}
      <div className="absolute bottom-0 left-0 right-0 h-[80px] bg-[#212121] border-t border-[#2A2A2A] flex items-start justify-around pt-[12px] rounded-b-[30px]">
        {[
          { label: 'Trips', active: true, d: 'M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5' },
          { label: 'Explore', active: false, d: 'M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z' },
          { label: 'Profile', active: false, d: 'M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z' },
        ].map((item) => (
          <div key={item.label} className="flex flex-col items-center gap-[4px]">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={item.active ? '#EF508D' : '#474747'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d={item.d} />
            </svg>
            <p className={`text-[10px] font-medium ${item.active ? 'text-main' : 'text-[#474747]'}`}>{item.label}</p>
          </div>
        ))}
      </div>

      {/* Home indicator */}
      <div className="absolute bottom-[8px] left-1/2 -translate-x-1/2 w-[134px] h-[5px] rounded-full bg-text-1" />
    </div>
  )
}

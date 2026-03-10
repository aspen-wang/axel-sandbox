'use client'

import statusIcons from '@/assets/status-icons.svg'

export default function StatusBar() {
  return (
    <div className="absolute top-0 left-0 right-0 flex h-[59px] items-center justify-between overflow-clip px-[28px] py-[15px]">
      <p className="font-['SF_Pro_Text',sans-serif] font-bold text-[15px] text-text-1 text-center tracking-[-0.045px] leading-[18px] w-[54px] h-[18px] shrink-0">
        9:41
      </p>
      <div className="relative shrink-0 w-[66.16px] h-[11px]">
        <img alt="" className="block max-w-none w-full h-full" src={statusIcons.src || statusIcons} />
      </div>
    </div>
  )
}

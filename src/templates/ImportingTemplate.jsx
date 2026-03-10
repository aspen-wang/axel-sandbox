'use client'

import statusIcons from '@/assets/status-icons.svg'
import PriceChart from '@/components/PriceChart'

export default function ImportingTemplate({ PriceChartComponent = PriceChart, onNext }) {
  const Chart = PriceChartComponent
  return (
    <div className="bg-bg overflow-clip relative rounded-[30px] w-[393px] h-[852px] font-['Inter',sans-serif]">
      {/* System Status Bar */}
      <div className="absolute top-0 left-0 right-0 flex h-[59px] items-center justify-between overflow-clip px-[28px] py-[15px]">
        <p className="font-['SF_Pro_Text',sans-serif] font-bold text-[15px] text-text-1 text-center tracking-[-0.045px] leading-[18px] w-[54px] h-[18px] shrink-0">
          9:41
        </p>
        <div className="relative shrink-0 w-[66.16px] h-[11px]">
          <img alt="" className="block max-w-none w-full h-full" src={statusIcons.src || statusIcons} />
        </div>
      </div>

      {/* Price Info Container */}
      <div className="absolute left-[24px] top-[107px] w-[345px] flex flex-col gap-[16px] items-start">

        {/* Title */}
        <div className="flex flex-col gap-[4px] items-start font-medium text-[20px] leading-normal px-[2px] shrink-0 w-full">
          <p className="shrink-0 text-text-1">
            Axel looking forward to
          </p>
          <p className="shrink-0 text-green">
            grab at $400
          </p>
        </div>

        {/* Route Card */}
        <div className="bg-card-bg flex flex-col gap-[8px] items-start px-[16px] py-[12px] rounded-[8px] shrink-0 w-full">
          {/* Price row */}
          <div className="flex items-start shrink-0 w-full">
            <p className="font-medium text-[16px] tracking-[-0.32px] shrink-0">
              <span className="font-normal text-white leading-normal">Price now</span>
              <span className="font-normal leading-normal"> </span>
              <span className="text-green leading-normal">$478</span>
            </p>
          </div>
          {/* Route row */}
          <div className="flex items-center shrink-0 w-full">
            <div className="flex flex-[1_0_0] flex-col items-start justify-center min-h-px min-w-px">
              <div className="flex flex-col gap-[8px] items-start shrink-0 w-[62px] leading-normal">
                <p className="font-['Lato',sans-serif] font-medium text-[15px] text-text-1 shrink-0 w-full">
                  SEA
                </p>
                <p className="font-['Lato',sans-serif] text-[12px] text-text-2 shrink-0 w-full">
                  Seattle, WA
                </p>
              </div>
            </div>
            <div className="flex items-center justify-end rounded-[8px] shrink-0 w-[138px]">
              <div className="flex flex-col gap-[8px] items-end justify-center leading-normal shrink-0">
                <p className="font-['Lato',sans-serif] font-medium text-[15px] text-text-1 shrink-0">
                  LAX
                </p>
                <p className="font-['Lato',sans-serif] text-[12px] text-text-2 shrink-0">
                  Los Angeles, CA
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Price Chart — swappable component */}
        <Chart />

        {/* Price Range Description */}
        <div className="bg-bg flex flex-col items-center justify-center pb-[8px] px-[10px] rounded-[16px] shrink-0 w-full">
          <div className="flex items-center justify-center px-[32px] py-[3px] shrink-0 w-full">
            <p className="font-['Lato',sans-serif] text-[13px] text-text-2 leading-normal w-[324px] shrink-0">
              <span>When it dips below</span>
              <span className="text-white"> $400,</span>
              <span> Axel can hold the price for you for 48 hours so you don&apos;t miss it.</span>
            </p>
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <div onClick={onNext} className="absolute left-1/2 -translate-x-1/2 top-[711px] w-[345px] bg-bg-2 flex items-center justify-center px-[8px] py-[14px] rounded-[30px] cursor-pointer hover:brightness-110 transition">
        <p className="font-normal text-[14px] text-text-1 text-center leading-normal shrink-0">
          Axel, get me the best price
        </p>
      </div>
    </div>
  )
}

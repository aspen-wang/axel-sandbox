'use client'

import statusIcons from '@/assets/status-icons.svg'
import graphLines from '@/assets/graph-lines.svg'
import priceLine from '@/assets/price-line.svg'
import arrowUp from '@/assets/arrow-up.svg'

export default function Importing({ onNext }) {
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

      {/* Price Info Container — flex col, gap 16 */}
      <div className="absolute left-[24px] top-[107px] w-[345px] flex flex-col gap-[16px] items-start">

        {/* Title — flex col, gap 4 */}
        <div className="flex flex-col gap-[4px] items-start font-medium text-[20px] leading-normal px-[2px] shrink-0 w-full">
          <p className="shrink-0 text-text-1">
            Axel looking forward to
          </p>
          <p className="shrink-0 text-green">
            grab at $400
          </p>
        </div>

        {/* Route Card — flex col, gap 8 */}
        <div className="bg-card-bg flex flex-col gap-[8px] items-start px-[16px] py-[12px] rounded-[8px] shrink-0 w-full">
          {/* Price row */}
          <div className="flex items-start shrink-0 w-full">
            <p className="font-medium text-[16px] tracking-[-0.32px] shrink-0">
              <span className="font-normal text-white leading-normal">Price now</span>
              <span className="font-normal leading-normal"> </span>
              <span className="text-green leading-normal">$478</span>
            </p>
          </div>
          {/* Route row — flex, items center */}
          <div className="flex items-center shrink-0 w-full">
            {/* Left: SEA */}
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
            {/* Right: LAX */}
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

        {/* Price History Container — flex col */}
        <div className="bg-bg border border-solid border-bg-2 flex flex-col items-start overflow-clip pb-px pt-[11px] px-[8px] rounded-[16px] shrink-0 w-full">
          {/* Inner flex wrapper — fixed height, items-end, justify-center */}
          <div className="flex h-[143px] items-end justify-center shrink-0 w-full">
            {/* Graph Container — fixed size, children absolute */}
            <div className="h-[144px] relative shrink-0 w-[305px]">
              {/* Green gradient highlight */}
              <div
                className="absolute left-[23px] top-[58px] w-[282px] h-[35px]"
                style={{
                  background:
                    'linear-gradient(to right, rgba(79,198,96,0), rgba(79,198,96,0.14) 53.85%, rgba(79,198,96,0))',
                }}
              />
              {/* Y-axis labels */}
              <p className="absolute font-light leading-normal text-[12px] text-text-2 left-[-9px] top-0">$660</p>
              <p className="absolute font-light leading-normal text-[12px] text-green left-[-9px] top-[48px]">$400</p>
              <p className="absolute font-light leading-normal text-[12px] text-text-2 left-[-9px] top-[98px]">$200</p>
              {/* X-axis labels */}
              <p className="absolute font-light leading-normal text-[12px] text-text-2 left-[24px] top-[114px]">Dec 25</p>
              <p className="absolute font-light leading-normal text-[12px] text-text-2 left-[calc(50%-0.5px)] top-[114px]">Today</p>
              <p className="absolute font-light leading-normal text-[12px] text-text-2 left-[264px] top-[114px]">Feb 26</p>
              {/* Graph grid lines */}
              <div className="absolute h-[100px] left-[24px] top-[8px] w-[281px]">
                <div className="absolute inset-[-0.5%_0_0_0]">
                  <img alt="" className="block max-w-none w-full h-full" src={graphLines.src || graphLines} />
                </div>
              </div>
              {/* Price trend line */}
              <div className="absolute h-[53px] left-[25px] top-[40px] w-[146px]">
                <div className="absolute inset-[2.42%_-3.26%_-6.65%_-2.45%]">
                  <img alt="" className="block max-w-none w-full h-full" src={priceLine.src || priceLine} />
                </div>
              </div>
              {/* Current price dot */}
              <div className="absolute bg-orange border-2 border-solid border-bg left-[171px] rounded-[19px] w-[8px] h-[8px] top-[36px]" />
              {/* Axel Range dashed box */}
              <div className="absolute border border-green border-dashed h-[35px] left-[176px] rounded-[5px] top-[58px] w-[131px]" />
              {/* Axel Range label */}
              <p className="absolute font-medium leading-normal left-[209px] text-[12px] text-green top-[68px]">
                Axel Range
              </p>
              {/* Now price badge — flex, items center */}
              <div className="absolute bg-orange/[0.07] flex items-center left-[182px] overflow-clip pl-[8px] py-[2px] rounded-[20px] top-[28px]">
                <p className="font-medium leading-normal shrink-0 text-green text-[12px]">
                  Now $478
                </p>
                <div className="overflow-clip relative shrink-0 w-[16px] h-[16px]">
                  <div className="absolute inset-[31.25%_29.3%_39.58%_29.29%]">
                    <img alt="" className="absolute block max-w-none w-full h-full" src={arrowUp.src || arrowUp} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Price Range Description — flex col, centered */}
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

      {/* CTA Button — flex, centered */}
      <div onClick={onNext} className="absolute left-1/2 -translate-x-1/2 top-[711px] w-[345px] bg-bg-2 flex items-center justify-center px-[8px] py-[14px] rounded-[30px] cursor-pointer hover:brightness-110 transition">
        <p className="font-normal text-[14px] text-text-1 text-center leading-normal shrink-0">
          Axel, get me the best price
        </p>
      </div>
    </div>
  )
}

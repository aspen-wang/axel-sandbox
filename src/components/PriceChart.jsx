'use client'

import graphLines from '@/assets/graph-lines.svg'
import priceLine from '@/assets/price-line.svg'
import arrowUp from '@/assets/arrow-up.svg'

export default function PriceChart({ currentPrice = 478, targetPrice = 400 }) {
  return (
    <div className="bg-bg border border-solid border-bg-2 flex flex-col items-start overflow-clip pb-px pt-[11px] px-[8px] rounded-[16px] w-full">
      <div className="flex h-[143px] items-end justify-center shrink-0 w-full">
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
          <p className="absolute font-light leading-normal text-[12px] text-green left-[-9px] top-[48px]">${targetPrice}</p>
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
          {/* Now price badge */}
          <div className="absolute bg-orange/[0.07] flex items-center left-[182px] overflow-clip pl-[8px] py-[2px] rounded-[20px] top-[28px]">
            <p className="font-medium leading-normal shrink-0 text-green text-[12px]">
              Now ${currentPrice}
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
  )
}

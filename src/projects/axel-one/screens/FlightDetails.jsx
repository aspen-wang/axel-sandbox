'use client'

import statusIcons from '@/assets/status-icons.svg'
import graphLines from '@/assets/graph-lines.svg'
import priceLine from '@/assets/price-line.svg'
import { getActivity } from '@/lib/data'

const activity = getActivity()

export default function FlightDetails({ onNext }) {
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

      {/* Scrollable Content */}
      <div className="absolute left-0 top-[59px] w-full bottom-0 overflow-y-auto">
        <div className="px-[24px] pb-[40px]">
          {/* Header: Back + Watch Details + Monitoring badge */}
          <div className="flex items-center justify-between mt-[12px] mb-[20px]">
            <div className="flex items-center">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="mr-[8px]">
                <path d="M13 4l-6 6 6 6" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p className="font-medium text-[16px] text-text-1 leading-normal">Watch Details</p>
            </div>
            <div className="flex items-center bg-green/15 px-[12px] py-[5px] rounded-[20px]">
              <div className="w-[6px] h-[6px] rounded-full bg-green mr-[6px]" />
              <p className="text-green text-[12px] font-medium leading-normal">Monitoring</p>
            </div>
          </div>

          {/* Price Comparison */}
          <div className="flex items-start justify-between mb-[24px]">
            <div>
              <p className="font-bold text-[28px] text-green leading-none">${activity.savings_potential.target_price || 380}</p>
              <p className="text-[12px] text-text-2 mt-[4px]">Axel price</p>
            </div>
            <div className="text-right">
              <p className="text-[12px] text-text-2 mb-[2px]">Current Price</p>
              <div className="flex items-baseline justify-end">
                <p className="font-bold text-[28px] text-text-1 leading-none">${activity.savings_potential.current_price}</p>
                <p className="text-green text-[12px] font-medium ml-[6px]">$28 <span className="text-[10px]">&#8595;</span></p>
              </div>
            </div>
          </div>

          {/* Route display — large centered */}
          <div className="flex items-center justify-center mb-[6px]">
            <p className="font-['Lato',sans-serif] font-bold text-[28px] text-text-1 leading-none">SEA</p>
            <svg width="24" height="16" viewBox="0 0 24 16" fill="none" className="mx-[12px]">
              <path d="M2 8h20M6 4l-4 4 4 4M18 4l4 4-4 4" stroke="#989898" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p className="font-['Lato',sans-serif] font-bold text-[28px] text-text-1 leading-none">ATL</p>
          </div>
          <div className="flex items-center justify-center mb-[8px]">
            <p className="text-[12px] text-text-2">Seattle, WA</p>
            <span className="mx-[24px]" />
            <p className="text-[12px] text-text-2">Atlanta, GA</p>
          </div>

          {/* Filter pills */}
          <div className="flex items-center justify-center mb-[24px]">
            {['Non-stop', 'Alaska', 'Delta'].map((label) => (
              <span
                key={label}
                className="bg-white/[0.03] text-text-2 text-[12px] leading-normal px-[10px] py-[4px] rounded-[20px] mr-[8px] last:mr-0"
              >
                {label}
              </span>
            ))}
          </div>

          {/* Price Chart */}
          <div className="bg-bg border border-bg-2 rounded-[16px] px-[16px] py-[16px] mb-[24px]">
            <div className="relative h-[130px] w-full">
              {/* Grid lines */}
              <div className="absolute inset-0">
                <img alt="" className="block max-w-none w-full h-full opacity-30" src={graphLines.src || graphLines} />
              </div>
              {/* Price line */}
              <div className="absolute left-[40px] top-[10px] w-[calc(100%-50px)] h-[90px]">
                <img alt="" className="block max-w-none w-full h-full" src={priceLine.src || priceLine} />
              </div>
              {/* Current price marker */}
              <div className="absolute right-[40px] top-[20px] flex items-center">
                <div className="w-[6px] h-[6px] rounded-full bg-orange mr-[4px]" />
                <p className="text-[11px] text-green font-medium">Now ${activity.savings_potential.current_price}</p>
              </div>
              {/* Axel Range box */}
              <div className="absolute right-[20px] top-[40px] w-[80px] h-[40px] border border-dashed border-green/50 rounded-[4px] flex items-center justify-center">
                <p className="text-[9px] text-green/70">Axel Range</p>
              </div>
              {/* Y-axis labels */}
              <p className="absolute left-0 top-0 text-[10px] text-text-2">$660</p>
              <p className="absolute left-0 top-[45px] text-[10px] text-green font-medium">$400</p>
              <p className="absolute left-0 bottom-0 text-[10px] text-text-2">$200</p>
            </div>
            <div className="flex items-center justify-between mt-[8px]">
              <p className="text-[10px] text-text-2">Dec 25</p>
              <p className="text-[10px] text-text-2">Today</p>
              <p className="text-[10px] text-text-2">Feb 26</p>
            </div>
          </div>

          {/* Divider */}
          <div className="h-[1px] bg-bg-2 mb-[16px]" />

          {/* Traveler */}
          <div className="flex items-center justify-between mb-[24px]">
            <p className="text-[14px] text-text-1">Jane Doe</p>
            <p className="text-[13px] text-text-2">Add date of birth</p>
          </div>

          {/* Preview (map placeholder) */}
          <div className="mb-[24px]">
            <p className="text-[14px] text-text-1 mb-[10px]">Preview</p>
            <div className="w-full h-[160px] bg-bg-2 rounded-[12px] flex items-center justify-center overflow-hidden">
              <div className="relative w-full h-full bg-[#1a2e1a] flex items-center justify-center">
                <p className="text-text-2/50 text-[12px]">Map preview</p>
              </div>
            </div>
          </div>

          {/* Axel Activity heading */}
          <p className="font-medium text-[16px] text-text-1 mb-[16px]">Axel Activity</p>

          {/* 3-column stats */}
          <div className="flex items-start justify-between mb-[16px] px-[4px]">
            <div className="flex flex-col items-start">
              <p className="text-[10px] text-text-2 uppercase tracking-[0.5px] mb-[4px]">Checks</p>
              <p className="font-bold text-[24px] text-text-1 leading-none">{activity.total_checks > 100 ? 34 : activity.total_checks}</p>
              <p className="text-[10px] text-text-2 mt-[2px]">since import</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-[10px] text-text-2 uppercase tracking-[0.5px] mb-[4px]">Today</p>
              <p className="font-bold text-[24px] text-text-1 leading-none">{activity.checks_today > 20 ? 12 : activity.checks_today}</p>
              <p className="text-[10px] text-text-2 mt-[2px]">Price check</p>
            </div>
            <div className="flex flex-col items-end">
              <p className="text-[10px] text-text-2 uppercase tracking-[0.5px] mb-[4px]">Last Check</p>
              <p className="font-bold text-[24px] text-text-1 leading-none">3m</p>
              <p className="text-[10px] text-text-2 mt-[2px]">ago</p>
            </div>
          </div>

          {/* Activity log entries */}
          <div className="flex flex-col mb-[24px]">
            <div className="flex items-start py-[10px] border-t border-bg-2">
              <span className="mr-[8px] mt-[1px] text-[14px]">&#128293;</span>
              <div className="flex-1">
                <p className="text-[13px] text-text-1 leading-normal">Price dropped from $850 to $822</p>
              </div>
              <p className="text-[11px] text-text-2 ml-[8px] shrink-0">2 min ago</p>
            </div>
            <div className="flex items-start py-[10px] border-t border-bg-2">
              <span className="mr-[8px] mt-[1px] text-[14px]">&#9989;</span>
              <div className="flex-1">
                <p className="text-[13px] text-text-1 leading-normal">Booking imported successfully</p>
              </div>
              <p className="text-[11px] text-text-2 ml-[8px] shrink-0">2 days ago</p>
            </div>
          </div>

          {/* Savings Potential */}
          <div className="mb-[24px]">
            <div className="flex items-baseline mb-[12px]">
              <p className="font-medium text-[14px] text-text-1">Savings potential</p>
              <p className="text-[11px] text-text-2 ml-[6px]">(1/3) Upgrade to Axel One</p>
            </div>
            <div className="bg-bg-2 rounded-[12px] px-[16px] py-[14px] flex items-center">
              {/* Circle chart */}
              <div className="relative w-[56px] h-[56px] mr-[16px] shrink-0">
                <svg width="56" height="56" viewBox="0 0 56 56">
                  <circle cx="28" cy="28" r="22" fill="none" stroke="#333" strokeWidth="5" />
                  <circle
                    cx="28" cy="28" r="22"
                    fill="none"
                    stroke="#989898"
                    strokeWidth="5"
                    strokeDasharray={`${0.55 * 2 * Math.PI * 22} ${2 * Math.PI * 22}`}
                    strokeDashoffset={2 * Math.PI * 22 * 0.25}
                    strokeLinecap="round"
                  />
                </svg>
                <p className="absolute inset-0 flex items-center justify-center text-[12px] text-text-1 font-medium">55%</p>
              </div>
              <div className="flex-1">
                <p className="font-medium text-[14px] text-text-1 mb-[4px]">Medium Likelihood</p>
                <p className="text-[11px] text-text-2 leading-[16px]">
                  <span className="font-medium text-text-1">23%</span> of flights on LAX&#8596;SEA see a price drop before departure.
                </p>
                <p className="text-[11px] text-text-2 leading-[16px] mt-[4px]">
                  Estimated savings: <span className="font-medium text-text-1">$40 – $180</span>
                </p>
              </div>
            </div>
          </div>

          {/* Route Insights */}
          <div className="mb-[24px]">
            <div className="flex items-baseline mb-[12px]">
              <p className="font-medium text-[14px] text-text-1">Route Insights</p>
              <p className="text-[11px] text-text-2 ml-[6px]">(1/3) Upgrade to Axel One</p>
            </div>
            <div className="flex flex-col">
              <p className="text-[13px] text-text-2 leading-[20px] mb-[8px]">
                Axel users on LAX&#8596;SEA saved an avg of <span className="font-bold text-text-1">$95</span> last month
              </p>
              <p className="text-[13px] text-text-2 leading-[20px] mb-[8px]">
                Prices typically drop <span className="font-bold text-text-1">2-3 weeks</span> before departure
              </p>
              <p className="text-[13px] text-text-2 leading-[20px]">
                <span className="font-bold text-text-1">8 reprices</span> completed on this route this month
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

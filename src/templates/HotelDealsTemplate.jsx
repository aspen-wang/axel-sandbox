'use client'

import statusIcons from '@/assets/status-icons.svg'
import { getHotelDeals } from '@/lib/data'
import HotelDealCard from '@/components/HotelDealCard'

const deals = getHotelDeals()

export default function HotelDealsTemplate({
  HotelDealCardComponent = HotelDealCard,
}) {
  const Card = HotelDealCardComponent

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

      {/* Content Container */}
      <div className="absolute left-[24px] top-[107px] right-[24px] bottom-0 flex flex-col overflow-y-auto">
        {/* Header */}
        <div className="flex flex-col w-full px-[2px] mb-[16px] shrink-0">
          <p className="font-medium text-[20px] text-green leading-[30px] mb-[4px]">
            Hotel Deals
          </p>
          <p className="font-medium text-[20px] text-text-1 leading-[30px]">
            {deals.length} hotels in Los Angeles
          </p>
        </div>

        {/* Cards */}
        {deals.map((deal, i) => (
          <div key={deal.id} className={i < deals.length - 1 ? 'mb-[12px]' : ''}>
            <Card deal={deal} />
          </div>
        ))}
      </div>
    </div>
  )
}

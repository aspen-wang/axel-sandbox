'use client'

import statusIcons from '@/assets/status-icons.svg'
import { getHotelDeals } from '@/lib/data'

const deals = getHotelDeals().slice(0, 3)

function StarIcon({ filled }) {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill={filled ? '#F5C518' : '#474747'}>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  )
}

function AmenityIcon({ name, size = 11 }) {
  const p = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2.5, strokeLinecap: 'round' }
  if (name.includes('WiFi')) return <svg {...p}><path d="M5 12.55a11 11 0 0114.08 0" /><path d="M8.53 16.11a6 6 0 016.95 0" /><circle cx="12" cy="20" r="1" fill="currentColor" stroke="none" /></svg>
  if (name.includes('Pool')) return <svg {...p}><path d="M2 12c2-2.5 4-2.5 6 0s4 2.5 6 0 4-2.5 6 0" /></svg>
  if (name.includes('Restaurant') || name.includes('Dining')) return <svg {...p} strokeWidth={2}><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 002-2V2M7 2v20M21 15V2a5 5 0 00-5 5v6c0 1.1.9 2 2 2h3v7" /></svg>
  if (name.includes('Spa')) return <svg {...p} fill="currentColor" stroke="none"><path d="M12 2C9 7 4 9 4 14a8 8 0 0016 0c0-5-5-7-8-12z" opacity=".6" /></svg>
  if (name.includes('Fitness')) return <svg {...p}><path d="M6.5 6.5h11M4 12h16M6.5 17.5h11" /></svg>
  if (name.includes('Bar')) return <svg {...p} strokeWidth={2}><path d="M8 21h8M12 17v4M6 3h12l-4.5 7.5V17h-3V10.5z" /></svg>
  return null
}

export default function HotelDeals({ onNext, onSelectHotel }) {
  const totalSaved = deals.reduce((sum, d) => sum + d.saved * d.nights, 0)

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
      <div className="absolute left-[24px] top-[107px] w-[345px] flex flex-col">
        {/* Header */}
        <div className="flex flex-col w-full font-medium text-[20px] leading-normal px-[2px] mb-[8px]">
          <p className="text-green mb-[4px]">
            Congrats
          </p>
          <p className="text-text-1">
            Axel found {deals.length} hotel deals in Los Angeles
          </p>
        </div>

        {/* Savings summary */}
        <div className="flex items-center px-[2px] mb-[16px]">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-green mr-[6px]">
            <path d="M12 0l2.5 8.5L24 12l-9.5 3.5L12 24l-2.5-8.5L0 12l9.5-3.5z" fill="currentColor" />
          </svg>
          <p className="font-['Lato',sans-serif] text-[13px] text-text-2 leading-normal">
            Saving you up to <span className="font-bold text-green">${totalSaved}</span> total
          </p>
        </div>

        {/* Hotel Deal Cards */}
        {deals.map((deal, i) => {
          const pctOff = Math.round((deal.saved / deal.original_price) * 100)
          const totalAxel = deal.price_per_night * deal.nights + deal.taxes

          return (
            <div
              key={deal.id}
              onClick={() => onSelectHotel?.(deal)}
              className={`bg-card-bg flex flex-col w-full rounded-[12px] overflow-hidden cursor-pointer hover:brightness-110 transition${i < deals.length - 1 ? ' mb-[12px]' : ''}`}
            >
              {/* Image placeholder */}
              <div className="relative h-[100px] bg-[#2A2A2A] flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#474747" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path d="M21 15l-5-5L5 21" />
                </svg>
                {/* Save badge */}
                <div className="absolute top-[8px] right-[8px] bg-green rounded-full px-[8px] py-[3px]">
                  <p className="font-bold text-[10px] text-white leading-[1]">Save {pctOff}%</p>
                </div>
                {/* Stars bottom-left */}
                <div className="absolute bottom-[8px] left-[8px] flex">
                  {Array.from({ length: deal.stars }, (_, j) => (
                    <span key={j} className={j > 0 ? 'ml-[1px]' : ''}><StarIcon filled /></span>
                  ))}
                </div>
              </div>

              {/* Info */}
              <div className="px-[14px] py-[10px]">
                {/* Name + location */}
                <p className="font-medium text-[14px] text-text-1 leading-[1.3] truncate">{deal.name}</p>
                <p className="font-['Lato',sans-serif] text-[11px] text-text-2 leading-[1.5] mt-[2px]">{deal.chain} · {deal.location}</p>

                {/* Amenity row */}
                <div className="flex items-center mt-[6px]">
                  {deal.amenities.slice(0, 3).map((a, j) => (
                    <div key={j} className={`flex items-center text-text-2/60 ${j > 0 ? 'ml-[10px]' : ''}`}>
                      <AmenityIcon name={a} />
                      <span className="font-['Lato',sans-serif] text-[10px] text-text-2 leading-[1] ml-[3px]">{a.replace('Free ', '')}</span>
                    </div>
                  ))}
                </div>

                {/* Price row */}
                <div className="flex items-center justify-between mt-[8px] pt-[8px] border-t border-text-2/10">
                  <div className="flex items-baseline">
                    <p className="font-bold text-[17px] text-text-1 leading-[1]">${deal.price_per_night}</p>
                    <p className="font-['Lato',sans-serif] text-[11px] text-text-2 leading-[1] ml-[2px]">/night</p>
                    <p className="font-['Lato',sans-serif] text-[12px] text-text-2 line-through leading-[1] ml-[8px]">${deal.original_price}</p>
                  </div>
                  <div className="bg-green/10 px-[8px] py-[3px] rounded-full">
                    <p className="font-medium text-[11px] text-green leading-[1]">Axel saved ${deal.saved * deal.nights}</p>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* CTA Button */}
      <div onClick={onNext} className="absolute left-1/2 -translate-x-1/2 top-[711px] w-[345px] bg-main flex items-center justify-center px-[8px] py-[14px] rounded-[30px] cursor-pointer hover:brightness-110 transition">
        <p className="font-medium text-[14px] text-white text-center leading-normal">
          Compare hotels
        </p>
      </div>
    </div>
  )
}

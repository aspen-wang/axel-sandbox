'use client'

import statusIcons from '@/assets/status-icons.svg'

function AmenityIcon({ name, size = 12 }) {
  const p = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2.5, strokeLinecap: 'round' }
  if (name.includes('WiFi')) return <svg {...p}><path d="M5 12.55a11 11 0 0114.08 0" /><path d="M8.53 16.11a6 6 0 016.95 0" /><circle cx="12" cy="20" r="1" fill="currentColor" stroke="none" /></svg>
  if (name.includes('Pool')) return <svg {...p}><path d="M2 12c2-2.5 4-2.5 6 0s4 2.5 6 0 4-2.5 6 0" /></svg>
  if (name.includes('Restaurant') || name.includes('Dining')) return <svg {...p} strokeWidth={2}><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 002-2V2M7 2v20M21 15V2a5 5 0 00-5 5v6c0 1.1.9 2 2 2h3v7" /></svg>
  if (name.includes('Spa')) return <svg {...p} fill="currentColor" stroke="none"><path d="M12 2C9 7 4 9 4 14a8 8 0 0016 0c0-5-5-7-8-12z" opacity=".6" /></svg>
  if (name.includes('Fitness')) return <svg {...p}><path d="M6.5 6.5h11M4 12h16M6.5 17.5h11" /></svg>
  if (name.includes('Parking') || name.includes('Valet')) return <svg {...p} strokeWidth={2}><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M9 17V7h4a3 3 0 010 6H9" /></svg>
  if (name.includes('Bar')) return <svg {...p} strokeWidth={2}><path d="M8 21h8M12 17v4M6 3h12l-4.5 7.5V17h-3V10.5z" /></svg>
  if (name.includes('Room Service') || name.includes('Concierge')) return <svg {...p} strokeWidth={2}><path d="M2 18h20M6 18V6a6 6 0 0112 0v12" /></svg>
  if (name.includes('Business')) return <svg {...p} strokeWidth={2}><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" /></svg>
  if (name.includes('Events')) return <svg {...p} strokeWidth={2}><path d="M9 18V5l12-2v13M9 18a3 3 0 11-6 0 3 3 0 016 0zM21 16a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
  return null
}

function StarIcon({ filled }) {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill={filled ? '#F5C518' : '#474747'}>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  )
}

export default function HotelDealCardB({ deal, mode = 'list', onClick }) {
  const pctOff = Math.round((deal.saved / deal.original_price) * 100)
  const totalAxel = deal.price_per_night * deal.nights + deal.taxes
  const totalOriginal = deal.original_price * deal.nights + deal.taxes
  const totalSaved = totalOriginal - totalAxel
  const ratingText = deal.rating >= 4.5 ? 'Excellent' : deal.rating >= 4.0 ? 'Very Good' : deal.rating >= 3.5 ? 'Good' : 'Average'

  if (mode === 'detail') {
    return (
      <div className="bg-bg overflow-clip relative rounded-[30px] w-[393px] h-[852px] font-['Inter',sans-serif]">
        {/* Status Bar */}
        <div className="absolute top-0 left-0 right-0 flex h-[59px] items-center justify-between overflow-clip px-[28px] py-[15px]">
          <p className="font-['SF_Pro_Text',sans-serif] font-bold text-[15px] text-text-1 text-center tracking-[-0.045px] leading-[18px] w-[54px] h-[18px] shrink-0">9:41</p>
          <div className="relative shrink-0 w-[66.16px] h-[11px]">
            <img alt="" className="block max-w-none w-full h-full" src={statusIcons.src || statusIcons} />
          </div>
        </div>

        {/* Header */}
        <div className="absolute left-0 right-0 top-[59px] px-[24px] py-[12px]">
          <div className="flex items-center">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="mr-[8px]">
              <path d="M12 15l-5-5 5-5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p className="font-medium text-[16px] text-text-1 leading-[1.5]">Hotel Details</p>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="absolute left-0 right-0 top-[103px] bottom-[88px] overflow-y-auto px-[16px]">
          {/* Compact Image */}
          <div className="relative h-[160px] rounded-[12px] mb-[12px] flex items-center justify-center overflow-hidden" style={{ background: 'radial-gradient(ellipse at 70% 30%, rgba(255,200,150,0.08), transparent 60%), linear-gradient(135deg, #2A3040, #1E2832, #2A2A2A)' }}>
            <svg className="absolute inset-0 w-full h-full opacity-[0.05]" viewBox="0 0 200 120" fill="none" stroke="white" strokeWidth="1.5" preserveAspectRatio="xMidYMid slice"><rect x="120" y="15" width="50" height="35" rx="2" /><line x1="145" y1="15" x2="145" y2="50" /><line x1="120" y1="32" x2="170" y2="32" /><rect x="30" y="55" width="65" height="35" rx="5" /><rect x="30" y="48" width="65" height="14" rx="4" /><rect x="36" y="60" width="24" height="16" rx="3" /><rect x="65" y="60" width="24" height="16" rx="3" /></svg>
            <div className="absolute top-[10px] right-[10px] bg-green rounded-full px-[10px] py-[4px]">
              <p className="font-bold text-[12px] text-white leading-[1]">Save {pctOff}%</p>
            </div>
          </div>

          {/* Rating Hero */}
          <div className="flex items-center mb-[12px]">
            <div className="bg-green rounded-[8px] px-[12px] py-[8px] mr-[10px]">
              <p className="font-bold text-[20px] text-white leading-[1]">{deal.rating}</p>
            </div>
            <div>
              <p className="font-bold text-[16px] text-text-1 leading-[1.3]">{ratingText}</p>
              <p className="font-['Lato',sans-serif] text-[12px] text-text-2 leading-[1.5]">{deal.reviews.toLocaleString()} reviews</p>
            </div>
          </div>

          {/* Hotel Name + Stars */}
          <div className="mb-[12px]">
            <p className="font-medium text-[18px] text-text-1 leading-[1.4]">{deal.name}</p>
            <div className="flex items-center mt-[4px]">
              <div className="flex items-center mr-[6px]">
                {Array.from({ length: 5 }, (_, i) => <span key={i} className={i > 0 ? 'ml-[1px]' : ''}><StarIcon filled={i < deal.stars} /></span>)}
              </div>
              <p className="font-['Lato',sans-serif] text-[12px] text-text-2 leading-[1.5]">{deal.chain} · {deal.location}</p>
            </div>
          </div>

          {/* Amenity Pills */}
          <div className="flex flex-wrap mb-[12px]">
            {deal.amenities.map((a, i) => (
              <div key={i} className="flex items-center bg-bg-2 rounded-[20px] px-[10px] py-[5px] mr-[6px] mb-[6px]">
                <span className="text-text-2 opacity-60 mr-[4px]"><AmenityIcon name={a} /></span>
                <span className="font-['Lato',sans-serif] text-[11px] text-text-2 leading-[1]">{a.replace('Free ', '')}</span>
              </div>
            ))}
          </div>

          {/* Room Details — compact pills */}
          <div className="bg-card-bg rounded-[12px] px-[16px] py-[12px] mb-[12px]">
            <p className="font-medium text-[11px] text-text-2 leading-[1.5] uppercase tracking-wider mb-[8px]">Room</p>
            <div className="flex flex-wrap">
              {[deal.room_type, deal.bed_type, deal.max_guests, `In ${deal.checkin_time}`, `Out ${deal.checkout_time}`].map((v, i) => (
                <div key={i} className="bg-bg-2 rounded-[6px] px-[8px] py-[4px] mr-[6px] mb-[6px]">
                  <p className="font-['Lato',sans-serif] text-[11px] text-text-2 leading-[1.3]">{v}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Two-Column Price Table */}
          <div className="bg-card-bg rounded-[12px] overflow-hidden mb-[12px]">
            <div className="px-[16px] py-[12px]">
              <p className="font-medium text-[11px] text-text-2 leading-[1.5] uppercase tracking-wider mb-[8px]">Pricing</p>
              {/* Table header */}
              <div className="flex items-center mb-[8px]">
                <div className="flex-1" />
                <p className="font-['Lato',sans-serif] text-[11px] text-text-2 leading-[1.5] w-[80px] text-right">{deal.comparison_source}</p>
                <p className="font-['Lato',sans-serif] text-[11px] text-green leading-[1.5] w-[80px] text-right">Axel</p>
              </div>
              {/* Nightly */}
              <div className="flex items-center mb-[6px]">
                <p className="font-['Lato',sans-serif] text-[13px] text-text-2 leading-[1.5] flex-1">Per night</p>
                <p className="font-['Lato',sans-serif] text-[13px] text-secondary line-through leading-[1.5] w-[80px] text-right">${deal.original_price}</p>
                <p className="font-medium text-[13px] text-text-1 leading-[1.5] w-[80px] text-right">${deal.price_per_night}</p>
              </div>
              {/* Total */}
              <div className="flex items-center mb-[6px]">
                <p className="font-['Lato',sans-serif] text-[13px] text-text-2 leading-[1.5] flex-1">{deal.nights} nights</p>
                <p className="font-['Lato',sans-serif] text-[13px] text-secondary line-through leading-[1.5] w-[80px] text-right">${totalOriginal.toLocaleString()}</p>
                <p className="font-medium text-[13px] text-text-1 leading-[1.5] w-[80px] text-right">${totalAxel.toLocaleString()}</p>
              </div>
              {/* Taxes */}
              <div className="flex items-center mb-[6px]">
                <p className="font-['Lato',sans-serif] text-[13px] text-text-2 leading-[1.5] flex-1">Taxes</p>
                <p className="font-['Lato',sans-serif] text-[13px] text-text-2 leading-[1.5] w-[80px] text-right">${deal.taxes}</p>
                <p className="font-['Lato',sans-serif] text-[13px] text-text-2 leading-[1.5] w-[80px] text-right">Incl.</p>
              </div>
              {/* You save */}
              <div className="border-t border-grey mt-[6px] pt-[8px] flex items-center">
                <p className="font-medium text-[13px] text-green leading-[1.5] flex-1">You save</p>
                <p className="font-bold text-[16px] text-green leading-[1.5]">${totalSaved.toLocaleString()}</p>
              </div>
            </div>
            <div className="bg-green/20 flex items-center justify-center px-[16px] py-[8px]">
              <p className="font-['Lato',sans-serif] font-bold text-[13px] text-green leading-[1.5]">{pctOff}% cheaper than {deal.comparison_source}</p>
            </div>
          </div>

          {/* Policies */}
          <div className="bg-card-bg rounded-[12px] px-[16px] py-[12px] mb-[24px]">
            <div className="flex items-center mb-[6px]">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4FC660" strokeWidth="2" strokeLinecap="round" className="mr-[6px] shrink-0"><path d="M20 6L9 17l-5-5" /></svg>
              <p className="font-['Lato',sans-serif] text-[13px] text-green leading-[1.5]">{deal.cancellation_policy}</p>
            </div>
            <div className="flex items-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#989898" strokeWidth="2" strokeLinecap="round" className="mr-[6px] shrink-0"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
              <p className="font-['Lato',sans-serif] text-[13px] text-text-2 leading-[1.5]">{deal.payment_policy}</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="absolute left-[24px] right-[24px] bottom-[34px]">
          <div className="flex items-center justify-center w-full py-[14px] rounded-[30px] bg-main">
            <p className="font-medium text-[16px] text-white leading-[1.5]">Book this hotel</p>
          </div>
        </div>
      </div>
    )
  }

  // ═══ List Mode — Data Dense ═══
  return (
    <div className="bg-card-bg rounded-[12px] overflow-hidden" onClick={onClick}>
      {/* Compact Image */}
      <div className="relative h-[100px] flex items-center justify-center" style={{ background: 'radial-gradient(ellipse at 70% 30%, rgba(255,200,150,0.08), transparent 60%), linear-gradient(135deg, #2A3040, #1E2832, #2A2A2A)' }}>
        <svg className="absolute inset-0 w-full h-full opacity-[0.05]" viewBox="0 0 200 120" fill="none" stroke="white" strokeWidth="1.5" preserveAspectRatio="xMidYMid slice"><rect x="120" y="15" width="50" height="35" rx="2" /><line x1="145" y1="15" x2="145" y2="50" /><line x1="120" y1="32" x2="170" y2="32" /><rect x="30" y="55" width="65" height="35" rx="5" /><rect x="30" y="48" width="65" height="14" rx="4" /><rect x="36" y="60" width="24" height="16" rx="3" /><rect x="65" y="60" width="24" height="16" rx="3" /></svg>
        <div className="absolute top-[8px] right-[8px] bg-green rounded-full px-[8px] py-[3px]">
          <p className="font-bold text-[10px] text-white leading-[1]">Save {pctOff}%</p>
        </div>
        <div className="absolute bottom-[8px] left-[8px] flex items-center">
          {Array.from({ length: deal.stars }, (_, i) => <span key={i} className={i > 0 ? 'ml-[1px]' : ''}><StarIcon filled /></span>)}
        </div>
      </div>

      <div className="px-[12px] py-[10px]">
        {/* Rating prominent */}
        <div className="flex items-center mb-[6px]">
          <div className="bg-green rounded-[4px] px-[6px] py-[2px] mr-[6px]">
            <p className="font-bold text-[12px] text-white leading-[1]">{deal.rating}</p>
          </div>
          <p className="font-['Lato',sans-serif] font-bold text-[12px] text-text-1 leading-[1]">{ratingText}</p>
          <p className="font-['Lato',sans-serif] text-[10px] text-text-2 leading-[1] ml-[4px]">({deal.reviews.toLocaleString()})</p>
        </div>

        {/* Name + Location */}
        <p className="font-medium text-[14px] text-text-1 leading-[1.3] truncate">{deal.name}</p>
        <p className="font-['Lato',sans-serif] text-[11px] text-text-2 leading-[1.5] mt-[1px]">{deal.chain} · {deal.location}</p>

        {/* Amenity Pills */}
        <div className="flex items-center mt-[6px]">
          {deal.amenities.slice(0, 3).map((a, i) => (
            <div key={i} className={`bg-bg-2 rounded-[10px] px-[6px] py-[2px] ${i > 0 ? 'ml-[4px]' : ''}`}>
              <span className="font-['Lato',sans-serif] text-[10px] text-text-2 leading-[1]">{a.replace('Free ', '')}</span>
            </div>
          ))}
        </div>

        {/* Two-column price */}
        <div className="flex items-end justify-between mt-[8px] pt-[8px] border-t border-text-2/10">
          <div>
            <p className="font-bold text-[16px] text-text-1 leading-[1]">${deal.price_per_night}<span className="font-normal text-[11px] text-text-2">/night</span></p>
            <p className="font-['Lato',sans-serif] text-[11px] text-text-2 leading-[1.5] mt-[1px]">${totalAxel.toLocaleString()} total · {deal.nights}n</p>
          </div>
          <div className="text-right">
            <p className="font-['Lato',sans-serif] text-[12px] text-text-2 line-through leading-[1]">${deal.original_price} {deal.comparison_source}</p>
            <p className="font-['Lato',sans-serif] font-bold text-[11px] text-green leading-[1.5] mt-[1px]">Save ${totalSaved.toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

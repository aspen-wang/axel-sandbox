'use client'

// Version E — "Split Overlay"
// Image takes top 60% with hotel name + stars overlaid. Bottom 40% is a frosted glass
// panel overlapping the image with price, rating, dates, and amenities.

function AmenityIcon({ name, size = 12 }) {
  const p = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2.5, strokeLinecap: 'round' }
  if (name.includes('WiFi')) return <svg {...p}><path d="M5 12.55a11 11 0 0114.08 0" /><path d="M8.53 16.11a6 6 0 016.95 0" /><circle cx="12" cy="20" r="1" fill="currentColor" stroke="none" /></svg>
  if (name.includes('Pool')) return <svg {...p}><path d="M2 12c2-2.5 4-2.5 6 0s4 2.5 6 0 4-2.5 6 0" /></svg>
  if (name.includes('Restaurant') || name.includes('Dining') || name.includes('Breakfast')) return <svg {...p} strokeWidth={2}><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 002-2V2M7 2v20M21 15V2a5 5 0 00-5 5v6c0 1.1.9 2 2 2h3v7" /></svg>
  if (name.includes('Spa')) return <svg {...p} fill="currentColor" stroke="none"><path d="M12 2C9 7 4 9 4 14a8 8 0 0016 0c0-5-5-7-8-12z" opacity=".6" /></svg>
  if (name.includes('Fitness')) return <svg {...p}><path d="M6.5 6.5h11M4 12h16M6.5 17.5h11" /></svg>
  if (name.includes('Parking') || name.includes('Valet')) return <svg {...p} strokeWidth={2}><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M9 17V7h4a3 3 0 010 6H9" /></svg>
  return null
}

function StarIcon({ filled }) {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill={filled ? '#F5C518' : '#474747'}>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  )
}

export default function HotelDealCardE({ deal, onClick }) {
  const pctOff = Math.round((deal.saved / deal.original_price) * 100)
  const totalAxel = deal.price_per_night * deal.nights + (deal.taxes || 0)
  const totalOriginal = deal.original_price * deal.nights + (deal.taxes || 0)
  const totalSaved = totalOriginal - totalAxel
  const ratingText = deal.rating >= 4.5 ? 'Excellent' : deal.rating >= 4.0 ? 'Very Good' : deal.rating >= 3.5 ? 'Good' : 'Average'

  return (
    <div className="rounded-[12px] overflow-hidden" onClick={onClick}>
      {/* Image section with name + stars overlaid */}
      <div
        className="relative overflow-hidden"
        style={{
          height: 160,
          background: 'radial-gradient(ellipse at 60% 25%, rgba(255,200,150,0.1), transparent 60%), linear-gradient(160deg, #2A3040, #1E2832, #232323)',
        }}
      >
        <svg className="absolute inset-0 w-full h-full opacity-[0.04]" viewBox="0 0 200 120" fill="none" stroke="white" strokeWidth="1.5" preserveAspectRatio="xMidYMid slice"><rect x="120" y="15" width="50" height="35" rx="2" /><line x1="145" y1="15" x2="145" y2="50" /><line x1="120" y1="32" x2="170" y2="32" /><rect x="30" y="55" width="65" height="35" rx="5" /><rect x="30" y="48" width="65" height="14" rx="4" /><rect x="36" y="60" width="24" height="16" rx="3" /><rect x="65" y="60" width="24" height="16" rx="3" /></svg>

        {/* Save badge top-right */}
        <div className="absolute top-[10px] right-[10px] inline-flex items-center bg-green rounded-full px-[10px] py-[4px]">
          <span className="font-bold text-[11px] text-white leading-[1]">Save {pctOff}%</span>
        </div>

        {/* Name + stars overlaid on bottom of image */}
        <div className="absolute bottom-0 left-0 right-0 px-[14px] pb-[10px]" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.75), transparent)' }}>
          <span className="font-medium text-[16px] text-white leading-[1.3]">{deal.name}</span>
          <div className="flex items-center mt-[4px]">
            <div className="flex items-center mr-[6px]">
              {Array.from({ length: deal.stars }, (_, i) => <span key={i} className={i > 0 ? 'ml-[1px]' : ''}><StarIcon filled /></span>)}
            </div>
            <span className="font-['Lato',sans-serif] text-[11px] text-white/60 leading-[1]">{deal.chain} · {deal.location}</span>
          </div>
        </div>
      </div>

      {/* Info panel — overlaps image slightly via negative margin */}
      <div className="bg-card-bg rounded-t-[12px] px-[14px] py-[12px]" style={{ marginTop: -8 }}>
        {/* Rating + dates row */}
        <div className="flex items-center justify-between mb-[10px]">
          <div className="flex items-center">
            <div className="inline-flex items-center bg-green rounded-[6px] px-[8px] py-[4px] mr-[6px]">
              <span className="font-bold text-[12px] text-white leading-[1]">{deal.rating}</span>
            </div>
            <span className="font-['Lato',sans-serif] font-bold text-[12px] text-text-1 leading-[1]">{ratingText}</span>
            <span className="font-['Lato',sans-serif] text-[10px] text-text-2 leading-[1] ml-[4px]">({deal.reviews.toLocaleString()})</span>
          </div>
          <span className="font-['Lato',sans-serif] text-[11px] text-text-2 leading-[1]">{deal.nights} night{deal.nights !== 1 ? 's' : ''}</span>
        </div>

        {/* Amenity row */}
        <div className="flex items-center mb-[10px]">
          {(deal.amenities || []).slice(0, 4).map((a, i) => (
            <div key={i} className={`inline-flex items-center bg-bg-2 rounded-full px-[8px] py-[4px] ${i > 0 ? 'ml-[4px]' : ''}`}>
              <span className="text-text-2 opacity-60 mr-[4px]"><AmenityIcon name={a} size={10} /></span>
              <span className="font-['Lato',sans-serif] text-[10px] text-text-2 leading-[1]">{a.replace('Free ', '')}</span>
            </div>
          ))}
        </div>

        {/* Price + savings */}
        <div className="flex items-end justify-between pt-[10px] border-t border-text-2/10">
          <div>
            <div className="flex items-baseline">
              <span className="font-bold text-[20px] text-text-1 leading-[1]">${deal.price_per_night}</span>
              <span className="font-['Lato',sans-serif] text-[12px] text-text-2 leading-[1] ml-[4px]">/night</span>
            </div>
            <span className="font-['Lato',sans-serif] text-[11px] text-text-2 leading-[1.4]">${totalAxel.toLocaleString()} total incl. taxes</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="font-['Lato',sans-serif] text-[12px] text-text-2 line-through leading-[1]">${deal.original_price}</span>
            <div className="inline-flex items-center bg-green/10 rounded-full px-[8px] py-[4px] mt-[4px]">
              <span className="font-bold text-[11px] text-green leading-[1]">Save ${totalSaved}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

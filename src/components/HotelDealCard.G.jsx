'use client'

// Version G — "Cinematic Compact"
// Based on F. Shorter card, tighter layout. Rating + price merged into one bottom row.
// Amenities shown as icon-only row. Room type inline with location.
// Color rule: black text on solid green bg, green text on green/10 bg.

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
    <svg width="10" height="10" viewBox="0 0 24 24" fill={filled ? '#F5C518' : '#474747'}>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  )
}

export default function HotelDealCardG({ deal, onClick }) {
  const pctOff = Math.round((deal.saved / deal.original_price) * 100)
  const totalAxel = deal.price_per_night * deal.nights + (deal.taxes || 0)
  const totalOriginal = deal.original_price * deal.nights + (deal.taxes || 0)
  const totalSaved = totalOriginal - totalAxel
  const ratingText = deal.rating >= 4.5 ? 'Excellent' : deal.rating >= 4.0 ? 'Very Good' : deal.rating >= 3.5 ? 'Good' : 'Average'

  return (
    <div
      className="relative rounded-[12px] overflow-hidden flex flex-col justify-between"
      onClick={onClick}
      style={{
        height: 260,
        background: 'radial-gradient(ellipse at 50% 20%, rgba(255,200,150,0.08), transparent 60%), linear-gradient(170deg, #2A3040, #1E2832, #1a1a1a)',
      }}
    >
      <svg className="absolute inset-0 w-full h-full opacity-[0.04]" viewBox="0 0 200 120" fill="none" stroke="white" strokeWidth="1.5" preserveAspectRatio="xMidYMid slice"><rect x="120" y="15" width="50" height="35" rx="2" /><line x1="145" y1="15" x2="145" y2="50" /><line x1="120" y1="32" x2="170" y2="32" /><rect x="30" y="55" width="65" height="35" rx="5" /><rect x="30" y="48" width="65" height="14" rx="4" /><rect x="36" y="60" width="24" height="16" rx="3" /><rect x="65" y="60" width="24" height="16" rx="3" /></svg>

      {/* Top: save badge only */}
      <div className="relative flex items-start justify-end px-[12px] pt-[12px]">
        <div className="inline-flex items-center bg-green rounded-full px-[10px] py-[4px]">
          <span className="font-bold text-[11px] text-black leading-[1]">{pctOff}% off</span>
        </div>
      </div>

      {/* Bottom gradient — all info */}
      <div className="relative" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.6) 55%, transparent 100%)' }}>
        <div className="px-[14px] pb-[14px] pt-[32px]">
          {/* Hotel name */}
          <span className="font-medium text-[16px] text-white leading-[1.3]">{deal.name}</span>

          {/* Stars + location + room type */}
          <div className="flex items-center mt-[4px] mb-[8px]">
            <div className="flex items-center mr-[6px]">
              {Array.from({ length: deal.stars }, (_, i) => <span key={i} className={i > 0 ? 'ml-[1px]' : ''}><StarIcon filled /></span>)}
            </div>
            <span className="font-['Lato',sans-serif] text-[10px] text-white/50 leading-[1]">{deal.location} · {deal.room_type}</span>
          </div>

          {/* Amenity icons only — no text labels */}
          <div className="flex items-center mb-[10px]">
            {(deal.amenities || []).slice(0, 6).map((a, i) => (
              <div key={i} className={`inline-flex items-center justify-center bg-white/10 rounded-full px-[6px] py-[4px] ${i > 0 ? 'ml-[4px]' : ''}`}>
                <span className="text-white/50"><AmenityIcon name={a} size={12} /></span>
              </div>
            ))}
          </div>

          {/* Merged price + rating row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="inline-flex items-center bg-green rounded-[4px] px-[6px] py-[4px] mr-[6px]">
                <span className="font-bold text-[11px] text-black leading-[1]">{deal.rating}</span>
              </div>
              <span className="font-['Lato',sans-serif] text-[11px] text-white/60 leading-[1]">{ratingText}</span>
            </div>
            <div className="flex items-baseline">
              <span className="font-bold text-[20px] text-white leading-[1]">${deal.price_per_night}</span>
              <span className="font-['Lato',sans-serif] text-[11px] text-white/40 leading-[1] ml-[4px]">/night</span>
              <span className="font-['Lato',sans-serif] text-[12px] text-white/30 line-through leading-[1] ml-[6px]">${deal.original_price}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

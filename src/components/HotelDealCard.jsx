'use client'

import statusIcons from '@/assets/status-icons.svg'

// ─── Default mock data ──────────────────────────────────────────────
const DEFAULT_DEAL = {
  name: 'The Westin San Francisco', chain: 'Westin', location: 'Union Square',
  stars: 4, rating: 4.3, reviews: 2847,
  room_type: 'King Room', bed_type: 'King', max_guests: '2 adults',
  checkin: 'Apr 15', checkout: 'Apr 18', checkin_time: '3:00 PM', checkout_time: '11:00 AM',
  nights: 3, price_per_night: 204, original_price: 289, saved: 85, taxes: 58,
  amenities: ['Free WiFi', 'Pool', 'Parking', 'Fitness'],
  cancellation_policy: 'Free cancellation', payment_policy: 'Pay at property',
  comparison_source: 'Booking.com',
}

// ─── Amenity Icons ──────────────────────────────────────────────────
function AmenityIcon({ name, size = 12 }) {
  const p = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2.5, strokeLinecap: 'round' }
  if (name.includes('WiFi')) return <svg {...p}><path d="M5 12.55a11 11 0 0114.08 0" /><path d="M8.53 16.11a6 6 0 016.95 0" /><circle cx="12" cy="20" r="1" fill="currentColor" stroke="none" /></svg>
  if (name.includes('Pool')) return <svg {...p}><path d="M2 12c2-2.5 4-2.5 6 0s4 2.5 6 0 4-2.5 6 0" /></svg>
  if (name.includes('Restaurant') || name.includes('Dining') || name.includes('Breakfast')) return <svg {...p} strokeWidth={2}><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 002-2V2M7 2v20M21 15V2a5 5 0 00-5 5v6c0 1.1.9 2 2 2h3v7" /></svg>
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
    <svg width="11" height="11" viewBox="0 0 24 24" fill={filled ? '#F5C518' : '#333'}>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  )
}

function HotelImagePlaceholder() {
  return (
    <svg className="absolute inset-0 w-full h-full opacity-[0.05]" viewBox="0 0 200 120" fill="none" stroke="white" strokeWidth="1.5" preserveAspectRatio="xMidYMid slice">
      <rect x="120" y="15" width="50" height="35" rx="2" />
      <line x1="145" y1="15" x2="145" y2="50" />
      <line x1="120" y1="32" x2="170" y2="32" />
      <rect x="30" y="55" width="65" height="35" rx="5" />
      <rect x="30" y="48" width="65" height="14" rx="4" />
      <rect x="36" y="60" width="24" height="16" rx="3" />
      <rect x="65" y="60" width="24" height="16" rx="3" />
    </svg>
  )
}

// ─── Skeleton ───────────────────────────────────────────────────────
function Skeleton() {
  return (
    <div className="bg-[#111] rounded-[12px] border border-[#222] overflow-hidden animate-pulse">
      <div className="h-[140px] bg-[#1a1a1a]" />
      <div className="px-[14px] py-[12px]">
        <div className="flex items-start justify-between mb-[6px]">
          <div className="h-[14px] w-[160px] bg-[#222] rounded" />
          <div className="h-[14px] w-[40px] bg-[#222] rounded" />
        </div>
        <div className="h-[11px] w-[120px] bg-[#1a1a1a] rounded mb-[10px]" />
        <div className="flex items-center mb-[10px]">
          <div className="h-[10px] w-[40px] bg-[#1a1a1a] rounded mr-[10px]" />
          <div className="h-[10px] w-[50px] bg-[#1a1a1a] rounded mr-[10px]" />
          <div className="h-[10px] w-[30px] bg-[#1a1a1a] rounded" />
        </div>
        <div className="h-[11px] w-[140px] bg-[#1a1a1a] rounded mb-[8px]" />
        <div className="flex items-baseline mb-[8px]">
          <div className="h-[18px] w-[50px] bg-[#222] rounded mr-[8px]" />
          <div className="h-[12px] w-[30px] bg-[#1a1a1a] rounded" />
        </div>
        <div className="border-t border-[#222] pt-[10px] flex items-center justify-between">
          <div className="flex items-center"><div className="h-[20px] w-[28px] bg-[#222] rounded mr-[6px]" /><div className="h-[12px] w-[60px] bg-[#1a1a1a] rounded" /></div>
          <div className="h-[12px] w-[60px] bg-[#1a1a1a] rounded" />
        </div>
      </div>
    </div>
  )
}

// ─── Main Component ─────────────────────────────────────────────────
export default function HotelDealCard({
  deal = DEFAULT_DEAL,
  mode = 'list',
  loading = false,
  bestDeal = false,
  nonRefundable = false,
  onClick,
}) {
  if (loading) return <Skeleton />

  const pctOff = Math.round((deal.saved / deal.original_price) * 100)
  const totalAxel = deal.price_per_night * deal.nights + (deal.taxes || 0)
  const totalOriginal = deal.original_price * deal.nights + (deal.taxes || 0)
  const totalSaved = totalOriginal - totalAxel
  const ratingText = deal.rating >= 4.5 ? 'Excellent' : deal.rating >= 4.0 ? 'Very Good' : deal.rating >= 3.5 ? 'Good' : 'Average'

  const isNonRefundable = nonRefundable || deal.cancellation_policy?.toLowerCase().includes('non-refundable')
  const isFreeCancel = !isNonRefundable && deal.cancellation_policy?.toLowerCase().includes('free')

  // ═══ Detail Mode (preserved) ═══
  if (mode === 'detail') {
    return (
      <div className="bg-bg overflow-clip relative rounded-[30px] w-[393px] h-[852px] font-['Inter',sans-serif]">
        <div className="absolute top-0 left-0 right-0 flex h-[59px] items-center justify-between overflow-clip px-[28px] py-[15px]">
          <p className="font-['SF_Pro_Text',sans-serif] font-bold text-[15px] text-text-1 text-center tracking-[-0.045px] leading-[18px] w-[54px] h-[18px] shrink-0">9:41</p>
          <div className="relative shrink-0 w-[66.16px] h-[11px]"><img alt="" className="block max-w-none w-full h-full" src={statusIcons.src || statusIcons} /></div>
        </div>
        <div className="absolute left-0 right-0 top-[59px] px-[24px] py-[12px]">
          <div className="flex items-center">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="mr-[8px]"><path d="M12 15l-5-5 5-5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            <p className="font-medium text-[16px] text-text-1 leading-[1.5]">Hotel Details</p>
          </div>
        </div>
        <div className="absolute left-0 right-0 top-[103px] bottom-[88px] overflow-y-auto px-[16px]">
          <div className="relative h-[220px] rounded-[12px] mb-[16px] flex items-center justify-center overflow-hidden" style={{ background: 'radial-gradient(ellipse at 70% 30%, rgba(255,200,150,0.08), transparent 60%), linear-gradient(135deg, #2A3040, #1E2832, #2A2A2A)' }}>
            <HotelImagePlaceholder />
            <div className="absolute top-[12px] right-[12px] bg-green rounded-full px-[10px] py-[4px]"><p className="font-bold text-[12px] text-white leading-[1]">Save {pctOff}%</p></div>
          </div>
          <div className="mb-[12px]">
            <p className="font-medium text-[20px] text-text-1 leading-[1.4]">{deal.name}</p>
            <div className="flex items-center mt-[4px]">
              <div className="flex items-center mr-[8px]">{Array.from({ length: 5 }, (_, i) => <span key={i} className={i > 0 ? 'ml-[1px]' : ''}><StarIcon filled={i < deal.stars} /></span>)}</div>
              <p className="font-['Lato',sans-serif] text-[13px] text-text-2 leading-[1.5]">{deal.chain} · {deal.location}</p>
            </div>
          </div>
          <div className="flex items-center mb-[16px]">
            <div className="bg-green rounded-[6px] px-[8px] py-[4px] mr-[8px]"><p className="font-bold text-[14px] text-white leading-[1]">{deal.rating}</p></div>
            <p className="font-['Lato',sans-serif] font-bold text-[14px] text-text-1 leading-[1.5]">{ratingText}</p>
            <p className="font-['Lato',sans-serif] text-[13px] text-text-2 leading-[1.5] ml-[8px]">{deal.reviews.toLocaleString()} reviews</p>
          </div>
          <div className="bg-card-bg rounded-[12px] px-[16px] py-[14px] mb-[12px]">
            <p className="font-medium text-[11px] text-text-2 leading-[1.5] uppercase tracking-wider mb-[10px]">Amenities</p>
            <div className="flex flex-wrap">{deal.amenities.map((a, i) => (<div key={i} className="flex items-center bg-bg-2 rounded-[20px] px-[10px] py-[5px] mr-[6px] mb-[6px]"><span className="text-text-2 opacity-60 mr-[4px]"><AmenityIcon name={a} /></span><span className="font-['Lato',sans-serif] text-[11px] text-text-2 leading-[1]">{a.replace('Free ', '')}</span></div>))}</div>
          </div>
          <div className="bg-card-bg rounded-[12px] px-[16px] py-[14px] mb-[12px]">
            <p className="font-medium text-[11px] text-text-2 leading-[1.5] uppercase tracking-wider mb-[10px]">Room Details</p>
            {[['Room', deal.room_type], ['Bed', deal.bed_type], ['Guests', deal.max_guests], ['Check-in', deal.checkin_time], ['Check-out', deal.checkout_time]].map(([label, value], i) => (
              <div key={i} className={`flex items-center justify-between ${i < 4 ? 'mb-[8px]' : ''}`}><p className="font-['Lato',sans-serif] text-[13px] text-text-2 leading-[1.5]">{label}</p><p className="font-['Lato',sans-serif] text-[13px] text-text-1 leading-[1.5]">{value}</p></div>
            ))}
          </div>
          <div className="bg-card-bg rounded-[12px] overflow-hidden mb-[12px]">
            <div className="px-[16px] py-[14px]">
              <p className="font-medium text-[11px] text-text-2 leading-[1.5] uppercase tracking-wider mb-[10px]">Price Comparison</p>
              <div className="flex mb-[8px]">
                <div className="flex-1 bg-bg-2 rounded-[8px] px-[12px] py-[10px] mr-[8px]"><p className="font-['Lato',sans-serif] text-[11px] text-text-2 leading-[1.5] mb-[2px]">{deal.comparison_source}</p><p className="font-medium text-[18px] text-secondary line-through leading-[1.3]">${deal.original_price}<span className="text-[12px]">/night</span></p></div>
                <div className="flex-1 bg-green/10 rounded-[8px] px-[12px] py-[10px] border border-green/20"><p className="font-['Lato',sans-serif] text-[11px] text-green leading-[1.5] mb-[2px]">Axel</p><p className="font-medium text-[18px] text-text-1 leading-[1.3]">${deal.price_per_night}<span className="text-[12px] text-text-2">/night</span></p></div>
              </div>
              <div className="flex">
                <div className="flex-1 bg-bg-2 rounded-[8px] px-[12px] py-[10px] mr-[8px]"><p className="font-['Lato',sans-serif] text-[11px] text-text-2 leading-[1.5] mb-[2px]">{deal.nights} nights total</p><p className="font-medium text-[16px] text-secondary line-through leading-[1.3]">${totalOriginal.toLocaleString()}</p></div>
                <div className="flex-1 bg-green/10 rounded-[8px] px-[12px] py-[10px] border border-green/20"><p className="font-['Lato',sans-serif] text-[11px] text-green leading-[1.5] mb-[2px]">with Axel</p><p className="font-medium text-[16px] text-text-1 leading-[1.3]">${totalAxel.toLocaleString()}</p></div>
              </div>
            </div>
            <div className="bg-green/20 flex items-center justify-center px-[16px] py-[10px]"><p className="font-['Lato',sans-serif] font-bold text-[14px] text-green leading-[1.5]">Save ${totalSaved.toLocaleString()} · {pctOff}% off</p></div>
          </div>
          <div className="bg-card-bg rounded-[12px] px-[16px] py-[14px] mb-[12px]">
            <p className="font-medium text-[11px] text-text-2 leading-[1.5] uppercase tracking-wider mb-[10px]">Price Breakdown</p>
            <div className="flex items-center justify-between mb-[8px]"><p className="font-['Lato',sans-serif] text-[13px] text-text-2 leading-[1.5]">Room rate × {deal.nights} nights</p><p className="font-['Lato',sans-serif] text-[13px] text-text-1 leading-[1.5]">${(deal.price_per_night * deal.nights).toLocaleString()}</p></div>
            <div className="flex items-center justify-between mb-[8px]"><p className="font-['Lato',sans-serif] text-[13px] text-text-2 leading-[1.5]">Taxes &amp; fees</p><p className="font-['Lato',sans-serif] text-[13px] text-text-1 leading-[1.5]">${deal.taxes}</p></div>
            <div className="flex items-center justify-between mb-[12px]"><p className="font-['Lato',sans-serif] text-[13px] text-green leading-[1.5]">Axel discount</p><p className="font-['Lato',sans-serif] text-[13px] text-green leading-[1.5]">&minus;${totalSaved.toLocaleString()}</p></div>
            <div className="border-t border-grey pt-[12px] flex items-center justify-between"><p className="font-medium text-[16px] text-text-1 leading-[1.5]">Total</p><p className="font-medium text-[20px] text-text-1 leading-[1.5]">${totalAxel.toLocaleString()}</p></div>
          </div>
          <div className="bg-card-bg rounded-[12px] px-[16px] py-[14px] mb-[24px]">
            <p className="font-medium text-[11px] text-text-2 leading-[1.5] uppercase tracking-wider mb-[10px]">Policies</p>
            <div className="flex items-center justify-between mb-[8px]"><p className="font-['Lato',sans-serif] text-[13px] text-text-2 leading-[1.5]">Cancellation</p><p className="font-['Lato',sans-serif] text-[13px] text-green leading-[1.5]">{deal.cancellation_policy}</p></div>
            <div className="flex items-center justify-between"><p className="font-['Lato',sans-serif] text-[13px] text-text-2 leading-[1.5]">Payment</p><p className="font-['Lato',sans-serif] text-[13px] text-text-1 leading-[1.5]">{deal.payment_policy}</p></div>
          </div>
        </div>
        <div className="absolute left-[24px] right-[24px] bottom-[34px]">
          <div className="flex items-center justify-center w-full py-[14px] rounded-[30px] bg-main"><p className="font-medium text-[16px] text-white leading-[1.5]">Book this hotel</p></div>
        </div>
      </div>
    )
  }

  // ═══ List / Card Mode ═══════════════════════════════════════════════
  return (
    <div
      onClick={onClick}
      className="group bg-[#111] rounded-[12px] border border-[#222] overflow-hidden hover:border-[#333] transition-colors cursor-pointer"
      style={bestDeal ? { borderLeft: '3px solid #4FC660' } : undefined}
    >
      {/* Image Area */}
      <div className="relative h-[140px] flex items-center justify-center overflow-hidden" style={{ background: 'radial-gradient(ellipse at 70% 30%, rgba(255,200,150,0.06), transparent 60%), linear-gradient(135deg, #1a1f28, #151a20, #1a1a1a)' }}>
        <HotelImagePlaceholder />
        {/* Save badge */}
        <div className="absolute top-[10px] right-[10px] bg-[#4FC660] rounded-full px-[8px] py-[3px]">
          <span className="font-['Lato',sans-serif] font-bold text-[10px] text-white leading-[1]">Save {pctOff}%</span>
        </div>
        {/* Stars */}
        <div className="absolute bottom-[10px] left-[10px] flex items-center">
          {Array.from({ length: deal.stars }, (_, i) => <span key={i} className={i > 0 ? 'ml-[1px]' : ''}><StarIcon filled /></span>)}
        </div>
        {bestDeal && (
          <div className="absolute top-[10px] left-[10px] bg-[#4FC660]/15 rounded-full px-[8px] py-[3px]">
            <span className="font-['Lato',sans-serif] font-medium text-[10px] leading-[1]" style={{ color: '#4FC660' }}>Best Value</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="px-[14px] py-[12px]">
        {/* Name + Rating */}
        <div className="flex items-start justify-between mb-[2px]">
          <p className="font-['Lato',sans-serif] font-medium text-[15px] text-white leading-[1.3] truncate flex-1 mr-[8px]">{deal.name}</p>
          <div className="flex items-center shrink-0">
            <div className="bg-[#4FC660] rounded-[4px] px-[5px] py-[2px]">
              <span className="font-['Lato',sans-serif] font-bold text-[11px] text-white leading-[1]">{deal.rating}</span>
            </div>
          </div>
        </div>

        {/* Location + Room */}
        <p className="font-['Lato',sans-serif] text-[12px] text-[#888] leading-[1.4]">{deal.location} · {deal.room_type}</p>

        {/* Amenity Icons */}
        <div className="flex items-center mt-[8px] mb-[8px]">
          {(deal.amenities || []).slice(0, 4).map((a, i) => (
            <div key={i} className={`flex items-center text-[#666] ${i > 0 ? 'ml-[10px]' : ''}`}>
              <span className="mr-[3px]"><AmenityIcon name={a} size={11} /></span>
              <span className="font-['Lato',sans-serif] text-[10px] text-[#888] leading-[1]">{a.replace('Free ', '')}</span>
            </div>
          ))}
        </div>

        {/* Dates */}
        {(deal.checkin || deal.checkout) && (
          <p className="font-['Lato',sans-serif] text-[11px] text-[#666] leading-[1.3] mb-[8px]">
            {deal.checkin} → {deal.checkout} · {deal.nights} night{deal.nights !== 1 ? 's' : ''}
          </p>
        )}

        {/* Price */}
        <div className="flex items-baseline mb-[2px]">
          <span className="font-['Lato',sans-serif] font-medium text-[20px] leading-[1]" style={{ color: '#4FC660' }}>${deal.price_per_night}</span>
          <span className="font-['Lato',sans-serif] text-[12px] text-[#666] leading-[1] ml-[2px]">/night</span>
          <span className="font-['Lato',sans-serif] text-[13px] text-[#888] line-through leading-[1] ml-[8px]">${deal.original_price}</span>
        </div>
        <p className="font-['Lato',sans-serif] text-[11px] text-[#666] leading-[1.3]">${totalAxel.toLocaleString()} total incl. taxes</p>

        {/* Bottom row */}
        <div className="border-t border-[#222] pt-[10px] mt-[10px] flex items-center justify-between">
          <div className="flex items-center">
            <span className="font-['Lato',sans-serif] font-bold text-[11px] leading-[1] mr-[4px]" style={{ color: '#4FC660' }}>{ratingText}</span>
            <span className="font-['Lato',sans-serif] text-[10px] text-[#666] leading-[1]">({deal.reviews.toLocaleString()})</span>
          </div>
          {/* Cancellation + Savings */}
          <div className="flex items-center">
            {isFreeCancel && (
              <span className="font-['Lato',sans-serif] text-[10px] leading-[1] mr-[8px]" style={{ color: '#4FC660' }}>Free cancellation</span>
            )}
            {isNonRefundable && (
              <span className="font-['Lato',sans-serif] text-[10px] leading-[1] mr-[8px]" style={{ color: '#FB7A29' }}>Non-refundable</span>
            )}
            <div className="bg-[#4FC660]/10 rounded-full px-[8px] py-[3px]">
              <span className="font-['Lato',sans-serif] font-medium text-[11px] leading-[1]" style={{ color: '#4FC660' }}>Save ${totalSaved}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

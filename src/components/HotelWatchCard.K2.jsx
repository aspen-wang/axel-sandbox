'use client'

// K2 — Dates overlaid on image as pills, stars in details, wider price area

function StarIcon({ filled }) {
  return (
    <svg width="8" height="8" viewBox="0 0 24 24" fill={filled ? '#F5C518' : '#474747'}>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  )
}

function ImagePlaceholder() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#474747" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <path d="M21 15l-5-5L5 21" />
    </svg>
  )
}

export default function HotelWatchCardK2({ watch, onClick }) {
  const axelPrice = watch.axel_price || watch.current_price
  const saved = watch.current_price - axelPrice
  const total = axelPrice * watch.nights

  return (
    <div className="bg-bg-2 rounded-[14px] overflow-hidden" onClick={onClick}>
      {/* Image with date pills */}
      <div className="relative h-[100px] bg-[#2A2A2A] flex items-center justify-center">
        <ImagePlaceholder />

        {/* Date pills bottom */}
        <div className="absolute bottom-[8px] left-[10px] flex items-center">
          <div className="bg-black/60 rounded-full px-[8px] py-[3px]">
            <p className="font-['Lato',sans-serif] text-[10px] text-text-1 leading-[1]">{watch.check_in}</p>
          </div>
          <svg width="12" height="6" viewBox="0 0 12 6" className="mx-[4px] text-text-2/50">
            <path d="M0 3h9M7 1l2 2-2 2" stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round" />
          </svg>
          <div className="bg-black/60 rounded-full px-[8px] py-[3px]">
            <p className="font-['Lato',sans-serif] text-[10px] text-text-1 leading-[1]">{watch.check_out}</p>
          </div>
          <p className="font-['Lato',sans-serif] text-[9px] text-text-2/50 leading-[1] ml-[6px]">{watch.nights}n</p>
        </div>
      </div>

      {/* Details */}
      <div className="px-[14px] py-[12px]">
        {/* Name row */}
        <p className="font-medium text-[14px] text-text-1 leading-[1.2] truncate">{watch.name}</p>

        {/* Stars + chain + location */}
        <div className="flex items-center mt-[4px]">
          {Array.from({ length: 5 }, (_, i) => (
            <span key={i} className={i > 0 ? 'ml-[1px]' : ''}><StarIcon filled={i < watch.stars} /></span>
          ))}
          <span className="font-['Lato',sans-serif] text-[11px] text-text-2 leading-[1] ml-[6px]">{watch.chain} · {watch.location}</span>
        </div>

        {/* Price bar */}
        <div className="flex items-center justify-between mt-[10px] pt-[10px] border-t border-text-2/10">
          <div className="flex items-baseline">
            <p className="font-bold text-[18px] text-text-1 leading-[1]">${axelPrice}</p>
            <p className="font-['Lato',sans-serif] text-[10px] text-text-2 leading-[1] ml-[2px]">/nt</p>
            {saved > 0 && (
              <p className="font-['Lato',sans-serif] text-[11px] text-text-2/40 line-through leading-[1] ml-[6px]">${watch.current_price}</p>
            )}
          </div>
          <div className="text-right">
            <p className="font-['Lato',sans-serif] text-[11px] text-text-2 leading-[1]">${total} total</p>
            {saved > 0 && (
              <p className="font-['Lato',sans-serif] font-bold text-[10px] text-green leading-[1] mt-[2px]">Save ${saved * watch.nights}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

'use client'

// K4 — Room type badge on image, two-row details: name+price top, dates+location bottom

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

export default function HotelWatchCardK4({ watch, onClick }) {
  const axelPrice = watch.axel_price || watch.current_price
  const saved = watch.current_price - axelPrice
  const total = axelPrice * watch.nights

  return (
    <div className="bg-bg-2 rounded-[14px] overflow-hidden" onClick={onClick}>
      {/* Image */}
      <div className="relative h-[100px] bg-[#2A2A2A] flex items-center justify-center">
        <ImagePlaceholder />

        {/* Room type badge top-left */}
        <div className="absolute top-[10px] left-[10px] bg-black/60 rounded-full px-[8px] py-[3px]">
          <p className="font-['Lato',sans-serif] text-[10px] text-text-1 leading-[1]">{watch.room_type}</p>
        </div>

        {/* Stars + nights bottom-right */}
        <div className="absolute bottom-[8px] right-[10px] flex items-center bg-black/60 rounded-full px-[8px] py-[3px]">
          {Array.from({ length: watch.stars }, (_, i) => (
            <span key={i} className={i > 0 ? 'ml-[1px]' : ''}><StarIcon filled /></span>
          ))}
          <span className="font-['Lato',sans-serif] text-[9px] text-text-2 leading-[1] ml-[4px]">{watch.nights}n</span>
        </div>
      </div>

      {/* Details — two rows */}
      <div className="px-[14px] py-[12px]">
        {/* Row 1: name + price */}
        <div className="flex items-baseline justify-between">
          <p className="font-medium text-[14px] text-text-1 leading-[1.2] truncate flex-1 mr-[10px]">{watch.name}</p>
          <div className="flex items-baseline shrink-0">
            {saved > 0 && (
              <p className="font-['Lato',sans-serif] text-[11px] text-text-2/40 line-through leading-[1] mr-[5px]">${watch.current_price}</p>
            )}
            <p className="font-bold text-[17px] text-text-1 leading-[1]">${axelPrice}</p>
            <p className="font-['Lato',sans-serif] text-[9px] text-text-2 leading-[1] ml-[2px]">/nt</p>
          </div>
        </div>

        {/* Row 2: location + dates + savings */}
        <div className="flex items-center justify-between mt-[8px]">
          <p className="font-['Lato',sans-serif] text-[11px] text-text-2 leading-[1]">
            {watch.chain} · {watch.location}
          </p>
          <div className="flex items-center shrink-0 ml-[8px]">
            <p className="font-['Lato',sans-serif] text-[11px] text-text-2/50 leading-[1]">{watch.check_in}–{watch.check_out}</p>
            {saved > 0 && (
              <p className="font-['Lato',sans-serif] font-bold text-[10px] text-green leading-[1] ml-[8px]">-${saved * watch.nights}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

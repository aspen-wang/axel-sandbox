'use client'

// K5 — Edge-to-edge image with chain pill, details in a compact inset row

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

export default function HotelWatchCardK5({ watch, onClick }) {
  const axelPrice = watch.axel_price || watch.current_price
  const saved = watch.current_price - axelPrice
  const total = axelPrice * watch.nights

  return (
    <div className="bg-bg-2 rounded-[14px] overflow-hidden" onClick={onClick}>
      {/* Image */}
      <div className="relative h-[100px] bg-[#2A2A2A] flex items-center justify-center">
        <ImagePlaceholder />

        {/* Chain pill top-left */}
        <div className="absolute top-[10px] left-[10px] bg-black/60 rounded-full px-[8px] py-[3px]">
          <p className="font-['Lato',sans-serif] text-[10px] text-text-2 leading-[1]">{watch.chain}</p>
        </div>

        {/* Price overlay bottom-right */}
        <div className="absolute bottom-[8px] right-[10px] bg-black/70 rounded-[8px] px-[10px] py-[6px]">
          <div className="flex items-baseline">
            <p className="font-bold text-[16px] text-text-1 leading-[1]">${axelPrice}</p>
            <p className="font-['Lato',sans-serif] text-[9px] text-text-2 leading-[1] ml-[2px]">/nt</p>
          </div>
        </div>
      </div>

      {/* Compact inset detail row */}
      <div className="mx-[8px] my-[8px] bg-bg rounded-[8px] px-[12px] py-[10px]">
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0 mr-[8px]">
            <p className="font-medium text-[13px] text-text-1 leading-[1.2] truncate">{watch.name}</p>
            <div className="flex items-center mt-[4px]">
              {Array.from({ length: 5 }, (_, i) => (
                <span key={i} className={i > 0 ? 'ml-[1px]' : ''}><StarIcon filled={i < watch.stars} /></span>
              ))}
              <span className="font-['Lato',sans-serif] text-[10px] text-text-2/50 leading-[1] ml-[5px]">{watch.location}</span>
            </div>
          </div>
          <div className="text-right shrink-0">
            <p className="font-['Lato',sans-serif] text-[10px] text-text-2/60 leading-[1]">{watch.check_in}–{watch.check_out}</p>
            <div className="flex items-center justify-end mt-[3px]">
              <p className="font-['Lato',sans-serif] text-[10px] text-text-2 leading-[1]">${total}</p>
              {saved > 0 && (
                <p className="font-['Lato',sans-serif] font-bold text-[10px] text-green leading-[1] ml-[6px]">-${saved * watch.nights}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

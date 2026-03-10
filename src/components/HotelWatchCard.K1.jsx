'use client'

// K1 — Savings badge on image, price moved to details bar, amenities added

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

function AmenityDot({ name }) {
  const p = { width: 10, height: 10, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2.5, strokeLinecap: 'round' }
  if (name.includes('WiFi')) return <svg {...p}><path d="M5 12.55a11 11 0 0114.08 0" /><path d="M8.53 16.11a6 6 0 016.95 0" /><circle cx="12" cy="20" r="1" fill="currentColor" stroke="none" /></svg>
  if (name.includes('Pool')) return <svg {...p}><path d="M2 12c2-2.5 4-2.5 6 0s4 2.5 6 0 4-2.5 6 0" /></svg>
  if (name.includes('Spa')) return <svg {...p} fill="currentColor" stroke="none"><path d="M12 2C9 7 4 9 4 14a8 8 0 0016 0c0-5-5-7-8-12z" opacity=".6" /></svg>
  if (name.includes('Fitness')) return <svg {...p}><path d="M6.5 6.5h11M4 12h16M6.5 17.5h11" /></svg>
  if (name.includes('Restaurant') || name.includes('Dining')) return <svg {...p} strokeWidth={2}><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 002-2V2M7 2v20M21 15V2a5 5 0 00-5 5v6c0 1.1.9 2 2 2h3v7" /></svg>
  if (name.includes('Bar')) return <svg {...p} strokeWidth={2}><path d="M8 21h8M12 17v4M6 3h12l-4.5 7.5V17h-3V10.5z" /></svg>
  return null
}

export default function HotelWatchCardK1({ watch, onClick }) {
  const axelPrice = watch.axel_price || watch.current_price
  const saved = watch.current_price - axelPrice
  const total = axelPrice * watch.nights

  return (
    <div className="bg-bg-2 rounded-[14px] overflow-hidden" onClick={onClick}>
      {/* Image */}
      <div className="relative h-[100px] bg-[#2A2A2A] flex items-center justify-center">
        <ImagePlaceholder />

        {/* Savings pill top-right */}
        {saved > 0 && (
          <div className="absolute top-[10px] right-[10px] bg-green/90 rounded-full px-[8px] py-[3px]">
            <p className="font-bold text-[10px] text-white leading-[1]">Save ${saved * watch.nights}</p>
          </div>
        )}

        {/* Stars bottom-left */}
        <div className="absolute bottom-[8px] left-[10px] flex">
          {Array.from({ length: 5 }, (_, i) => (
            <span key={i} className={i > 0 ? 'ml-[1px]' : ''}><StarIcon filled={i < watch.stars} /></span>
          ))}
        </div>
      </div>

      {/* Details */}
      <div className="px-[14px] py-[12px]">
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

        <p className="font-['Lato',sans-serif] text-[11px] text-text-2 leading-[1] mt-[4px]">{watch.chain} · {watch.location}</p>

        {/* Amenities */}
        <div className="flex items-center mt-[8px]">
          {(watch.amenities || []).slice(0, 4).map((a, i) => (
            <div key={i} className={`flex items-center text-text-2/50 ${i > 0 ? 'ml-[10px]' : ''}`}>
              <AmenityDot name={a} />
              <span className="font-['Lato',sans-serif] text-[9px] text-text-2/60 leading-[1] ml-[3px]">{a.replace('Free ', '')}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between mt-[8px] pt-[8px] border-t border-text-2/10">
          <p className="font-['Lato',sans-serif] text-[11px] text-text-2/60 leading-[1]">
            {watch.check_in} – {watch.check_out} · {watch.nights}n
          </p>
          <p className="font-['Lato',sans-serif] text-[11px] text-text-2 leading-[1]">{watch.room_type} · ${total}</p>
        </div>
      </div>
    </div>
  )
}

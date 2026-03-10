'use client'

// ─── Default mock data ──────────────────────────────────────────────
const DEFAULT_TRIP = {
  month: 'APR',
  days: '15 - 18',
  year: '2026',
  type: 'FLIGHT + HOTEL',
  typeColor: '#4FC660',
  route: 'Seattle \u2192 San Francisco',
  travelers: '2 travelers',
  img: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=400&fit=crop',
}

export default function TripCard({ trip = DEFAULT_TRIP, onClick }) {
  const isGreen = trip.typeColor === '#4FC660'

  return (
    <button
      onClick={onClick}
      className="w-full rounded-[12px] border border-[#222] text-left hover:border-[#333] transition overflow-hidden bg-[#111]"
    >
      {/* Date row */}
      <div className="px-[14px] pt-[10px] pb-[8px] flex items-baseline gap-[6px]">
        <span className="font-['Lato',sans-serif] text-[12px] text-[#666] font-medium tracking-wider">{trip.month}</span>
        <span className="font-['Lato',sans-serif] text-[16px] text-white font-semibold">{trip.days}</span>
        <span className="font-['Lato',sans-serif] text-[12px] text-[#666]">{trip.year}</span>
      </div>

      {/* City hero image */}
      <div className="relative h-[140px] overflow-hidden">
        <img
          src={trip.img}
          alt={trip.route}
          className="w-full h-full object-cover"
        />
        {/* Type badge overlay */}
        <div
          className="absolute top-[8px] left-[10px] px-[8px] py-[3px] rounded-[4px]"
          style={{ backgroundColor: isGreen ? '#4FC660' : '#333' }}
        >
          <span
            className="font-['Lato',sans-serif] text-[9px] font-semibold tracking-[0.05em]"
            style={{ color: isGreen ? '#000' : '#fff' }}
          >
            {trip.type}
          </span>
        </div>
      </div>

      {/* Route + travelers */}
      <div className="px-[14px] pt-[10px] pb-[12px]">
        <p className="font-['Lato',sans-serif] text-[15px] text-white font-medium leading-normal">{trip.route}</p>
        <p className="font-['Lato',sans-serif] text-[12px] text-[#888] mt-[2px]">{trip.travelers}</p>
      </div>
    </button>
  )
}

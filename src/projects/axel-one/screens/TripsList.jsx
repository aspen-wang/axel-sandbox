'use client'

import TripCard from '@/components/TripCard'
import StatusBar from '@/components/StatusBar'
import BottomNav from '@/components/BottomNav'
import HomeIndicator from '@/components/HomeIndicator'

const TRIPS = [
  {
    id: 1,
    month: 'APR',
    days: '15 - 18',
    year: '2026',
    type: 'FLIGHT + HOTEL',
    typeColor: '#4FC660',
    route: 'Seattle \u2192 San Francisco',
    travelers: '2 travelers',
    img: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=400&fit=crop',
  },
  {
    id: 2,
    month: 'APR',
    days: '20 - 22',
    year: '2026',
    type: 'HOTEL ONLY',
    typeColor: '#FFFFFF',
    route: 'Los Angeles \u2192 New York',
    travelers: '3 travelers',
    img: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=800&h=400&fit=crop',
  },
  {
    id: 3,
    month: 'MAY',
    days: '10 - 13',
    year: '2026',
    type: 'FLIGHT + HOTEL',
    typeColor: '#4FC660',
    route: 'Chicago \u2192 Miami',
    travelers: '1 traveler',
    img: 'https://images.unsplash.com/photo-1514214246283-d427a95c5d2f?w=800&h=400&fit=crop',
  },
]

export default function TripsList({ onNext }) {
  return (
    <div className="bg-black overflow-clip relative rounded-[30px] w-[393px] h-[852px] font-['Lato',sans-serif]">
      <StatusBar />

      {/* Header */}
      <div className="absolute left-[16px] top-[66px] right-[16px] flex items-center justify-between">
        <p className="font-semibold text-[28px] text-white leading-normal">Trips</p>
        <button
          onClick={onNext}
          className="border border-[#333] rounded-[30px] px-[16px] py-[8px] hover:bg-white/5 transition"
        >
          <p className="text-[13px] text-white font-medium">+ New Trip</p>
        </button>
      </div>

      {/* Trip Cards */}
      <div className="absolute left-[16px] top-[124px] right-[16px] bottom-[88px] overflow-y-auto">
        <div className="flex flex-col gap-[16px]">
          {TRIPS.map((trip) => (
            <TripCard key={trip.id} trip={trip} onClick={onNext} />
          ))}
        </div>
      </div>

      <BottomNav activeTab="trips" />
      <HomeIndicator />
    </div>
  )
}

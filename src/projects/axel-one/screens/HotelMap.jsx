'use client'

import { useState } from 'react'
import statusIcons from '@/assets/status-icons.svg'

const PINS = [
  { id: 0, name: 'Hotel Nikko SF', neighborhood: 'Union Square', price: 189, savings: 56, top: '38%', left: '45%', best: false },
  { id: 1, name: 'The Marker', neighborhood: 'Market Street', price: 167, savings: 78, top: '52%', left: '32%', best: true },
  { id: 2, name: 'Hyatt Regency SF', neighborhood: 'Embarcadero', price: 212, savings: 33, top: '30%', left: '65%', best: false },
]

export default function HotelMap({ onNext }) {
  const [selectedPin, setSelectedPin] = useState(1) // best deal selected by default
  const selected = PINS[selectedPin]

  return (
    <div className="bg-bg overflow-clip relative rounded-[30px] w-[393px] h-[852px] font-['Inter',sans-serif]">
      {/* Status Bar */}
      <div className="absolute top-0 left-0 right-0 flex h-[59px] items-center justify-between px-[28px] py-[15px] z-10">
        <p className="font-['SF_Pro_Text',sans-serif] font-bold text-[15px] text-text-1 tracking-[-0.045px] leading-[18px] w-[54px]">9:41</p>
        <div className="relative shrink-0 w-[66.16px] h-[11px]">
          <img alt="" className="block max-w-none w-full h-full" src={statusIcons.src || statusIcons} />
        </div>
      </div>

      {/* Header */}
      <div className="absolute left-[16px] top-[72px] right-[16px] flex items-center justify-between z-10">
        <div className="flex items-center gap-[8px]">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#989898" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
          <p className="text-[15px] font-medium text-text-1">Hotels near SF</p>
        </div>
        <button onClick={onNext} className="text-[13px] text-[#989898] font-medium">List</button>
      </div>

      {/* Map Area */}
      <div
        className="absolute inset-0 rounded-[30px] overflow-hidden"
        style={{
          backgroundColor: '#1a1a1a',
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      >
        {/* Subtle road lines */}
        <div className="absolute inset-0">
          <svg width="100%" height="100%" className="opacity-[0.06]">
            <line x1="0" y1="45%" x2="100%" y2="42%" stroke="#fff" strokeWidth="2" />
            <line x1="30%" y1="0" x2="35%" y2="100%" stroke="#fff" strokeWidth="2" />
            <line x1="60%" y1="0" x2="55%" y2="100%" stroke="#fff" strokeWidth="1.5" />
            <line x1="0" y1="65%" x2="100%" y2="60%" stroke="#fff" strokeWidth="1.5" />
            <line x1="15%" y1="0" x2="20%" y2="100%" stroke="#fff" strokeWidth="1" />
            <line x1="80%" y1="0" x2="75%" y2="100%" stroke="#fff" strokeWidth="1" />
          </svg>
        </div>

        {/* Map Pins */}
        {PINS.map((pin) => (
          <button
            key={pin.id}
            onClick={() => setSelectedPin(pin.id)}
            className="absolute flex flex-col items-center"
            style={{ top: pin.top, left: pin.left, transform: 'translate(-50%, -50%)' }}
          >
            <div
              className={`w-[28px] h-[28px] rounded-full flex items-center justify-center shadow-lg transition ${
                pin.best ? 'bg-green' : 'bg-white'
              } ${selectedPin === pin.id ? 'ring-2 ring-white/40 scale-110' : ''}`}
            >
              <p className={`text-[9px] font-bold leading-none ${pin.best ? 'text-white' : 'text-[#181818]'}`}>
                ${pin.price}
              </p>
            </div>
            {/* Pin tail */}
            <div
              className={`w-0 h-0 border-l-[5px] border-r-[5px] border-t-[6px] border-l-transparent border-r-transparent ${
                pin.best ? 'border-t-green' : 'border-t-white'
              }`}
            />
          </button>
        ))}
      </div>

      {/* Bottom Overlay Card */}
      <div className="absolute left-0 right-0 bottom-0 bg-[#242424] rounded-t-[20px] px-[16px] py-[14px] z-10">
        <div className="flex items-start justify-between mb-[10px]">
          <div>
            <p className="font-bold text-[16px] text-text-1 leading-[1.3]">{selected.name}</p>
            <p className="font-['Lato',sans-serif] text-[12px] text-[#989898] mt-[2px]">{selected.neighborhood}</p>
          </div>
          <div className="flex flex-col items-end">
            <p className="font-bold text-[16px] text-text-1">${selected.price}<span className="font-normal text-[11px] text-[#989898]">/night</span></p>
            <div className="bg-green/10 px-[8px] py-[3px] rounded-full mt-[4px]">
              <p className="text-[11px] font-medium text-green leading-[1]">Save ${selected.savings}</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <button onClick={onNext} className="w-full bg-main flex items-center justify-center py-[14px] rounded-[30px] hover:brightness-110 transition">
          <p className="font-medium text-[14px] text-white text-center leading-normal">Select this hotel</p>
        </button>

        <div className="mt-[10px] mx-auto w-[134px] h-[5px] rounded-full bg-text-1" />
      </div>
    </div>
  )
}

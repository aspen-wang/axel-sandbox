'use client'

import { useState } from 'react'
import Link from 'next/link'
import statusIcons from '@/assets/status-icons.svg'

/* ── Data ─────────────────────────────────────────────────────── */

const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

const CABIN_CLASSES = [
  { code: 'ECO', name: 'Economy', desc: 'Most affordable for everyone' },
  { code: 'PRE', name: 'Premium Economy', desc: 'Extra legroom & comfort' },
  { code: 'BUS', name: 'Business Class', desc: 'Lie-flat seats & lounges' },
  { code: 'FIR', name: 'First Class', desc: 'Ultimate luxury experience' },
]

const AIRPORTS = [
  { code: 'SEA', city: 'Seattle' },
  { code: 'LAX', city: 'Los Angeles' },
  { code: 'SFO', city: 'San Francisco' },
  { code: 'JFK', city: 'New York' },
  { code: 'ATL', city: 'Atlanta' },
  { code: 'ORD', city: 'Chicago' },
  { code: 'NRT', city: 'Tokyo' },
  { code: 'LHR', city: 'London' },
]

/* ── Bottom Sheet Wrapper ────────────────────────────────────── */

function BottomSheet({ open, onClose, children }) {
  if (!open) return null
  return (
    <div className="absolute inset-0 z-20 flex flex-col justify-end">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative animate-slideUp">
        {children}
      </div>
    </div>
  )
}

/* ── Calendar Sheet ──────────────────────────────────────────── */

function CalendarSheet({ open, onClose, title, selectedDay, onSelect }) {
  const daysInMonth = 31
  const startDay = 6 // March 2026 starts on Saturday

  const cells = []
  for (let i = 0; i < startDay; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)
  const trailing = 7 - (cells.length % 7)
  if (trailing < 7) for (let i = 1; i <= trailing; i++) cells.push(-i)

  const weeks = []
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7))

  return (
    <BottomSheet open={open} onClose={onClose}>
      <div className="bg-bg border border-grey rounded-t-[30px] px-[23px] pt-[18px] pb-[32px]">
        <div className="flex flex-col items-center gap-[20px]">
          <div className="w-[47px] h-[3px] rounded-[16px] bg-white/50" />
          <p className="text-[20px] font-medium text-text-1 w-full px-[8px]">{title}</p>
        </div>

        <div className="flex items-center justify-between px-[8px] py-[8px] mt-[20px]">
          <button className="w-[17px] h-[17px] flex items-center justify-center text-text-1">
            <svg width="10" height="14" viewBox="0 0 10 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 1L2 7l6 6" /></svg>
          </button>
          <p className="text-[20px] font-medium text-text-1">March 2026</p>
          <button className="w-[17px] h-[17px] flex items-center justify-center text-text-1">
            <svg width="10" height="14" viewBox="0 0 10 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 1l6 6-6 6" /></svg>
          </button>
        </div>

        <div className="flex flex-col gap-[5px] mt-[20px]">
          <div className="flex gap-[10px]">
            {DAYS.map((d) => (
              <div key={d} className="flex-1 flex items-center justify-center py-[12px]">
                <span className="text-[14px] font-medium text-text-2">{d}</span>
              </div>
            ))}
          </div>
          {weeks.map((week, wi) => (
            <div key={wi} className="flex gap-[5px]">
              {week.map((day, di) => {
                if (day === null) return <div key={di} className="flex-1 py-[14px]" />
                const isTrailing = day < 0
                const d = isTrailing ? -day : day
                const isPast = !isTrailing && d < 3
                const isSelected = !isTrailing && d === selectedDay
                return (
                  <button
                    key={di}
                    onClick={() => {
                      if (!isTrailing && !isPast) {
                        onSelect(d)
                        onClose()
                      }
                    }}
                    disabled={isTrailing || isPast}
                    className={`flex-1 flex items-center justify-center py-[14px] rounded-[4px] transition ${
                      isSelected
                        ? 'bg-blue text-bg'
                        : isPast
                          ? 'bg-bg text-text-2/30'
                          : isTrailing
                            ? 'bg-bg text-text-2/20'
                            : 'bg-bg-2 text-text-1 hover:bg-text-2/15'
                    }`}
                  >
                    <span className="text-[14px] font-medium">{d}</span>
                  </button>
                )
              })}
            </div>
          ))}
        </div>
      </div>
    </BottomSheet>
  )
}

/* ── Passenger + Cabin Sheet ─────────────────────────────────── */

function PassengerSheet({ open, onClose, count, setCount, cabin, setCabin }) {
  return (
    <BottomSheet open={open} onClose={onClose}>
      <div className="bg-bg border border-grey rounded-t-[30px] px-[23px] pt-[18px] pb-[32px]">
        <div className="flex flex-col items-center gap-[20px]">
          <div className="w-[47px] h-[3px] rounded-[16px] bg-white/50" />
          <p className="text-[20px] font-medium text-text-1 w-full px-[8px]">Passengers & Cabin</p>
        </div>

        <div className="flex items-center justify-center gap-[17px] mt-[20px]">
          <button
            onClick={() => setCount((c) => Math.max(1, c - 1))}
            className="w-[53px] h-[53px] rounded-full bg-bg-2 flex items-center justify-center text-[16px] font-medium text-text-1 hover:bg-text-2/15 transition"
          >
            -
          </button>
          <span className="text-[32px] font-medium text-text-1 w-[40px] text-center">{count}</span>
          <button
            onClick={() => setCount((c) => Math.min(9, c + 1))}
            className="w-[53px] h-[53px] rounded-full bg-bg-2 flex items-center justify-center text-[16px] font-medium text-text-1 hover:bg-text-2/15 transition"
          >
            +
          </button>
        </div>

        <div className="mt-[24px]">
          <p className="text-[12px] text-text-2 mb-[12px]">Cabin Class</p>
          <div className="flex flex-col gap-[8px]">
            {CABIN_CLASSES.map((c) => {
              const isSelected = cabin === c.code
              return (
                <button
                  key={c.code}
                  onClick={() => setCabin(c.code)}
                  className={`flex items-center rounded-[16px] px-[8px] py-[8px] transition text-left ${
                    isSelected
                      ? 'bg-blue/20 border border-blue/20'
                      : 'bg-card-bg border border-transparent hover:border-text-2/10'
                  }`}
                >
                  <div className={`w-[44px] h-[44px] rounded-[8px] flex items-center justify-center text-[14px] font-medium text-text-1 shrink-0 ${
                    isSelected ? 'bg-blue/20' : 'bg-bg'
                  }`}>
                    {c.code}
                  </div>
                  <div className="flex-1 ml-[10px]">
                    <p className="text-[14px] font-medium text-text-1">{c.name}</p>
                    <p className="text-[11px] text-text-2 mt-[1px]">{c.desc}</p>
                  </div>
                  {isSelected && (
                    <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" className="text-blue shrink-0 mr-[8px]">
                      <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              )
            })}
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-blue text-bg font-medium text-[14px] py-[14px] rounded-[30px] mt-[24px] hover:brightness-110 transition"
        >
          Done
        </button>
      </div>
    </BottomSheet>
  )
}

/* ── Budget Sheet (Number Pad) ───────────────────────────────── */

function BudgetSheet({ open, onClose, value, setValue }) {
  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'C', '0', 'del']

  function handleKey(k) {
    if (k === 'C') setValue('0')
    else if (k === 'del') setValue((v) => v.length > 1 ? v.slice(0, -1) : '0')
    else setValue((v) => v === '0' ? k : v + k)
  }

  return (
    <BottomSheet open={open} onClose={onClose}>
      <div className="bg-bg border border-grey rounded-t-[30px] px-[23px] pt-[18px] pb-[32px]">
        <div className="flex flex-col items-center gap-[20px]">
          <div className="w-[47px] h-[3px] rounded-[16px] bg-white/50" />
          <div className="w-full px-[8px]">
            <p className="text-[20px] font-medium text-text-1">Target Price</p>
            <p className="text-[13px] text-text-2 mt-[6px]">Axel will alert you when the price drops below this</p>
          </div>
        </div>

        <p className="text-center text-[32px] font-medium text-green mt-[20px]">
          <span className="text-text-2">$</span>{value}
        </p>

        <div className="grid grid-cols-3 gap-[5px] mt-[20px]">
          {keys.map((k) => (
            <button
              key={k}
              onClick={() => handleKey(k)}
              className="bg-bg-2 rounded-[4px] py-[14px] flex items-center justify-center text-[16px] font-medium text-text-1 hover:bg-text-2/15 transition"
            >
              {k === 'del' ? (
                <svg width="18" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 9.75L14.25 12m0 0l2.25 2.25M14.25 12l2.25-2.25M14.25 12L12 14.25m-2.58 4.92l-6.375-6.375a1.125 1.125 0 010-1.59L9.42 4.83c.21-.211.497-.33.795-.33H19.5a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25 2.25h-9.284c-.298 0-.585-.119-.795-.33z" /></svg>
              ) : k}
            </button>
          ))}
        </div>

        <button
          onClick={onClose}
          className="w-full bg-green text-bg font-medium text-[14px] py-[14px] rounded-[30px] mt-[20px] hover:brightness-110 transition"
        >
          Set price
        </button>
      </div>
    </BottomSheet>
  )
}

/* ── Airport Picker Sheet ────────────────────────────────────── */

function AirportSheet({ open, onClose, title, selected, onSelect }) {
  const [search, setSearch] = useState('')
  const filtered = AIRPORTS.filter(
    (a) =>
      a.code.toLowerCase().includes(search.toLowerCase()) ||
      a.city.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <BottomSheet open={open} onClose={onClose}>
      <div className="bg-bg border border-grey rounded-t-[30px] px-[23px] pt-[18px] pb-[32px]">
        <div className="flex flex-col items-center gap-[20px]">
          <div className="w-[47px] h-[3px] rounded-[16px] bg-white/50" />
          <p className="text-[20px] font-medium text-text-1 w-full px-[8px]">{title}</p>
        </div>

        <div className="mt-[20px]">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search city or airport code"
            className="w-full bg-card-bg rounded-[12px] px-[16px] py-[12px] text-[14px] text-text-1 outline-none border border-transparent focus:border-blue/30 transition placeholder:text-text-2/40"
          />
        </div>

        <div className="flex flex-col gap-[4px] mt-[16px] max-h-[300px] overflow-y-auto">
          {filtered.map((a) => {
            const isSelected = selected === a.code
            return (
              <button
                key={a.code}
                onClick={() => {
                  onSelect(a.code)
                  onClose()
                }}
                className={`flex items-center rounded-[12px] px-[12px] py-[12px] transition text-left ${
                  isSelected
                    ? 'bg-blue/20 border border-blue/20'
                    : 'bg-card-bg border border-transparent hover:border-text-2/10'
                }`}
              >
                <div className={`w-[44px] h-[44px] rounded-[8px] flex items-center justify-center text-[14px] font-bold shrink-0 ${
                  isSelected ? 'bg-blue/20 text-blue' : 'bg-bg text-text-1'
                }`}>
                  {a.code}
                </div>
                <p className="flex-1 ml-[12px] text-[14px] font-medium text-text-1">{a.city}</p>
                {isSelected && (
                  <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" className="text-blue shrink-0">
                    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            )
          })}
        </div>
      </div>
    </BottomSheet>
  )
}

/* ── Main Form Page ──────────────────────────────────────────── */

export default function FlightFormPage() {
  // Form state
  const [origin, setOrigin] = useState('SEA')
  const [destination, setDestination] = useState('')
  const [departDay, setDepartDay] = useState(null)
  const [returnDay, setReturnDay] = useState(null)
  const [passengers, setPassengers] = useState(1)
  const [cabin, setCabin] = useState('ECO')
  const [budget, setBudget] = useState('400')

  // Sheet state
  const [activeSheet, setActiveSheet] = useState(null)

  const [submitted, setSubmitted] = useState(false)

  const cabinLabel = CABIN_CLASSES.find((c) => c.code === cabin)?.name || cabin
  const originCity = AIRPORTS.find((a) => a.code === origin)?.city
  const destCity = AIRPORTS.find((a) => a.code === destination)?.city

  const isValid = origin && destination && departDay

  function handleSubmit() {
    if (!isValid) return
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-bg flex flex-col items-center py-[40px]">
      {/* Page header */}
      <div className="w-full max-w-[960px] px-[32px] mb-[32px]">
        <div className="flex items-center gap-[10px]">
          <Link href="/" className="text-[12px] text-text-2/60 hover:text-text-1 transition">
            Dashboard
          </Link>
          <span className="text-text-2/20">/</span>
          <p className="text-[14px] text-text-1 font-medium">Flight Form Demo</p>
        </div>
        <p className="text-[12px] text-text-2/50 mt-[6px]">
          Interactive form using all design system input components — Calendar, Number Pad, Stepper + Radio Select
        </p>
      </div>

      {/* Phone frame */}
      <div className="relative w-[393px] h-[852px] rounded-[30px] bg-bg border border-grey overflow-hidden shadow-2xl">
        {/* Status bar */}
        <div className="absolute top-0 left-0 right-0 flex h-[59px] items-center justify-between overflow-clip px-[28px] py-[15px]">
          <p className="font-['SF_Pro_Text',sans-serif] font-bold text-[15px] text-text-1 text-center tracking-[-0.045px] leading-[18px] w-[54px] h-[18px] shrink-0">
            9:41
          </p>
          <div className="relative shrink-0 w-[66.16px] h-[11px]">
            <img alt="" className="block max-w-none w-full h-full" src={statusIcons.src || statusIcons} />
          </div>
        </div>

        {submitted ? (
          /* ── Success State ─────────────────────────────────────── */
          <div className="absolute inset-0 flex flex-col items-center justify-center px-[40px]">
            <div className="w-[64px] h-[64px] rounded-full bg-green/20 flex items-center justify-center mb-[20px]">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#4FC660" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <p className="text-[20px] font-medium text-text-1 text-center mb-[8px]">Watch Created</p>
            <p className="text-[13px] text-text-2 text-center leading-relaxed mb-[8px]">
              {origin} → {destination} &middot; Mar {departDay}{returnDay ? ` – ${returnDay}` : ''}
            </p>
            <p className="text-[13px] text-text-2 text-center">
              {passengers} {passengers === 1 ? 'passenger' : 'passengers'} &middot; {cabinLabel} &middot; Under <span className="text-green">${budget}</span>
            </p>
            <div className="flex gap-[12px] mt-[32px]">
              <button
                onClick={() => setSubmitted(false)}
                className="px-[20px] py-[10px] rounded-[30px] border border-text-2/20 text-[13px] font-medium text-text-1 hover:bg-card-bg transition"
              >
                Edit
              </button>
              <button
                onClick={() => {
                  setSubmitted(false)
                  setOrigin('SEA')
                  setDestination('')
                  setDepartDay(null)
                  setReturnDay(null)
                  setPassengers(1)
                  setCabin('ECO')
                  setBudget('400')
                }}
                className="px-[20px] py-[10px] rounded-[30px] bg-main text-bg text-[13px] font-medium hover:brightness-110 transition"
              >
                New Watch
              </button>
            </div>
          </div>
        ) : (
          /* ── Form State ────────────────────────────────────────── */
          <>
            <div className="absolute left-[24px] top-[75px] right-[24px]">
              {/* Header */}
              <div className="flex items-center gap-[8px] mb-[4px]">
                <div className="w-[28px] h-[28px] rounded-full bg-main/20 flex items-center justify-center">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#EF508D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                  </svg>
                </div>
                <p className="text-[20px] font-medium text-text-1">New Flight Watch</p>
              </div>
              <p className="text-[13px] text-text-2 mb-[28px] ml-[36px]">
                Axel will find the best price for you
              </p>

              {/* Origin / Destination */}
              <div className="flex gap-[8px] mb-[12px]">
                <button
                  onClick={() => setActiveSheet('origin')}
                  className="flex-1 bg-card-bg rounded-[12px] px-[14px] py-[14px] text-left border border-transparent hover:border-text-2/10 transition"
                >
                  <p className="text-[10px] text-text-2/50 font-medium uppercase tracking-[0.05em] mb-[4px]">From</p>
                  {origin ? (
                    <div className="flex items-baseline gap-[6px]">
                      <p className="text-[18px] font-medium text-text-1">{origin}</p>
                      <p className="text-[12px] text-text-2">{originCity}</p>
                    </div>
                  ) : (
                    <p className="text-[15px] text-text-2/30">Select</p>
                  )}
                </button>

                <div className="flex items-center justify-center w-[36px] shrink-0">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4FC660" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>

                <button
                  onClick={() => setActiveSheet('destination')}
                  className="flex-1 bg-card-bg rounded-[12px] px-[14px] py-[14px] text-left border border-transparent hover:border-text-2/10 transition"
                >
                  <p className="text-[10px] text-text-2/50 font-medium uppercase tracking-[0.05em] mb-[4px]">To</p>
                  {destination ? (
                    <div className="flex items-baseline gap-[6px]">
                      <p className="text-[18px] font-medium text-text-1">{destination}</p>
                      <p className="text-[12px] text-text-2">{destCity}</p>
                    </div>
                  ) : (
                    <p className="text-[15px] text-text-2/30">Select</p>
                  )}
                </button>
              </div>

              {/* Dates */}
              <div className="flex gap-[8px] mb-[12px]">
                <button
                  onClick={() => setActiveSheet('depart')}
                  className="flex-1 bg-card-bg rounded-[12px] px-[14px] py-[14px] text-left border border-transparent hover:border-text-2/10 transition"
                >
                  <p className="text-[10px] text-text-2/50 font-medium uppercase tracking-[0.05em] mb-[4px]">Departure</p>
                  {departDay ? (
                    <p className="text-[15px] font-medium text-text-1">Mar {departDay}, 2026</p>
                  ) : (
                    <p className="text-[15px] text-text-2/30">Pick date</p>
                  )}
                </button>

                <button
                  onClick={() => setActiveSheet('return')}
                  className="flex-1 bg-card-bg rounded-[12px] px-[14px] py-[14px] text-left border border-transparent hover:border-text-2/10 transition"
                >
                  <p className="text-[10px] text-text-2/50 font-medium uppercase tracking-[0.05em] mb-[4px]">Return</p>
                  {returnDay ? (
                    <p className="text-[15px] font-medium text-text-1">Mar {returnDay}, 2026</p>
                  ) : (
                    <p className="text-[15px] text-text-2/30">Optional</p>
                  )}
                </button>
              </div>

              {/* Passengers + Cabin */}
              <button
                onClick={() => setActiveSheet('passengers')}
                className="w-full bg-card-bg rounded-[12px] px-[14px] py-[14px] text-left border border-transparent hover:border-text-2/10 transition mb-[12px]"
              >
                <p className="text-[10px] text-text-2/50 font-medium uppercase tracking-[0.05em] mb-[4px]">Passengers & Cabin</p>
                <div className="flex items-center gap-[8px]">
                  <p className="text-[15px] font-medium text-text-1">
                    {passengers} {passengers === 1 ? 'passenger' : 'passengers'}
                  </p>
                  <span className="text-text-2/30">&middot;</span>
                  <p className="text-[13px] text-text-2">{cabinLabel}</p>
                </div>
              </button>

              {/* Budget / Target Price */}
              <button
                onClick={() => setActiveSheet('budget')}
                className="w-full bg-card-bg rounded-[12px] px-[14px] py-[14px] text-left border border-transparent hover:border-text-2/10 transition mb-[12px]"
              >
                <p className="text-[10px] text-text-2/50 font-medium uppercase tracking-[0.05em] mb-[4px]">Target Price</p>
                <div className="flex items-baseline gap-[4px]">
                  <p className="text-[15px] font-medium text-green">${budget}</p>
                  <p className="text-[12px] text-text-2">per person</p>
                </div>
              </button>

              {/* Summary preview */}
              {origin && destination && departDay && (
                <div className="bg-main/5 border border-main/10 rounded-[12px] px-[14px] py-[12px] mt-[8px]">
                  <div className="flex items-center gap-[6px] mb-[6px]">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#EF508D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                    </svg>
                    <p className="text-[11px] text-main font-medium">Axel will watch this route</p>
                  </div>
                  <p className="text-[12px] text-text-2 leading-relaxed">
                    {origin} → {destination} &middot; Mar {departDay}{returnDay ? ` – ${returnDay}` : ', one-way'} &middot; {passengers} pax &middot; {cabinLabel} &middot; Under ${budget}
                  </p>
                </div>
              )}
            </div>

            {/* CTA */}
            <button
              onClick={handleSubmit}
              disabled={!isValid}
              className={`absolute left-1/2 -translate-x-1/2 top-[711px] w-[345px] flex items-center justify-center px-[8px] py-[14px] rounded-[30px] transition font-medium text-[14px] ${
                isValid
                  ? 'bg-main text-bg cursor-pointer hover:brightness-110'
                  : 'bg-text-2/10 text-text-2/30 cursor-not-allowed'
              }`}
            >
              Create Watch
            </button>

            {/* Bottom home indicator */}
            <div className="absolute bottom-[8px] left-1/2 -translate-x-1/2 w-[134px] h-[5px] rounded-full bg-text-1" />

            {/* ── Sheets ──────────────────────────────────────── */}
            <AirportSheet
              open={activeSheet === 'origin'}
              onClose={() => setActiveSheet(null)}
              title="Where from?"
              selected={origin}
              onSelect={setOrigin}
            />

            <AirportSheet
              open={activeSheet === 'destination'}
              onClose={() => setActiveSheet(null)}
              title="Where to?"
              selected={destination}
              onSelect={setDestination}
            />

            <CalendarSheet
              open={activeSheet === 'depart'}
              onClose={() => setActiveSheet(null)}
              title="Departure date"
              selectedDay={departDay}
              onSelect={setDepartDay}
            />

            <CalendarSheet
              open={activeSheet === 'return'}
              onClose={() => setActiveSheet(null)}
              title="Return date"
              selectedDay={returnDay}
              onSelect={setReturnDay}
            />

            <PassengerSheet
              open={activeSheet === 'passengers'}
              onClose={() => setActiveSheet(null)}
              count={passengers}
              setCount={setPassengers}
              cabin={cabin}
              setCabin={setCabin}
            />

            <BudgetSheet
              open={activeSheet === 'budget'}
              onClose={() => setActiveSheet(null)}
              value={budget}
              setValue={setBudget}
            />
          </>
        )}
      </div>

      {/* Input legend below the phone */}
      <div className="w-[393px] mt-[24px] px-[8px]">
        <p className="text-[10px] text-text-2/40 font-medium uppercase tracking-[0.1em] mb-[10px]">Input Components Used</p>
        <div className="flex flex-wrap gap-[8px]">
          {[
            { label: 'Calendar', fields: 'Departure, Return' },
            { label: 'Number Pad', fields: 'Target Price' },
            { label: 'Stepper + Select', fields: 'Passengers, Cabin' },
            { label: 'List Select', fields: 'Origin, Destination' },
          ].map((item) => (
            <div key={item.label} className="bg-card-bg rounded-[8px] px-[10px] py-[6px]">
              <p className="text-[11px] text-text-1 font-medium">{item.label}</p>
              <p className="text-[10px] text-text-2/50">{item.fields}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

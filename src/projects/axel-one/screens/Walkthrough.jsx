'use client'

import { useState, useEffect, useRef } from 'react'
import StatusBar from '@/components/StatusBar'
import HomeIndicator from '@/components/HomeIndicator'

/* ── Axel avatar: pink speech bubble with candy logo ── */
const AxelAvatar = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 40 38" fill="none" className={`shrink-0 ${className}`}>
    <rect x="0" y="0" width="40" height="30" rx="8" fill="#EF508D" />
    <path d="M5 30L1 38L13 30" fill="#EF508D" />
    <ellipse cx="20" cy="15" rx="7" ry="5.5" fill="white" />
    <circle cx="11.5" cy="8.5" r="3" fill="white" />
    <circle cx="28.5" cy="8.5" r="3" fill="white" />
    <circle cx="11.5" cy="21.5" r="3" fill="white" />
    <circle cx="28.5" cy="21.5" r="3" fill="white" />
  </svg>
)

/* ── Icons ── */

const ChatIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#EF508D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
  </svg>
)
const RouteIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#EF508D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="6" cy="19" r="3" /><circle cx="18" cy="5" r="3" /><path d="M6 16V8a4 4 0 014-4h4a4 4 0 014 4v8" />
  </svg>
)
const ClockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#EF508D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
  </svg>
)
const LayersIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#EF508D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" />
  </svg>
)
const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 8h10M9 4l4 4-4 4" />
  </svg>
)
const BookIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#EF508D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
  </svg>
)
const StarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#EF508D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
)
const LockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#EF508D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0110 0v4" />
  </svg>
)

/* ── Animated wrapper: fades/slides children in with stagger ── */
function FadeGroup({ step, children }) {
  const [show, setShow] = useState(false)
  useEffect(() => {
    setShow(false)
    const t = requestAnimationFrame(() => setShow(true))
    return () => cancelAnimationFrame(t)
  }, [step])
  return (
    <div
      className={`transition-all duration-500 ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[12px]'}`}
      style={!show ? { opacity: 0 } : undefined}
    >
      {children}
    </div>
  )
}

/* ── Tell Axel: cycling user message → thinking → caring response → outcome card ── */
const chatPairs = [
  { topic: 'Getaways', user: "Burned out. Somewhere calm with ocean.", care: "On it. Finding quiet beaches for you.", skipped: 5, city: 'Bali Trip', dates: 'Mar 22 -- 27', status: 'Booked', sColor: '#4FC660', flight: 'SEA to DPS -- Singapore Air', fPrice: '$489', hotel: 'Ocean Villa -- 5 nights', hPrice: '$395', label: 'You saved', amount: '$62', amountColor: '#4FC660' },
  { topic: 'Honeymoons', user: "Honeymoon ideas for December?", care: "Love that. Let me find something special.", skipped: 7, city: 'Santorini Trip', dates: 'Dec 10 -- 16', status: 'Planning', sColor: '#555', flight: 'JFK to JTR -- Delta', fPrice: '$680', hotel: 'Cave Suite -- 6 nights', hPrice: '$870', label: '3 options', amount: 'saved', amountColor: '#555' },
  { topic: 'Family visits', user: "Visit parents in Chicago, flexible dates", care: "I'll watch for the cheapest window.", skipped: 4, city: 'Chicago Trip', dates: 'Apr 15 -- 20', status: 'Watching', sColor: '#FB7A29', flight: 'SFO to ORD -- United', fPrice: '$241', hotel: 'Palmer House -- 5 nights', hPrice: '$445', label: 'Price alert', amount: 'active', amountColor: '#FB7A29' },
  { topic: 'Team offsites', user: "Offsite for 12, warm with workspace", care: "Group trip. I'll find villas with space.", skipped: 6, city: 'Tulum Offsite', dates: 'May 5 -- 9', status: 'Booked', sColor: '#4FC660', flight: 'LAX to CUN -- JetBlue', fPrice: '$310', hotel: '3 Villas -- coworking incl.', hPrice: '$840', label: 'Group saved', amount: '$180/ea', amountColor: '#4FC660' },
  { topic: 'Grad trips', user: "Grad trip, adventure on a budget", care: "Budget adventure. I know the spot.", skipped: 3, city: 'Costa Rica', dates: 'Jun 1 -- 6', status: 'Watching', sColor: '#FB7A29', flight: 'LAX to SJO -- Spirit', fPrice: '$289', hotel: 'Jungle Lodge -- 5 nights', hPrice: '$260', label: 'Price alert', amount: 'set', amountColor: '#FB7A29' },
]

function TellAxelIllustration({ step }) {
  const [idx, setIdx] = useState(0)
  const [topicIdx, setTopicIdx] = useState(0)
  // phases: 0=user, 1=thinking, 2=care text, 3=skipped msgs, 4=outcome card, 5=fade all out
  const [phase, setPhase] = useState(0)
  const timers = useRef([])

  useEffect(() => {
    timers.current.forEach(clearTimeout)
    timers.current = []
    setIdx(0)
    setTopicIdx(0)
    setPhase(0)

    const schedule = () => {
      const t = []
      t.push(setTimeout(() => setPhase(1), 800))
      t.push(setTimeout(() => setPhase(2), 1600))
      t.push(setTimeout(() => setPhase(3), 2400))
      t.push(setTimeout(() => setPhase(4), 3100))
      t.push(setTimeout(() => setPhase(5), 6200))    // fade ALL out together
      t.push(setTimeout(() => {
        setIdx(j => (j + 1) % chatPairs.length)
        setPhase(0)
        setTimeout(() => setTopicIdx(j => (j + 1) % chatPairs.length), 10)
        timers.current = schedule()
      }, 7000))                                        // reset after fade completes
      return t
    }

    const t = []
    t.push(setTimeout(() => setPhase(1), 700))
    t.push(setTimeout(() => setPhase(2), 1400))
    t.push(setTimeout(() => setPhase(3), 2100))
    t.push(setTimeout(() => setPhase(4), 2800))
    t.push(setTimeout(() => setPhase(5), 5900))
    t.push(setTimeout(() => {
      setIdx(j => (j + 1) % chatPairs.length)
      setPhase(0)
      setTimeout(() => setTopicIdx(j => (j + 1) % chatPairs.length), 10)
      timers.current = schedule()
    }, 6700))
    timers.current = t
    return () => timers.current.forEach(clearTimeout)
  }, [step])

  const p = chatPairs[idx]
  const fading = phase === 5

  return (
    <FadeGroup step={step}>
      {/* Title + topic */}
      <div className="flex items-center mb-[12px] animate-[fadeSlide_0.4s_ease_both]" style={{ gap: '6px' }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#EF508D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 16.8l-6.2 4.5 2.4-7.4L2 9.4h7.6z" /></svg>
        <span className="text-[12px] text-[#555] font-[600] font-['Lato',sans-serif] tracking-[0.3px]">People are asking Axel</span>
        <span className="text-[12px] text-[#333] font-['Lato',sans-serif]">/</span>
        <span className={`text-[12px] text-[#666] font-['Lato',sans-serif] transition-opacity duration-500 ${fading ? 'opacity-0' : 'opacity-100'}`}>{chatPairs[topicIdx].topic}</span>
      </div>

      {/* All cycling content fades out together */}
      <div className={`relative transition-all duration-700 ${fading ? 'opacity-0 translate-y-[-6px]' : 'opacity-100 translate-y-0'}`} style={{ minHeight: '210px' }}>
        {/* User message */}
        <div className={`transition-all duration-400 ${phase >= 0 && !fading ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[6px]'}`}>
          <div className="bg-[#111] border border-[#222] rounded-[16px] px-[16px] py-[11px] w-fit ml-auto mb-[10px]">
            <p className="text-[13px] text-white/80 font-['Lato',sans-serif] leading-[1.45]">{p.user}</p>
          </div>
        </div>

        {/* Axel thinking + caring response share same slot to avoid layout shift */}
        <div style={{ height: '32px' }} className="mb-[8px] relative">
          {/* Thinking */}
          <div className={`absolute inset-0 flex items-center transition-opacity duration-300 ${phase === 1 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} style={{ gap: '8px' }}>
            <AxelAvatar size={24} />
            <span className="text-[13px] text-[#555] font-['Lato',sans-serif]">Thinking...</span>
          </div>
          {/* Caring response */}
          <div className={`absolute inset-0 flex items-start transition-opacity duration-300 ${phase >= 2 && !fading ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} style={{ gap: '8px' }}>
            <AxelAvatar size={24} className="mt-[2px]" />
            <p className="text-[13px] text-[#888] font-['Lato',sans-serif] leading-[1.45] pt-[3px]">{p.care}</p>
          </div>
        </div>

        {/* Skipped + outcome */}
        <div>
          {/* Skipped messages */}
          <div className={`flex justify-center my-[8px] transition-opacity duration-400 ${phase >= 3 && !fading ? 'opacity-100' : 'opacity-0'}`}>
            <div className="flex items-center" style={{ gap: '6px' }}>
              <div className="w-[20px] h-[1px] bg-[#222]" />
              <span className="text-[11px] text-[#444] font-['Lato',sans-serif]">{p.skipped} more messages</span>
              <div className="w-[20px] h-[1px] bg-[#222]" />
            </div>
          </div>

          {/* Outcome card */}
          <div className={`transition-all duration-500 ml-[32px] ${phase >= 4 && !fading ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[6px]'}`}>
            <div className="bg-[#111] border border-[#1A1A1A] rounded-[14px] overflow-hidden">
              <div className="px-[16px] py-[12px] border-b border-[#1A1A1A]">
                <div className="flex items-center justify-between">
                  <p className="text-[15px] text-white font-[600] font-['Lato',sans-serif]">{p.city}</p>
                  <div className="flex items-center" style={{ gap: '5px' }}>
                    <div className="w-[6px] h-[6px] rounded-full" style={{ backgroundColor: p.sColor }} />
                    <span className="text-[11px] font-['Lato',sans-serif]" style={{ color: p.sColor }}>{p.status}</span>
                  </div>
                </div>
                <p className="text-[12px] text-[#555] font-['Lato',sans-serif] mt-[3px]">{p.dates}</p>
              </div>
              <div className="px-[16px] py-[9px] border-b border-[#0D0D0D] flex items-center" style={{ gap: '10px' }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5 5.1 3-1.9 2-2.2-.8-.6.3 2.8 2.8.3-.6-.8-2.2 2-1.9 3 5.1.5-.3c.4-.2.6-.6.5-1.1z" /></svg>
                <p className="flex-1 text-[13px] text-[#AAA] font-['Lato',sans-serif]">{p.flight}</p>
                <span className="text-[12px] text-[#555] font-['Lato',sans-serif]">{p.fPrice}</span>
              </div>
              <div className="px-[16px] py-[9px] border-b border-[#0D0D0D] flex items-center" style={{ gap: '10px' }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18M3 7v14M21 7v14M6 11h4v4H6zM14 11h4v4h-4zM9 3h6l3 4H6l3-4z" /></svg>
                <p className="flex-1 text-[13px] text-[#AAA] font-['Lato',sans-serif]">{p.hotel}</p>
                <span className="text-[12px] text-[#555] font-['Lato',sans-serif]">{p.hPrice}</span>
              </div>
              <div className="px-[16px] py-[10px] flex items-center justify-between">
                <span className="text-[12px] text-[#555] font-['Lato',sans-serif]">{p.label}</span>
                <span className="text-[13px] font-[600] font-['Lato',sans-serif]" style={{ color: p.amountColor }}>{p.amount}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </FadeGroup>
  )
}

/* ── Plan + Book animated illustration ── */
function PlanBookIllustration({ step }) {
  // 0=init, 1=flight, 2=hotel, 3=total, 4=book btn, 5=btn press, 6=trip card, 7=booked msg
  const [phase, setPhase] = useState(0)
  const timers = useRef([])

  useEffect(() => {
    setPhase(0)
    timers.current.forEach(clearTimeout)
    timers.current = []
    timers.current.push(setTimeout(() => setPhase(1), 400))    // flight card
    timers.current.push(setTimeout(() => setPhase(2), 1200))   // hotel card
    timers.current.push(setTimeout(() => setPhase(3), 2000))   // total + savings
    timers.current.push(setTimeout(() => setPhase(4), 2800))   // book button
    timers.current.push(setTimeout(() => setPhase(5), 3600))   // button press
    timers.current.push(setTimeout(() => setPhase(6), 4200))   // collapse to trip card
    timers.current.push(setTimeout(() => setPhase(7), 4900))   // "Booked!"
    return () => timers.current.forEach(clearTimeout)
  }, [step])

  return (
    <FadeGroup step={step}>
      {/* Axel finds */}
      <div className="flex items-center mb-[8px] animate-[fadeSlide_0.35s_ease_both]" style={{ gap: '8px' }}>
        <AxelAvatar size={24} />
        <p className="text-[13px] text-[#777] font-['Lato',sans-serif]">Here&apos;s what I found for Miami</p>
      </div>

      {/* Cards → trip card */}
      <div className="relative">
        {/* Individual cards - fade out at phase 6 */}
        <div className={`transition-all duration-500 ${phase >= 6 ? 'opacity-0 scale-[0.96]' : 'opacity-100'}`}>
          {/* Flight */}
          <div className={`bg-[#111] border border-[#1A1A1A] rounded-[10px] px-[14px] py-[9px] mb-[5px] transition-all duration-400 ${phase >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[8px]'}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center" style={{ gap: '5px' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5 5.1 3-1.9 2-2.2-.8-.6.3 2.8 2.8.3-.6-.8-2.2 2-1.9 3 5.1.5-.3c.4-.2.6-.6.5-1.1z" /></svg>
                <span className="text-[12px] text-white font-['Lato',sans-serif]">JFK</span>
                <div className="w-[14px] h-[1px] bg-[#333]" />
                <span className="text-[12px] text-white font-['Lato',sans-serif]">MIA</span>
              </div>
              <span className="text-[13px] text-[#4FC660] font-[600] font-['Lato',sans-serif]">$412</span>
            </div>
            <p className="text-[11px] text-[#555] font-['Lato',sans-serif] mt-[2px]">Delta -- Nonstop</p>
          </div>
          {/* Hotel */}
          <div className={`bg-[#111] border border-[#1A1A1A] rounded-[10px] px-[14px] py-[9px] mb-[5px] transition-all duration-400 ${phase >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[8px]'}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center" style={{ gap: '5px' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18M3 7v14M21 7v14M6 11h4v4H6zM14 11h4v4h-4zM9 3h6l3 4H6l3-4z" /></svg>
                <span className="text-[12px] text-white font-['Lato',sans-serif]">Faena Miami</span>
              </div>
              <span className="text-[13px] text-[#4FC660] font-[600] font-['Lato',sans-serif]">$445</span>
            </div>
            <p className="text-[11px] text-[#555] font-['Lato',sans-serif] mt-[2px]">5 nights -- beachfront</p>
          </div>
          {/* Total + Axel Deal savings */}
          <div className={`bg-[#0D0D0D] border border-[#1A1A1A] rounded-[10px] px-[14px] py-[8px] mb-[8px] transition-all duration-400 ${phase >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[8px]'}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center" style={{ gap: '6px' }}>
                <span className="text-[11px] text-[#555] font-['Lato',sans-serif]">Total</span>
                <span className="text-[11px] text-[#444] font-['Lato',sans-serif] line-through">$957</span>
              </div>
              <span className="text-[14px] text-white font-[600] font-['Lato',sans-serif]">$857</span>
            </div>
            <div className="flex items-center mt-[3px]" style={{ gap: '4px' }}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#4FC660" strokeWidth="2.5" strokeLinecap="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /></svg>
              <span className="text-[11px] text-[#4FC660] font-['Lato',sans-serif]">You save $100 with Axel Deal</span>
            </div>
          </div>
          {/* Book button */}
          <div className={`rounded-[10px] py-[9px] flex items-center justify-center transition-all duration-400 ${phase >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[8px]'} ${phase >= 5 ? 'scale-[0.97] brightness-125' : ''}`} style={{ gap: '6px', background: 'linear-gradient(135deg, #1A1A1A 0%, #111 100%)', border: '1px solid #222' }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><path d="M20 6L9 17l-5-5" /></svg>
            <span className="text-[13px] text-white/90 font-[600] font-['Lato',sans-serif]">Book Trip</span>
          </div>
        </div>

        {/* Trip card - fades in at phase 6 */}
        <div className={`absolute inset-x-0 top-0 transition-all duration-500 ${phase >= 6 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[8px] pointer-events-none'}`} style={{ transitionDelay: phase >= 6 ? '200ms' : '0ms' }}>
          <div className="bg-[#111] border border-[#1A1A1A] rounded-[14px] overflow-hidden">
            <div className="px-[16px] py-[12px] border-b border-[#1A1A1A]">
              <div className="flex items-center justify-between">
                <p className="text-[15px] text-white font-[600] font-['Lato',sans-serif]">Miami Trip</p>
                <div className="flex items-center" style={{ gap: '5px' }}>
                  <div className="w-[6px] h-[6px] rounded-full bg-[#4FC660]" />
                  <span className="text-[11px] text-[#4FC660] font-['Lato',sans-serif]">Confirmed</span>
                </div>
              </div>
              <p className="text-[12px] text-[#555] font-['Lato',sans-serif] mt-[3px]">Apr 15 -- 20</p>
            </div>
            <div className="px-[16px] py-[9px] border-b border-[#0D0D0D] flex items-center" style={{ gap: '10px' }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5 5.1 3-1.9 2-2.2-.8-.6.3 2.8 2.8.3-.6-.8-2.2 2-1.9 3 5.1.5-.3c.4-.2.6-.6.5-1.1z" /></svg>
              <p className="flex-1 text-[13px] text-[#AAA] font-['Lato',sans-serif]">JFK to MIA -- Delta</p>
              <span className="text-[12px] text-[#555] font-['Lato',sans-serif]">$412</span>
            </div>
            <div className="px-[16px] py-[9px] border-b border-[#0D0D0D] flex items-center" style={{ gap: '10px' }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18M3 7v14M21 7v14M6 11h4v4H6zM14 11h4v4h-4zM9 3h6l3 4H6l3-4z" /></svg>
              <p className="flex-1 text-[13px] text-[#AAA] font-['Lato',sans-serif]">Faena Miami -- 5 nights</p>
              <span className="text-[12px] text-[#555] font-['Lato',sans-serif]">$445</span>
            </div>
            <div className="px-[16px] py-[10px] flex items-center justify-between">
              <span className="text-[12px] text-[#555] font-['Lato',sans-serif]">You saved</span>
              <span className="text-[13px] font-[600] text-[#4FC660] font-['Lato',sans-serif]">$100</span>
            </div>
          </div>
        </div>
      </div>

      {/* Axel confirms - phase 7 */}
      <div className={`mt-[8px] flex items-center transition-all duration-400 ${phase >= 7 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[6px]'}`} style={{ gap: '8px' }}>
        <AxelAvatar size={24} />
        <p className="text-[13px] text-[#4FC660] font-['Lato',sans-serif]">Booked! You saved $100.</p>
      </div>
    </FadeGroup>
  )
}

/* ── Come Back: Axel spots, grabs, rebooks — you do nothing ── */
function ComeBackIllustration({ step }) {
  // 0=watching, 1=spotted, 2=grabbing, 3=rebooked, 4=summary
  const [phase, setPhase] = useState(-1)
  const timers = useRef([])

  useEffect(() => {
    timers.current.forEach(clearTimeout)
    timers.current = []
    setPhase(-1)
    timers.current.push(setTimeout(() => setPhase(0), 400))
    timers.current.push(setTimeout(() => setPhase(1), 1800))
    timers.current.push(setTimeout(() => setPhase(2), 3200))
    timers.current.push(setTimeout(() => setPhase(3), 4600))
    timers.current.push(setTimeout(() => setPhase(4), 6000))
    return () => timers.current.forEach(clearTimeout)
  }, [step])

  return (
    <FadeGroup step={step}>
      {/* Header */}
      <div className="flex items-center mb-[12px] animate-[fadeSlide_0.4s_ease_both]" style={{ gap: '6px' }}>
        <AxelAvatar size={20} />
        <span className="text-[12px] text-[#555] font-[600] font-['Lato',sans-serif] tracking-[0.3px]">Miami Trip -- Apr 15</span>
      </div>

      {/* Step 1: Watching */}
      <div className={`transition-all duration-600 ${phase >= 0 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[8px]'}`}>
        <div className="flex items-center" style={{ gap: '8px' }}>
          <AxelAvatar size={24} />
          <div className="bg-[#0D0D0D] border border-[#1A1A1A] rounded-[16px] px-[14px] py-[10px] flex-1">
            <p className="text-[13px] text-[#EF508D] font-['Lato',sans-serif] leading-[1.45]">Watching your flight and hotel...</p>
          </div>
        </div>
      </div>

      {/* Step 2: Spotted price drop */}
      <div className={`mt-[8px] ml-[32px] transition-all duration-600 ${phase >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[8px]'}`}>
        <div className="bg-[#111] border border-[#1A1A1A] rounded-[10px] px-[14px] py-[9px]">
          <div className="flex items-center mb-[4px]" style={{ gap: '5px' }}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#AAA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
            <span className="text-[11px] text-[#AAA] font-['Lato',sans-serif]">Spotted a price drop</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[12px] text-[#AAA] font-['Lato',sans-serif]">JFK to MIA -- Delta</span>
            <div className="flex items-center" style={{ gap: '6px' }}>
              <span className="text-[11px] text-[#555] font-['Lato',sans-serif] line-through">$412</span>
              <span className="text-[13px] text-[#4FC660] font-[600] font-['Lato',sans-serif]">$365</span>
            </div>
          </div>
        </div>
      </div>

      {/* Step 3: Grabbing it */}
      <div className={`mt-[6px] ml-[32px] transition-all duration-600 ${phase >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[8px]'}`}>
        <div className="bg-[#111] border border-[#1A1A1A] rounded-[10px] px-[14px] py-[9px]">
          <div className="flex items-center mb-[4px]" style={{ gap: '5px' }}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#AAA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" /></svg>
            <span className="text-[11px] text-[#AAA] font-['Lato',sans-serif]">Grabbing it for you</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[12px] text-[#AAA] font-['Lato',sans-serif]">Canceling old fare, rebooking new</span>
            <span className="text-[11px] text-[#555] font-['Lato',sans-serif]">$47 less</span>
          </div>
        </div>
      </div>

      {/* Step 4: Rebooked */}
      <div className={`mt-[6px] ml-[32px] transition-all duration-600 ${phase >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[8px]'}`}>
        <div className="bg-[#111] border border-[#4FC660]/10 rounded-[10px] px-[14px] py-[9px]">
          <div className="flex items-center justify-between">
            <div className="flex items-center" style={{ gap: '5px' }}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#4FC660" strokeWidth="2.5" strokeLinecap="round"><path d="M20 6L9 17l-5-5" /></svg>
              <span className="text-[11px] text-[#4FC660] font-[600] font-['Lato',sans-serif]">Rebooked</span>
            </div>
            <span className="text-[11px] text-[#555] font-['Lato',sans-serif]">Confirmation sent</span>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className={`mt-[10px] flex items-center transition-all duration-600 ${phase >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[6px]'}`} style={{ gap: '8px' }}>
        <AxelAvatar size={24} />
        <div className="bg-[#0D0D0D] border border-[#1A1A1A] rounded-[16px] px-[14px] py-[10px] flex-1">
          <p className="text-[13px] text-[#999] font-['Lato',sans-serif] leading-[1.45]">Saved you <span className="text-[#4FC660] font-[600]">$47</span>. Same flight, lower price. I&apos;ll keep watching.</p>
        </div>
      </div>
    </FadeGroup>
  )
}

/* ── All Trips: list appears, then cycles through detail cards ── */
const allTrips = [
  { city: 'Miami Trip', dates: 'Apr 15 -- 20, 2026', status: 'Confirmed', sColor: '#4FC660', flight: 'JFK to MIA -- Delta', fPrice: '$289', hotel: 'Faena Miami -- 5 nights', hPrice: '$345', label: 'You saved', amount: '$121', amountColor: '#4FC660' },
  { city: 'Austin SXSW', dates: 'Jun 10 -- 15, 2026', status: 'Pending', sColor: '#FB7A29', flight: 'SFO to AUS -- United', fPrice: '$220', hotel: 'Hotel San Jose -- 5 nights', hPrice: '$490', label: 'Estimated', amount: '$710', amountColor: '#AAA' },
  { city: 'Denver Ski Trip', dates: 'Sep 5 -- 12, 2026', status: 'Planning', sColor: '#555', flight: 'LAX to DEN -- Southwest', fPrice: '$175', hotel: 'The Maven -- 7 nights', hPrice: '$630', label: '3 options', amount: 'saved', amountColor: '#555' },
]

function AllTripsIllustration({ step }) {
  // phases: 0=card1, 1=card2, 2=card3, 3+=cycle detail view for each card
  const [phase, setPhase] = useState(-1)
  const [activeDetail, setActiveDetail] = useState(-1)
  const timer = useRef(null)

  useEffect(() => {
    setPhase(-1)
    setActiveDetail(-1)
    const clear = () => clearTimeout(timer.current)

    // Cards appear one by one
    timer.current = setTimeout(() => setPhase(0), 300)
    const t1 = setTimeout(() => setPhase(1), 900)
    const t2 = setTimeout(() => setPhase(2), 1500)
    // Start cycling detail cards
    const t3 = setTimeout(() => { setPhase(3); setActiveDetail(0) }, 2800)

    // Cycle through details
    let cycle = 0
    const tCycle = setTimeout(() => {
      const run = () => {
        cycle++
        setActiveDetail(cycle % allTrips.length)
        timer.current = setTimeout(run, 2800)
      }
      timer.current = setTimeout(run, 2800)
    }, 2800)

    return () => { clear(); clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(tCycle) }
  }, [step])

  return (
    <div>
      {/* List view */}
      <div className="flex flex-col" style={{ gap: '10px' }}>
        {allTrips.map((trip, i) => {
          const visible = phase >= i
          const isActive = phase >= 3 && activeDetail === i
          return (
            <div
              key={i}
              className="transition-all duration-400"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(10px)',
                transitionDuration: '400ms',
              }}
            >
              {/* List card */}
              <div
                className="rounded-[12px] px-[16px] py-[14px] transition-all duration-300"
                style={{
                  background: isActive ? '#111' : '#0D0D0D',
                  border: isActive ? '1px solid #222' : '1px solid #1A1A1A',
                }}
              >
                <div className="flex items-center justify-between">
                  <p className="text-[15px] text-white font-[600] font-['Lato',sans-serif]">{trip.city}</p>
                  <div className="flex items-center" style={{ gap: '5px' }}>
                    <div className="w-[6px] h-[6px] rounded-full" style={{ backgroundColor: trip.sColor }} />
                    <span className="text-[11px] font-['Lato',sans-serif]" style={{ color: trip.sColor }}>{trip.status}</span>
                  </div>
                </div>
                <p className="text-[12px] text-[#555] font-['Lato',sans-serif] mt-[3px]">{trip.dates}</p>
              </div>

              {/* Expanded detail */}
              <div
                className="overflow-hidden transition-all duration-400"
                style={{
                  maxHeight: isActive ? '120px' : '0px',
                  opacity: isActive ? 1 : 0,
                  transitionDuration: '400ms',
                }}
              >
                <div className="mt-[1px] rounded-b-[12px] bg-[#111] border border-t-0 border-[#1A1A1A]">
                  <div className="px-[16px] py-[9px] border-b border-[#0D0D0D] flex items-center" style={{ gap: '10px' }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5 5.1 3-1.9 2-2.2-.8-.6.3 2.8 2.8.3-.6-.8-2.2 2-1.9 3 5.1.5-.3c.4-.2.6-.6.5-1.1z" /></svg>
                    <p className="flex-1 text-[13px] text-[#AAA] font-['Lato',sans-serif]">{trip.flight}</p>
                    <span className="text-[12px] text-[#555] font-['Lato',sans-serif]">{trip.fPrice}</span>
                  </div>
                  <div className="px-[16px] py-[9px] border-b border-[#0D0D0D] flex items-center" style={{ gap: '10px' }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18M3 7v14M21 7v14M6 11h4v4H6zM14 11h4v4h-4zM9 3h6l3 4H6l3-4z" /></svg>
                    <p className="flex-1 text-[13px] text-[#AAA] font-['Lato',sans-serif]">{trip.hotel}</p>
                    <span className="text-[12px] text-[#555] font-['Lato',sans-serif]">{trip.hPrice}</span>
                  </div>
                  <div className="px-[16px] py-[10px] flex items-center justify-between">
                    <span className="text-[12px] text-[#555] font-['Lato',sans-serif]">{trip.label}</span>
                    <span className="text-[13px] font-[600] font-['Lato',sans-serif]" style={{ color: trip.amountColor }}>{trip.amount}</span>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* ── Reprice: already booked? Axel watches for price drops + hotel upgrades ── */
const repriceScenarios = [
  {
    booking: 'Delta SFO to JFK',
    bookingDetail: 'May 8 -- Nonstop',
    bookingPrice: '$420',
    bookingIcon: <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5 5.1 3-1.9 2-2.2-.8-.6.3 2.8 2.8.3-.6-.8-2.2 2-1.9 3 5.1.5-.3c.4-.2.6-.6.5-1.1z" />,
    axelMsg: 'Flight dropped $108.',
    oldPrice: '$420',
    newPrice: '$312',
    color: '#4FC660',
    confirm: 'Repriced. Saved $108.',
  },
  {
    booking: 'Marriott Marquis NYC',
    bookingDetail: 'May 8-12 -- 4 nights',
    bookingPrice: '$820',
    bookingIcon: <path d="M3 21h18M3 7v14M21 7v14M6 11h4v4H6zM14 11h4v4h-4zM9 3h6l3 4H6l3-4z" />,
    axelMsg: 'Better hotel, $5 less.',
    oldPrice: '$820',
    newPrice: '$815',
    color: '#0090FF',
    confirm: 'Upgraded to The Greenwich.',
  },
]

function RepriceIllustration({ step }) {
  const [phase, setPhase] = useState(-1)
  const [scenarioIdx, setScenarioIdx] = useState(0)
  const [fading, setFading] = useState(false)
  const timers = useRef([])
  const cycleRef = useRef(null)

  useEffect(() => {
    timers.current.forEach(clearTimeout)
    timers.current = []
    if (cycleRef.current) clearInterval(cycleRef.current)
    setPhase(-1)
    setScenarioIdx(0)
    setFading(false)
    timers.current.push(setTimeout(() => setPhase(0), 300))
    timers.current.push(setTimeout(() => setPhase(1), 1000))
    timers.current.push(setTimeout(() => setPhase(2), 1800))
    timers.current.push(setTimeout(() => setPhase(3), 2600))
    return () => {
      timers.current.forEach(clearTimeout)
      if (cycleRef.current) clearInterval(cycleRef.current)
    }
  }, [step])

  // Cycle after first play
  useEffect(() => {
    if (phase < 3) return
    if (cycleRef.current) clearInterval(cycleRef.current)
    cycleRef.current = setInterval(() => {
      setFading(true)
      setTimeout(() => {
        setScenarioIdx(prev => (prev + 1) % repriceScenarios.length)
        setPhase(0)
        setFading(false)
        setTimeout(() => setPhase(1), 800)
        setTimeout(() => setPhase(2), 1600)
        setTimeout(() => setPhase(3), 2400)
      }, 600)
    }, 4000)
    return () => { if (cycleRef.current) clearInterval(cycleRef.current) }
  }, [phase >= 3])

  const s = repriceScenarios[scenarioIdx]

  return (
    <FadeGroup step={step}>
      {/* Everything cycles together */}
      <div className={`transition-all duration-600 ${fading ? 'opacity-0 translate-y-[-4px]' : 'opacity-100 translate-y-0'}`}>
        {/* Booking card */}
        <div className={`transition-all duration-500 ${phase >= 0 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[8px]'}`}>
          <div className="bg-[#111] border border-[#1A1A1A] rounded-[12px] px-[16px] py-[12px]">
            <p className="text-[11px] text-[#555] font-[600] font-['Lato',sans-serif] tracking-[0.5px] mb-[6px]">YOUR BOOKING</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center" style={{ gap: '6px' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">{s.bookingIcon}</svg>
                <span className="text-[14px] text-white font-[600] font-['Lato',sans-serif]">{s.booking}</span>
              </div>
              <span className="text-[13px] text-[#AAA] font-['Lato',sans-serif]">{s.bookingPrice}</span>
            </div>
            <p className="text-[12px] text-[#555] font-['Lato',sans-serif] mt-[3px]">{s.bookingDetail}</p>
          </div>
        </div>

        {/* Axel finds deal */}
        <div className={`mt-[10px] transition-all duration-500 ${phase >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[8px]'}`}>
          <div className="flex items-center" style={{ gap: '8px' }}>
            <AxelAvatar size={24} />
            <div className="bg-[#0D0D0D] border border-[#1A1A1A] rounded-[16px] px-[14px] py-[10px] flex-1">
              <p className="text-[13px] text-[#EF508D] font-['Lato',sans-serif]">{s.axelMsg}</p>
            </div>
          </div>
        </div>

        {/* Price comparison */}
        <div className={`mt-[8px] ml-[32px] transition-all duration-500 ${phase >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[8px]'}`}>
          <div className="bg-[#111] rounded-[10px] px-[14px] py-[10px]" style={{ border: `1px solid ${s.color}15` }}>
            <div className="flex items-center" style={{ gap: '8px' }}>
              <span className="text-[13px] text-[#555] font-['Lato',sans-serif] line-through">{s.oldPrice}</span>
              <span className="text-[18px] font-[600] font-['Lato',sans-serif]" style={{ color: s.color }}>{s.newPrice}</span>
            </div>
          </div>
        </div>

        {/* Confirmed */}
        <div className={`mt-[8px] ml-[32px] transition-all duration-500 ${phase >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[8px]'}`}>
          <div className="flex items-center" style={{ gap: '6px' }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={s.color} strokeWidth="2.5" strokeLinecap="round"><path d="M20 6L9 17l-5-5" /></svg>
            <span className="text-[12px] font-[600] font-['Lato',sans-serif]" style={{ color: s.color }}>{s.confirm}</span>
          </div>
        </div>
      </div>
    </FadeGroup>
  )
}

/* ── Paywall: free vs Axel One — what you unlock ── */
function PaywallIllustration({ step }) {
  const [phase, setPhase] = useState(-1)
  const timers = useRef([])

  useEffect(() => {
    timers.current.forEach(clearTimeout)
    timers.current = []
    setPhase(-1)
    timers.current.push(setTimeout(() => setPhase(0), 300))
    timers.current.push(setTimeout(() => setPhase(1), 1000))
    timers.current.push(setTimeout(() => setPhase(2), 1700))
    return () => timers.current.forEach(clearTimeout)
  }, [step])

  const freeFeatures = [
    'Search flights and hotels',
    'See every price and route',
    'Plan trips with Axel',
    'Price alerts on any trip',
  ]
  const oneFeatures = [
    { text: 'Book through Axel', desc: 'One tap, done' },
    { text: 'Auto price grab', desc: 'Axel locks lower fares instantly' },
    { text: 'Repricing', desc: 'Already booked? Axel rebooks cheaper' },
    { text: 'Axel Deals', desc: 'Member-only rates' },
  ]

  return (
    <FadeGroup step={step}>
      {/* Free tier */}
      <div className={`transition-all duration-600 ${phase >= 0 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[8px]'}`}>
        <div className="flex items-center justify-between mb-[6px]">
          <p className="text-[11px] text-[#555] font-[600] font-['Lato',sans-serif] tracking-[0.5px]">FREE FOREVER</p>
          <p className="text-[11px] text-[#444] font-['Lato',sans-serif]">$0</p>
        </div>
        <div className="bg-[#111] border border-[#1A1A1A] rounded-[12px] px-[14px] py-[10px] flex flex-col" style={{ gap: '7px' }}>
          {freeFeatures.map((t, i) => (
            <div key={i} className="flex items-center" style={{ gap: '8px' }}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round"><path d="M20 6L9 17l-5-5" /></svg>
              <span className="text-[12px] text-[#777] font-['Lato',sans-serif]">{t}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Axel One tier */}
      <div className={`mt-[10px] transition-all duration-600 ${phase >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[8px]'}`}>
        <div className="flex items-center justify-between mb-[6px]">
          <p className="text-[11px] text-[#EF508D] font-[600] font-['Lato',sans-serif] tracking-[0.5px]">AXEL ONE</p>
          <p className="text-[12px] text-[#AAA] font-['Lato',sans-serif]">$35<span className="text-[#555]">/yr</span></p>
        </div>
        <div className="bg-[#111] border border-[#EF508D]/10 rounded-[12px] px-[14px] py-[10px] flex flex-col" style={{ gap: '8px' }}>
          {oneFeatures.map((f, i) => (
            <div key={i} className="flex items-start" style={{ gap: '8px' }}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#EF508D" strokeWidth="2" strokeLinecap="round" className="mt-[2px] shrink-0"><path d="M20 6L9 17l-5-5" /></svg>
              <div>
                <span className="text-[12px] text-[#AAA] font-['Lato',sans-serif]">{f.text}</span>
                <span className="text-[11px] text-[#555] font-['Lato',sans-serif]"> -- {f.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Axel nudge */}
      <div className={`mt-[10px] flex items-center transition-all duration-600 ${phase >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[6px]'}`} style={{ gap: '8px' }}>
        <AxelAvatar size={24} />
        <p className="text-[13px] text-[#555] font-['Lato',sans-serif]">Explore free. Lock in when you find a deal.</p>
      </div>
    </FadeGroup>
  )
}

const PAYWALL_STEP = 4

const steps = [
  {
    icon: ChatIcon,
    headline: 'Just tell Axel what you need',
    subtext: 'A mood, a reason, a vague idea. Axel figures out the rest.',
    cta: 'See how Axel plans',
    illustration: (step) => <TellAxelIllustration step={step} />,
  },
  {
    icon: RouteIcon,
    headline: 'Axel plans. You book.',
    subtext: 'Flight, hotel, one plan that fits. One tap to confirm.',
    cta: 'Already have a booking?',
    illustration: (step) => <PlanBookIllustration step={step} />,
  },
  {
    icon: BookIcon,
    headline: 'Already booked? Axel reprices.',
    subtext: 'Forward your confirmation email or connect your inbox. Axel watches for price drops and hotel upgrades.',
    cta: 'What if you come back later?',
    illustration: (step) => <RepriceIllustration step={step} />,
  },
  {
    icon: ClockIcon,
    headline: 'Axel never stops watching',
    subtext: 'Flights, hotels, every trip you care about. Axel tracks prices around the clock.',
    cta: 'Meet Axel One',
    illustration: (step) => <ComeBackIllustration step={step} />,
  },
  {
    icon: LockIcon,
    headline: 'You decide when to commit',
    subtext: 'Everything is free to explore. Axel One unlocks booking, repricing, and auto price grab.',
    cta: null,
    illustration: (step) => <PaywallIllustration step={step} />,
  },
  {
    icon: LayersIcon,
    headline: 'All trips. One place.',
    subtext: 'Flight, hotel, changes, updates \u2014 always current, always together.',
    cta: 'Get Started',
    illustration: (step) => <AllTripsIllustration step={step} />,
  },
]

export default function Walkthrough({ onComplete, editMode = false }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [dismissed, setDismissed] = useState(false)
  // Live copy loaded from API, keyed by index: { headline, subtext, cta }
  const [liveCopy, setLiveCopy] = useState(null)

  // Detect ?edit=1 in URL — use state to avoid SSR/hydration mismatch
  const [isEditMode, setIsEditMode] = useState(false)
  useEffect(() => {
    setIsEditMode(editMode || new URLSearchParams(window.location.search).get('edit') === '1')
  }, [editMode])

  // Fetch copy from API on mount
  useEffect(() => {
    fetch('/api/walkthrough-copy')
      .then((r) => r.json())
      .then(setLiveCopy)
      .catch(() => {})
  }, [])

  // Listen for postMessage updates from dashboard panel
  useEffect(() => {
    function onMessage(e) {
      if (e.data?.type === 'wt-copy') setLiveCopy(e.data.copy)
    }
    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [])

  // Merge liveCopy into steps (keep icon + illustration from defaults)
  const mergedSteps = steps.map((s, i) => ({
    ...s,
    headline: liveCopy?.[i]?.headline ?? s.headline,
    subtext: liveCopy?.[i]?.subtext ?? s.subtext,
    cta: liveCopy?.[i]?.cta ?? s.cta,
  }))

  async function saveField(index, field, value) {
    const next = (liveCopy || mergedSteps.map((s) => ({ headline: s.headline, subtext: s.subtext, cta: s.cta }))).map((s, i) =>
      i === index ? { ...s, [field]: value } : s
    )
    setLiveCopy(next)
    await fetch('/api/walkthrough-copy', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(next),
    })
    // Notify parent dashboard
    window.parent?.postMessage({ type: 'wt-copy-saved', copy: next }, '*')
  }

  const handleNext = () => {
    if (currentStep === mergedSteps.length - 1) {
      setDismissed(true)
      setTimeout(() => onComplete?.(), 400)
    } else {
      setCurrentStep(currentStep + 1)
    }
  }

  const StepIcon = steps[currentStep].icon

  return (
    <div className="bg-black overflow-clip relative rounded-[30px] w-[393px] h-[852px] font-['Lato',sans-serif]">
      {/* Keyframes */}
      <style>{`
        @keyframes fadeSlide {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes axelGlow {
          0%, 100% { box-shadow: 0 0 6px rgba(239,80,141,0.1), 0 0 2px rgba(239,80,141,0.08); }
          50% { box-shadow: 0 0 12px rgba(239,80,141,0.22), 0 0 4px rgba(239,80,141,0.12); }
        }
      `}</style>

      <StatusBar />

      {/* Background: Axel chat screen */}
      <div className="absolute inset-0 top-[44px] bottom-0">
        {/* Nav bar */}
        <div className="flex items-center justify-between px-[16px] py-[12px]">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
          <span className="text-[16px] text-[#555] font-[600] font-['Lato',sans-serif]">New Trip</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
        </div>
        {/* Axel avatar + greeting */}
        <div className="px-[20px] mt-[8px]">
          <AxelAvatar size={48} className="mb-[16px]" />
          <p className="text-[16px] text-[#444] font-['Lato',sans-serif] text-center">What&apos;s the next adventure?</p>
        </div>
        {/* Input bar */}
        <div className="absolute bottom-[34px] left-[16px] right-[16px]">
          <div className="bg-[#0D0D0D] border border-[#EF508D]/15 rounded-[24px] px-[16px] py-[13px] flex items-center justify-between">
            <p className="text-[14px] text-[#333] font-['Lato',sans-serif]">Message Axel...</p>
            <div className="w-[28px] h-[28px] rounded-full border border-[#333] flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2.5" strokeLinecap="round"><path d="M12 19V5M5 12l7-7 7 7" /></svg>
            </div>
          </div>
        </div>
      </div>

      {/* Modal: bottom sheet */}
      <div
        className={`absolute inset-x-0 bottom-0 z-20 transition-all duration-500 ${
          dismissed ? 'translate-y-full opacity-0' : 'translate-y-0 opacity-100'
        }`}
        style={{ top: '120px' }}
      >
        {/* Gradient top edge */}
        <div
          className="absolute -top-[60px] left-0 right-0 h-[60px] pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.92))' }}
        />

        {/* Sheet */}
        <div
          className="relative h-full rounded-t-[24px] overflow-hidden flex flex-col"
          style={{ background: 'linear-gradient(180deg, #0A0A0A 0%, #000 100%)' }}
        >
          {/* Subtle top glow */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] h-[1px] pointer-events-none"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(239,80,141,0.2), transparent)' }}
          />

          {/* Handle + header */}
          <div className="pt-[10px] px-[24px] pb-[4px] shrink-0">
            {/* Drag handle */}
            <div className="w-[32px] h-[3px] rounded-full bg-[#333] mx-auto mb-[14px]" />
            {/* Icon + step label + skip */}
            <div className="flex items-center justify-between">
              <div className="flex items-center" style={{ gap: '8px' }}>
                <div className="w-[30px] h-[30px] rounded-[10px] bg-[#EF508D]/8 flex items-center justify-center">
                  <StepIcon />
                </div>
                <span className="text-[11px] text-[#444] font-['Lato',sans-serif]">{currentStep + 1} of {mergedSteps.length}</span>
              </div>
            </div>
          </div>

          {/* Carousel */}
          <div className="flex-1 overflow-hidden">
            <div
              className="flex h-full"
              style={{
                transform: `translateX(-${currentStep * 100}%)`,
                transition: 'transform 400ms ease',
              }}
            >
              {mergedSteps.map((step, i) => (
                <div key={i} className="w-full shrink-0 flex flex-col px-[24px] pt-[8px]">
                  {/* Illustration — only render active step */}
                  <div className="flex-1 flex items-center justify-center overflow-hidden">
                    <div className="w-full max-w-[300px]">
                      {i === currentStep ? step.illustration(currentStep) : null}
                    </div>
                  </div>
                  {/* Text */}
                  <div className="mt-[16px] mb-[4px]">
                    {isEditMode ? (
                      <>
                        <h2
                          contentEditable
                          suppressContentEditableWarning
                          onBlur={(e) => saveField(i, 'headline', e.currentTarget.textContent)}
                          className="text-[20px] text-white font-[600] leading-[1.3] outline-none rounded-[4px]"
                          style={{ borderBottom: '1px dashed rgba(239,80,141,0.4)', cursor: 'text' }}
                        >
                          {step.headline}
                        </h2>
                        <p
                          contentEditable
                          suppressContentEditableWarning
                          onBlur={(e) => saveField(i, 'subtext', e.currentTarget.textContent)}
                          className="text-[13px] text-[#666] font-[400] mt-[6px] leading-[1.55] outline-none rounded-[4px]"
                          style={{ borderBottom: '1px dashed rgba(239,80,141,0.2)', cursor: 'text' }}
                        >
                          {step.subtext}
                        </p>
                      </>
                    ) : (
                      <>
                        <h2 className="text-[20px] text-white font-[600] leading-[1.3]">
                          {step.headline}
                        </h2>
                        <p className="text-[13px] text-[#666] font-[400] mt-[6px] leading-[1.55]">
                          {step.subtext}
                        </p>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom controls */}
          <div className="px-[24px] pb-[40px] pt-[12px] shrink-0">
            {/* Dots */}
            <div className="flex items-center justify-center mb-[16px]" style={{ gap: '5px' }}>
              {mergedSteps.map((_, i) => (
                <div
                  key={i}
                  className={`h-[5px] rounded-full transition-all duration-300 ${
                    i === currentStep
                      ? 'w-[18px] bg-white'
                      : i < currentStep
                        ? 'w-[5px] bg-[#444]'
                        : 'w-[5px] bg-[#1A1A1A]'
                  }`}
                />
              ))}
            </div>
            {/* CTA — paywall step gets two buttons */}
            {currentStep === PAYWALL_STEP ? (

              <div className="flex flex-col" style={{ gap: '8px' }}>
                <button
                  onClick={handleNext}
                  className="w-full h-[48px] rounded-[14px] flex items-center justify-center cursor-pointer border-none"
                  style={{ background: '#EF508D' }}
                >
                  <span className="text-[14px] text-white font-[600] font-['Lato',sans-serif]">Become Axel One -- $35/yr</span>
                </button>
                <button
                  onClick={handleNext}
                  className="w-full h-[40px] rounded-[14px] flex items-center justify-center cursor-pointer border-none bg-transparent"
                >
                  <span className="text-[13px] text-[#555] font-['Lato',sans-serif]">Continue with Free</span>
                </button>
              </div>
            ) : (
              <button
                onClick={handleNext}
                className="w-full h-[48px] rounded-[14px] flex items-center justify-center cursor-pointer border-none"
                style={{ background: 'linear-gradient(135deg, #1A1A1A 0%, #111 100%)', border: '1px solid #222' }}
              >
                <span className="text-[14px] text-white/90 font-[600] flex items-center" style={{ gap: '6px' }}>
                  {mergedSteps[currentStep].cta}
                  {currentStep < mergedSteps.length - 1 && <ArrowIcon />}
                </span>
              </button>
            )}
          </div>
        </div>
      </div>

      <HomeIndicator />
    </div>
  )
}

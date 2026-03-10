'use client'

import statusIcons from '@/assets/status-icons.svg'

// ─── Default mock data ──────────────────────────────────────────────
const DEFAULT_DEAL = {
  airline: 'Alaska Airlines', flight_number: 'AS 1042', aircraft: 'Boeing 737-900ER',
  from: 'SEA', to: 'SFO', from_city: 'Seattle, WA', to_city: 'San Francisco, CA',
  from_airport: 'Seattle-Tacoma Intl', to_airport: 'San Francisco Intl',
  depart_time: '6:15 AM', arrive_time: '8:45 AM', duration: '2h 30m', stops: 'Nonstop',
  price: 358, original_price: 478, saved: 120, date: 'Apr 15',
  cabin_class: 'Economy', fare_type: 'Main Cabin', base_fare: 312, taxes: 46,
  baggage: '1 personal, 1 carry-on', checked_bag_fee: '$35', seat_selection: 'Included',
  layover_details: null, comparison_source: 'Google Flights',
  change_policy: 'Changes allowed ($0 fee)', cancel_policy: 'Cancel within 24h for full refund',
}

// ─── Helpers ────────────────────────────────────────────────────────
function parseStops(stopsStr) {
  if (!stopsStr || stopsStr === 'Nonstop' || stopsStr === 'Non-stop') return 0
  const m = stopsStr.match(/(\d+)/)
  return m ? parseInt(m[1], 10) : 0
}

function stopsColor(n) {
  if (n === 0) return '#4FC660'
  if (n === 1) return '#FB7A29'
  return '#EF4444'
}

function stopsLabel(n, city) {
  if (n === 0) return 'Nonstop'
  if (n === 1) return city ? `1 stop \u00B7 ${city}` : '1 stop'
  return `${n} stops`
}

// ─── Skeleton ───────────────────────────────────────────────────────
function Skeleton() {
  return (
    <div className="bg-[#111] rounded-[12px] border border-[#222] overflow-hidden animate-pulse">
      <div className="px-[14px] py-[10px] border-b border-[#222] flex items-center">
        <div className="w-[28px] h-[28px] rounded-full bg-[#222] mr-[10px]" />
        <div className="flex-1">
          <div className="h-[12px] w-[100px] bg-[#222] rounded mb-[4px]" />
          <div className="h-[10px] w-[60px] bg-[#1a1a1a] rounded" />
        </div>
        <div className="h-[18px] w-[56px] bg-[#222] rounded-full" />
      </div>
      <div className="px-[14px] py-[14px]">
        <div className="flex items-center justify-between mb-[6px]">
          <div className="h-[18px] w-[60px] bg-[#222] rounded" />
          <div className="h-[8px] flex-1 mx-[12px] bg-[#1a1a1a] rounded-full" />
          <div className="h-[18px] w-[60px] bg-[#222] rounded" />
        </div>
        <div className="flex items-center justify-between mb-[12px]">
          <div className="h-[11px] w-[28px] bg-[#1a1a1a] rounded" />
          <div className="h-[11px] w-[80px] bg-[#1a1a1a] rounded" />
          <div className="h-[11px] w-[28px] bg-[#1a1a1a] rounded" />
        </div>
        <div className="flex items-center mb-[12px]">
          <div className="h-[10px] w-[90px] bg-[#1a1a1a] rounded mr-[12px]" />
          <div className="h-[10px] w-[70px] bg-[#1a1a1a] rounded" />
        </div>
        <div className="border-t border-[#222] pt-[10px] flex items-center justify-between">
          <div className="h-[10px] w-[40px] bg-[#1a1a1a] rounded" />
          <div className="flex items-center">
            <div className="h-[18px] w-[40px] bg-[#222] rounded mr-[8px]" />
            <div className="h-[16px] w-[60px] bg-[#222] rounded-full" />
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Main Component ─────────────────────────────────────────────────
export default function FlightDealCard({
  deal = DEFAULT_DEAL,
  mode = 'list',
  leg = 'depart',
  loading = false,
  bestDeal = false,
  onClick,
}) {
  if (loading) return <Skeleton />

  const pctOff = Math.round((deal.saved / deal.original_price) * 100)

  // ═══ Detail Mode (preserved) ═══
  if (mode === 'detail') {
    return (
      <div className="bg-bg overflow-clip relative rounded-[30px] w-[393px] h-[852px] font-['Inter',sans-serif]">
        <div className="absolute top-0 left-0 right-0 flex h-[59px] items-center justify-between overflow-clip px-[28px] py-[15px]">
          <p className="font-['SF_Pro_Text',sans-serif] font-bold text-[15px] text-text-1 text-center tracking-[-0.045px] leading-[18px] w-[54px] h-[18px] shrink-0">9:41</p>
          <div className="relative shrink-0 w-[66.16px] h-[11px]">
            <img alt="" className="block max-w-none w-full h-full" src={statusIcons.src || statusIcons} />
          </div>
        </div>
        <div className="absolute left-0 right-0 top-[59px] px-[24px] py-[12px]">
          <div className="flex items-center">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="mr-[8px]"><path d="M12 15l-5-5 5-5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            <p className="font-medium text-[16px] text-text-1 leading-[1.5]">Flight Details</p>
          </div>
        </div>
        <div className="absolute left-0 right-0 top-[103px] bottom-[88px] overflow-y-auto px-[16px]">
          <div className="bg-card-bg rounded-[12px] px-[16px] py-[16px] mb-[12px]">
            <div className="flex items-center justify-between mb-[12px]">
              <div>
                <p className="font-['Lato',sans-serif] text-[14px] text-text-1 leading-[1.5]">{deal.airline}</p>
                <p className="font-['Lato',sans-serif] text-[12px] text-text-2 leading-[1.5]">{deal.flight_number} · {deal.aircraft}</p>
              </div>
              <div className="flex items-center">
                <span className="bg-blue/20 text-blue text-[11px] font-medium px-[8px] py-[3px] rounded-[20px] mr-[4px]">{deal.cabin_class}</span>
                <span className="bg-secondary/10 text-secondary text-[11px] font-medium px-[8px] py-[3px] rounded-[20px]">{deal.fare_type}</span>
              </div>
            </div>
            <div className="flex items-start justify-between mb-[16px]">
              <div className="w-[90px]">
                <p className="font-medium text-[20px] text-text-1 leading-[1.5]">{deal.depart_time}</p>
                <p className="font-medium text-[14px] text-text-1 leading-[1.5] mt-[2px]">{deal.from}</p>
                <p className="font-['Lato',sans-serif] text-[12px] text-text-2 leading-[1.5]">{deal.from_city}</p>
                <p className="font-['Lato',sans-serif] text-[12px] text-text-2/50 leading-[1.5]">{deal.from_airport}</p>
              </div>
              <div className="flex flex-col items-center mt-[8px] mx-[8px] flex-1">
                <div className="flex items-center w-full">
                  <div className="w-[8px] h-[8px] rounded-full bg-blue shrink-0" />
                  <div className="h-[1.5px] flex-1 bg-grey" />
                  {deal.layover_details && (<><div className="w-[6px] h-[6px] rounded-full bg-text-2/40 shrink-0" /><div className="h-[1.5px] flex-1 bg-grey" /></>)}
                  <div className="w-[8px] h-[8px] rounded-full bg-main shrink-0" />
                </div>
                <p className="font-['Lato',sans-serif] text-[12px] text-text-2 leading-[1.5] mt-[4px]">{deal.duration}</p>
                <p className="font-['Lato',sans-serif] text-[11px] text-text-2/60 leading-[1.5]">{deal.stops}</p>
              </div>
              <div className="w-[90px] text-right">
                <p className="font-medium text-[20px] text-text-1 leading-[1.5]">{deal.arrive_time}</p>
                <p className="font-medium text-[14px] text-text-1 leading-[1.5] mt-[2px]">{deal.to}</p>
                <p className="font-['Lato',sans-serif] text-[12px] text-text-2 leading-[1.5]">{deal.to_city}</p>
                <p className="font-['Lato',sans-serif] text-[12px] text-text-2/50 leading-[1.5]">{deal.to_airport}</p>
              </div>
            </div>
            {deal.layover_details && (
              <div className="bg-bg-2 rounded-[8px] px-[12px] py-[8px]">
                <p className="font-['Lato',sans-serif] text-[12px] text-text-2 leading-[1.5]">{deal.layover_details.duration} layover in {deal.layover_details.city} ({deal.layover_details.airport})</p>
              </div>
            )}
          </div>
          {deal.return && (
            <div className="bg-card-bg rounded-[12px] px-[16px] py-[16px] mb-[12px]">
              <div className="flex items-center justify-between mb-[12px]">
                <div>
                  <p className="font-medium text-[11px] text-text-2 leading-[1.5] uppercase tracking-wider">Return</p>
                  <p className="font-['Lato',sans-serif] text-[12px] text-text-2 leading-[1.5]">{deal.return.flight_number} · {deal.aircraft}</p>
                </div>
                <p className="font-['Lato',sans-serif] text-[12px] text-text-2 leading-[1.5]">{deal.return.date}</p>
              </div>
              <div className="flex items-start justify-between">
                <div className="w-[90px]">
                  <p className="font-medium text-[20px] text-text-1 leading-[1.5]">{deal.return.depart_time}</p>
                  <p className="font-medium text-[14px] text-text-1 leading-[1.5] mt-[2px]">{deal.to}</p>
                  <p className="font-['Lato',sans-serif] text-[12px] text-text-2 leading-[1.5]">{deal.to_city}</p>
                </div>
                <div className="flex flex-col items-center mt-[8px] mx-[8px] flex-1">
                  <div className="flex items-center w-full">
                    <div className="w-[8px] h-[8px] rounded-full bg-blue shrink-0" />
                    <div className="h-[1.5px] flex-1 bg-grey" />
                    {deal.return.layover_details && (<><div className="w-[6px] h-[6px] rounded-full bg-text-2/40 shrink-0" /><div className="h-[1.5px] flex-1 bg-grey" /></>)}
                    <div className="w-[8px] h-[8px] rounded-full bg-main shrink-0" />
                  </div>
                  <p className="font-['Lato',sans-serif] text-[12px] text-text-2 leading-[1.5] mt-[4px]">{deal.return.duration}</p>
                  <p className="font-['Lato',sans-serif] text-[11px] text-text-2/60 leading-[1.5]">{deal.return.stops}</p>
                </div>
                <div className="w-[90px] text-right">
                  <p className="font-medium text-[20px] text-text-1 leading-[1.5]">{deal.return.arrive_time}</p>
                  <p className="font-medium text-[14px] text-text-1 leading-[1.5] mt-[2px]">{deal.from}</p>
                  <p className="font-['Lato',sans-serif] text-[12px] text-text-2 leading-[1.5]">{deal.from_city}</p>
                </div>
              </div>
              {deal.return.layover_details && (
                <div className="bg-bg-2 rounded-[8px] px-[12px] py-[8px] mt-[16px]">
                  <p className="font-['Lato',sans-serif] text-[12px] text-text-2 leading-[1.5]">{deal.return.layover_details.duration} layover in {deal.return.layover_details.city} ({deal.return.layover_details.airport})</p>
                </div>
              )}
            </div>
          )}
          <div className="bg-card-bg rounded-[12px] px-[16px] py-[16px] mb-[12px]">
            <p className="font-medium text-[11px] text-text-2 leading-[1.5] uppercase tracking-wider mb-[12px]">Fare Details</p>
            <div className="flex items-center justify-between mb-[8px]"><p className="font-['Lato',sans-serif] text-[13px] text-text-2 leading-[1.5]">Baggage</p><p className="font-['Lato',sans-serif] text-[13px] text-text-1 leading-[1.5]">{deal.baggage}</p></div>
            <div className="flex items-center justify-between mb-[8px]"><p className="font-['Lato',sans-serif] text-[13px] text-text-2 leading-[1.5]">Checked bag</p><p className="font-['Lato',sans-serif] text-[13px] text-text-1 leading-[1.5]">{deal.checked_bag_fee}</p></div>
            <div className="flex items-center justify-between"><p className="font-['Lato',sans-serif] text-[13px] text-text-2 leading-[1.5]">Seat selection</p><p className="font-['Lato',sans-serif] text-[13px] text-text-1 leading-[1.5]">{deal.seat_selection}</p></div>
          </div>
          <div className="bg-card-bg rounded-[12px] overflow-hidden mb-[12px]">
            <div className="px-[16px] py-[16px]">
              <div className="flex mb-[8px]">
                <div className="flex-1 bg-bg-2 rounded-[8px] px-[12px] py-[12px] mr-[8px]"><p className="font-['Lato',sans-serif] text-[11px] text-text-2 leading-[1.5] mb-[4px]">{deal.comparison_source}</p><p className="font-medium text-[20px] text-secondary line-through leading-[1.5]">${deal.original_price}</p></div>
                <div className="flex-1 bg-green/20 rounded-[8px] px-[12px] py-[12px] border border-green/20"><p className="font-['Lato',sans-serif] text-[11px] text-green leading-[1.5] mb-[4px]">Axel</p><p className="font-medium text-[20px] text-text-1 leading-[1.5]">${deal.price}</p></div>
              </div>
            </div>
            <div className="bg-green/20 flex items-center justify-center px-[16px] py-[10px]"><p className="font-['Lato',sans-serif] font-bold text-[14px] text-green leading-[1.5]">Save ${deal.saved} · {pctOff}% off</p></div>
          </div>
          <div className="bg-card-bg rounded-[12px] px-[16px] py-[16px] mb-[12px]">
            <p className="font-medium text-[11px] text-text-2 leading-[1.5] uppercase tracking-wider mb-[12px]">Price Breakdown</p>
            <div className="flex items-center justify-between mb-[8px]"><p className="font-['Lato',sans-serif] text-[13px] text-text-2 leading-[1.5]">Base fare</p><p className="font-['Lato',sans-serif] text-[13px] text-text-1 leading-[1.5]">${deal.base_fare}</p></div>
            <div className="flex items-center justify-between mb-[8px]"><p className="font-['Lato',sans-serif] text-[13px] text-text-2 leading-[1.5]">Taxes &amp; fees</p><p className="font-['Lato',sans-serif] text-[13px] text-text-1 leading-[1.5]">${deal.taxes}</p></div>
            <div className="flex items-center justify-between mb-[12px]"><p className="font-['Lato',sans-serif] text-[13px] text-green leading-[1.5]">Axel discount</p><p className="font-['Lato',sans-serif] text-[13px] text-green leading-[1.5]">&minus;${deal.saved}</p></div>
            <div className="border-t border-grey pt-[12px] flex items-center justify-between"><p className="font-medium text-[16px] text-text-1 leading-[1.5]">Total</p><p className="font-medium text-[20px] text-text-1 leading-[1.5]">${deal.price}</p></div>
          </div>
          <div className="bg-card-bg rounded-[12px] px-[16px] py-[16px] mb-[24px]">
            <p className="font-medium text-[11px] text-text-2 leading-[1.5] uppercase tracking-wider mb-[12px]">Policies</p>
            <div className="flex items-center justify-between mb-[8px]"><p className="font-['Lato',sans-serif] text-[13px] text-text-2 leading-[1.5]">Changes</p><p className="font-['Lato',sans-serif] text-[13px] text-green leading-[1.5]">{deal.change_policy}</p></div>
            <div className="flex items-center justify-between"><p className="font-['Lato',sans-serif] text-[13px] text-text-2 leading-[1.5]">Cancellation</p><p className="font-['Lato',sans-serif] text-[13px] text-green leading-[1.5]">{deal.cancel_policy}</p></div>
          </div>
        </div>
        <div className="absolute left-[24px] right-[24px] bottom-[34px]">
          <div className="flex items-center justify-center w-full py-[14px] rounded-[30px] bg-main"><p className="font-medium text-[16px] text-white leading-[1.5]">Continue with this flight</p></div>
        </div>
      </div>
    )
  }

  // ═══ List / Card Mode ═══════════════════════════════════════════════
  const isReturn = leg === 'return'
  const r = deal.return || {}
  const legDepart = isReturn ? r.depart_time : deal.depart_time
  const legArrive = isReturn ? r.arrive_time : deal.arrive_time
  const legFrom = isReturn ? deal.to : deal.from
  const legTo = isReturn ? deal.from : deal.to
  const legStops = isReturn ? (r.stops || deal.stops) : deal.stops
  const legDuration = isReturn ? (r.duration || deal.duration) : deal.duration

  const numStops = parseStops(legStops)
  const stopCity = deal.layover_details?.city || null
  const airlineCode = deal.flight_number?.split(' ')[0] || ''

  const hasBag = deal.baggage?.toLowerCase().includes('carry-on')
  const hasChecked = deal.checked_bag_fee && deal.checked_bag_fee !== 'N/A' && !deal.checked_bag_fee.toLowerCase().includes('not included')

  return (
    <div
      onClick={onClick}
      className="group bg-[#111] rounded-[12px] border border-[#222] overflow-hidden hover:border-[#333] transition-colors cursor-pointer"
      style={bestDeal ? { borderLeft: '3px solid #4FC660' } : undefined}
    >
      {/* Airline Header */}
      <div className="px-[14px] py-[10px] border-b border-[#222] flex items-center">
        <div className="w-[28px] h-[28px] rounded-full bg-[#222] flex items-center justify-center mr-[10px] shrink-0">
          <span className="font-['Lato',sans-serif] font-bold text-[9px] text-white leading-[1]">{airlineCode}</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-['Lato',sans-serif] text-[13px] text-white leading-[1.3] truncate">{deal.airline}</p>
          <p className="font-['Lato',sans-serif] text-[11px] text-[#888] leading-[1.3]">{isReturn ? r.flight_number : deal.flight_number}</p>
        </div>
        <span className="font-['Lato',sans-serif] text-[11px] text-[#888] px-[8px] py-[2px] rounded-full bg-[#1a1a1a] shrink-0">{deal.cabin_class}</span>
        {bestDeal && (
          <span className="font-['Lato',sans-serif] font-medium text-[10px] text-[#4FC660] px-[8px] py-[2px] rounded-full bg-[#4FC660]/10 ml-[6px] shrink-0">Best Price</span>
        )}
      </div>

      {/* Route + Times */}
      <div className="px-[14px] pt-[12px] pb-[10px]">
        {/* Time row */}
        <div className="flex items-center justify-between mb-[4px]">
          <p className="font-['Lato',sans-serif] font-medium text-[18px] text-white leading-[1]">{legDepart}</p>
          <div className="flex-1 flex items-center mx-[12px]">
            <div className="w-[6px] h-[6px] rounded-full border-[1.5px] border-[#444] shrink-0" />
            <div className="h-[1px] flex-1 bg-[#333]" />
            {numStops > 0 && <div className="w-[5px] h-[5px] rounded-full shrink-0" style={{ backgroundColor: stopsColor(numStops) }} />}
            {numStops > 1 && <><div className="h-[1px] w-[8px] bg-[#333]" /><div className="w-[5px] h-[5px] rounded-full shrink-0" style={{ backgroundColor: stopsColor(numStops) }} /></>}
            <div className="h-[1px] flex-1 bg-[#333]" />
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none" className="shrink-0"><path d="M1 4h5M4.5 1.5L7 4l-2.5 2.5" stroke="#444" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
          <p className="font-['Lato',sans-serif] font-medium text-[18px] text-white leading-[1]">{legArrive}</p>
        </div>

        {/* Airport + duration row */}
        <div className="flex items-center justify-between mb-[2px]">
          <p className="font-['Lato',sans-serif] text-[12px] text-[#888] leading-[1]">{legFrom}</p>
          <p className="font-['Lato',sans-serif] text-[11px] text-[#666] leading-[1]">{legDuration}</p>
          <p className="font-['Lato',sans-serif] text-[12px] text-[#888] leading-[1]">{legTo}</p>
        </div>

        {/* Stops indicator */}
        <div className="flex justify-center mb-[10px]">
          <p className="font-['Lato',sans-serif] text-[11px] leading-[1]" style={{ color: stopsColor(numStops) }}>
            {stopsLabel(numStops, stopCity)}
          </p>
        </div>

        {/* Baggage row */}
        <div className="flex items-center mb-[10px]">
          {hasBag && (
            <div className="flex items-center mr-[12px]">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="1.8" strokeLinecap="round" className="mr-[4px] shrink-0"><rect x="6" y="2" width="12" height="20" rx="2" /><path d="M6 10h12M10 2v4M14 2v4" /></svg>
              <span className="font-['Lato',sans-serif] text-[11px] text-[#888] leading-[1]">Carry-on</span>
            </div>
          )}
          {hasChecked && (
            <div className="flex items-center">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="1.8" strokeLinecap="round" className="mr-[4px] shrink-0"><rect x="4" y="6" width="16" height="14" rx="2" /><path d="M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2" /></svg>
              <span className="font-['Lato',sans-serif] text-[11px] text-[#888] leading-[1]">Checked {deal.checked_bag_fee}</span>
            </div>
          )}
        </div>

        {/* Price row */}
        <div className="border-t border-[#222] pt-[10px] flex items-center justify-between">
          <div className="flex items-baseline">
            <span className="font-['Lato',sans-serif] text-[13px] text-[#888] line-through leading-[1] mr-[8px]">${deal.original_price}</span>
            <span className="font-['Lato',sans-serif] font-medium text-[20px] leading-[1]" style={{ color: '#4FC660' }}>${deal.price}</span>
          </div>
          <div className="bg-[#4FC660]/10 rounded-full px-[8px] py-[3px]">
            <span className="font-['Lato',sans-serif] font-medium text-[11px] leading-[1]" style={{ color: '#4FC660' }}>Save ${deal.saved}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

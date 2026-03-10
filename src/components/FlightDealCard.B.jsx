'use client'

import statusIcons from '@/assets/status-icons.svg'

export default function FlightDealCardB({ deal, mode = 'list', leg = 'depart', onClick }) {
  const pctOff = Math.round((deal.saved / deal.original_price) * 100)

  if (mode === 'detail') {
    return (
      <div className="bg-bg overflow-clip relative rounded-[30px] w-[393px] h-[852px] font-['Inter',sans-serif]">
        {/* Status Bar */}
        <div className="absolute top-0 left-0 right-0 flex h-[59px] items-center justify-between overflow-clip px-[28px] py-[15px]">
          <p className="font-['SF_Pro_Text',sans-serif] font-bold text-[15px] text-text-1 text-center tracking-[-0.045px] leading-[18px] w-[54px] h-[18px] shrink-0">9:41</p>
          <div className="relative shrink-0 w-[66.16px] h-[11px]">
            <img alt="" className="block max-w-none w-full h-full" src={statusIcons.src || statusIcons} />
          </div>
        </div>

        {/* Header */}
        <div className="absolute left-0 right-0 top-[59px] px-[24px] py-[12px]">
          <div className="flex items-center">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="mr-[8px]">
              <path d="M12 15l-5-5 5-5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p className="font-medium text-[16px] text-text-1 leading-[1.5]">Flight Details</p>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="absolute left-0 right-0 top-[103px] bottom-[88px] overflow-y-auto px-[16px]">

          {/* 1. Savings Hero */}
          <div className="bg-card-bg rounded-[12px] overflow-hidden mb-[12px]">
            <div className="px-[16px] py-[16px]">
              <div className="flex">
                {/* Left: comparison source / original price */}
                <div className="flex-1 bg-bg-2 rounded-[8px] px-[14px] py-[14px] mr-[8px]">
                  <p className="font-['Lato',sans-serif] text-[12px] text-text-2 leading-[1.5] mb-[4px]">{deal.comparison_source}</p>
                  <p className="font-medium text-[28px] text-secondary line-through leading-[1.5]">${deal.original_price}</p>
                  <p className="font-['Lato',sans-serif] text-[11px] text-text-2/60 leading-[1.5]">per person</p>
                </div>
                {/* Right: Axel price */}
                <div className="flex-1 bg-green/20 rounded-[8px] px-[14px] py-[14px] border border-green/20">
                  <p className="font-['Lato',sans-serif] text-[12px] text-green leading-[1.5] mb-[4px]">Axel</p>
                  <p className="font-medium text-[28px] text-text-1 leading-[1.5]">${deal.price}</p>
                  <p className="font-['Lato',sans-serif] text-[11px] text-green/60 leading-[1.5]">per person</p>
                </div>
              </div>
            </div>
            {/* Full-width green savings bar */}
            <div className="bg-green/20 flex items-center justify-center py-[12px]">
              <p className="font-bold text-[16px] text-green leading-[1.5]">
                Save ${deal.saved} &middot; {pctOff}% off
              </p>
            </div>
          </div>

          {/* 2. Flight Info */}
          <div className="bg-card-bg rounded-[12px] px-[16px] py-[16px] mb-[12px]">
            <p className="font-medium text-[11px] text-text-2 leading-[1.5] uppercase tracking-wider mb-[12px]">Flight</p>

            {/* Airline row */}
            <div className="mb-[12px]">
              <p className="font-['Lato',sans-serif] text-[14px] text-text-1 leading-[1.5]">{deal.airline} {deal.flight_number}</p>
              <p className="font-['Lato',sans-serif] text-[12px] text-text-2 leading-[1.5]">{deal.aircraft}</p>
            </div>

            {/* Divider */}
            <div className="border-t border-grey mt-[12px] mb-[12px]" />

            {/* Route timeline */}
            <div className="flex items-start justify-between mb-[4px]">
              <div className="w-[90px]">
                <p className="font-medium text-[16px] text-text-1 leading-[1.5]">{deal.depart_time}</p>
                <p className="font-['Lato',sans-serif] text-[12px] text-text-2 leading-[1.5]">{deal.from_city}</p>
              </div>
              <div className="flex flex-col items-center mt-[8px] mx-[8px] flex-1">
                <div className="flex items-center w-full">
                  <div className="w-[6px] h-[6px] rounded-full bg-blue shrink-0" />
                  <div className="h-[1.5px] flex-1 bg-grey" />
                  {deal.layover_details && (
                    <>
                      <div className="w-[6px] h-[6px] rounded-full bg-text-2/40 shrink-0" />
                      <div className="h-[1.5px] flex-1 bg-grey" />
                    </>
                  )}
                  <div className="w-[6px] h-[6px] rounded-full bg-main shrink-0" />
                </div>
                <p className="font-['Lato',sans-serif] text-[12px] text-text-2 leading-[1.5] mt-[4px]">{deal.duration}</p>
                <p className="font-['Lato',sans-serif] text-[11px] text-text-2/60 leading-[1.5]">{deal.stops}</p>
              </div>
              <div className="w-[90px] text-right">
                <p className="font-medium text-[16px] text-text-1 leading-[1.5]">{deal.arrive_time}</p>
                <p className="font-['Lato',sans-serif] text-[12px] text-text-2 leading-[1.5]">{deal.to_city}</p>
              </div>
            </div>

            {/* Layover details */}
            {deal.layover_details && (
              <div className="bg-bg-2 rounded-[8px] px-[12px] py-[8px] mt-[12px]">
                <p className="font-['Lato',sans-serif] text-[12px] text-text-2 leading-[1.5]">
                  {deal.layover_details.duration} layover in {deal.layover_details.city} ({deal.layover_details.airport})
                </p>
              </div>
            )}

            {/* Return leg */}
            {deal.return && (
              <>
                <div className="border-t border-grey mt-[12px] mb-[12px]" />
                <p className="font-medium text-[11px] text-text-2 leading-[1.5] uppercase tracking-wider mb-[8px]">Return · {deal.return.date}</p>
                <p className="font-['Lato',sans-serif] text-[12px] text-text-2 leading-[1.5] mb-[12px]">{deal.return.flight_number}</p>
                <div className="flex items-start justify-between mb-[4px]">
                  <div className="w-[90px]">
                    <p className="font-medium text-[16px] text-text-1 leading-[1.5]">{deal.return.depart_time}</p>
                    <p className="font-['Lato',sans-serif] text-[12px] text-text-2 leading-[1.5]">{deal.to_city}</p>
                  </div>
                  <div className="flex flex-col items-center mt-[8px] mx-[8px] flex-1">
                    <div className="flex items-center w-full">
                      <div className="w-[6px] h-[6px] rounded-full bg-blue shrink-0" />
                      <div className="h-[1.5px] flex-1 bg-grey" />
                      {deal.return.layover_details && (
                        <>
                          <div className="w-[6px] h-[6px] rounded-full bg-text-2/40 shrink-0" />
                          <div className="h-[1.5px] flex-1 bg-grey" />
                        </>
                      )}
                      <div className="w-[6px] h-[6px] rounded-full bg-main shrink-0" />
                    </div>
                    <p className="font-['Lato',sans-serif] text-[12px] text-text-2 leading-[1.5] mt-[4px]">{deal.return.duration}</p>
                    <p className="font-['Lato',sans-serif] text-[11px] text-text-2/60 leading-[1.5]">{deal.return.stops}</p>
                  </div>
                  <div className="w-[90px] text-right">
                    <p className="font-medium text-[16px] text-text-1 leading-[1.5]">{deal.return.arrive_time}</p>
                    <p className="font-['Lato',sans-serif] text-[12px] text-text-2 leading-[1.5]">{deal.from_city}</p>
                  </div>
                </div>
                {deal.return.layover_details && (
                  <div className="bg-bg-2 rounded-[8px] px-[12px] py-[8px] mt-[12px]">
                    <p className="font-['Lato',sans-serif] text-[12px] text-text-2 leading-[1.5]">
                      {deal.return.layover_details.duration} layover in {deal.return.layover_details.city} ({deal.return.layover_details.airport})
                    </p>
                  </div>
                )}
              </>
            )}
          </div>

          {/* 3. Fare */}
          <div className="bg-card-bg rounded-[12px] px-[16px] py-[16px] mb-[12px]">
            <p className="font-medium text-[11px] text-text-2 leading-[1.5] uppercase tracking-wider mb-[12px]">Fare</p>

            {/* Badges */}
            <div className="flex items-center mb-[12px]">
              <span className="font-medium text-[11px] leading-[1.5] uppercase tracking-wider bg-blue/20 text-blue px-[8px] py-[3px] rounded-[20px] mr-[4px]">{deal.cabin_class}</span>
              <span className="font-medium text-[11px] leading-[1.5] uppercase tracking-wider bg-secondary/10 text-secondary px-[8px] py-[3px] rounded-[20px]">{deal.fare_type}</span>
            </div>

            {/* Detail rows */}
            <div className="flex items-center justify-between mb-[8px]">
              <p className="font-['Lato',sans-serif] text-[13px] text-text-2 leading-[1.5]">Baggage</p>
              <p className="font-['Lato',sans-serif] text-[13px] text-text-1 leading-[1.5]">{deal.baggage}</p>
            </div>
            <div className="flex items-center justify-between mb-[8px]">
              <p className="font-['Lato',sans-serif] text-[13px] text-text-2 leading-[1.5]">Checked bag</p>
              <p className="font-['Lato',sans-serif] text-[13px] text-text-1 leading-[1.5]">{deal.checked_bag_fee}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="font-['Lato',sans-serif] text-[13px] text-text-2 leading-[1.5]">Seat selection</p>
              <p className="font-['Lato',sans-serif] text-[13px] text-text-1 leading-[1.5]">{deal.seat_selection}</p>
            </div>
          </div>

          {/* 4. Price Breakdown */}
          <div className="bg-card-bg rounded-[12px] px-[16px] py-[16px] mb-[12px]">
            <p className="font-medium text-[11px] text-text-2 leading-[1.5] uppercase tracking-wider mb-[12px]">Price Breakdown</p>
            <div className="flex items-center justify-between mb-[8px]">
              <p className="font-['Lato',sans-serif] text-[13px] text-text-2 leading-[1.5]">Base fare</p>
              <p className="font-['Lato',sans-serif] text-[13px] text-text-1 leading-[1.5]">${deal.base_fare}</p>
            </div>
            <div className="flex items-center justify-between mb-[8px]">
              <p className="font-['Lato',sans-serif] text-[13px] text-text-2 leading-[1.5]">Taxes &amp; fees</p>
              <p className="font-['Lato',sans-serif] text-[13px] text-text-1 leading-[1.5]">${deal.taxes}</p>
            </div>
            <div className="flex items-center justify-between mb-[12px]">
              <p className="font-['Lato',sans-serif] text-[13px] text-green leading-[1.5]">Axel discount</p>
              <p className="font-['Lato',sans-serif] text-[13px] text-green leading-[1.5]">&minus;${deal.saved}</p>
            </div>
            <div className="border-t border-grey pt-[12px] flex items-center justify-between">
              <p className="font-medium text-[16px] text-text-1 leading-[1.5]">Total</p>
              <p className="font-medium text-[20px] text-text-1 leading-[1.5]">${deal.price}</p>
            </div>
          </div>

          {/* 5. Policies */}
          <div className="bg-card-bg rounded-[12px] px-[16px] py-[16px] mb-[24px]">
            <p className="font-medium text-[11px] text-text-2 leading-[1.5] uppercase tracking-wider mb-[12px]">Policies</p>
            <div className="flex items-center justify-between mb-[8px]">
              <p className="font-['Lato',sans-serif] text-[13px] text-text-2 leading-[1.5]">Changes</p>
              <p className="font-['Lato',sans-serif] text-[13px] text-green leading-[1.5]">{deal.change_policy}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="font-['Lato',sans-serif] text-[13px] text-text-2 leading-[1.5]">Cancellation</p>
              <p className="font-['Lato',sans-serif] text-[13px] text-green leading-[1.5]">{deal.cancel_policy}</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="absolute left-[24px] right-[24px] bottom-[34px]">
          <div className="flex items-center justify-center w-full py-[14px] rounded-[30px] bg-main">
            <p className="font-medium text-[16px] text-white leading-[1.5]">Continue with this flight</p>
          </div>
        </div>
      </div>
    )
  }

  // ═══ List Mode — Price-Forward ═══
  const airlineCode = deal.flight_number.split(' ')[0]
  const isReturn = leg === 'return'
  const r = deal.return || {}
  const legFrom = isReturn ? deal.to : deal.from
  const legTo = isReturn ? deal.from : deal.to
  const legDepart = isReturn ? r.depart_time : deal.depart_time
  const legArrive = isReturn ? r.arrive_time : deal.arrive_time
  const legDate = isReturn ? r.date : deal.date

  return (
    <div className="bg-card-bg rounded-[12px] overflow-hidden" onClick={onClick}>
      {/* Airline header bar — price emphasis */}
      <div className="bg-text-2/5 h-[53px] flex items-center px-[14px]">
        <div className="w-[28px] h-[28px] rounded-full bg-bg-2 flex items-center justify-center mr-[10px] shrink-0">
          <p className="font-bold text-[10px] text-text-1 leading-[15px]">{airlineCode}</p>
        </div>
        <div className="flex-1">
          <p className="font-['Lato',sans-serif] text-[12px] text-text-1 leading-[18px]">{deal.airline}</p>
          <p className="font-['Lato',sans-serif] text-[10px] text-text-2 leading-[15px]">{isReturn ? r.flight_number : deal.flight_number}</p>
        </div>
        <div className="flex items-baseline">
          <p className="font-medium text-[20px] text-green leading-[20px] mr-[6px]">${deal.price}</p>
          <p className="font-['Lato',sans-serif] text-[11px] text-secondary line-through leading-[15px]">${deal.original_price}</p>
        </div>
      </div>

      {/* Route section */}
      <div className="pl-[14px] py-[12px]">
        <div className="flex items-start">
          <div className="flex flex-col items-center w-[6px] mr-[10px] shrink-0" style={{ height: 50 }}>
            <div className="w-[6px] h-[6px] rounded-full bg-grey shrink-0" />
            <div className="w-[1px] flex-1 bg-grey" />
            <div className="w-[6px] h-[6px] rounded-full bg-grey shrink-0" />
          </div>
          <div className="flex flex-col flex-1" style={{ height: 50 }}>
            <div className="flex items-center justify-between flex-1 pr-[14px]">
              <p className="font-['Lato',sans-serif] font-medium text-[14px] text-text-1 leading-[21px]">{legFrom}</p>
              <p className="font-['Lato',sans-serif] text-[12px] text-text-2 leading-[18px]">{legDepart} · {legDate}</p>
            </div>
            <div className="flex items-center justify-between flex-1 pr-[14px]">
              <p className="font-['Lato',sans-serif] font-medium text-[14px] text-text-1 leading-[21px]">{legTo}</p>
              <p className="font-['Lato',sans-serif] text-[12px] text-text-2 leading-[18px]">{legArrive}</p>
            </div>
          </div>
        </div>

        {/* Bottom info row — savings emphasis */}
        <div className="flex items-center justify-between border-t border-text-2/10 pt-[9px] mt-[10px] pr-[14px]">
          <div className="flex items-center">
            <p className="font-['Lato',sans-serif] text-[11px] text-text-2 leading-[16.5px]">{isReturn ? (r.stops || deal.stops) : deal.stops}</p>
            <p className="font-['Lato',sans-serif] text-[11px] text-text-2 leading-[16.5px] mx-[8px]">·</p>
            <p className="font-['Lato',sans-serif] text-[11px] text-text-2 leading-[16.5px]">{deal.cabin_class}</p>
          </div>
          <div className="bg-green/10 rounded-[12px] px-[8px] py-[2px]">
            <p className="font-medium text-[10px] text-green leading-[15px]">Saved ${deal.saved} · {pctOff}% off</p>
          </div>
        </div>
      </div>
    </div>
  )
}

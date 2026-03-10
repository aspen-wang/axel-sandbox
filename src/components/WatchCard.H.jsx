'use client'

const STATE_CONFIG = {
  watching: { text: 'text-main', dot: 'bg-main', label: 'Monitoring' },
  price_dropping: { text: 'text-green', dot: 'bg-green', label: 'Dropping' },
  deal_found: { text: 'text-green', dot: 'bg-green', label: 'Deal found' },
}

function MetricBox({ label, value, valueColor = 'text-text-1', small = false }) {
  return (
    <div className="bg-bg rounded-[8px] px-[10px] py-[8px]">
      <p className="font-['Lato',sans-serif] text-[10px] text-text-2 leading-[1] uppercase tracking-wider">{label}</p>
      <p className={`font-bold ${small ? 'text-[14px]' : 'text-[16px]'} leading-[1] mt-[4px] ${valueColor}`}>{value}</p>
    </div>
  )
}

export default function WatchCardH({ watch, state = 'watching', onClick }) {
  const s = STATE_CONFIG[state] || STATE_CONFIG.watching
  const diff = watch.current_price - watch.grab_price
  const belowTarget = diff <= 0

  return (
    <div className="bg-bg-2 rounded-[16px] overflow-hidden px-[14px] py-[12px]" onClick={onClick}>
      {/* Header: route + status */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <p className="font-medium text-[15px] text-text-1 leading-[1]">
            {watch.from} <span className="text-text-2 mx-[4px]">&rarr;</span> {watch.to}
          </p>
        </div>
        <div className="flex items-center">
          <div className={`w-[6px] h-[6px] rounded-full ${s.dot} mr-[5px] shrink-0`} />
          <p className={`font-['Lato',sans-serif] text-[11px] leading-[1] ${s.text}`}>{s.label}</p>
        </div>
      </div>

      {/* Subtitle */}
      <p className="font-['Lato',sans-serif] text-[11px] text-text-2 leading-[1] mt-[4px]">
        {watch.depart_date} &ndash; {watch.return_date} · {watch.stops} · {watch.cabin_class}
      </p>

      {/* 2×2 Metric Grid */}
      <div className="mt-[10px]">
        <div className="flex mb-[6px]">
          <div className="flex-1 mr-[6px]">
            <MetricBox label="Current" value={`$${watch.current_price}`} valueColor={state === 'deal_found' ? 'text-green' : 'text-text-1'} />
          </div>
          <div className="flex-1">
            <MetricBox label="Target" value={`$${watch.grab_price}`} valueColor="text-green" />
          </div>
        </div>
        <div className="flex">
          <div className="flex-1 mr-[6px]">
            <MetricBox label="Lowest" value={`$${watch.lowest_price}`} small />
          </div>
          <div className="flex-1">
            <MetricBox
              label="Difference"
              value={belowTarget ? 'Below!' : `+$${diff}`}
              valueColor={belowTarget ? 'text-green' : 'text-green'}
              small
            />
          </div>
        </div>
      </div>

      {/* Bottom: checks */}
      <p className="font-['Lato',sans-serif] text-[10px] text-text-2 leading-[1] mt-[8px]">
        {watch.checks_today} checks today · Created {watch.created}
      </p>

      {/* Deal CTA */}
      {state === 'deal_found' && (
        <div className="flex items-center justify-center w-full py-[9px] bg-green rounded-[10px] mt-[10px]">
          <p className="font-medium text-[12px] text-white leading-[1]">View deal</p>
        </div>
      )}
    </div>
  )
}

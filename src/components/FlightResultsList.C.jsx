'use client'

export default function FlightResultsListC({ FlightResultCardComponent, deals }) {
  const Card = FlightResultCardComponent

  const cheapest = Math.min(...deals.map((d) => d.price))
  const totalSaved = deals.reduce((sum, d) => sum + d.saved, 0)

  return (
    <div className="flex flex-col w-full">
      {/* Mini summary stats */}
      <div className="flex items-center justify-between w-full mb-[10px]">
        <p className="font-medium text-[13px] text-text-2 leading-normal">
          {deals.length} flights
        </p>
        <div className="flex items-center">
          <p className="text-[11px] text-text-2 leading-normal mr-[12px]">
            From <span className="text-green font-medium">${cheapest}</span>
          </p>
          <p className="text-[11px] text-green leading-normal">
            Up to ${totalSaved} saved
          </p>
        </div>
      </div>

      {/* Condensed card list */}
      {deals.map((deal, i) => (
        <div key={deal.id} className={i < deals.length - 1 ? 'mb-[8px]' : ''}>
          <Card deal={deal} />
        </div>
      ))}
    </div>
  )
}

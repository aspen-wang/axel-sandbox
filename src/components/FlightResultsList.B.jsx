'use client'

export default function FlightResultsListB({ FlightResultCardComponent, deals }) {
  const Card = FlightResultCardComponent
  return (
    <div className="flex flex-col w-full">
      {/* Header */}
      <p className="font-medium text-[14px] text-text-2 leading-normal mb-[16px]">
        {deals.length} flights found
      </p>

      {/* Card list with dividers + best deal badge */}
      {deals.map((deal, i) => (
        <div key={deal.id}>
          {/* Best deal badge on first card */}
          {i === 0 && (
            <div className="flex items-center mb-[8px]">
              <div className="bg-green/15 px-[10px] py-[3px] rounded-[12px]">
                <p className="font-medium text-[11px] text-green leading-normal">Best deal</p>
              </div>
            </div>
          )}
          <Card deal={deal} />
          {/* Divider between cards */}
          {i < deals.length - 1 && (
            <div className="w-full h-[1px] bg-text-2/10 my-[20px]" />
          )}
        </div>
      ))}
    </div>
  )
}

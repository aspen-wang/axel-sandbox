'use client'

export default function FlightResultsList({ FlightResultCardComponent, deals }) {
  const Card = FlightResultCardComponent
  return (
    <div className="flex flex-col w-full">
      {/* Header */}
      <p className="font-medium text-[14px] text-text-2 leading-normal mb-[12px]">
        {deals.length} flights found
      </p>

      {/* Card list */}
      {deals.map((deal, i) => (
        <div key={deal.id} className={i < deals.length - 1 ? 'mb-[12px]' : ''}>
          <Card deal={deal} />
        </div>
      ))}
    </div>
  )
}

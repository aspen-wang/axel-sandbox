'use client'

import { getFlightDeals } from '@/lib/data'
import FlightDealCard from '@/components/FlightDealCard'

const deals = getFlightDeals()

export default function FlightDealDetailTemplate({
  FlightDealCardComponent = FlightDealCard,
}) {
  const Card = FlightDealCardComponent
  return <Card deal={deals[0]} mode="detail" />
}

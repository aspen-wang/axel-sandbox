'use client'

import { getHotelDeals } from '@/lib/data'
import HotelDealCard from '@/components/HotelDealCard'

const deals = getHotelDeals()

export default function HotelDealDetailTemplate({
  HotelDealCardComponent = HotelDealCard,
}) {
  const Card = HotelDealCardComponent
  return <Card deal={deals[0]} mode="detail" />
}

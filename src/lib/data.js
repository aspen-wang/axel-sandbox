import flights from '@/data/flights.json'
import bookings from '@/data/bookings.json'
import userProfile from '@/data/user-profile.json'
import watches from '@/data/watches.json'
import travelers from '@/data/travelers.json'
import plans from '@/data/plans.json'
import activity from '@/data/activity.json'
import flightDeals from '@/data/flight-deals.json'
import hotelDeals from '@/data/hotel-deals.json'
import hotelWatches from '@/data/hotel-watches.json'

// TODO: Replace with Supabase client
export function getFlights() {
  return flights
}

// TODO: Replace with Supabase client
export function getBookings() {
  return bookings
}

// TODO: Replace with Supabase client
export function getUserProfile() {
  return userProfile
}

export function getWatches() {
  return watches
}

export function getTravelers() {
  return travelers
}

export function getPlans() {
  return plans
}

export function getActivity() {
  return activity
}

export function getFlightDeals() {
  return flightDeals
}

export function getHotelDeals() {
  return hotelDeals
}

export function getHotelWatches() {
  return hotelWatches
}

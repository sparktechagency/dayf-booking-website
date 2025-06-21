import React from 'react'
import BookingForm from './_components/BookingForm'
import BookedHotelDetails from './_components/BookedHotelDetails'

export default function page() {
  return (
    <div>
        <BookedHotelDetails />
        <BookingForm />
    </div>
  )
}

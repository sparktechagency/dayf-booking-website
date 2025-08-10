import React from 'react'
import BookingHistoryDetailsContainer from './_components/BookingHistoryDetailsContainer'

export const metadata = {
  title: "Details Booking History",
  description: "Details of your booking history"
};

export default function page() {
  return (
    <div>
      <BookingHistoryDetailsContainer />
    </div>
  )
}

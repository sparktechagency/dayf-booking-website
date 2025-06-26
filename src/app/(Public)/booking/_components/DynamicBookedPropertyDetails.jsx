"use client";
import { useSearchParams } from "next/navigation";
import React from "react";
import BookedApartmentDetails from "./BookedApartmentDetails";
import BookingForm from "./BookingForm";
import { useGetSingleApartmentQuery } from "@/redux/api/apartmentApi";
import BookedHotelRoomDetails from "./BookedHotelRoomDetails";

export default function DynamicBookedPropertyDetails() {
  const searchParams = useSearchParams();
  const apartmentId = searchParams?.get("apartmentId");
  const hotelId = searchParams?.get("hotelId");
  const checkInOutDate = JSON.parse(searchParams?.get("checkInOutDate"));

  // Get apartment
  const { data: apartment, isLoading: apartmentLoading } =
    useGetSingleApartmentQuery(apartmentId, {
      skip: !apartmentId
    });

  return (
    <div className="flex max-w-full flex-col items-start justify-between gap-10 lg:flex-row">
      {!apartmentLoading && apartment && (
        <BookingForm apartment={apartment} checkInOutDate={checkInOutDate} />
      )}

      {!apartmentLoading && apartment ? (
        <BookedApartmentDetails
          apartmentId={apartmentId}
          checkInOutDate={checkInOutDate}
          apartment={apartment}
        />
      ) : (
        <BookedHotelRoomDetails
          hotelId={hotelId}
          checkInOutDate={checkInOutDate}
        />
      )}
    </div>
  );
}

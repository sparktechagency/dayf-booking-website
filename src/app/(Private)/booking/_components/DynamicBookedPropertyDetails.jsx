"use client";
import { useSearchParams } from "next/navigation";
import React from "react";
import BookedApartmentDetails from "./BookedApartmentDetails";
import BookingForm from "./BookingForm";
import { useGetSingleApartmentQuery } from "@/redux/api/apartmentApi";
import BookedHotelRoomDetails from "./BookedHotelRoomDetails";
import { useGetSingleRoomCategoryQuery } from "@/redux/api/propertyApi";
import CustomLoader from "@/components/CustomLoader/CustomLoader";

export default function DynamicBookedPropertyDetails() {
  const searchParams = useSearchParams();
  const apartmentId = searchParams?.get("apartmentId") || "";
  const hotelRoomId = searchParams?.get("hotelRoomId") || "";
  const checkInOutDate = JSON.parse(searchParams?.get("checkInOutDate")) || "";
  const roomQuanity = Number(searchParams?.get("quantity")) || 1;

  // Get apartment
  const { data: apartment, isLoading: apartmentLoading } =
    useGetSingleApartmentQuery(apartmentId, {
      skip: !apartmentId
    });

  // Get hotel room details
  const { data: hotelRoom, isLoading: hotelRoomLoading } =
    useGetSingleRoomCategoryQuery(hotelRoomId, {
      skip: !hotelRoomId
    });

  if (apartmentLoading || hotelRoomLoading) {
    return (
      <div className="my-20 flex items-center justify-center">
        <CustomLoader />
      </div>
    );
  }

  return (
    <div className="flex max-w-full flex-col items-start justify-between gap-10 lg:flex-row">
      {(apartment || hotelRoom) && (
        <BookingForm
          apartment={apartment}
          hotelRoom={hotelRoom}
          roomQuanity={roomQuanity}
          checkInOutDate={checkInOutDate}
        />
      )}

      {apartment ? (
        <BookedApartmentDetails
          apartmentId={apartmentId}
          checkInOutDate={checkInOutDate}
          apartment={apartment}
        />
      ) : (
        hotelRoom && (
          <BookedHotelRoomDetails
            checkInOutDate={checkInOutDate}
            roomQuanity={roomQuanity}
            hotelRoom={hotelRoom}
          />
        )
      )}
    </div>
  );
}

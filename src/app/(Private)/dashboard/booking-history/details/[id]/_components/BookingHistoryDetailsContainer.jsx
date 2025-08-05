"use client";

import React from "react";
import { format } from "date-fns";
import { useGetSingleBookingQuery } from "@/redux/api/bookingApi";
import { useParams } from "next/navigation";

import { Card, CardContent } from "@/components/ui/card";
import { BedDouble, Maximize } from "lucide-react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import ReviewForm from "./ReviewForm";

export default function BookingHistoryDetailsContainer() {
  const params = useParams();

  const { data: booking, refetch } = useGetSingleBookingQuery(params?.id);
  console.log("Single Booking =====================> ", booking);

  return (
    <div className="mx-auto w-full md:p-0">
      <Card className="overflow-hidden border-none shadow-none">
        <div className="relative flex flex-col gap-8 md:flex-row md:p-6">
          <Swiper
            modules={[Pagination]}
            spaceBetween={5}
            slidesPerView={1}
            allowTouchMove={true}
            pagination={{
              el: ".swiper-pagination",
              clickable: true,
              bulletClass: "swiper-pagination-bullet",
              bulletActiveClass:
                "swiper-pagination-bullet-active !bg-white !scale-[1.05]"
            }}
            direction="horizontal"
            speed={600}
            className="hotel-card-img-slider-radius w-full md:max-w-[50%]"
          >
            {booking?.reference?.images?.map((image) => (
              <SwiperSlide
                key={image?.url}
                className="hotel-card-img-slider-radius relative overflow-hidden rounded-xl"
              >
                <Image
                  src={image?.url}
                  alt={`Photo of the ${booking?.property?.name} hotel.`}
                  height={900}
                  width={900}
                  className="hotel-card-img-slider-radius h-[300px] w-full overflow-hidden object-cover transition-all duration-300 ease-in-out hover:scale-105 hover:brightness-110"
                />
              </SwiperSlide>
            ))}

            {/* <!-- Pagination --> */}
            <div className="swiper-pagination !absolute !bottom-2 !left-1/2 mx-auto !-translate-x-1/2 space-x-2"></div>
          </Swiper>
          <div className="w-full space-y-4">
            <div>
              <h1 className="text-h3 font-semibold tracking-tight">
                {booking?.modelType === "Apartment"
                  ? booking?.reference?.name
                  : booking?.reference?.category}
              </h1>
              <p className="text-gray-600">
                {booking?.reference?.descriptions}
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-gray-600">
                <BedDouble className="h-4 w-4" />
                <span className="text-base">
                  {booking?.reference?.bedDetails}
                </span>
              </div>

              <div className="flex items-center gap-2 text-gray-600">
                <Maximize className="h-4 w-4" />
                <span className="text-base">
                  {booking?.reference?.roomSpace} sq ft
                </span>
              </div>
            </div>
            {/* Guests Info */}
            <div className="text-gray-600">
              <h4 className="text-lg font-semibold">Guest Info</h4>
              <ul className="ml-12 mt-2 list-disc">
                <li>
                  <p className="text-base">
                    <span className="font-medium">Adult:</span>{" "}
                    {booking?.reference?.guests?.adult}
                  </p>
                </li>
                <li>
                  <p className="text-base">
                    <span className="font-medium">Children:</span>{" "}
                    {booking?.reference?.guests?.children}
                  </p>
                </li>
                <li>
                  <p className="text-base">
                    <span className="font-medium">Infants:</span>{" "}
                    {booking?.reference?.guests?.infants}
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <CardContent className="space-y-6 border-t p-6">
          <div className="flex items-baseline gap-1">
            <p className="text-2xl font-bold">Booking Info</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 md:divide-x-2">
            <div className="space-y-6">
              <div className="grid gap-4">
                {/* Total Price */}
                <div className="flex justify-between">
                  <p className="font-semibold">Name</p>
                  <p>{booking?.author?.name}</p>
                </div>
                <div className="flex justify-between">
                  <p className="font-semibold">Email</p>
                  <p>{booking?.author?.email}</p>
                </div>

                {/* Booking Type */}
                <div className="flex justify-between">
                  <p className="font-semibold">Booking Type</p>
                  <p>{booking?.modelType}</p>
                </div>
                {/* Total Room */}
                <div className="flex justify-between">
                  <p className="font-semibold">Total Room</p>
                  <p>{booking?.totalRooms}</p>
                </div>
                {/* Price Per Night */}
                <div className="flex justify-between">
                  {booking?.modelType === "Apartment" ? (
                    <>
                      <p className="font-semibold">Price</p>
                      <p>${booking?.reference?.price}</p>
                    </>
                  ) : (
                    <>
                      <p className="font-semibold">Price Per Night</p>
                      <p>${booking?.reference?.pricePerNight}</p>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-6 md:pl-6">
              <div className="grid gap-4">
                {/* Payment Status */}
                <div className="flex justify-between">
                  <p className="font-semibold">Payment Status</p>
                  <p>{booking?.paymentStatus}</p>
                </div>
                <div className="flex justify-between">
                  <p className="font-semibold">Booking Status</p>
                  <p>{booking?.status}</p>
                </div>

                {/* Start Date */}
                <div className="flex justify-between">
                  <p className="font-semibold">Start Date</p>
                  <p>
                    {booking?.startDate &&
                      format(booking?.startDate, "MMM dd, yyyy")}
                  </p>
                </div>
                {/* End Date */}
                <div className="flex justify-between">
                  <p className="font-semibold">End Date</p>
                  <p>
                    {booking?.endDate &&
                      format(booking?.endDate, "MMM dd, yyyy")}
                  </p>
                </div>
                {/* Total Price */}
                <div className="flex justify-between">
                  <p className="font-semibold">Total Price</p>
                  <p>${booking?.totalPrice}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>

        {/* Review Form */}
        {booking?.status === "completed" && !booking?.isReviewed && <ReviewForm booking={booking} refetchBooking={refetch} />}
      </Card>
    </div>
  );
}

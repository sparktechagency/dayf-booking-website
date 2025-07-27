"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { format } from "date-fns";
import EmptyContainer from "@/components/EmptyContainer/EmptyContainer";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useGetSingleBookingQuery } from "@/redux/api/bookingApi";
import { useParams, useSearchParams } from "next/navigation";

import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Bath, BedDouble, HelpCircle, Maximize } from "lucide-react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import CustomTooltip from "@/components/CustomTooltip/CustomTooltip";
import { getNumberOfNights } from "@/utils/getNumberOfNights";

const TABLE_HEADERS = [
  "Name",
  "Type",
  "Booking Date",
  "Booking Id",
  "Payment Status",
  "Booking Status",
  "Action"
];

export default function BookingHistoryDetailsContainer() {
  const params = useParams();
  console.log("Params --------------> ", params);

  const { data: booking, isLoading } = useGetSingleBookingQuery(params?.id);
  console.log("Single Booking =====================> ", booking);
  //   const bookings = bookingsRes?.data?.data || [];
  // return;
  return (
    <div className="mx-auto p-4 lg:w-1/2">
      <Card className="overflow-hidden">
        <div className="relative">
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
            className="hotel-card-img-slider-radius"
          >
            {booking?.reference?.images?.map((image) => (
              <SwiperSlide
                key={image?.url}
                className="hotel-card-img-slider-radius relative overflow-hidden"
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
        </div>

        <CardContent className="grid gap-6 p-6 md:grid-cols-2">
          <div className="space-y-4">
            <div>
              <h1 className="text-h3 font-semibold tracking-tight">
                {booking?.reference?.category}
              </h1>
              <p className="text-gray-600">
                {booking?.reference?.descriptions?.slice(0, 100) + "..."}
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
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold">
                  ${booking?.reference?.pricePerNight}
                </span>
                <span className="text-muted-foreground text-sm">Per Night</span>
              </div>

              <CustomTooltip
                title="This payment is non-refundable!"
                className="flex items-center gap-1 text-sm text-red-500"
              >
                Non-Refundable
                <HelpCircle className="h-4 w-4" />
              </CustomTooltip>
            </div>

            <div className="grid gap-4">
              {/* Total Price */}
              <div className="flex justify-between">
                <p>Name</p>
                <p>{booking?.author?.name}</p>
              </div>
              <div className="flex justify-between">
                <p>Email</p>
                <p>{booking?.author?.email}</p>
              </div>

              {/* Start Date */}
              <div className="flex justify-between">
                <p>Start Date</p>
                <p>
                  {booking?.startDate &&
                    format(booking?.startDate, "MMM dd, yyyy")}
                </p>
              </div>
              {/* End Date */}
              <div className="flex justify-between">
                <p>End Date</p>
                <p>
                  {booking?.endDate && format(booking?.endDate, "MMM dd, yyyy")}
                </p>
              </div>
              {/* Total Price */}
              <div className="flex justify-between">
                <p>Total Price</p>
                <p>${booking?.totalPrice}</p>
              </div>
            </div>
            {/* 
                //! Payment Status
                //! Booking Status
                //! Other Info here....
            
            */}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

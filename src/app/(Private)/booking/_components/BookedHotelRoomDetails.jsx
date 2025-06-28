"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Bath, BedDouble, HelpCircle, Maximize } from "lucide-react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import CustomTooltip from "@/components/CustomTooltip/CustomTooltip";
import { getNumberOfNights } from "@/utils/getNumberOfNights";
import { format } from "date-fns";

export default function BookedRoomHotelDetails({
  hotelRoom,
  checkInOutDate,
  roomQuanity
}) {
  console.log({ hotelRoom });

  const totalNights = getNumberOfNights(
    checkInOutDate?.from,
    checkInOutDate?.to
  );

  const totalNightCosts = totalNights * hotelRoom?.pricePerNight;

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
            {hotelRoom?.images?.map((image) => (
              <SwiperSlide
                key={image?.url}
                className="hotel-card-img-slider-radius relative overflow-hidden"
              >
                <Image
                  src={image?.url}
                  alt={`Photo of the ${hotelRoom?.property?.name} hotel.`}
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
                {hotelRoom?.category}
              </h1>
              <p className="text-gray-600">
                {hotelRoom?.shortDescriptions ||
                  hotelRoom?.descriptions?.slice(0, 100) + "..."}
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-gray-600">
                <BedDouble className="h-4 w-4" />
                <span className="text-base">{hotelRoom?.bedDetails}</span>
              </div>

              <div className="flex items-center gap-2 text-gray-600">
                <Maximize className="h-4 w-4" />
                <span className="text-base">{hotelRoom?.roomSpace} sq ft</span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold">
                  ${hotelRoom?.pricePerNight}
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
              <div className="grid gap-2">
                <div className="flex justify-between">
                  <Label>Start Date</Label>
                  <Label>End Date</Label>
                </div>
                <div className="flex justify-between font-medium">
                  <p>{format(checkInOutDate?.from, "MMM dd, yyyy")}</p>
                  <p>{format(checkInOutDate?.to, "MMM dd, yyyy")}</p>
                </div>
              </div>

              <div className="space-y-2">
                {/* amount of nights */}
                <div className="pb-1 text-sm">
                  {totalNights > 0 && (
                    <div className="flex justify-between text-sm">
                      <span>
                        {totalNights} Night{totalNights > 1 ? "s" : ""}
                      </span>
                      <span>${totalNightCosts}</span>
                    </div>
                  )}
                </div>

                {/* quantiy */}
                <div className="pb-1 text-sm">
                  {roomQuanity > 0 && (
                    <div className="flex justify-between text-sm">
                      <span>{roomQuanity} Room</span>
                      <span>
                        {roomQuanity} * {totalNightCosts} = $
                        {roomQuanity * totalNightCosts}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex justify-between border-t border-dashed border-t-black/50 pt-1 font-semibold">
                  <span>Total</span>
                  <span>${roomQuanity * totalNightCosts}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

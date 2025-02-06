"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
  Bath,
  BedDouble,
  CalendarIcon,
  HelpCircle,
  Maximize,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import hotelImg1 from "/public/images/dynamic-hotel/sheraton/restaurant-la-terrasse.jpg";
import hotelImg2 from "/public/images/dynamic-hotel/sheraton/hotel-exterior-entrance.jpg";
import hotelImg3 from "/public/images/dynamic-hotel/sheraton/restaurant-nautilus (1).jpg";
import hotelImg4 from "/public/images/dynamic-hotel/sheraton/restaurant-nautilus.jpg";
import hotelImg5 from "/public/images/dynamic-hotel/sheraton/hotel-view.jpg";
import hotelImg6 from "/public/images/dynamic-hotel/sheraton/wine-shop.jpg";
import hotelImg7 from "/public/images/dynamic-hotel/sheraton/link-sheraton.jpg";
import hotelImg8 from "/public/images/dynamic-hotel/sheraton/indoor-pool.jpg";
import hotelImg9 from "/public/images/dynamic-hotel/sheraton/la-brasserie.jpg";
import hotelImg10 from "/public/images/dynamic-hotel/sheraton/salle-uranus.jpg";
import hotelImg11 from "/public/images/dynamic-hotel/sheraton/lobby-cafe.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import CustomTooltip from "@/components/CustomTooltip/CustomTooltip";

// Constants
const hotelImages = [
  hotelImg1,
  hotelImg2,
  hotelImg3,
  hotelImg4,
  hotelImg5,
  hotelImg6,
  hotelImg7,
  hotelImg8,
  hotelImg9,
  hotelImg10,
  hotelImg11,
];

export default function BookedHotelDetails() {
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
                "swiper-pagination-bullet-active !bg-white !scale-[1.05]",
            }}
            direction="horizontal"
            speed={600}
            className="hotel-card-img-slider-radius"
          >
            {hotelImages?.map((image) => (
              <SwiperSlide
                key={image?.src}
                className="hotel-card-img-slider-radius relative overflow-hidden"
              >
                <Image
                  src={image}
                  alt={`Photo of the ${image.src} hotel.`}
                  height={900}
                  width={900}
                  className="hotel-card-img-slider-radius h-[300px] w-full overflow-hidden object-cover transition-all duration-300 ease-in-out hover:scale-105 hover:brightness-110"
                  placeholder="blur"
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
                El Aurassi Hotel
              </h1>
              <p className="text-gray-600">
                Spacious, modern rooms with panoramic views of the Mediterranean
                Sea.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-gray-600">
                <BedDouble className="h-4 w-4" />
                <span className="text-base">2 Bedroom</span>
              </div>

              <div className="flex items-center gap-2 text-gray-600">
                <Bath className="h-4 w-4" />
                <span className="text-base">2 Bathroom</span>
              </div>

              <div className="flex items-center gap-2 text-gray-600">
                <Maximize className="h-4 w-4" />
                <span className="text-base">1,200 sq ft</span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold">$699</span>
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
                  <p>Dec 12, 2022</p>
                  <p>Jan 13, 2022</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between border-b border-dashed border-b-black/50 pb-1 text-sm">
                  <span>1 Night</span>
                  <span>$699</span>
                </div>

                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>$699</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

"use client";

import { useState } from "react";
import { Autoplay, FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "./DynamicHotel.css";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";

// swiper images
const swiperImages = [
  "https://swiperjs.com/demos/images/nature-1.jpg",
  "https://swiperjs.com/demos/images/nature-2.jpg",
  "https://swiperjs.com/demos/images/nature-3.jpg",
  "https://swiperjs.com/demos/images/nature-4.jpg",
  "https://swiperjs.com/demos/images/nature-5.jpg",
  "https://swiperjs.com/demos/images/nature-6.jpg",
  "https://swiperjs.com/demos/images/nature-7.jpg",
  "https://swiperjs.com/demos/images/nature-8.jpg",
  "https://swiperjs.com/demos/images/nature-9.jpg",
  "https://swiperjs.com/demos/images/nature-10.jpg",
];

export default function DynamicHotelImageGallery({ images }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <section className="flex-stretch-start dynamic-hotel-image-gallery mt-8 gap-x-[5px]">
      {/* Thumb Carousel */}
      <div className="h-[65vh] w-3/4">
        <Swiper
          style={{
            "--swiper-navigation-color": "#fff",
            "--swiper-pagination-color": "#fff",
          }}
          spaceBetween={5}
          navigation={true}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Navigation, Thumbs, Autoplay]}
          autoplay={{
            delay: 4500,
            pauseOnMouseEnter: true,
            disableOnInteraction: false,
          }}
          speed={1000}
          className={"largeSwiper"}
        >
          {images?.slice(0, 8)?.map((imgUrl, idx) => (
            <SwiperSlide
              key={idx}
              className={"swiperSlide group relative cursor-pointer"}
            >
              <Image
                src={imgUrl}
                alt={`Photo of Hotel_Name`}
                height={1600}
                width={1600}
                placeholder="blur"
                className="object-cover object-center transition-all duration-300 ease-in-out group-hover:brightness-75"
              />

              {/* Full Screen Preview Overlay */}
              <button className="flex-center-start invisible absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 gap-x-2 bg-white/50 px-10 py-5 opacity-0 backdrop-blur-sm transition-all duration-300 ease-in-out group-hover:visible group-hover:opacity-100">
                <Icon icon="flowbite:expand-outline" height={26} width={26} />
                <span>Full Preview</span>
              </button>
            </SwiperSlide>
          ))}
        </Swiper>

        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={5}
          slidesPerView={5}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className={"thumbSwiper"}
          speed={1000}
        >
          {images?.slice(0, 8)?.map((imgUrl, idx) => (
            <SwiperSlide key={idx} className={"swiperSlide"}>
              <Image
                src={imgUrl}
                alt={`Photo of Hotel_Name`}
                height={400}
                width={400}
                placeholder="blur"
                className="object-cover object-center"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Static Images */}
      <div className="h-[65vh] w-1/4 space-y-[5px]">
        {images?.slice(8)?.map((imageUrl, idx) => (
          <div className="relative h-[32.8%]">
            <Image
              src={imageUrl}
              alt={`Photo of Hotel_Name`}
              height={500}
              width={700}
              placeholder="blur"
              className={cn(
                "h-full object-cover object-center",
                idx === images?.slice(8).length - 1 && "brightness-50",
              )}
            />

            {idx === images?.slice(8).length - 1 && (
              <button className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-b-2 border-b-white font-extrabold text-white">
                View All {images.length} Images
              </button>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Parallax, Autoplay } from "swiper/modules";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button, SeeAllButton } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { ArrowRight } from "lucide-react";
import hotelImg1 from "/public/images/hotels/bar-caxine-lounge.jpg";
import hotelImg2 from "/public/images/hotels/bar-caxine-lounge (1).jpg";
import hotelImg3 from "/public/images/hotels/bar-caxine-lounge (2).jpg";
import hotelImg4 from "/public/images/hotels/chambre-superieure.jpg";
import hotelImg5 from "/public/images/hotels/piscine.jpg";
import hotelImg6 from "/public/images/hotels/restaurant-gastronomique.jpg";
import hotelImg7 from "/public/images/hotels/restaurant-gastronomique (1).jpg";
import hotelImg8 from "/public/images/hotels/restaurant-gastronomique (2).jpg";
import hotelImg9 from "/public/images/hotels/salle-de-ceremonies-el.jpg";
import hotelImg10 from "/public/images/hotels/salle-de-ceremonies-el (1).jpg";
import hotelImg11 from "/public/images/hotels/salle-de-la-mariee.jpg";
import hotelImg12 from "/public/images/hotels/salle-de-la-mariee (1).jpg";
import HotelCard from "@/components/HotelCard/HotelCard";

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
  hotelImg12,
];

// Dummy Hotels Data
const hotels = [
  {
    id: 1,
    name: "Sofitel Algiers Hamma Garden",
    description:
      "Sofitel Algiers Hamma Garden offers luxurious accommodations overlooking the stunning Botanical Garden of Hamma.",
    price_per_night: 699,
    rating: 4.5,
    bedrooms: 2,
    bathrooms: 2,
    size_sqft: 1200,
    images: hotelImages,
  },
  {
    id: 2,
    name: "Marriott Downtown",
    description:
      "Experience luxury and comfort in the heart of Dubai with breathtaking skyline views and world-class amenities.",
    price_per_night: 850,
    rating: 4.8,
    bedrooms: 3,
    bathrooms: 3,
    size_sqft: 1500,
    images: hotelImages,
  },
  {
    id: 3,
    name: "Hilton Paris Opera",
    description:
      "A perfect blend of historic charm and modern elegance, offering an unforgettable stay in the heart of Paris.",
    price_per_night: 620,
    rating: 4.3,
    bedrooms: 1,
    bathrooms: 1,
    size_sqft: 900,
    images: hotelImages,
  },
  {
    id: 4,
    name: "Grand Hyatt",
    description:
      "A sophisticated retreat in the heart of Tokyo, featuring stunning city views and top-tier hospitality.",
    price_per_night: 920,
    rating: 4.7,
    bedrooms: 2,
    bathrooms: 2,
    size_sqft: 1300,
    images: hotelImages,
  },
  {
    id: 5,
    name: "The Ritz-Carlton",
    description:
      "A luxurious beachfront resort in Bali, offering breathtaking ocean views and world-class spa treatments.",
    price_per_night: 1100,
    rating: 4.9,
    bedrooms: 3,
    bathrooms: 3,
    size_sqft: 1800,
    images: hotelImages,
  },
];

export default function HotelsCarousel() {
  const sliderRef = useRef(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
    console.log(sliderRef?.current.swiper);
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);

  useEffect(() => {
    if (!sliderRef) {
      return;
    }
  }, [sliderRef]);

  return (
    <div>
      <div className="flex-center-between mb-4">
        <div className="space-x-2">
          <Button
            onClick={handlePrev}
            disabled={isBeginning}
            className="bg-light-sky-blue rounded-full text-xl aspect-square size-11 text-p1 shadow-none hover:bg-p1 hover:text-white"
          >
            <ArrowLeft className="!size-5" />
          </Button>

          <Button
            onClick={handleNext}
            disabled={isEnd}
            className="bg-light-sky-blue rounded-full aspect-square size-11 text-p1 shadow-none hover:bg-p1 hover:text-white"
          >
            <ArrowRight className="!size-5" />
          </Button>
        </div>

        <SeeAllButton />
      </div>

      <Swiper
        modules={[Navigation, Pagination, Parallax, Autoplay]}
        spaceBetween={35}
        slidesPerView={3.5}
        allowTouchMove={false}
        direction="horizontal"
        loop={false}
        ref={sliderRef}
        speed={1200}
        // autoplay={{
        //   delay: 1200,
        //   disableOnInteraction: false,
        //   pauseOnMouseEnter: true,
        // }}
        onActiveIndexChange={(e) => {
          if (e.isBeginning) {
            setIsBeginning(true);
            setIsEnd(false);
          } else if (e.isEnd) {
            setIsBeginning(false);
            setIsEnd(true);
          } else if (!e.isBeginning) {
            setIsBeginning(false);
            setIsEnd(false);
          } else if (!e.isEnd) {
            setIsBeginning(false);
            setIsEnd(false);
          }
        }}
      >
        {hotels.map((hotel) => (
          <SwiperSlide key={hotel.id}>
            <HotelCard hotel={hotel} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

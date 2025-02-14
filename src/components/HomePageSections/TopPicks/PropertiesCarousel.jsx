"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Parallax,
  Autoplay,
  FreeMode,
} from "swiper/modules";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button, SeeAllButton } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { ArrowRight } from "lucide-react";
import propertyImg1 from "/public/images/hotels/bar-caxine-lounge.jpg";
import propertyImg2 from "/public/images/hotels/bar-caxine-lounge (1).jpg";
import propertyImg3 from "/public/images/hotels/bar-caxine-lounge (2).jpg";
import propertyImg4 from "/public/images/hotels/chambre-superieure.jpg";
import propertyImg5 from "/public/images/hotels/piscine.jpg";
import propertyImg6 from "/public/images/hotels/restaurant-gastronomique.jpg";
import propertyImg7 from "/public/images/hotels/restaurant-gastronomique (1).jpg";
import propertyImg8 from "/public/images/hotels/restaurant-gastronomique (2).jpg";
import propertyImg9 from "/public/images/hotels/salle-de-ceremonies-el.jpg";
import propertyImg10 from "/public/images/hotels/salle-de-ceremonies-el (1).jpg";
import propertyImg11 from "/public/images/hotels/salle-de-la-mariee.jpg";
import propertyImg12 from "/public/images/hotels/salle-de-la-mariee (1).jpg";
import PropertyCard from "@/components/PropertyCard/PropertyCard";
import { BathroomIcon, BedroomIcon, ExpandIcon } from "@/utils/svgLibrary";

const propertyImages = [
  propertyImg1,
  propertyImg2,
  propertyImg3,
  propertyImg4,
  propertyImg5,
  propertyImg6,
  propertyImg7,
  propertyImg8,
  propertyImg9,
  propertyImg10,
  propertyImg11,
  propertyImg12,
];

// Dummy Hotels Data
export const properties = [
  {
    id: 1,
    name: "Sheraton Club des Pins Resort",
    description:
      "A luxurious beachfront resort offering world-class amenities and breathtaking views of the Mediterranean Sea.",
    price_per_night: 310,
    rating: 4.5,
    type: "Hotel",
    features: [
      {
        id: "bedroom",
        icon: <BedroomIcon />,
        label: "Bedroom",
        value: 3,
      },
      {
        id: "bathroom",
        icon: <BathroomIcon />,
        label: "Bathroom",
        value: 2,
      },
      {
        id: "space",
        icon: <ExpandIcon />,
        label: "sq ft",
        value: "1,500",
      },
    ],
    images: propertyImages,
  },
  {
    id: 2,
    name: "Sofitel Algiers Hamma Garden",
    description:
      "A 5-star oasis in the heart of Algiers, offering unparalleled comfort, fine dining, and stunning city views.",
    price_per_night: 280,
    rating: 4.4,
    features: [
      {
        id: "bedroom",
        icon: <BedroomIcon />,
        label: "Bedroom",
        value: 2,
      },
      {
        id: "bathroom",
        icon: <BathroomIcon />,
        label: "Bathroom",
        value: 2,
      },
      {
        id: "space",
        icon: <ExpandIcon />,
        label: "sq ft",
        value: "1,300",
      },
    ],
    images: propertyImages,
  },
  {
    id: 3,
    name: "Constantine Marriott Hotel",
    description:
      "A modern luxury hotel with exceptional hospitality, ideal for business and leisure travelers visiting Constantine.",
    price_per_night: 260,
    rating: 4.6,
    hotel: "Apartment",
    features: [
      {
        id: "bedroom",
        icon: <BedroomIcon />,
        label: "Bedroom",
        value: 2,
      },
      {
        id: "bathroom",
        icon: <BathroomIcon />,
        label: "Bathroom",
        value: 2,
      },
      {
        id: "space",
        icon: <ExpandIcon />,
        label: "sq ft",
        value: "1,250",
      },
    ],
    images: propertyImages,
    type: "Apartment",
  },
  {
    id: 4,
    name: "Royal Hotel Oran - MGallery",
    description:
      "An elegant blend of history and modern luxury in Oran, offering a sophisticated stay with spectacular city views.",
    price_per_night: 290,
    rating: 4.3,
    features: [
      {
        id: "bedroom",
        icon: <BedroomIcon />,
        label: "Bedroom",
        value: 2,
      },
      {
        id: "bathroom",
        icon: <BathroomIcon />,
        label: "Bathroom",
        value: 2,
      },
      {
        id: "space",
        icon: <ExpandIcon />,
        label: "sq ft",
        value: "1,400",
      },
    ],
    images: propertyImages,
  },
  {
    id: 5,
    name: "AZ Hotel Zeralda",
    description:
      "A charming and comfortable hotel located in Algiers, perfect for a peaceful and relaxing stay.",
    price_per_night: 150,
    rating: 4.2,
    features: [
      {
        id: "bedroom",
        icon: <BedroomIcon />,
        label: "Bedroom",
        value: 1,
      },
      {
        id: "bathroom",
        icon: <BathroomIcon />,
        label: "Bathroom",
        value: 1,
      },
      {
        id: "space",
        icon: <ExpandIcon />,
        label: "sq ft",
        value: "900",
      },
    ],
    images: propertyImages,
  },
];

export default function PropertiesCarousel() {
  const sliderRef = useRef(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
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
    <Swiper
      effect="slide"
      modules={[Navigation, Pagination, Autoplay, FreeMode]}
      spaceBetween={35}
      slidesPerView={3.5}
      allowTouchMove={true}
      direction="horizontal"
      loop={false}
      ref={sliderRef}
      speed={800}
      freeMode={true}
      // cssMode={true}
      autoplay={{
        delay: 3500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
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
      {properties.map((property) => (
        <SwiperSlide
          key={property.id}
          className="overflow-hidden rounded-[2.5rem] border p-3 transition-shadow duration-300 ease-in-out hover:shadow-xl"
        >
          <PropertyCard key={property.id} property={property} />
        </SwiperSlide>
      ))}

      <div className="flex-center-between mt-4">
        <div className="space-x-2">
          <Button
            onClick={handlePrev}
            disabled={isBeginning}
            className="aspect-square size-11 rounded-full bg-light-sky-blue text-xl text-p1 shadow-none hover:bg-p1 hover:text-white"
          >
            <ArrowLeft className="!size-5" />
          </Button>

          <Button
            onClick={handleNext}
            disabled={isEnd}
            className="aspect-square size-11 rounded-full bg-light-sky-blue text-p1 shadow-none hover:bg-p1 hover:text-white"
          >
            <ArrowRight className="!size-5" />
          </Button>
        </div>

        <SeeAllButton href="/hotels" />
      </div>
    </Swiper>
  );
}

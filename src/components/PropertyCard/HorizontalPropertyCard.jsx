import { MapPinned } from "lucide-react";
import CustomStarRating from "../CustomStarRating/CustomStarRating";
import { Button } from "../ui/button";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import Image from "next/image";
import { Bookmark } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function HorizontalPropertyCard({ property, type }) {
  const [hoveredCardId, setHoveredCardId] = useState(null);
  return (
    <div
      className="flex-stretch-start property-card gap-x-5 overflow-hidden rounded-3xl border border-[#EDEDED] bg-white shadow"
      onMouseEnter={() => setHoveredCardId(property.id)}
      onMouseLeave={() => setHoveredCardId(null)}
    >
      <Swiper
        modules={[Pagination, Navigation]}
        spaceBetween={5}
        slidesPerView={1}
        allowTouchMove={true}
        pagination={{
          el: ".swiper-pagination",
          clickable: true,
          bulletClass: "swiper-pagination-bullet",
          bulletActiveClass: "swiper-pagination-bullet-active",
        }}
        grabCursor
        direction="horizontal"
        navigation={hoveredCardId === property?.id ? true : false}
        speed={600}
        className="rounded-l-3xl xl:!w-1/3"
      >
        {property?.images?.slice(0, 4)?.map((image) => (
          <SwiperSlide
            key={image?.src}
            className="overflow-hidden rounded-l-3xl"
          >
            <Image
              src={image}
              alt={`Photo of the ${property.name} hotel.`}
              height={900}
              width={900}
              className="h-[370px] w-full overflow-hidden object-cover object-center transition-all duration-300 ease-in-out hover:scale-105 hover:brightness-110"
              placeholder="blur"
            />

            {/* Bookmark */}
            <button className="flex-center absolute right-2 top-2 aspect-square size-10 rounded-full bg-white/20 backdrop-blur-sm transition-all duration-300 ease-in-out hover:bg-black">
              <Bookmark className="size-5 text-white" />
            </button>

            {/* <!-- Floating Badges --> */}
            <div>
              {property?.type && (
                <Badge
                  variant={property.type.toLowerCase()}
                  className="absolute right-4 top-4 z-50"
                >
                  {property.type}
                </Badge>
              )}
            </div>
          </SwiperSlide>
        ))}

        {/* <!-- Pagination --> */}
        <div className="swiper-pagination !absolute !bottom-1 !left-1/2 mx-auto w-full !-translate-x-1/2 space-x-2 rounded-bl-3xl"></div>

        {/* <!-- Arrow Navigation --> */}
        <div className="swiper-arrow-navigation"></div>
      </Swiper>

      <div className="py-5 pr-8 xl:w-3/4">
        <Link
          href={`/property/hotels/${property?.id}`}
          className="text-h4 font-semibold leading-tight text-[#252525]"
        >
          {property?.name}
        </Link>

        <p className="my-2 mb-4 text-[#626262]">{property?.description}</p>

        <div className="flex-center-between my-5 w-3/4">
          {property?.features?.map((feature, idx) => (
            <div key={feature.id} className="flex-center-start gap-x-3">
              <>
                {feature.icon}
                <span className="sr-only">{feature.label}</span>
              </>

              <h3 className="text-h6 font-medium">
                {feature.value}{" "}
                <span className="text-sm font-normal">{feature.label}</span>
              </h3>
            </div>
          ))}
        </div>

        <div className="flex-center-start gap-x-4">
          <CustomStarRating
            rating={property?.rating}
            starSize={"22px"}
            starRatedColor="#007dd0"
            starHoverColor="#007dd0"
          />

          <p className="pt-2 text-gray-600">{property?.reviewCount}+ Reviews</p>
        </div>

        <h3 className="mb-5 mt-4 text-h4 text-[#252525]">
          ${property?.price_per_night}{" "}
          <span className="text-sm">Per Night</span>
        </h3>

        <div className="flex-center-between">
          <Button
            size="lg"
            variant="primary"
            className="w-1/4 rounded-full"
            asChild
          >
            <Link
              href={`/property/${type === "hotel" ? "hotels" : "apartments"}/${property?.id}`}
            >
              See Details
            </Link>
          </Button>

          <p className="flex-center gap-x-2 text-gray-700">
            <MapPinned size={20} />
            <span>{property?.location}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

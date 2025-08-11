"use client";

import { Bookmark } from "lucide-react";
import { Star } from "lucide-react";
import Image from "next/image";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Button } from "../ui/button";
import "./PropertyCard.css";
import AnimatedArrow from "../AnimatedArrow/AnimatedArrow";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";
import { useEffect } from "react";
import { useState } from "react";

export default function VerticalPropertyCard({
  fullProperty,
  property,
  bookmarks,
  handleCreateBookmark,
  handleDeleteBookmark
}) {
  const [bookmarked, setBookmarked] = useState(null);
  // Find property type
  const isHotel = property?.price === undefined;

  useEffect(() => {
    const foundData = bookmarks?.find(
      (bookmark) => bookmark?.reference?._id === property?._id
    );
    console.log("Is foundData: ", foundData);
    if (foundData) setBookmarked(foundData);
    else setBookmarked(null);
  }, [bookmarks]);

  // console.log({ property, fullProperty, price: property?.price });

  return (
    <div className="property-card flex h-full flex-col justify-between gap-y-4">
      <div>
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={5}
          slidesPerView={1}
          allowTouchMove={true}
          pagination={{
            el: ".swiper-pagination",
            clickable: true,
            bulletClass: "swiper-pagination-bullet",
            bulletActiveClass: "swiper-pagination-bullet-active"
          }}
          direction="horizontal"
          speed={600}
          loop={true}
          className="property-card-img-slider-radius"
        >
          {property?.images?.map((image) => (
            <SwiperSlide
              key={image?._id}
              className="hotel-card-img-slider-radius relative overflow-hidden"
            >
              {image?.url ? (
                <Image
                  src={image?.url}
                  alt={`Photo of the ${property.name} hotel.`}
                  height={900}
                  width={900}
                  className="hotel-card-img-slider-radius h-[270px] w-full overflow-hidden object-cover transition-all duration-300 ease-in-out hover:scale-105 hover:brightness-110"
                />
              ) : (
                <div className="h-[270px] w-full bg-gray-100"></div>
              )}

              <div className="flex-center-between absolute bottom-0 left-0 right-0 z-10 mx-auto w-full rounded-b-[1.7rem] bg-black/20 px-8 py-1">
                <div className="flex-center-start gap-x-2">
                  <Star className="size-[19px] fill-[#FFDA9E] stroke-[#FFDA9E]" />
                  <p className="text-white">{property?.avgRating}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}

          {/* <!-- Pagination --> */}
          <div className="swiper-pagination !absolute !bottom-2 !left-1/2 mx-auto !-translate-x-1/2 space-x-2"></div>

          {/* <!-- Floating Badges --> */}
          <div className="z-50">
            {isHotel ? (
              <Badge variant={"hotel"} className="absolute right-4 top-4">
                Hotel
              </Badge>
            ) : (
              <Badge variant={"apartment"} className="absolute right-4 top-4">
                Apartment
              </Badge>
            )}
          </div>
        </Swiper>

        <section className="mt-3 px-1">
          <div className="absolute right-8 z-50">
            <Button
              onClick={() => {
                if (bookmarked) {
                  return handleDeleteBookmark(bookmarked?._id);
                } else {
                  return handleCreateBookmark(property?._id);
                }
              }}
              size="icon"
              variant="ghost"
              className={`cursor-pointer shadow-md ${bookmarked ? "bg-black text-white" : "bg-gray-200"}`}
            >
              <Bookmark className="!size-5" />
            </Button>
          </div>
          <h3 className="text-h4 font-semibold leading-tight text-[#252525]">
            {property?.name}
          </h3>
          <p className="mt-2 text-[#626262]">{property?.shortDescription}</p>

          {isHotel ? (
            <h3 className="mt-3 text-h4 text-[#252525]">
              {/* {fullProperty?.minPrice ||
                property?.minPrice ||
                property?.price / 2}{" "}
              - $
              {fullProperty?.maxPrice || property?.maxPrice || property?.price}{" "} */}
              {/* <span className="text-sm">{property?.price}Per Night</span> */}
            </h3>
          ) : (
            <h3 className="mt-3 text-h4 text-[#252525]">
              ${property?.price} <span className="text-sm">Per Night</span>
            </h3>
          )}

          {property?.address && (
            <div className="flex-center-start mt-3 gap-x-2 text-gray-900">
              <MapPin className="size-5" />
              <span className="">{property?.address}</span>
            </div>
          )}
        </section>
      </div>

      <Button
        variant="primary"
        size="lg"
        className="group w-full rounded-full"
        asChild
      >
        <Link
          href={`/property/${property?.isProperty ? "hotels" : "apartments"}/${property?._id}`}
          scroll={true}
        >
          See Details <AnimatedArrow />
        </Link>
      </Button>
    </div>
  );
}

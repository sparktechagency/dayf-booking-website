"use client";

import { MapPinned } from "lucide-react";
import CustomStarRating from "../CustomStarRating/CustomStarRating";
import { Button } from "../ui/button";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import Image from "next/image";
import { Bookmark } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Badge } from "../ui/badge";
import { truncateMiddle } from "@/utils/textTruncate";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { convertCurrency } from "@/utils/convertCurrency";
import { useSelector } from "react-redux";
import { selectCurrency } from "@/redux/features/currencySlice";

export default function HorizontalPropertyCard({
  property,
  fullProperty,
  type,
  bookmarks,
  handleCreateBookmark,
  handleDeleteBookmark
}) {
  const currency = useSelector(selectCurrency);
  const [price, setPrice] = useState(null);
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  // console.log("Currency from the hotels page ================> ", currency);

  const [hoveredCardId, setHoveredCardId] = useState(null);
  const [bookmarked, setBookmarked] = useState(null);
  // console.log("Property::::::::=> ", property);

  const isHotel = property?.price === undefined;
  const searchParams = useSearchParams();

  // console.log("Property from HorizontalCard: ", property);

  // console.log("Bookmarks from the Card: ", bookmarks);
  // console.log("property from the card: ", property);

  useEffect(() => {
    const foundData = bookmarks?.find(
      (bookmark) => bookmark?.reference?._id === property?._id
    );
    // console.log("Is foundData: ", foundData);
    if (foundData) setBookmarked(foundData);
    else setBookmarked(null);
  }, [bookmarks]);

  // Price
  useEffect(() => {
    if (property?.price) {
      convertCurrency(property.price, currency).then(setPrice);
    }
  }, [property?.price, currency]);

  // Min Price
  useEffect(() => {
    if (fullProperty?.minPrice) {
      convertCurrency(fullProperty?.minPrice / 2, currency).then(setMinPrice);
    }
  }, [fullProperty?.minPrice, currency]);

  // max Price
  useEffect(() => {
    if (fullProperty?.maxPrice) {
      convertCurrency(fullProperty?.maxPrice, currency).then(setMaxPrice);
    }
  }, [fullProperty?.maxPrice, currency]);

  return (
    <div
      className="lg:flex-stretch-start property-card flex flex-col gap-x-5 overflow-hidden rounded-3xl border border-[#EDEDED] bg-white shadow lg:flex-row"
      onMouseEnter={() => setHoveredCardId(property?._id)}
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
          bulletActiveClass: "swiper-pagination-bullet-active"
        }}
        grabCursor
        direction="horizontal"
        navigation={hoveredCardId === property?._id ? true : false}
        speed={600}
        className="rounded-l-3xl xl:!w-1/3"
      >
        {property?.images?.map((image) => (
          <SwiperSlide
            key={image?._id}
            className="overflow-hidden rounded-l-3xl"
          >
            <Image
              src={image?.url}
              alt={`Photo of the ${property?.name} hotel.`}
              height={900}
              width={900}
              className="h-[340px] w-auto overflow-hidden object-cover object-center transition-all duration-300 ease-in-out hover:scale-105 hover:brightness-110 lg:w-full"
              // placeholder="blur"
            />

            {/* Bookmark */}
            <button
              className={`flex-center absolute right-2 top-2 aspect-square size-10 rounded-full ${bookmarked ? "bg-black" : "bg-white/20"} backdrop-blur-sm transition-all duration-300 ease-in-out hover:bg-black border border-p1`}
            >
              <Bookmark
                onClick={() => {
                  if (bookmarked) {
                    return handleDeleteBookmark(bookmarked?._id);
                  } else {
                    return handleCreateBookmark(property?._id);
                  }
                }}
                className={`size-5 ${bookmarked ? "text-white" : "text-p1"}`}
              />
            </button>

            {/* <!-- Floating Badges --> */}
            <Badge
              variant={isHotel ? "hotel" : "apartment"}
              className="absolute left-4 top-4 z-50"
            >
              {isHotel ? "Hotel" : "Apartment"}
            </Badge>
          </SwiperSlide>
        ))}

        {/* <!-- Pagination --> */}
        <div className="swiper-pagination !absolute !bottom-1 !left-1/2 mx-auto w-full !-translate-x-1/2 space-x-2 rounded-bl-3xl"></div>

        {/* <!-- Arrow Navigation --> */}
        <div className="swiper-arrow-navigation"></div>
      </Swiper>

      <div className="flex w-full flex-col justify-between px-6 py-5 lg:pr-8 xl:w-3/4">
        <div>
          <Link
            href={`/property/${type === "hotels" ? "hotels" : "apartments"}/${property?._id}?${searchParams.toString()}`}
            className="text-h4 font-semibold leading-tight text-[#252525]"
          >
            {property?.name}
          </Link>

          <p
            className="mt-2 text-[#626262]"
            title={property?.shortDescription || property?.description}
          >
            {property?.shortDescription ||
              (property?.description?.length > 100
                ? property?.description?.slice(0, 100) + "..."
                : property?.description)}
          </p>

          {isHotel ? (
            <h3 className="mt-3 text-h4 text-[#252525]">
              {minPrice !== null ? `${minPrice} ${currency}` : `0 ${currency}`}{" "}
              -{" "}
              {maxPrice !== null ? `${maxPrice} ${currency}` : `0 ${currency}`}{" "}
              <span className="text-sm">Per Night</span>
            </h3>
          ) : (
            <h3 className="mt-3 text-h4 text-[#252525]">
              {price !== null ? `${price} ${currency}` : `0 ${currency}`}{" "}
              <span className="text-sm">Per Night</span>
            </h3>
          )}

          {/* <div className="flex-center-between my-5 w-3/4">
            {property?.facility?.map((feature) => (
              <div key={feature._id} className="flex-center-start gap-x-2">
                <>
                  <Image
                    src={feature.icon}
                    alt={feature.title}
                    height={16}
                    width={16}
                  />
                  <span className="sr-only">{feature.title}</span>
                </>

                <h3 className="text-h6 font-medium">
                  <span className="text-sm font-normal">{feature.title}</span>
                </h3>
              </div>
            ))}
          </div> */}

          <div className="flex-center-start mt-5 gap-x-4">
            <CustomStarRating
              rating={property?.avgRating}
              starSize={"22px"}
              starRatedColor="#007dd0"
              starHoverColor="#007dd0"
            />

            <p className="pt-2 text-gray-600">
              {property?.reviews?.length} Reviews
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center mt-8 gap-5">
          <Button
            size="lg"
            variant="primary"
            className="w-full md:w-1/4 rounded-full"
            asChild
          >
            <Link
              href={`/property/${type === "hotels" ? "hotels" : "apartments"}/${property?._id}?${searchParams.toString()}`}
            >
              See Details
            </Link>
          </Button>

          <p className="md:flex-center gap-x-2 text-gray-700">
            <MapPinned size={20} />
            <span title={property?.address}>
              {property?.address && truncateMiddle(property?.address, 30)}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

import { MapPinned } from "lucide-react";
import CustomStarRating from "../CustomStarRating/CustomStarRating";
import { Button } from "../ui/button";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import Image from "next/image";
import { Bookmark } from "lucide-react";
import Link from "next/link";

export default function HorizontalHotelCard({ hotel }) {
  return (
    <div className="flex-stretch-start hotel-card gap-x-5 overflow-hidden rounded-3xl border border-[#EDEDED] bg-white shadow">
      <Swiper
        modules={[Pagination]}
        spaceBetween={5}
        slidesPerView={1}
        allowTouchMove={true}
        pagination={{
          el: ".swiper-pagination",
          clickable: true,
          bulletClass: "swiper-pagination-bullet",
          bulletActiveClass: "swiper-pagination-bullet-active",
        }}
        direction="horizontal"
        speed={600}
        className="rounded-l-3xl xl:!w-1/3"
      >
        {hotel?.images?.slice(0, 4)?.map((image) => (
          <SwiperSlide
            key={image?.src}
            className="overflow-hidden rounded-l-3xl"
          >
            <Image
              src={image}
              alt={`Photo of the ${hotel.name} hotel.`}
              height={900}
              width={900}
              className="h-full w-auto overflow-hidden object-cover object-center transition-all duration-300 ease-in-out hover:scale-105 hover:brightness-110"
              placeholder="blur"
            />

            {/* Bookmark */}
            <button className="flex-center absolute right-2 top-2 aspect-square size-10 rounded-full bg-white/20 backdrop-blur-sm transition-all duration-300 ease-in-out hover:bg-black">
              <Bookmark className="size-5 text-white" />
            </button>
          </SwiperSlide>
        ))}

        {/* <!-- Pagination --> */}
        <div className="swiper-pagination !absolute !bottom-1 !left-1/2 mx-auto w-full !-translate-x-1/2 space-x-2 rounded-bl-3xl"></div>
      </Swiper>

      <div className="py-5 pr-8 xl:w-3/4">
        <Link
          href={`/hotels/${hotel?.id}`}
          className="text-h4 font-semibold leading-tight text-[#252525]"
        >
          {hotel?.name}
        </Link>

        <p className="my-2 mb-4 text-[#626262]">{hotel?.description}</p>

        <div className="flex-center-between my-5 w-3/4">
          {hotel?.features?.map((feature, idx) => (
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
            rating={hotel?.rating}
            starSize={"22px"}
            starRatedColor="#007dd0"
            starHoverColor="#007dd0"
          />

          <p className="pt-2 text-gray-600">{hotel?.reviewCount}+ Reviews</p>
        </div>

        <h3 className="mb-5 mt-4 text-h4 text-[#252525]">
          ${hotel?.price_per_night} <span className="text-sm">Per Night</span>
        </h3>

        <div className="flex-center-between">
          <Button size="lg" variant="primary" className="w-1/4 rounded-full">
            <Link href={`/hotels/${hotel?.id}`}>See Details</Link>
          </Button>

          <p className="flex-center gap-x-2 text-gray-700">
            <MapPinned size={20} />
            <span>{hotel?.location}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

import { Bookmark } from "lucide-react";
import { Star } from "lucide-react";
import Image from "next/image";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Button } from "../ui/button";
import "./HotelCard.css";
import AnimatedArrow from "../AnimatedArrow/AnimatedArrow";
import Link from "next/link";

export default function VerticalHotelCard({ hotel }) {
  return (
    <div className="hotel-card flex h-full flex-col justify-between gap-y-4">
      <div>
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
          className="hotel-card-img-slider-radius"
        >
          {hotel?.images?.slice(0, 4)?.map((image) => (
            <SwiperSlide
              key={image?.src}
              className="hotel-card-img-slider-radius relative overflow-hidden"
            >
              <Image
                src={image}
                alt={`Photo of the ${hotel.name} hotel.`}
                height={900}
                width={900}
                className="hotel-card-img-slider-radius h-[270px] w-full overflow-hidden object-cover transition-all duration-300 ease-in-out hover:scale-105 hover:brightness-110"
                placeholder="blur"
              />

              <div className="flex-center-between absolute bottom-0 left-0 right-0 z-[9999] mx-auto w-full rounded-b-[1.7rem] bg-black/20 px-8 py-1">
                <div className="flex-center-start gap-x-2">
                  <Star className="size-[19px] fill-[#FFDA9E] stroke-[#FFDA9E]" />
                  <p className="text-white">{hotel.rating}</p>
                </div>

                <Button size="icon" variant="ghost" className="text-white">
                  <Bookmark className="!size-5" />
                </Button>
              </div>
            </SwiperSlide>
          ))}

          {/* <!-- Pagination --> */}
          <div className="swiper-pagination !absolute !bottom-2 !left-1/2 mx-auto !-translate-x-1/2 space-x-2"></div>
        </Swiper>

        <section className="mt-3 px-1">
          <h3 className="text-h4 font-semibold leading-tight text-[#252525]">
            {hotel?.name}
          </h3>
          <p className="mt-2 text-[#626262]">{hotel?.description}</p>

          <h3 className="my-3 text-h4 text-[#252525]">
            ${hotel?.price_per_night} <span className="text-sm">Per Night</span>
          </h3>

          <div className="flex-center-between">
            {hotel?.features?.map((feature, idx) => (
              <div key={feature.id} className="flex-center-start gap-x-2">
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
        </section>
      </div>

      <Button
        variant="primary"
        size="lg"
        className="group w-full rounded-full"
        asChild
      >
        <Link href={`/hotels/${hotel?.id}`}>
          See Details <AnimatedArrow />
        </Link>
      </Button>
    </div>
  );
}

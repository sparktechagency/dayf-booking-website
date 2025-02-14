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

export default function VerticalPropertyCard({ property, type }) {
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
            bulletActiveClass: "swiper-pagination-bullet-active",
          }}
          direction="horizontal"
          speed={600}
          loop={true}
          className="property-card-img-slider-radius"
        >
          {property?.images?.slice(0, 4)?.map((image) => (
            <SwiperSlide
              key={image?.src}
              className="hotel-card-img-slider-radius relative overflow-hidden"
            >
              <Image
                src={image}
                alt={`Photo of the ${property.name} hotel.`}
                height={900}
                width={900}
                className="hotel-card-img-slider-radius h-[270px] w-full overflow-hidden object-cover transition-all duration-300 ease-in-out hover:scale-105 hover:brightness-110"
                placeholder="blur"
              />

              <div className="flex-center-between absolute bottom-0 left-0 right-0 z-[9999] mx-auto w-full rounded-b-[1.7rem] bg-black/20 px-8 py-1">
                <div className="flex-center-start gap-x-2">
                  <Star className="size-[19px] fill-[#FFDA9E] stroke-[#FFDA9E]" />
                  <p className="text-white">{property.rating}</p>
                </div>

                <Button size="icon" variant="ghost" className="text-white">
                  <Bookmark className="!size-5" />
                </Button>
              </div>
            </SwiperSlide>
          ))}

          {/* <!-- Pagination --> */}
          <div className="swiper-pagination !absolute !bottom-2 !left-1/2 mx-auto !-translate-x-1/2 space-x-2"></div>

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
        </Swiper>

        <section className="mt-3 px-1">
          <h3 className="text-h4 font-semibold leading-tight text-[#252525]">
            {property?.name}
          </h3>
          <p className="mt-2 text-[#626262]">{property?.description}</p>

          <h3 className="my-3 text-h4 text-[#252525]">
            ${property?.price_per_night}{" "}
            <span className="text-sm">Per Night</span>
          </h3>

          <div className="flex-center-between">
            {property?.features?.map((feature, idx) => (
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
        <Link
          href={`/property/${type === "hotel" ? "hotels" : "apartments"}/${property?.id}`}
        >
          See Details <AnimatedArrow />
        </Link>
      </Button>
    </div>
  );
}

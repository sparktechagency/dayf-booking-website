import CustomAvatar from "@/components/CustomAvatar/CustomAvatar";
import CustomStarRating from "@/components/CustomStarRating/CustomStarRating";
import { Card, CardContent } from "@/components/ui/card";
import { Autoplay, Navigation, Parallax } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function DynamicHotelReviews({ reviews }) {
  // console.log("Review ---------------------------> ", reviews);
  return (
    <Swiper
      effect="slide"
      modules={[Navigation, Parallax, Autoplay]}
      spaceBetween={20}
      slidesPerView={2}
      breakpoints={{
        0: {
          slidesPerView: 1, // mobile
          centeredSlides: false
        },
        768: {
          slidesPerView: 2, // tablet
          centeredSlides: true
        }
      }}
      allowTouchMove={true}
      grabCursor={true}
      direction="horizontal"
      loop={false}
      speed={1400}
      parallax={true}
      autoplay={{
        delay: 6000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true
      }}
      className="pr-2"
    >
      {reviews?.map((review, idx) => (
        <SwiperSlide key={idx} className="overflow-hidden">
          <Card className="w-full p-6">
            <CardContent className="space-y-4 p-0">
              <p className="text-base leading-relaxed text-gray-600">
                {review.review}
              </p>

              <div className="flex gap-0.5">
                <CustomStarRating rating={review.rating} />
              </div>

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pt-2">
                <div className="flex items-center gap-3">
                  <CustomAvatar
                    img={review?.user?.profile}
                    name={review?.user?.name}
                  />
                  <p className="text-gray-900">— {review?.user?.name}</p>
                </div>
                <p className="text-sm text-gray-500">
                  {new Date(review?.createdAt)?.toLocaleDateString()}
                </p>
              </div>
            </CardContent>
          </Card>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

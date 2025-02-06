import CustomStarRating from "@/components/CustomStarRating/CustomStarRating";
import { Card, CardContent } from "@/components/ui/card";
import { Autoplay, Navigation, Parallax } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function DynamicHotelReviews({ reviews }) {
  return (
    <Swiper
      effect="slide"
      modules={[Navigation, Parallax, Autoplay]}
      spaceBetween={20}
      slidesPerView={2}
      allowTouchMove={true}
      grabCursor={true}
      direction="horizontal"
      loop={false}
      speed={1400}
      parallax={true}
      autoplay={{
        delay: 6000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
      className="pr-2"
    >
      {reviews?.map((review, idx) => (
        <SwiperSlide key={idx} className="overflow-hidden">
          <Card className="w-full p-6">
            <CardContent className="space-y-4 p-0">
              <h2 className="text-xl font-semibold text-gray-900">
                &apos;{review.title}&apos;
              </h2>

              <p className="text-sm leading-relaxed text-gray-600">
                {review.review}
              </p>

              <div className="flex gap-0.5">
                <CustomStarRating rating={review.rating} />
              </div>

              <div className="flex items-center justify-between pt-2">
                <p className="text-gray-900">— {review.author}</p>
                <p className="text-sm text-gray-500">{review.date}</p>
              </div>
            </CardContent>
          </Card>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

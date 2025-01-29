"use client";

import { Autoplay, Navigation, Parallax } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import TestimonialCard from "./TestimonialCard";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { ArrowRight } from "lucide-react";

export default function TestimonialsCarousel({ testimonials }) {
  const sliderRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  // Slider navigation control
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
    <div className="relative">
      <Swiper
        effect="slide"
        modules={[Navigation, Parallax, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        allowTouchMove={true}
        grabCursor={true}
        direction="horizontal"
        loop={false}
        ref={sliderRef}
        speed={1400}
        parallax={true}
        autoplay={{
          delay: 6000,
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

          setActiveIndex(e.activeIndex);
        }}
      >
        {testimonials?.map((testimonial, idx) => (
          <SwiperSlide key={testimonial.id} className="overflow-hidden">
            <TestimonialCard
              testimonial={testimonial}
              isActive={activeIndex === idx}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <Button
        onClick={handlePrev}
        disabled={isBeginning}
        className="absolute -left-40 top-1/2 z-[9999] aspect-square size-20 -translate-y-1/2 rounded-full bg-light-sky-blue text-xl text-p1 shadow-none hover:bg-p1 hover:text-white"
      >
        <ArrowLeft className="!size-8" />
      </Button>

      <Button
        onClick={handleNext}
        disabled={isEnd}
        className="absolute -right-40 top-1/2 z-[9999] aspect-square size-20 -translate-y-1/2 rounded-full bg-light-sky-blue text-p1 shadow-none hover:bg-p1 hover:text-white"
      >
        <ArrowRight className="!size-8" />
      </Button>
    </div>
  );
}

"use client";

import Marquee from "react-fast-marquee";
import ListPropertyTestimonialCard from "./ListPropertyTestimonialCard";
import { Button } from "../../../../components/ui/button";
import AnimatedArrow from "../../../../components/AnimatedArrow/AnimatedArrow";
import { useEffect } from "react";
import { useGetTestimonialReviewsQuery } from "../../../../redux/api/reviewApi";

const ListPropertyTestimonials = () => {
  const {
    data: testimonials,
    isError,
    error
  } = useGetTestimonialReviewsQuery();
  console.log("Testimonial data: ------> ", testimonials);

  useEffect(() => {
    if (isError) {
      console.error("Error while fetching the testimonials: ", error);
    }
  }, [isError, error]);

  return (
    <div className="bg-white py-20">
      <div className="mx-auto mb-14 w-full px-4 text-center md:w-1/2 md:px-0">
        <h1 className="heading">Real Stories from Happy Hosts</h1>
        <p className="description mt-3">
          Discover the beauty, culture, and excitement that surrounds our
          hotels. From breathtaking landmarks and scenic natural spots to
          vibrant cultural festivals and local culinary delights, there’s
          something for everyone to enjoy.
        </p>
      </div>

      <Marquee
        autoFill
        speed={80}
        gradient={true}
        className="pb-5"
        gradientWidth={120}
        pauseOnHover
      >
        {testimonials?.map((testimonial) => (
          <ListPropertyTestimonialCard
            key={testimonial?._id}
            testimonial={testimonial}
          />
        ))}
      </Marquee>

      <div className="flex-center mt-14">
        <Button
          variant="outline-primary"
          className="group relative rounded-full px-6 py-7 md:px-12"
        >
          Join Our Community of Happy Hosts <AnimatedArrow />
        </Button>
      </div>
    </div>
  );
};

export default ListPropertyTestimonials;

import Marquee from "react-fast-marquee";
import ListPropertyTestimonialCard from "./ListPropertyTestimonialCard";
import { Button } from "@/components/ui/button";
import AnimatedArrow from "@/components/AnimatedArrow/AnimatedArrow";

const ListPropertyTestimonials = () => {
  return (
    <div className="bg-white py-20">
      <div className="mx-auto mb-14 w-1/2 text-center">
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
        {Array.from({ length: 10 }).map((_, idx) => (
          <ListPropertyTestimonialCard key={idx} />
        ))}
      </Marquee>

      <div className="flex-center mt-14">
        <Button
          variant="outline-primary"
          className="group relative rounded-full px-12 py-7"
        >
          Join Our Community of Happy Hosts <AnimatedArrow />
        </Button>
      </div>
    </div>
  );
};

export default ListPropertyTestimonials;

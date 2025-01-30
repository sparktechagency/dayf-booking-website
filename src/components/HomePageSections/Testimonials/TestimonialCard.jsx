import CustomStarRating from "@/components/CustomStarRating/CustomStarRating";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function TestimonialCard({ testimonial, isActive }) {
  return (
    <div className="flex-center-between gap-x-10">
      <div className="py-2 lg:w-[40%]">
        <Image
          src={testimonial.img}
          alt={`Photo of ${testimonial.user}`}
          height={1200}
          width={1200}
          className={cn(
            "h-[350px] w-full rounded-3xl object-cover transition-all duration-700 ease-in-out",
            isActive ? "shadow-[4px_5px_0px_4px_#007DD0]" : "shadow-none",
          )}
          style={{ transitionDelay: "1200ms" }}
        />
      </div>

      <div className="lg:w-[60%]">
        <h2 className="text-h4 font-medium">{testimonial.reviewTitle}</h2>
        <p className="mb-5 mt-3 text-gray-500">{testimonial.reviewDesc}</p>

        <CustomStarRating rating={4.5} starSize={"22px"} />

        <div className="flex-center-between mt-2">
          <h4 className="text-h5 font-medium">{testimonial.user}</h4>
          <p className="text-black/75">{testimonial.reviewedAt}</p>
        </div>
      </div>
    </div>
  );
}

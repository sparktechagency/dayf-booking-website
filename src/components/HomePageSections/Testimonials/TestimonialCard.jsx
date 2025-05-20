import CustomStarRating from "@/components/CustomStarRating/CustomStarRating";
import { cn } from "@/lib/utils";
import fallbackImage from "/public/images/fallback-user-image.jpg";
import Image from "next/image";

export default function TestimonialCard({ testimonial, isActive }) {
  return (
    <div className="flex-center-between flex-col gap-x-6 gap-y-5 lg:flex-row">
      <div className="py-2 lg:w-[35%]">
        {testimonial?.user?.profile ? (
          <Image
            src={testimonial?.user?.profile}
            alt={`Photo of ${testimonial?.user?.name}`}
            height={1200}
            width={1200}
            className={cn(
              "h-[300px] w-full rounded-3xl object-cover transition-all duration-700 ease-in-out",
              isActive ? "shadow-[4px_5px_0px_4px_#007DD0]" : "shadow-none"
            )}
            style={{ transitionDelay: "1200ms" }}
          />
        ) : (
          <Image
            src={fallbackImage}
            alt={`Photo of ${testimonial?.user?.name}`}
            height={1200}
            width={1200}
            className={cn(
              "h-[300px] w-full rounded-3xl object-cover transition-all duration-700 ease-in-out",
              isActive ? "shadow-[4px_5px_0px_4px_#007DD0]" : "shadow-none"
            )}
            style={{ transitionDelay: "1200ms" }}
          />
        )}
      </div>

      <div className="lg:w-[60%]">
        <h2 className="text-h4 font-semibold">{testimonial?.user?.name}</h2>
        <p className="mb-5 mt-3 text-gray-600">{testimonial?.review}</p>

        <div className="flex-center-between mt-2">
          <CustomStarRating rating={4.5} starSize={"22px"} />

          <p className="text-black/75">{testimonial.reviewedAt}</p>
        </div>
      </div>
    </div>
  );
}

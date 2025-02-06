import ResponsiveContainer from "@/components/ResponsiveContainer/ResponsiveContainer";
import FeatureCard from "./FeatureCard";
import imgLg from "/public/images/why-choose-us/why-choose-us-lg.webp";
import imgSM from "/public/images/why-choose-us/why-choose-us-sm.webp";
import test from "/public/images/why-choose-us/test.jpg";
import Image from "next/image";

// Our Features
const features = [
  {
    id: 1,
    title: "User-Friendly Interface",
    description:
      "Easily navigate through the app to find your perfect stay with a simple, clean, and intuitive design.",
  },
  {
    id: 2,
    title: "Wide Range of Options",
    description:
      "Browse a variety of accommodations, from budget-friendly hotels to luxury resorts, all in one place.",
  },
  {
    id: 3,
    title: "Best Price",
    description:
      "We offer the best rates, and if you find a lower price elsewhere, we’ll match it or give you a better deal.",
  },
  {
    id: 4,
    title: "Trusted Reviews",
    description:
      "Read real guest reviews and ratings to make informed decisions about your next stay.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="min-h-screen rounded-[2.8rem] bg-white py-16">
      <div className="mx-auto mb-14 w-1/2 text-center">
        <h1 className="heading">Why You Should Choose Us</h1>
        <p className="description mt-3">
          Not sure where to go? Let us guide you! From cultural landmarks to
          natural wonders, explore our curated list of must-visit locations
          across Algeria.
        </p>
      </div>

      <ResponsiveContainer className="flex-stretch-between gap-x-10">
        <div className="space-y-10 xl:w-1/2">
          {features.map((feature) => (
            <FeatureCard key={feature.id} feature={feature} />
          ))}
        </div>

        <div className="relative xl:w-1/3">
          <Image
            src={imgLg}
            alt="Photo of a desert meaning Algeria's natural variety"
            width={1200}
            height={1200}
            className="h-full w-auto rounded-2xl object-cover"
            placeholder="blur"
          />

          <Image
            src={imgSM}
            alt="Photo of a desert meaning Algeria's natural variety"
            width={800}
            height={800}
            className="absolute -left-32 top-1/2 h-auto w-[400px] object-cover"
            placeholder="blur"
          />

          {/* Floating Badge */}
          <div
            style={{
              borderRadius: "0.9375rem",
              background: "rgba(255, 255, 255, 0.10)",
              backdropFilter: "blur(17.5px)",
            }}
            className="absolute -left-10 top-[20%] w-56 -translate-y-1/2 border border-gray-500 border-opacity-15 px-4 py-4"
          >
            <h3 className="text-h4 font-semibold">5k</h3>
            <p className="text-lg">Positive Reviews</p>
          </div>
        </div>
      </ResponsiveContainer>
    </section>
  );
}

import HotelSearchPanel from "@/components/PropertySearchPanel/HotelSearchPanel";
import React from "react";
import HeroGallery from "./HeroGallery";
import ResponsiveContainer from "@/components/ResponsiveContainer/ResponsiveContainer";

export default function Hero() {
  return (
    <section className="bg-white pb-16 pt-10">
      <ResponsiveContainer className="space-y-16">
        <HotelSearchPanel />

        <section className="flex-center-between mx-auto flex-col gap-x-4 gap-y-8 lg:flex-row">
          <div className="xl:w-1/2">
            <h1 className="heading-gradient heading text-center font-quicksand lg:w-[75%] lg:text-left">
              Book Your Dream Stay in Algeria’s Top Destinations
            </h1>

            <p className="description mt-3 text-center lg:text-left">
              Discover handpicked hotels and accommodations across Algeria’s
              most captivating destinations. Whether you’re planning a city
              escape, a coastal retreat, or a desert adventure, we’ve got you
              covered.
            </p>
          </div>

          <HeroGallery />
        </section>
      </ResponsiveContainer>
    </section>
  );
}

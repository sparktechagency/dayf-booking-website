"use client";

import React from "react";
import HeroGallery from "./HeroGallery";
import ResponsiveContainer from "@/components/ResponsiveContainer/ResponsiveContainer";
import PropertySearchPanel from "@/components/PropertySearchPanel/PropertySearchPanel";
import FloatingPropertySearchResults from "@/components/FloatingPropertySearchResults";

export default function Hero() {
  const [showPropertySearchResults, setShowPropertySearchResults] =
    React.useState(false);

  return (
    <section className="bg-white pb-16 pt-10">
      <div className="relative">
        <PropertySearchPanel
          page="home"
          onSearch={() => setShowPropertySearchResults(true)}
        />

        <FloatingPropertySearchResults
          showResults={showPropertySearchResults}
          setShowResults={setShowPropertySearchResults}
        />
      </div>

      <ResponsiveContainer className="mt-16">
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

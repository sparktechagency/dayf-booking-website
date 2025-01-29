import ResponsiveContainer from "@/components/ResponsiveContainer/ResponsiveContainer";
import React from "react";
import WondersCarousel from "./WondersCarousel";

export default function WondersAroundYou() {
  return (
    <section className="min-h-screen rounded-[2.8rem] bg-white py-16">
      <ResponsiveContainer>
        <div className="flex-center-between mb-16">
          <h1 className="heading xl:w-1/3">Explore The Wonders Around You</h1>

          <p className="description mt-3 xl:w-1/3">
            Discover the beauty, culture, and excitement that surrounds our
            hotels. From breathtaking landmarks and scenic natural spots to
            vibrant cultural festivals and local culinary delights, there’s
            something for everyone to enjoy.
          </p>
        </div>

        <WondersCarousel />
      </ResponsiveContainer>
    </section>
  );
}

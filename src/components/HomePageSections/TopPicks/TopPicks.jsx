"use client";

import ResponsiveContainer from "@/components/ResponsiveContainer/ResponsiveContainer";
import PropertiesCarousel from "./PropertiesCarousel";
import {
  useGetPropertiesQuery,
  useGetTopPropertiesQuery
} from "@/redux/api/propertyApi";

export default function TopPicks() {
  const { data: properties } = useGetTopPropertiesQuery({
    limit: 10
  });

  return (
    <section className="min-h-screen rounded-[2.8rem] bg-white py-16">
      <ResponsiveContainer>
        <div className="flex-center-between mb-12 flex-col lg:flex-row">
          <h1 className="heading xl:w-1/3">Top Picks for Your Next Stay</h1>

          <p className="description mt-3 xl:w-1/3">
            Not sure where to go? Let us guide you! From cultural landmarks to
            natural wonders, explore our curated list of must-visit locations
            across Algeria.
          </p>
        </div>

        <PropertiesCarousel properties={properties} />
      </ResponsiveContainer>
    </section>
  );
}

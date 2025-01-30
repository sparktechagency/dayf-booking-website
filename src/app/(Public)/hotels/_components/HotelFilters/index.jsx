"use client";

import MapHotelFilter from "./MapHotelFilter";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";

export default function HotelFilter() {
  const [priceRange, setPriceRange] = useState([25, 75]);

  return (
    <>
      <h4 className="mb-5 text-h4 font-semibold">Filter By</h4>

      <section className="space-y-8">
        {/* Map */}
        <MapHotelFilter />

        {/* Price */}
        <div>
          <h5 className="mb-4 text-h6 font-semibold">Price</h5>

          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            aria-label="Price range slider with minimum and maximum price"
            showTooltip={true}
            thumbClassName="border-p1 focus-visible:outline-p1/40 h-[19px] w-[19px]"
            rangeClassName="bg-p1/75"
          />

          <div className="flex-center-between mt-3">
            <Label className="rounded-md bg-gray-100 p-2 text-h6 font-medium">
              ${priceRange[0]}
            </Label>
            <Label className="rounded-md bg-gray-100 p-2 text-h6 font-medium">
              ${priceRange[1]}
            </Label>
          </div>
        </div>
      </section>
    </>
  );
}

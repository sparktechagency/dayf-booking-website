"use client";

import { Checkbox } from "@/components/ui/checkbox";
import MapHotelFilter from "./MapApartmentFilter";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";
import LocationSearch from "./LocationSearch";

// Constants
const RATING_STARS = [5, 4, 3, 2, 1];

const LOCATION_SUGGESTIONS = [
  "New York",
  "London",
  "Paris",
  "Tokyo",
  "Sydney",
  "Berlin",
  "Rome",
  "Barcelona",
  "Mumbai",
  "Dubai",
];

const PROPERTY_TYPES = [
  "Hotel",
  "Resort",
  "Hostel",
  "Motel",
  "Guesthouse",
  "Bed & Breakfast",
  "Villa",
  "Apartment",
  "Cottage",
  "Capsule Hotel",
];

const HOTEL_FEATURES = [
  "Free Wi-Fi",
  "Swimming Pool",
  "Fitness Center",
  "Spa & Wellness",
  "24/7 Front Desk",
  "Free Parking",
  "Airport Shuttle",
  "Pet-Friendly",
  "Restaurant & Bar",
  "Business Center",
  "Concierge Service",
  "Wheelchair Accessible",
];

const ROOM_OPTIONS = [
  "Single Room",
  "Double Room",
  "Twin Room",
  "Suite",
  "Family Room",
  "Deluxe Room",
  "Executive Room",
  "Penthouse",
  "Bungalow",
  "Studio Apartment",
];

export default function ApartmentFilters() {
  const [priceRange, setPriceRange] = useState([25, 75]);

  // Show all states
  const [showMoreLocations, setShowMoreLocations] = useState(false);
  const [showMoreHotelFeatures, setShowMoreHotelFeatures] = useState(false);

  return (
    <>
      <h4 className="mb-5 text-h4 font-semibold">Filter By</h4>

      <section className="space-y-8 mixin/filter-title:mb-4 mixin/filter-title:text-h6 mixin/filter-title:font-semibold">
        {/* Map */}
        <MapHotelFilter />

        {/*-------------- Price-------------- */}
        <div>
          <h5 className="mixin/filter-title">Price</h5>

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

        {/* --------------- Rating --------------- */}
        <div>
          <h5 className="mixin/filter-title">Rating</h5>

          <div className="grid grid-cols-2 gap-4">
            {RATING_STARS.map((starOption) => (
              <div key={starOption} className="flex items-center gap-3">
                <Checkbox id={starOption} />
                <Label
                  htmlFor={starOption}
                  className="flex-center-start cursor-pointer gap-x-2"
                >
                  {starOption}

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 22 21"
                    fill="none"
                  >
                    <path
                      d="M10.7996 0L13.3142 7.73901L21.4514 7.73901L14.8682 12.522L17.3828 20.261L10.7996 15.478L4.21641 20.261L6.73097 12.522L0.147777 7.73901L8.28505 7.73901L10.7996 0Z"
                      fill="#007DD0"
                    />
                  </svg>
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* -------------- Location ------------ */}
        <div>
          <h5 className="mixin/filter-title">Location</h5>

          <LocationSearch />

          <div className="mt-4 grid gap-4">
            {LOCATION_SUGGESTIONS?.slice(
              0,
              showMoreLocations ? LOCATION_SUGGESTIONS.length : 5,
            ).map((location, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <Checkbox id={location} />

                <Label
                  htmlFor={location}
                  className="flex-center-start cursor-pointer gap-x-2"
                >
                  {location}
                </Label>
              </div>
            ))}

            <button
              className="text-base text-p1 hover:text-p1/85"
              onClick={() => setShowMoreLocations(!showMoreLocations)}
            >
              {showMoreLocations ? "See Less" : "See More"}
            </button>
          </div>
        </div>

        {/* -------------- Property Type ------------ */}
        {/* <div>
          <h5 className="mixin/filter-title">Property Type</h5>

          <div className="mt-4 grid gap-4">
            {PROPERTY_TYPES?.slice(
              0,
              showMorePropertyTypes ? PROPERTY_TYPES.length : 5,
            ).map((type, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <Checkbox id={type} />

                <Label
                  htmlFor={type}
                  className="flex-center-start cursor-pointer gap-x-2"
                >
                  {type}
                </Label>
              </div>
            ))}

            <button
              className="text-base text-p1 hover:text-p1/85"
              onClick={() => setShowMorePropertyTypes(!showMorePropertyTypes)}
            >
              {showMorePropertyTypes ? "See Less" : "See More"}
            </button>
          </div>
        </div> */}

        {/* -------------- Hotel Features ------------ */}
        <div>
          <h5 className="mixin/filter-title">Apartment Features</h5>

          <div className="mt-4 grid gap-4">
            {HOTEL_FEATURES?.slice(
              0,
              showMoreHotelFeatures ? HOTEL_FEATURES.length : 5,
            ).map((feature, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <Checkbox id={feature} />

                <Label
                  htmlFor={feature}
                  className="flex-center-start cursor-pointer gap-x-2"
                >
                  {feature}
                </Label>
              </div>
            ))}

            <button
              className="text-base text-p1 hover:text-p1/85"
              onClick={() => setShowMoreHotelFeatures(!showMoreHotelFeatures)}
            >
              {showMoreHotelFeatures ? "See Less" : "See More"}
            </button>
          </div>
        </div>

        {/* -------------- Room Options ------------ */}
        {/* <div>
          <h5 className="mixin/filter-title">Room Options</h5>

          <div className="mt-4 grid gap-4">
            {ROOM_OPTIONS?.slice(
              0,
              showMoreRoomOptions ? ROOM_OPTIONS.length : 5,
            ).map((option, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <Checkbox id={option} />

                <Label
                  htmlFor={option}
                  className="flex-center-start cursor-pointer gap-x-2"
                >
                  {option}
                </Label>
              </div>
            ))}

            <button
              className="text-base text-p1 hover:text-p1/85"
              onClick={() => setShowMoreRoomOptions(!showMoreRoomOptions)}
            >
              {showMoreRoomOptions ? "See Less" : "See More"}
            </button>
          </div>
        </div> */}
      </section>
    </>
  );
}

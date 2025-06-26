"use client";

import { Checkbox } from "@/components/ui/checkbox";
// import MapHotelFilter from "./MapHotelFilter";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";
import { useGetAllFacilitiesQuery } from "@/redux/api/facilitiesApi";

// Constants
const RATING_STARS = [5, 4, 3, 2, 1];

const LOCATION_SUGGESTIONS = [
  { name: "New York", latitude: 40.7128, longitude: -74.006 },
  { name: "London", latitude: 51.5072, longitude: -0.1276 },
  { name: "Paris", latitude: 48.8566, longitude: 2.3522 },
  { name: "Tokyo", latitude: 35.6764, longitude: 139.65 },
  { name: "Sydney", latitude: -33.8688, longitude: 151.2093 },
  { name: "Berlin", latitude: 52.52, longitude: 13.405 },
  { name: "Rome", latitude: 41.9028, longitude: 12.4964 },
  { name: "Barcelona", latitude: 41.3874, longitude: 2.1686 },
  { name: "Mumbai", latitude: 19.076, longitude: 72.8777 },
  { name: "Dubai", latitude: 25.276987, longitude: 55.296249 },
  { name: "Miami", latitude: 25.7906, longitude: -80.1345 }
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
  "Capsule Hotel"
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
  "Wheelchair Accessible"
];

export default function HotelFilter({
  priceRange,
  selectedLocations,
  setPriceRange,
  setSelectedRatings,
  setSelectedLocations,
  setSelectedHotelFeatures
}) {
  // Show all states
  const [showMoreLocations, setShowMoreLocations] = useState(false);
  const [showMorePropertyTypes, setShowMorePropertyTypes] = useState(false);
  const [showMoreHotelFeatures, setShowMoreHotelFeatures] = useState(false);
  const [showMoreRoomOptions, setShowMoreRoomOptions] = useState(false);

  const handleSelectedRatings = (rating) => {
    setSelectedRatings((prevSelected) =>
      prevSelected.includes(rating)
        ? prevSelected.filter((r) => r !== rating)
        : [...prevSelected, rating]
    );
  };
  const handleSelectedHotelFeatures = (feature) => {
    setSelectedHotelFeatures((prevSelected) =>
      prevSelected.includes(feature)
        ? prevSelected.filter((f) => f !== feature)
        : [...prevSelected, feature]
    );
  };

  let features = [];
  const { data: featuresData } = useGetAllFacilitiesQuery();
  if (featuresData?.data.length > 0) {
    features = featuresData?.data;
  }

  return (
    <>
      <h4 className="mb-5 text-h4 font-semibold">Filter By</h4>

      <section className="space-y-8 mixin/filter-title:mb-4 mixin/filter-title:text-h6 mixin/filter-title:font-semibold">
        {/*-------------- Price-------------- */}
        <div>
          <h5 className="mixin/filter-title">Price</h5>

          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            aria-label="Price range slider with minimum and maximum price"
            showTooltip={false}
            min={100}
            max={1000}
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
              <div
                key={starOption}
                onClick={() => handleSelectedRatings(starOption)}
                className="flex items-center gap-3"
              >
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

          {/* <LocationSearch /> */}

          <div className="mt-4 grid gap-4">
            {LOCATION_SUGGESTIONS?.slice(
              0,
              showMoreLocations ? LOCATION_SUGGESTIONS.length : 5
            ).map((location, idx) => (
              <div
                key={idx}
                onClick={() => {
                  // Toggle: if the clicked location is already selected, clear it; otherwise, select it
                  setSelectedLocations(
                    selectedLocations?.name === location.name ? null : location
                  );
                }}
                className="flex items-center gap-3"
              >
                <input
                  type="radio"
                  id={`location-${idx}`}
                  name="location"
                  checked={selectedLocations?.name === location.name}
                  onChange={() => {
                    // Same toggle logic in onChange for direct radio input interaction
                    setSelectedLocations(
                      selectedLocations?.name === location.name
                        ? null
                        : location
                    );
                  }}
                  className="h-5 w-5 cursor-pointer"
                />
                <Label
                  htmlFor={`location-${idx}`}
                  className="flex-center-start cursor-pointer gap-x-2"
                >
                  {location.name}
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

        {/* -------------- Hotel Features ------------ */}
        <div>
          <h5 className="mixin/filter-title">Hotel Features</h5>

          <div className="mt-4 grid gap-4">
            {features?.map((feature) => (
              <div
                key={feature._id}
                onClick={() => handleSelectedHotelFeatures(feature._id)}
                className="flex items-center gap-3"
              >
                <Checkbox id={feature._id} />

                <Label
                  htmlFor={feature.title}
                  className="flex-center-start cursor-pointer gap-x-2"
                >
                  {feature.title}
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
      </section>
    </>
  );
}

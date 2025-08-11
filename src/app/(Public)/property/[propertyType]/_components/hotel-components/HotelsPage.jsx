"use client";

import HotelFilter from "./HotelFilters";
import HotelsContainer from "./HotelsContainer";
import ResponsiveContainer from "@/components/ResponsiveContainer/ResponsiveContainer";
import { useGetPropertiesQuery } from "@/redux/api/propertyApi";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { useState } from "react";

export default function HotelsPage() {
  const [searchText, setSearchText] = useState("");

  // Pagination controls
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const pageSize = Number(searchParams.get("pageSize")) || 10;

  // Filtering
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState(null);
  const [selectedHotelFeatures, setSelectedHotelFeatures] = useState([]);

  // Sort
  const sort = searchParams?.get("sort") || "";

  const query = {};

  if (page) {
    query["page"] = page;
  }
  if (pageSize) {
    query["limit"] = pageSize;
  }
  if (selectedRatings.length > 0) {
    query["ratingsFilter"] = selectedRatings.toString();
  }
  if (selectedLocations) {
    query["longitude"] = selectedLocations.longitude;
    query["latitude"] = selectedLocations.latitude;
  }
  if (selectedHotelFeatures.length > 0) {
    query["facilities"] = selectedHotelFeatures.toString();
  }
  // If Sort
  if (sort) {
    query["sort"] = sort;
  }
  // If Search Text
  if (searchText) {
    query["searchTerm"] = searchText;
  }
  // console.log("------------------------------->>", query);
  const { data: hotelsRes } = useGetPropertiesQuery(query);

  const hotels = hotelsRes?.data || [];
  const hotelsMeta = hotelsRes?.meta || {};

  const finalHotels = useMemo(() => {
    let filtered = [...hotels];

    // Filter by price range
    filtered = filtered.filter((hotel) => {
      // Treat null minPrice and maxPrice as 0
      const min = hotel?.minPrice ?? 0;
      const max = hotel?.maxPrice ?? 0;

      // Check for overlap between hotel's price range and user's price range
      return min <= priceRange[1] && max >= priceRange[0];
    });

    // Sort
    if (sort.includes("price")) {
      const isAsc = sort === "price";
      filtered = filtered.sort((a, b) => {
        // Treat null minPrice as 0 for sorting
        const priceA = a?.minPrice ?? 0;
        const priceB = b?.minPrice ?? 0;
        return isAsc ? priceA - priceB : priceB - priceA;
      });
    }

    return filtered;
  }, [hotels, priceRange, sort]);

  // console.log("finalHotels: ====> ", finalHotels);
  // console.log("Hotels data: ", hotels);
  // console.log("Hotels meta: ", hotelsMeta);

  return (
    <div className="my-10">
      <ResponsiveContainer className="flex-start mt-16 flex flex-col justify-between gap-y-12 lg:flex-row lg:gap-x-14 lg:gap-y-0">
        <div className="w-full lg:w-1/4">
          <HotelFilter
            priceRange={priceRange}
            selectedLocations={selectedLocations}
            setPriceRange={setPriceRange}
            setSelectedRatings={setSelectedRatings}
            setSelectedLocations={setSelectedLocations}
            setSelectedHotelFeatures={setSelectedHotelFeatures}
          />
        </div>

        <div className="w-full flex-1">
          <HotelsContainer
            hotels={finalHotels?.length > 0 ? finalHotels : hotels}
            hotelsMeta={hotelsMeta}
            pagination={{ page, pageSize }}
            sort={sort}
            searchParams={searchParams}
            setSearchText={setSearchText}
          />
        </div>
      </ResponsiveContainer>
    </div>
  );
}

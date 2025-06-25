"use client";

import HotelFilter from "./HotelFilters";
import HotelsContainer from "./HotelsContainer";
import ResponsiveContainer from "@/components/ResponsiveContainer/ResponsiveContainer";
import { useGetPropertiesQuery } from "@/redux/api/propertyApi";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useEffect } from "react";

export default function HotelsPage() {
  const [hotels, setHotels] = useState([]);
  const [searchText, setSearchText] = useState("");
  // Pagination controls
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const pageSize = Number(searchParams.get("pageSize")) || 10;

  // Filtering
  const [priceRange, setPriceRange] = useState([100, 300]);
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
  // if (priceRange.length > 0) {
  //   query["priceRange"] = `${priceRange[0]}-${priceRange[1]}`;
  // }
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
  if(sort) {
    query['sort'] = sort;
  }

  console.log("searchText: ", searchText);

  const { data: hotelsRes, isError } = useGetPropertiesQuery(query);

  useEffect(() => {
    if (hotelsRes?.data) {
      setHotels(hotelsRes.data);
    } else if (isError) {
      setHotels([]); // Clear hotels on error
    }
  }, [hotelsRes, isError]);

  const hotelsMeta = hotelsRes?.meta || {};
  console.log("Hotels Data: ", hotels);
  // console.log("HotelsMeta Data: ", hotelsMeta);

  return (
    <div className="my-10">
      <ResponsiveContainer className="flex-start-between mt-16 gap-x-14">
        <div className="w-1/4">
          <HotelFilter
            priceRange={priceRange}
            selectedLocations={selectedLocations}
            setPriceRange={setPriceRange}
            setSelectedRatings={setSelectedRatings}
            setSelectedLocations={setSelectedLocations}
            setSelectedHotelFeatures={setSelectedHotelFeatures}
          />
        </div>

        <div className="flex-1">
          <HotelsContainer
            hotels={hotels}
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

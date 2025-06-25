"use client";

import ResponsiveContainer from "@/components/ResponsiveContainer/ResponsiveContainer";
import { useSearchParams } from "next/navigation";
import { useGetApartmentsQuery } from "@/redux/api/apartmentApi";
import ApartmentsContainer from "./ApartmentsContainer";
import ApartmentSearchPanel from "@/components/PropertySearchPanel/ApartmentSearchPanel";
import ApartmentFilters from "../ApartmentFilters";
import { useState } from "react";
import { useEffect } from "react";
import EmptyContainer from "@/components/EmptyContainer/EmptyContainer";

export default function ApartmentsPage() {
  const [apartments, setApartments] = useState([]);
  const [searchText, setSearchText] = useState("");

  // Pagination controls
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const pageSize = Number(searchParams.get("pageSize")) || 10;

  // Extract the apartment search params from the searchParams
  const location = searchParams.get('location');
  const checkInOutDate = searchParams.get('checkInOutDate') ? JSON.parse(searchParams.get('checkInOutDate')) : null;
  const guests = searchParams.get('guests') ? JSON.parse(searchParams.get('guests')) : null;

  console.log('location: ', location)
  console.log('checkInOutDate: ', checkInOutDate)
  console.log('guests: ', guests)
  
  // Filtering
  const [priceRange, setPriceRange] = useState([1000, 5000]);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState(null);
  const [selectedApartmentFeatures, setSelectedApartmentFeatures] = useState(
    []
  );
  
  // Sort
  const sort = searchParams?.get("sort") || "";
  
  console.log("searchText: ", searchText);

  const query = {};

  if (page) {
    query["page"] = page;
  }
  if (pageSize) {
    query["limit"] = pageSize;
  }
  if (priceRange.length > 0) {
    query["priceRange"] = `${priceRange[0]}-${priceRange[1]}`;
  }
  if (selectedRatings.length > 0) {
    query["ratingsFilter"] = selectedRatings.toString();
  }
  if (selectedLocations) {
    query["longitude"] = selectedLocations.longitude;
    query["latitude"] = selectedLocations.latitude;
  }
  if (selectedApartmentFeatures.length > 0) {
    query["facilities"] = selectedApartmentFeatures.toString();
  }
  // If Sort
  if(sort) {
    query['sort'] = sort;
  }

  const { data: apartmentsRes, isError } = useGetApartmentsQuery(query);
  useEffect(() => {
    if (apartmentsRes?.data) {
      setApartments(apartmentsRes.data);
    } else if (isError) {
      setApartments([]); // Clear hotels on error
    }
  }, [apartmentsRes, isError]);
  const apartmentsMeta = apartmentsRes?.meta || {};

  return (
    <div className="my-10">
      <ApartmentSearchPanel  />

      <ResponsiveContainer className="flex-start-between mt-16 gap-x-14">
        <div className="w-1/4">
          <ApartmentFilters
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            setSelectedRatings={setSelectedRatings}
            selectedLocations={selectedLocations}
            setSelectedLocations={setSelectedLocations}
            setSelectedApartmentFeatures={setSelectedApartmentFeatures}
          />
        </div>

        <div className="flex-1">
          {apartments && apartments?.length > 0 ? (
            <ApartmentsContainer
              apartments={apartments}
              apartmentsMeta={apartmentsMeta}
              pagination={{ page, pageSize }}
              sort={sort}
              searchParams={searchParams}
              setSearchText={setSearchText}
            />
          ) : (
            <EmptyContainer
              className="h-[50dvh]"
              message="No apartments found"
            />
          )}
        </div>
      </ResponsiveContainer>
    </div>
  );
}

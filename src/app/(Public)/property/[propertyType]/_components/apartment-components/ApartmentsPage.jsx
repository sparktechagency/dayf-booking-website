"use client";

import ResponsiveContainer from "@/components/ResponsiveContainer/ResponsiveContainer";
import { useSearchParams } from "next/navigation";
import { useGetApartmentsQuery } from "@/redux/api/apartmentApi";
import ApartmentsContainer from "./ApartmentsContainer";
import PropertySearchPanel from "@/components/PropertySearchPanel/PropertySearchPanel";
import ApartmentFilters from "../ApartmentFilters";
import { useState } from "react";
import CustomLoader from "@/components/CustomLoader/CustomLoader";

export default function ApartmentsPage() {
  const [searchText, setSearchText] = useState("");

  // Pagination controls
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const pageSize = Number(searchParams.get("pageSize")) || 10;

  // Extract the apartment search params from the searchParams
  const longitude = searchParams.get("longitude");
  const latitude = searchParams.get("latitude");
  const rawCheckInOutDate = searchParams.get("checkInOutDate");
  const checkInOutDate =
    rawCheckInOutDate && rawCheckInOutDate !== "undefined"
      ? JSON.parse(rawCheckInOutDate)
      : null;
  const rawGuests = searchParams.get("guests");
  const guests =
    rawGuests && rawGuests !== "undefined" ? JSON.parse(rawGuests) : null;

  // Filtering
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState(null);
  const [selectedApartmentFeatures, setSelectedApartmentFeatures] = useState(
    []
  );

  // Sort
  const sort = searchParams?.get("sort") || "";

  const query = {};

  // Global Search
  if (latitude && longitude) {
    query["latitude"] = latitude;
    query["longitude"] = longitude;
  }
  if (checkInOutDate?.from && checkInOutDate?.to) {
    query["startDate"] = checkInOutDate.from;
    query["endDate"] = checkInOutDate.to;
  }
  if (guests && Object.values(guests).some((g) => g > 0)) {
    console.log("guests: ", guests);
    query["adults"] = guests.adults;
    query["children"] = guests.children;
    query["infants"] = guests.infants;
  }

  // Filter
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
  if (sort) {
    query["sort"] = sort;
  }
  // If Search Text
  if (searchText) {
    query["searchTerm"] = searchText;
  }

  const { data: apartmentsRes, isLoading: isApartmentsLoading } =
    useGetApartmentsQuery(query);
  const apartments = apartmentsRes?.data || [];
  const apartmentsMeta = apartmentsRes?.meta || {};

  // console.log("Apartments: ", apartments);

  if (isApartmentsLoading) {
    return <CustomLoader className={"w-screen h-screen"} />;
  }

  return (
    <div className="my-10">
      <ResponsiveContainer className="flex flex-col lg:flex-row flex-start-between mt-16 lg:gap-x-14 gap-y-12 lg:gap-y-0">
        <div className="w-full lg:w-1/4">
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
          <ApartmentsContainer
            apartments={apartments}
            apartmentsMeta={apartmentsMeta}
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

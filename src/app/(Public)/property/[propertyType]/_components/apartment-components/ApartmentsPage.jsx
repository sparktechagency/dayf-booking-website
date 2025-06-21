"use client";

import ResponsiveContainer from "@/components/ResponsiveContainer/ResponsiveContainer";
import { useSearchParams } from "next/navigation";
import { useGetApartmentsQuery } from "@/redux/api/apartmentApi";
import ApartmentsContainer from "./ApartmentsContainer";
import ApartmentSearchPanel from "@/components/PropertySearchPanel/ApartmentSearchPanel";
import ApartmentFilters from "../ApartmentFilters";
import EmptyContainer from "@/components/EmptyContainer/EmptyContainer";

export default function ApartmentsPage() {
  // Pagination controls
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const pageSize = Number(searchParams.get("pageSize")) || 10;

  // Filters
  const priceRange = searchParams?.get("priceRange") || "";
  const ratingsFilter = searchParams?.get("ratings") || "";
  const latitude = Number(searchParams.get("latitude")) || "";
  const longitude = Number(searchParams.get("longitude")) || "";
  const features = searchParams?.get("features") || "";
  const adults = Number(searchParams.get("adults")) || "";
  const children = Number(searchParams.get("children")) || "";
  const infants = Number(searchParams.get("infants")) || "";

  // Sort
  const sort = searchParams?.get("sort") || "";

  const { data: apartmentsRes } = useGetApartmentsQuery({
    page,
    limit: pageSize,
    sort,
    priceRange,
    facilities: features,
    latitude,
    longitude,
    adults,
    children,
    infants,
    ratingsFilter
  });
  const apartments = apartmentsRes?.data || [];
  const apartmentsMeta = apartmentsRes?.meta || {};

  console.log({ apartments });

  return (
    <div className="my-10">
      <ApartmentSearchPanel />

      <ResponsiveContainer className="flex-start-between mt-16 gap-x-14">
        <div className="w-1/4">
          <ApartmentFilters />
        </div>

        <div className="flex-1">
          {apartments && apartments?.length > 0 ? (
            <ApartmentsContainer
              apartments={apartments}
              apartmentsMeta={apartmentsMeta}
              pagination={{ page, pageSize }}
              sort={sort}
              searchParams={searchParams}
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

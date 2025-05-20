"use client";

import HotelSearchPanel from "@/components/PropertySearchPanel/HotelSearchPanel";
import HotelFilter from "./HotelFilters";
import HotelsContainer from "./HotelsContainer";
import ResponsiveContainer from "@/components/ResponsiveContainer/ResponsiveContainer";
import { useGetPropertiesQuery } from "@/redux/api/propertyApi";
import { useSearchParams } from "next/navigation";

export default function HotelsPage() {
  // Pagination controls
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const pageSize = Number(searchParams.get("pageSize")) || 10;

  // Sort
  const sort = searchParams?.get("sort") || "";

  const { data: hotelsRes } = useGetPropertiesQuery({
    page,
    limit: pageSize,
    sort
  });
  const hotels = hotelsRes?.data || [];
  const hotelsMeta = hotelsRes?.meta || {};

  return (
    <div className="my-10">
      <HotelSearchPanel />

      <ResponsiveContainer className="flex-start-between mt-16 gap-x-14">
        <div className="w-1/4">
          <HotelFilter />
        </div>

        <div className="flex-1">
          <HotelsContainer
            hotels={hotels}
            hotelsMeta={hotelsMeta}
            pagination={{ page, pageSize }}
            sort={sort}
            searchParams={searchParams}
          />
        </div>
      </ResponsiveContainer>
    </div>
  );
}

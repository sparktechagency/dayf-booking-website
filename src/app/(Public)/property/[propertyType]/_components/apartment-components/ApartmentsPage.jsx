"use client";

import ResponsiveContainer from "@/components/ResponsiveContainer/ResponsiveContainer";
import { useSearchParams } from "next/navigation";
import { useGetApartmentsQuery } from "@/redux/api/apartmentApi";
import ApartmentsContainer from "./ApartmentsContainer";
import ApartmentSearchPanel from "@/components/PropertySearchPanel/ApartmentSearchPanel";
import ApartmentFilters from "../ApartmentFilters";

export default function ApartmentsPage() {
  // Pagination controls
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const pageSize = Number(searchParams.get("pageSize")) || 10;

  // Sort
  const sort = searchParams?.get("sort") || "";

  const { data: apartmentsRes } = useGetApartmentsQuery({
    page,
    limit: pageSize,
    sort
  });
  const apartments = apartmentsRes?.data || [];
  const apartmentsMeta = apartmentsRes?.meta || {};

  return (
    <div className="my-10">
      <ApartmentSearchPanel />

      <ResponsiveContainer className="flex-start-between mt-16 gap-x-14">
        <div className="w-1/4">
          <ApartmentFilters />
        </div>

        <div className="flex-1">
          <ApartmentsContainer
            apartments={apartments}
            apartmentsMeta={apartmentsMeta}
            pagination={{ page, pageSize }}
            sort={sort}
            searchParams={searchParams}
          />
        </div>
      </ResponsiveContainer>
    </div>
  );
}

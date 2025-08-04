"use client";

import { useGetPropertiesByFiltersQuery } from "@/redux/api/propertyApi";
import { X } from "lucide-react";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import PropertyCard from "../PropertyCard/PropertyCard";
import HorizontalPropertyCardSkeleton from "../shared/HorizontalPropertyCardSkeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import EmptyContainer from "../EmptyContainer/EmptyContainer";
import { PaginationWithLinks } from "../ui/pagination-with-links";

export default function FloatingPropertySearchResults({
  showResults,
  setShowResults,
  isRefetch,
  setIsRefetch
}) {
  const searchParams = useSearchParams();
  const checkInOutDate = JSON.parse(searchParams.get("checkInOutDate")) || "";
  const latitude = searchParams.get("latitude") || "";
  const longitude = searchParams.get("longitude") || "";
  const guests = JSON.parse(searchParams.get("guests")) || {};
  const propertyType = JSON.parse(searchParams.get("propertyType")) || "";
  const page = searchParams.get("page") || "1";
  const pageSize = searchParams.get("pageSize") || "4";

  // Query filters
  const query = {
    startDate: checkInOutDate.from,
    endDate: checkInOutDate.to,
    page,
    limit: pageSize,
    latitude,
    longitude,
    adults: guests?.adults || 0,
    children: guests?.children || 0,
    infants: guests?.infants || 0,
    searchType: propertyType === "hotel" ? "Property" : "Apartment"
  };

  // Get properties for global search
  const {
    data: propertiesByFitlers,
    isFetching: isLoadingPropertiesByFilters,
    refetch
  } = useGetPropertiesByFiltersQuery(query, {
    skip: !checkInOutDate?.from || !checkInOutDate?.to || !showResults
  });
  const properties = propertiesByFitlers?.data || [];
  const propertiesMeta = propertiesByFitlers?.meta || {};

  console.log({ properties });

  useEffect(() => {
    if (isRefetch && propertiesByFitlers?.data) {
      refetch();
      setIsRefetch(false);
    }
  }, [isRefetch, propertiesByFitlers, refetch, setIsRefetch]);

  return (
    <div>
      {/* Floating Results Box */}
      {showResults && (
        <div className="absolute left-4 right-4 top-full z-50 mt-2 rounded-2xl border-0 bg-white pt-4 shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]">
          <Card className="border-0 shadow-none">
            <CardContent>
              <div className="mb-6 flex items-center justify-between">
                <h3 className="font-quicksand text-2xl font-semibold">
                  Search Results
                </h3>

                <Button
                  variant="ghost"
                  onClick={() => setShowResults(false)}
                  className="flex aspect-square !size-8 items-center justify-center rounded-full !p-0 [&_svg]:size-6"
                >
                  <X />
                </Button>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {isLoadingPropertiesByFilters ? (
                  Array.from({ length: 4 }).map((_, index) => (
                    <HorizontalPropertyCardSkeleton
                      key={"horizontal-property-card-skeleton" + index}
                    />
                  ))
                ) : properties && properties.length > 0 ? (
                  properties?.map((property) => {
                    const isHotel = property?.price === undefined;

                    return (
                      <PropertyCard
                        key={property._id}
                        variant="list"
                        property={property}
                        type={isHotel ? "hotel" : "apartment"}
                      />
                    );
                  })
                ) : (
                  <div className="flex-center col-span-2">
                    <EmptyContainer message="No matching property found" />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end pr-4">
            <PaginationWithLinks
              page={page}
              pageSize={pageSize}
              totalCount={propertiesMeta?.total}
            />
          </div>
        </div>
      )}
    </div>
  );
}

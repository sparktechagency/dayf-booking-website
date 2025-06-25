"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { ArrowUpDown } from "lucide-react";
import { useState } from "react";
import PropertyCard from "@/components/PropertyCard/PropertyCard";
import { PaginationWithLinks } from "@/components/ui/pagination-with-links";
import { usePathname, useRouter } from "next/navigation";

// Constants
const SORT_OPTIONS = {
  "Top Recommended": "reviews",
  "Price: Low to High": "price",
  "Price: High to Low": "-price",
  "Rating: Low to High": "avgRating",
  "Rating: High to Low": "-avgRating"
};

export default function HotelsContainer({
  hotels,
  hotelsMeta,
  pagination,
  sort,
  searchParams,
  setSearchText
}) {
  const currentPathname = usePathname();
  const router = useRouter();

  return (
    <div>
      <section className="flex-center-between">
        <h3 className="text-h4 font-semibold">
          {hotels?.length} Hotel{hotels?.length > 1 && "s"} Found 🌟
        </h3>

        <div className="flex-center-start gap-x-2">
          <div className="relative rounded-full border-2 border-p1 transition-all duration-300 ease-in-out">
            <Search
              className={cn(
                "absolute left-3 top-1/2 -translate-y-1/2 text-muted"
              )}
              size={18}
            />

            <Input
              onChange={(e) => setSearchText(e.target.value)}
              className={cn(
                "w-full rounded-full border-none bg-white px-10 py-5 shadow-none outline-none !ring-0 !ring-offset-0"
              )}
              placeholder="Search hotels..."
            />
          </div>

          {/* Sort */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="w-full">
              <Button
                variant="outline"
                className={cn(
                  "w-max rounded-full border-2 border-p1 !px-5 !py-5 shadow-none !outline-none !ring-0",
                  sort && "bg-p1 text-white"
                )}
              >
                <ArrowUpDown size={18} />
                <span>
                  Sort by
                  {sort
                    ? `: ` +
                      (() => {
                        const sortOption = Object.keys(SORT_OPTIONS).find(
                          (key) => SORT_OPTIONS[key] === sort
                        );
                        return sortOption ? sortOption : "";
                      })()
                    : ""}
                </span>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-56 rounded-xl">
              {Object.keys(SORT_OPTIONS)?.map((option) => (
                <DropdownMenuCheckboxItem
                  key={option}
                  checked={sort === SORT_OPTIONS[option]}
                  onCheckedChange={() => {
                    const newSearchParams = new URLSearchParams(searchParams);

                    if (sort === SORT_OPTIONS[option]) {
                      newSearchParams.delete("sort");
                    } else {
                      newSearchParams.set("sort", SORT_OPTIONS[option]);
                    }

                    const queryString = newSearchParams.toString();
                    const newUrl = queryString
                      ? `${currentPathname}?${queryString}`
                      : currentPathname;

                    router.push(newUrl);
                  }}
                >
                  {option}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </section>

      {/* Hotel Lists */}
      <section className="mt-8 grid gap-8">
        {hotels?.map((property) => (
          <PropertyCard key={property._id} property={property} variant="list" />
        ))}

        <PaginationWithLinks
          page={pagination?.page}
          pageSize={pagination?.pageSize}
          totalCount={hotelsMeta?.total}
        />
      </section>
    </div>
  );
}

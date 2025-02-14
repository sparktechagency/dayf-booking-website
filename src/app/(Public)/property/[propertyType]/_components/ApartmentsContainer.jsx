"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { ArrowUpDown } from "lucide-react";
import { useState } from "react";
import apartmentImage1 from "/public/images/apartments/1.jpg";
import apartmentImage2 from "/public/images/apartments/2.jpg";
import apartmentImage3 from "/public/images/apartments/3.jpg";
import apartmentImage4 from "/public/images/apartments/4.jpg";
import apartmentImage5 from "/public/images/apartments/5.jpg";
import apartmentImage6 from "/public/images/apartments/6.jpg";
import apartmentImage7 from "/public/images/apartments/7.jpg";
import apartmentImage8 from "/public/images/apartments/8.jpg";
import apartmentImage9 from "/public/images/apartments/9.jpg";
import apartmentImage10 from "/public/images/apartments/10.jpg";
import apartmentImage11 from "/public/images/apartments/11.jpg";
import PropertyCard from "@/components/PropertyCard/PropertyCard";
import { BathroomIcon, BedroomIcon, ExpandIcon } from "@/utils/svgLibrary";
import { PaginationWithLinks } from "@/components/ui/pagination-with-links";
import { useSearchParams } from "next/navigation";

// Constants
const SORT_OPTIONS = [
  "Top Recommended",
  "Price: Low to High",
  "Price: High to Low",
  "Rating: Low to High",
  "Rating: High to Low",
  "Top Reviewed",
];

export const apartmentImages = [
  apartmentImage1,
  apartmentImage2,
  apartmentImage3,
  apartmentImage4,
  apartmentImage5,
  apartmentImage6,
  apartmentImage7,
  apartmentImage8,
  apartmentImage9,
  apartmentImage10,
  apartmentImage11,
];

// Dummy Hotels Data
const apartments = [
  {
    id: 1,
    name: "Magnifique 3 Pièces Sur Les Hauteurs D'Alger",
    description:
      "A charming 75m² apartment located in the Air de France-Bouzerea district, offering two bedrooms, modern amenities, and breathtaking views of Algiers.",
    price_per_night: 120,
    rating: 4.8,
    reviewCount: 150,
    features: [
      {
        id: "bedroom",
        icon: <BedroomIcon />,
        label: "Bedrooms",
        value: 2,
      },
      {
        id: "bathroom",
        icon: <BathroomIcon />,
        label: "Bathrooms",
        value: 1,
      },
      {
        id: "space",
        icon: <ExpandIcon />,
        label: "sq ft",
        value: "807",
      },
    ],
    location: "Algiers, Algeria",
    images: apartmentImages,
  },
  {
    id: 2,
    name: "F2 Sauna Et Jacuzzi XL",
    description:
      "A luxurious one-bedroom apartment featuring a private sauna and jacuzzi, situated in a modern district close to Algiers' main attractions.",
    price_per_night: 150,
    rating: 4.9,
    reviewCount: 200,
    features: [
      {
        id: "bedroom",
        icon: <BedroomIcon />,
        label: "Bedrooms",
        value: 1,
      },
      {
        id: "bathroom",
        icon: <BathroomIcon />,
        label: "Bathrooms",
        value: 1,
      },
      {
        id: "space",
        icon: <ExpandIcon />,
        label: "sq ft",
        value: "650",
      },
    ],
    location: "Algiers, Algeria",
    images: apartmentImages,
  },
  {
    id: 3,
    name: "Duplex Haut Standing F4 A El Achour",
    description:
      "An upscale duplex apartment in the El Achour district, offering spacious living areas, a private garden, and modern amenities.",
    price_per_night: 200,
    rating: 4.7,
    reviewCount: 180,
    features: [
      {
        id: "bedroom",
        icon: <BedroomIcon />,
        label: "Bedrooms",
        value: 3,
      },
      {
        id: "bathroom",
        icon: <BathroomIcon />,
        label: "Bathrooms",
        value: 2,
      },
      {
        id: "space",
        icon: <ExpandIcon />,
        label: "sq ft",
        value: "1,657",
      },
    ],
    location: "Algiers, Algeria",
    images: apartmentImages,
  },
  {
    id: 4,
    name: "Élégance Et Confort Près D'Alger Centre",
    description:
      "A modern one-bedroom apartment in a peaceful setting, featuring access to a swimming pool, sauna, and fitness center within the residence.",
    price_per_night: 130,
    rating: 4.6,
    reviewCount: 160,
    features: [
      {
        id: "bedroom",
        icon: <BedroomIcon />,
        label: "Bedrooms",
        value: 1,
      },
      {
        id: "bathroom",
        icon: <BathroomIcon />,
        label: "Bathrooms",
        value: 1,
      },
      {
        id: "space",
        icon: <ExpandIcon />,
        label: "sq ft",
        value: "700",
      },
    ],
    location: "Algiers, Algeria",
    images: apartmentImages,
  },
  {
    id: 5,
    name: "Infinity",
    description:
      "A spacious two-bedroom apartment offering modern amenities and stunning views of the city, perfect for families or business travelers.",
    price_per_night: 180,
    rating: 4.8,
    reviewCount: 170,
    features: [
      {
        id: "bedroom",
        icon: <BedroomIcon />,
        label: "Bedrooms",
        value: 2,
      },
      {
        id: "bathroom",
        icon: <BathroomIcon />,
        label: "Bathrooms",
        value: 2,
      },
      {
        id: "space",
        icon: <ExpandIcon />,
        label: "sq ft",
        value: "1,200",
      },
    ],
    location: "Algiers, Algeria",
    images: apartmentImages,
  },
];

export default function ApartmentsContainer() {
  const [sortBy, setSortBy] = useState("");

  // Pagination controls
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");
  const pageSize = parseInt(searchParams.get("pageSize") || "10");

  return (
    <div>
      <section className="flex-center-between">
        <h3 className="text-h4 font-semibold">15 Apartments Found 🌟</h3>

        <div className="flex-center-start gap-x-2">
          <div className="relative rounded-full border-2 border-p1 transition-all duration-300 ease-in-out">
            <Search
              className={cn(
                "absolute left-3 top-1/2 -translate-y-1/2 text-muted",
              )}
              size={18}
            />

            <Input
              className={cn(
                "w-full rounded-full border-none bg-white px-10 py-5 shadow-none outline-none !ring-0 !ring-offset-0",
              )}
              placeholder="Search for apartments..."
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild className="w-full">
              <Button
                variant="outline"
                className={cn(
                  "w-max rounded-full border-2 border-p1 !px-5 !py-5 shadow-none !outline-none !ring-0",
                  sortBy && "bg-p1 text-white",
                )}
              >
                <ArrowUpDown size={18} />
                <span>Sort by{sortBy ? `: ${sortBy}` : ""}</span>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-56 rounded-xl">
              {SORT_OPTIONS.map((option) => (
                <DropdownMenuCheckboxItem
                  key={option}
                  checked={sortBy === option}
                  onCheckedChange={() =>
                    sortBy === option ? setSortBy("") : setSortBy(option)
                  }
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
        {apartments?.map((property) => (
          <PropertyCard
            key={property.id}
            property={property}
            variant="list"
            type="apartment"
          />
        ))}

        {/* <CustomPagination currentPage={currentPage} /> */}
        <PaginationWithLinks page={page} pageSize={pageSize} totalCount={100} />
      </section>
    </div>
  );
}

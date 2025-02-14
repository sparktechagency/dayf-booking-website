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
import hotelImg1 from "/public/images/hotels/bar-caxine-lounge.jpg";
import hotelImg2 from "/public/images/hotels/bar-caxine-lounge (1).jpg";
import hotelImg3 from "/public/images/hotels/bar-caxine-lounge (2).jpg";
import hotelImg4 from "/public/images/hotels/chambre-superieure.jpg";
import hotelImg5 from "/public/images/hotels/piscine.jpg";
import hotelImg6 from "/public/images/hotels/restaurant-gastronomique.jpg";
import hotelImg7 from "/public/images/hotels/restaurant-gastronomique (1).jpg";
import hotelImg8 from "/public/images/hotels/restaurant-gastronomique (2).jpg";
import hotelImg9 from "/public/images/hotels/salle-de-ceremonies-el.jpg";
import hotelImg10 from "/public/images/hotels/salle-de-ceremonies-el (1).jpg";
import hotelImg11 from "/public/images/hotels/salle-de-la-mariee.jpg";
import hotelImg12 from "/public/images/hotels/salle-de-la-mariee (1).jpg";
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

const hotelImages = [
  hotelImg1,
  hotelImg2,
  hotelImg3,
  hotelImg4,
  hotelImg5,
  hotelImg6,
  hotelImg7,
  hotelImg8,
  hotelImg9,
  hotelImg10,
  hotelImg11,
  hotelImg12,
];

// Dummy Hotels Data
const hotels = [
  {
    id: 1,
    name: "Sheraton Club des Pins Resort",
    description:
      "A luxurious beachfront resort offering world-class amenities and breathtaking views of the Mediterranean Sea.",
    price_per_night: 310,
    rating: 4.5,
    reviewCount: 500,
    features: [
      {
        id: "bedroom",
        icon: <BedroomIcon />,
        label: "Bedroom",
        value: 3,
      },
      {
        id: "bathroom",
        icon: <BathroomIcon />,
        label: "Bathroom",
        value: 2,
      },
      {
        id: "space",
        icon: <ExpandIcon />,
        label: "sq ft",
        value: "1,500",
      },
    ],
    location: "Algiers, Algeria",
    images: hotelImages,
  },
  {
    id: 2,
    name: "Sofitel Algiers Hamma Garden",
    description:
      "A 5-star oasis in the heart of Algiers, offering unparalleled comfort, fine dining, and stunning city views.",
    price_per_night: 280,
    rating: 4.4,
    reviewCount: 500,
    features: [
      {
        id: "bedroom",
        icon: <BedroomIcon />,
        label: "Bedroom",
        value: 2,
      },
      {
        id: "bathroom",
        icon: <BathroomIcon />,
        label: "Bathroom",
        value: 2,
      },
      {
        id: "space",
        icon: <ExpandIcon />,
        label: "sq ft",
        value: "1,300",
      },
    ],
    location: "Algiers, Algeria",
    images: hotelImages,
  },
  {
    id: 3,
    name: "Constantine Marriott Hotel",
    description:
      "A modern luxury hotel with exceptional hospitality, ideal for business and leisure travelers visiting Constantine.",
    price_per_night: 260,
    rating: 4.6,
    reviewCount: 500,
    features: [
      {
        id: "bedroom",
        icon: <BedroomIcon />,
        label: "Bedroom",
        value: 2,
      },
      {
        id: "bathroom",
        icon: <BathroomIcon />,
        label: "Bathroom",
        value: 2,
      },
      {
        id: "space",
        icon: <ExpandIcon />,
        label: "sq ft",
        value: "1,250",
      },
    ],
    location: "Algiers, Algeria",
    images: hotelImages,
  },
  {
    id: 4,
    name: "Royal Hotel Oran - MGallery",
    description:
      "An elegant blend of history and modern luxury in Oran, offering a sophisticated stay with spectacular city views.",
    price_per_night: 290,
    rating: 4.3,
    reviewCount: 500,
    features: [
      {
        id: "bedroom",
        icon: <BedroomIcon />,
        label: "Bedroom",
        value: 2,
      },
      {
        id: "bathroom",
        icon: <BathroomIcon />,
        label: "Bathroom",
        value: 2,
      },
      {
        id: "space",
        icon: <ExpandIcon />,
        label: "sq ft",
        value: "1,400",
      },
    ],
    location: "Algiers, Algeria",
    images: hotelImages,
  },
  {
    id: 5,
    name: "AZ Hotel Zeralda",
    description:
      "A charming and comfortable hotel located in Algiers, perfect for a peaceful and relaxing stay.",
    price_per_night: 150,
    rating: 4.2,
    reviewCount: 500,
    features: [
      {
        id: "bedroom",
        icon: <BedroomIcon />,
        label: "Bedroom",
        value: 1,
      },
      {
        id: "bathroom",
        icon: <BathroomIcon />,
        label: "Bathroom",
        value: 1,
      },
      {
        id: "space",
        icon: <ExpandIcon />,
        label: "sq ft",
        value: "900",
      },
    ],
    location: "Algiers, Algeria",
    images: hotelImages,
  },
];

export default function HotelsContainer() {
  const [sortBy, setSortBy] = useState("");

  // Pagination controls
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");
  const pageSize = parseInt(searchParams.get("pageSize") || "10");

  return (
    <div>
      <section className="flex-center-between">
        <h3 className="text-h4 font-semibold">12 Hotels Found 🌟</h3>

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
              placeholder="Search hotels..."
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
        {hotels?.map((property) => (
          <PropertyCard key={property.id} property={property} variant="list" />
        ))}

        {/* <CustomPagination currentPage={currentPage} /> */}
        <PaginationWithLinks page={page} pageSize={pageSize} totalCount={100} />
      </section>
    </div>
  );
}

import HotelSearchPanel from "@/components/PropertySearchPanel/HotelSearchPanel";
import ResponsiveContainer from "@/components/ResponsiveContainer/ResponsiveContainer";
import React from "react";
import HotelFilter from "./_components/HotelFilters";
import HotelsContainer from "./_components/HotelsContainer";
import ApartmentSearchPanel from "@/components/PropertySearchPanel/ApartmentSearchPanel";
import ApartmentFilters from "./_components/ApartmentFilters";
import ApartmentsContainer from "./_components/ApartmentsContainer";
import { notFound } from "next/navigation";

export const generateMetadata = async ({ params }) => {
  let propertyType = (await params)?.propertyType;
  propertyType = propertyType[0].toUpperCase() + propertyType?.slice(1);

  return {
    title: `Find Your Dream ${propertyType}`,
  };
};

export default async function DynamicProperty({ params }) {
  const propertyType = (await params)?.propertyType;

  return propertyType === "hotels" ? (
    <Hotels />
  ) : propertyType === "apartments" ? (
    <Apartments />
  ) : (
    notFound()
  );
}

// =====================
// Hotels
// =====================
const Hotels = () => {
  return (
    <div className="my-10">
      <HotelSearchPanel />

      <ResponsiveContainer className="flex-start-between mt-16 gap-x-14">
        <div className="w-1/4">
          <HotelFilter />
        </div>

        <div className="flex-1">
          <HotelsContainer />
        </div>
      </ResponsiveContainer>
    </div>
  );
};

// =====================
// Apartments
// =====================
const Apartments = () => {
  return (
    <div className="my-10">
      <ApartmentSearchPanel />

      <ResponsiveContainer className="flex-start-between mt-16 gap-x-14">
        <div className="w-1/4">
          <ApartmentFilters />
        </div>

        <div className="flex-1">
          <ApartmentsContainer />
        </div>
      </ResponsiveContainer>
    </div>
  );
};

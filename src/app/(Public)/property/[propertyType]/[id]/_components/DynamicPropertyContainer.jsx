"use client";
import CustomTooltip from "@/components/CustomTooltip/CustomTooltip";
import BgIcon from "@/components/PropertySearchPanel/BgIcon";
import { Icon } from "@iconify/react";
import ResponsiveContainer from "@/components/ResponsiveContainer/ResponsiveContainer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import AnimatedArrow from "@/components/AnimatedArrow/AnimatedArrow";
import DynamicPropertyImageGallery from "./DynamicPropertyImageGallery";
import DynamicHotelDetails from "./DynamicPropertyDetails";
import { notFound, useParams } from "next/navigation";
import DynamicPropertyDetails from "./DynamicPropertyDetails";
import { useGetSingleHotelQuery } from "@/redux/api/propertyApi";
import { useGetSingleApartmentQuery } from "@/redux/api/apartmentApi";

export default function DynamicPropertyContainer() {
  const { propertyType } = useParams();

  return propertyType === "hotels" ? (
    <DynamicHotel />
  ) : propertyType === "apartments" ? (
    <DynamicApartment />
  ) : (
    notFound()
  );
}

// Dynamic Hotel
const DynamicHotel = () => {
  // Get hotel data
  const { id: hotelId } = useParams();
  const {
    data: hotelData,
    isLoading,
    isError,
    error
  } = useGetSingleHotelQuery(hotelId, {
    skip: !hotelId
  });

  if (isLoading) {
    return "loading...";
  }

  if (isError) {
    return error?.message;
  }

  return (
    <ResponsiveContainer className="my-10">
      <section className="flex-center-between">
        <div>
          <h2 className="font-quicksand text-h3 font-bold">
            {hotelData?.name}
          </h2>
          <p className="text-h6 text-gray-500">{hotelData?.description}</p>
        </div>

        <div className="flex-center-start gap-x-4">
          <CustomTooltip title="Save for Later">
            <BgIcon
              className="size-12 bg-p1/10 text-p1"
              as="button"
              onClick={() => {
                console.log("saved");
              }}
            >
              <Icon icon="solar:bookmark-linear" width="24" height="24" />
              <span className="sr-only">Save for Later</span>
            </BgIcon>
          </CustomTooltip>

          <CustomTooltip title="Share">
            <BgIcon className="size-12 bg-p1/10 text-p1">
              <Icon icon="tdesign:share" width="24" height="24" />
              <span className="sr-only">Share</span>
            </BgIcon>
          </CustomTooltip>

          <Button
            variant="primary"
            size="lg"
            className="group rounded-full font-semibold"
            asChild
          >
            <Link href="#availability">
              Reserve <AnimatedArrow />
            </Link>
          </Button>
        </div>
      </section>

      {/* Gallery */}
      <DynamicPropertyImageGallery
        property={hotelData}
        images={hotelData?.images}
      />

      {/* Hotel Details */}
      <DynamicHotelDetails property={hotelData} />
    </ResponsiveContainer>
  );
};

// Dynamic Apartment
const DynamicApartment = () => {
  // Get hotel data
  const { id: apartmentId } = useParams();

  const {
    data: apartment,
    isLoading,
    isError,
    error
  } = useGetSingleApartmentQuery(apartmentId, {
    skip: !apartmentId
  });

  if (isLoading) {
    return "loading...";
  }

  if (isError) {
    return error?.message;
  }

  return (
    <ResponsiveContainer className="my-10">
      <section className="flex-center-between">
        <div className="w-3/4 space-y-1">
          <h2 className="font-quicksand text-h3 font-bold">
            {apartment?.name}
          </h2>
          <p className="text-h6 text-gray-500">{apartment?.shortDescription}</p>
        </div>

        <div className="flex-center-start gap-x-4">
          <CustomTooltip title="Save for Later">
            <BgIcon
              className="size-12 bg-p1/10 text-p1"
              as="button"
              onClick={() => {
                console.log("saved");
              }}
            >
              <Icon icon="solar:bookmark-linear" width="24" height="24" />
              <span className="sr-only">Save for Later</span>
            </BgIcon>
          </CustomTooltip>

          <CustomTooltip title="Share">
            <BgIcon className="size-12 bg-p1/10 text-p1">
              <Icon icon="tdesign:share" width="24" height="24" />
              <span className="sr-only">Share</span>
            </BgIcon>
          </CustomTooltip>

          <Button
            variant="primary"
            size="lg"
            className="group rounded-full font-semibold"
            asChild
          >
            <Link href="#availability">
              Reserve <AnimatedArrow />
            </Link>
          </Button>
        </div>
      </section>

      {/* Gallery */}
      <DynamicPropertyImageGallery
        property={apartment}
        images={apartment?.images}
      />

      {/* Hotel Details */}
      <DynamicPropertyDetails property={apartment} />
    </ResponsiveContainer>
  );
};

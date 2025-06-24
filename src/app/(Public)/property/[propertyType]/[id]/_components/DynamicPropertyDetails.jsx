"use client";

import ContentWrapper from "@/components/ContentWrapper/ContentWrapper";
import BgIcon from "@/components/PropertySearchPanel/BgIcon";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useState } from "react";
import DynamicPropertyAvailabilitySection from "./DynamicPropertyAvailabilitySection";
import MapHotelFilter from "../../_components/ApartmentFilters/MapApartmentFilter";
import DynamicPropertyReviews from "./DynamicPropertyReviews";
import DynamicPropertyPolicies from "./DynamicPropertyPolicies";
import PropertiesCarousel from "@/components/HomePageSections/TopPicks/PropertiesCarousel";
import Image from "next/image";
import { GoogleMap } from "@react-google-maps/api";
import { useEffect } from "react";
import { useMemo } from "react";
import { Marker } from "@react-google-maps/api";
import { useCallback } from "react";
import SorroundingContainer from "./SorroundingContainer";

const PROPERTY_DETAILS_SECTIONS = [
  { key: "overview", label: "Overview", route: "#overview" },
  { key: "availability", label: "Availability", route: "#availability" },
  { key: "surroundings", label: "Surroundings", route: "#surroundings" },
  { key: "reviews", label: "Reviews", route: "#reviews" }
];

export default function DynamicPropertyDetails({ property }) {
  const [activeSection, setActiveSection] = useState("overview");
  console.log({ property });

  // Center property location in google map
  const center = useMemo(() => {
    if (property && property?.location?.coordinates?.length > 0) {
      return {
        lat: property?.location?.coordinates[1],
        lng: property?.location?.coordinates[0]
      };
    }
  }, [property]);

  if (!property)
    return (
      <div className="flex-center-center h-screen">
        <h1>Property not found</h1>
      </div>
    );

  return (
    <section className="mt-10">
      <nav className="flex-center-start gap-x-8 text-lg">
        {PROPERTY_DETAILS_SECTIONS.map((section) => (
          <Link
            key={section.key}
            href={section.route}
            className={cn(
              "text-gray-500 transition-colors duration-300 ease-in-out",
              activeSection === section.key &&
                "border-b-2 border-b-p1 font-medium text-p1"
            )}
            onClick={() => setActiveSection(section.key)}
          >
            {section.label}
          </Link>
        ))}

        <Button variant="primary" className="rounded-full" asChild>
          <Link href={`/messages`}>
            <Icon
              icon="hugeicons:message-notification-01"
              className="!h-5 !w-5"
            />
            Message
          </Link>
        </Button>
      </nav>

      <section id="overview" className="flex-start-between mt-8 gap-x-8">
        {/* <ContentWrapper content={hotel?.desc} /> */}

        <div className="space-y-8 lg:w-3/4">
          <article className="text-h5">{property?.description}</article>

          <div className="w-full">
            <DynamicApartmentSectionTitle>
              Features
            </DynamicApartmentSectionTitle>

            <div className="flex-center-start mt-4 w-full flex-wrap gap-x-8 gap-y-5">
              {property?.facilities?.map((feature) => (
                <span
                  key={feature.title}
                  className="flex-center-start gap-x-2 text-base"
                >
                  <BgIcon className="size-11 rounded bg-light-sky-blue text-p1">
                    {/* <Icon icon={feature.icon} className="!h-6 !w-6" /> */}
                    <Image
                      src={feature?.icon}
                      height={16}
                      width={16}
                      className="object-cover"
                    />
                  </BgIcon>

                  {feature.title}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1 space-y-5">
          {/* Property Highlights */}
          <div className="rounded-xl border p-4 shadow">
            <h5 className="text-h6 font-bold">Property Highlights</h5>

            <ul className="mb-5 mt-3 space-y-3">
              {/* {property?.propertyHighlights?.map((highlight) => (
                <li key={highlight.title} className="flex-center-start gap-x-2">
                  <BgIcon className="size-10 bg-light-sky-blue text-p1">
                    <Icon icon={highlight.icon} className="!h-5 !w-5" />
                  </BgIcon>

                  {highlight.title}
                </li>
              ))} */}
            </ul>

            <Button variant="primary" className="w-full" asChild>
              <Link href={"#availability"}>Reserve</Link>
            </Button>
          </div>

          {/* Find On map */}
          <div className="">
            <GoogleMap
              mapContainerClassName="w-full h-[250px] border-slate-200 border rounded-lg rounded-b-none hover:shadow-lg transition-all duration-300 ease-in-out"
              center={center}
              zoom={15}
              options={{
                disableDefaultUI: true,
                zoomControl: true,
                fullscreenControl: true
              }}
            >
              <Marker
                position={{ lat: center?.lat, lng: center?.lng }}
                animation={google.maps.Animation.DROP}
              />
            </GoogleMap>

            <Link
              href={`https://www.google.com/maps?q=${center?.lat},${center?.lng}&z=15`}
              target="_blank"
            >
              <button className="block w-full rounded-b-2xl border border-t-0 bg-gray-50 py-2.5 text-base text-p1 hover:text-p1/85">
                View in Map
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* <section id="availability" className="mt-16">
        <DynamicPropertyAvailabilitySection rooms={property?.rooms} />
      </section> */}

      <section id="surroundings" className="mt-16 space-y-5">
        <DynamicApartmentSectionTitle>
          Explore the Area
        </DynamicApartmentSectionTitle>

        <SorroundingContainer center={center} />
      </section>

      <div id="reviews" className="mt-16 space-y-5">
        <DynamicApartmentSectionTitle>
          What Our Guests Say
        </DynamicApartmentSectionTitle>
        {property?.reviews?.length > 0 && (
          <DynamicPropertyReviews reviews={property?.reviews} />
        )}
      </div>

      <div id="policy" className="mt-16 space-y-5">
        <DynamicApartmentSectionTitle>Policies</DynamicApartmentSectionTitle>
        <DynamicPropertyPolicies />
      </div>

      <div id="recommended" className="mt-16 space-y-5">
        <DynamicApartmentSectionTitle>
          You may also like
        </DynamicApartmentSectionTitle>
        <PropertiesCarousel />
      </div>
    </section>
  );
}

export const DynamicApartmentSectionTitle = ({ children }) => {
  return <h4 className="text-h4 font-semibold">{children}</h4>;
};

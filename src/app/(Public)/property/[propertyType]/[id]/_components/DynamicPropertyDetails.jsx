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

const PROPERTY_DETAILS_SECTIONS = [
  { key: "overview", label: "Overview", route: "#overview" },
  { key: "availability", label: "Availability", route: "#availability" },
  { key: "surroundings", label: "Surroundings", route: "#surroundings" },
  { key: "reviews", label: "Reviews", route: "#reviews" },
];

export default function DynamicPropertyDetails({ property }) {
  const [activeSection, setActiveSection] = useState("overview");
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
                "border-b-2 border-b-p1 font-medium text-p1",
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
          <article className="space-y-3 text-h5">
            <p>
              Located in Dhaka, 1.1 miles from Uttara University, Sheraton Club
              des Pins Resort provides accommodations with a fitness center,
              private parking, a shared lounge and a terrace. This 3-star hotel
              offers an ATM and babysitting service. The property has a 24-hour
              front desk, airport transportation, room service and free WiFi.
            </p>
            <p>
              At the hotel you'll find a restaurant serving Chinese, Indian and
              Italian cuisine. Vegetarian and halal options can also be
              requested.
            </p>
            <p>
              IUBAT is 1.8 miles from Sheraton Club des Pins Resort, while Dhaka
              Airport Train Station is 2.7 miles away. Hazrat Shahjalal
              International Airport is 4.3 miles from the property.
            </p>
            <p>
              Solo travelers in particular like the location – they rated it 8.0
              for a one-person stay.
            </p>
          </article>

          <div className="w-full">
            <DynamicApartmentSectionTitle>
              Features
            </DynamicApartmentSectionTitle>

            <div className="flex-center-start mt-4 w-full flex-wrap gap-x-8 gap-y-5">
              {property?.features?.map((feature) => (
                <span
                  key={feature.title}
                  className="flex-center-start gap-x-2 text-base"
                >
                  <BgIcon className="size-11 rounded bg-light-sky-blue text-p1">
                    <Icon icon={feature.icon} className="!h-6 !w-6" />
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
              {property?.propertyHighlights?.map((highlight) => (
                <li key={highlight.title} className="flex-center-start gap-x-2">
                  <BgIcon className="size-10 bg-light-sky-blue text-p1">
                    <Icon icon={highlight.icon} className="!h-5 !w-5" />
                  </BgIcon>

                  {highlight.title}
                </li>
              ))}
            </ul>

            <Button variant="primary" className="w-full" asChild>
              <Link href={"#availability"}>Reserve</Link>
            </Button>
          </div>

          {/* Find On map */}
          <div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3196.315156306903!2d2.8737041!3d36.7630063!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x128fbb46b7352df3%3A0x477680816fb08924!2sSheraton%20Club%20des%20Pins%20Resort!5e0!3m2!1sen!2sbd!4v1738399151674!5m2!1sen!2sbd"
              width={"100%"}
              height="250"
              style={{ border: 0, borderRadius: "0.75rem" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>

      <section id="availability" className="mt-16">
        <DynamicPropertyAvailabilitySection rooms={property?.availability} />
      </section>

      <section id="surroundings" className="mt-16 space-y-5">
        <DynamicApartmentSectionTitle>
          Explore the Area
        </DynamicApartmentSectionTitle>

        <div className="flex-center-between gap-x-20">
          <div className="grid w-[60%] grid-cols-2 gap-x-10 gap-y-5">
            {property?.surroundings?.map((surrounding, idx) => (
              <div key={idx}>
                <div className="flex-center-start mb-2 gap-x-2 text-h6">
                  <Icon icon={surrounding.icon} height="24" width="24" />
                  <h6>{surrounding.title}</h6>
                </div>

                {surrounding.data.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex-center-between mb-1 text-gray-500"
                  >
                    <p>{item.title}</p>
                    <p>{item.distance}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className="flex-1">
            <MapHotelFilter />
          </div>
        </div>
      </section>

      <div id="reviews" className="mt-16 space-y-5">
        <DynamicApartmentSectionTitle>
          What Our Guests Say
        </DynamicApartmentSectionTitle>
        <DynamicPropertyReviews reviews={property?.testimonials} />
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

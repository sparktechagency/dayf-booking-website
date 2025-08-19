"use client";

import BgIcon from "@/components/PropertySearchPanel/BgIcon";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import DynamicHotelAvailabilitySection from "./DynamicHotelAvailabilitySection";
import DynamicPropertyReviews from "./DynamicPropertyReviews";
import DynamicPropertyPolicies from "./DynamicPropertyPolicies";
import PropertiesCarousel from "@/components/HomePageSections/TopPicks/PropertiesCarousel";
import Image from "next/image";
import { useMemo } from "react";
import SorroundingContainer from "./SorroundingContainer";
import { usePathname } from "next/navigation";
import EmptyContainer from "@/components/EmptyContainer/EmptyContainer";
import DyanamicApartmentAvailabilitySection from "./DyanamicApartmentAvailabilitySection";
import { useGetPropertiesQuery } from "@/redux/api/propertyApi";
import {
  useCreateBookmarkMutation,
  useDeleteBookmarkMutation,
  useGetAllBookmarkQuery
} from "@/redux/api/bookmarkApi";
import { ErrorModal, SuccessModal } from "@/utils/customModal";
import { useGetApartmentsQuery } from "@/redux/api/apartmentApi";
import { useSelector } from "react-redux";
import { selectUser } from "@/redux/features/authSlice";
import toast from "react-hot-toast";

const PROPERTY_DETAILS_SECTIONS = [
  { key: "overview", label: "Overview", route: "#overview" },
  { key: "availability", label: "Availability", route: "#availability" },
  { key: "surroundings", label: "Surroundings", route: "#surroundings" },
  { key: "reviews", label: "Reviews", route: "#reviews" }
];

export default function DynamicPropertyDetails({ property }) {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState("overview");
  const user = useSelector(selectUser);

  const propertyType = pathname.includes("/hotels") ? "hotels" : "apartments";

  // console.log("Property type: -------------> ", propertyType);

  // -----------------------------------------------------------
  const query = useMemo(
    () => ({
      limit: 5,
      longitude: property?.location?.coordinates[0],
      latitude: property?.location?.coordinates[1]
    }),
    [property]
  );

  const hotelQueryResult = useGetPropertiesQuery(query, {
    skip: !property?.location?.coordinates?.length
  });

  const apartmentQueryResult = useGetApartmentsQuery(query, {
    skip: !property?.location?.coordinates?.length
  });

  const {
    recommendedPropertiesData,
    isLoading: isRecommendedLoading,
    isError: isRecommendedError,
    error: recommendedError
  } = useMemo(() => {
    if (propertyType === "hotels") {
      return {
        recommendedPropertiesData: hotelQueryResult?.data?.data || [],
        isLoading: hotelQueryResult.isLoading,
        isError: hotelQueryResult.isError,
        error: hotelQueryResult.error
      };
    } else {
      return {
        recommendedPropertiesData: apartmentQueryResult?.data?.data || [],
        isLoading: apartmentQueryResult.isLoading,
        isError: apartmentQueryResult.isError,
        error: apartmentQueryResult.error
      };
    }
  }, [propertyType, hotelQueryResult, apartmentQueryResult]);

  const recommendedProperties = recommendedPropertiesData?.filter(
    (p) => p._id !== property._id && p?.location?.coordinates?.length > 0
  );

  useEffect(() => {
    // Handle errors
    if (isRecommendedError) {
      console.error(
        "Error fetching recommended properties: ",
        recommendedError
      );
      ErrorModal(
        recommendedError?.data?.message ||
          "Failed to fetch recommended properties"
      );
    }
  }, [recommendedError, isRecommendedError]);

  // console.log("Recommended properties: ", recommendedProperties);

  // --------------------------------------------------------------------------
  const [bookmarks, setBookmarks] = useState([]);

  const [createBookmark, { isError, error, isLoading }] =
    useCreateBookmarkMutation();
  const [deleteBookmark, { isDeleteError, deleteError, isDeleteLoading }] =
    useDeleteBookmarkMutation();

  // Get bookmarks
  const {
    data: bookmarkData,
    isError: isGetError,
    error: getError,
    refetch: bookingRefetch
  } = useGetAllBookmarkQuery();
  // console.log("Bookmark data: ", bookmarkData);
  // Update bookmarks state when bookmarkData changes
  useEffect(() => {
    // console.log("Bookmark data: ", bookmarkData);

    setBookmarks(bookmarkData);
  }, [bookmarkData]);

  // Handle errors in useEffect
  useEffect(() => {
    if (isGetError) {
      console.error("Error fetching bookmarks:", getError);
      // Optionally show an error modal
      // ErrorModal(getError?.data?.message || "Failed to fetch bookmarks");
    }
  }, [isGetError, getError]);

  // Create Bookmark
  const handleCreateBookmark = async (_id) => {
    // console.log("_id: ", _id);
    const toastId = toast.loading("Creating Bookmark");
    const modelType = propertyType === "hotels" ? "Property" : "Apartment";

    // Bookmark the data
    try {
      const data = await createBookmark({ reference: _id, modelType }).unwrap();
      // console.log("create Bookmark response: ", data);
      if (data?.success) {
        SuccessModal(data?.message);
        bookingRefetch();
        toast.remove(toastId);
      }
    } catch (error) {
      if (error) {
        toast.remove(toastId);
        // console.error("Error while creating bookmark: ", error);
        if (error?.status === 401 || error?.status === 403) {
          ErrorModal("You need to login to bookmark properties.");
        } else ErrorModal(error?.data?.message);
      }
    }
  };

  // Create Bookmark
  const handleDeleteBookmark = async (_id) => {
    // console.log("_id: ", _id);
    const toastId = toast.loading("Deleting Bookmark");

    try {
      const res = await deleteBookmark(_id);
      // console.log("Delete bookmark response: ", res);
      if (res?.data?.success) {
        SuccessModal(res?.data?.message);
        bookingRefetch();
        toast.remove(toastId);
      }
    } catch (error) {
      if (error) {
        toast.remove(toastId);
        // console.error("Error while deleting bookmark: ", error);
        if (error?.status === 401 || error?.status === 403) {
          ErrorModal("You need to login to bookmark properties.");
        } else ErrorModal(error?.data?.message);
      }
    }
  };

  // ------------------------------------------------------------------------

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

        {user && (
          <Button variant="primary" className="rounded-full" asChild>
            <Link href={`/messages?reciverId=${property?.author?._id}`}>
              <Icon
                icon="hugeicons:message-notification-01"
                className="!h-5 !w-5"
              />
              Message
            </Link>
          </Button>
        )}
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

              {property?.Other?.map((otherFeature, index) => (
                <span
                  key={otherFeature + index}
                  className="flex-center-start gap-x-2 text-base"
                >
                  <BgIcon className="size-11 rounded bg-light-sky-blue text-p1">
                    <Icon icon={"mingcute:check-line"} className="!h-6 !w-6" />
                  </BgIcon>

                  {otherFeature}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {pathname.includes("/hotels") ? (
        <section id="availability" className="mt-16">
          <DynamicHotelAvailabilitySection propertyId={property?._id} />
        </section>
      ) : (
        <section id="availability" className="mt-16">
          <DyanamicApartmentAvailabilitySection />
        </section>
      )}

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
        {console.log("=======================>", property)}
        {property?.reviews?.length > 0 ? (
          <DynamicPropertyReviews reviews={property?.reviews} />
        ) : (
          <EmptyContainer message="No reviews found" />
        )}
      </div>

      <div id="policy" className="mt-16 space-y-5">
        <DynamicApartmentSectionTitle>Policies</DynamicApartmentSectionTitle>
        <DynamicPropertyPolicies />
      </div>

      {/* Recommended */}
      <div id="recommended" className="mt-16 space-y-5">
        <DynamicApartmentSectionTitle>
          You may also like
        </DynamicApartmentSectionTitle>

        {recommendedProperties?.length > 0 ? (
          <PropertiesCarousel
            properties={recommendedProperties}
            bookmarks={bookmarks}
            handleCreateBookmark={handleCreateBookmark}
            handleDeleteBookmark={handleDeleteBookmark}
            type={propertyType}
          />
        ) : (
          <EmptyContainer
            className="h-[50dvh]"
            message={`No recommended ${propertyType} found`}
          />
        )}
      </div>
    </section>
  );
}

export const DynamicApartmentSectionTitle = ({ children }) => {
  return <h4 className="text-h4 font-semibold">{children}</h4>;
};

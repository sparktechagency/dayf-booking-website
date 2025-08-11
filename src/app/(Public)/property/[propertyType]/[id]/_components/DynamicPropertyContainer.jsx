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
import sectionScrollWithOffset from "@/utils/sectionScrollWithOffset";
import {
  useCreateBookmarkMutation,
  useDeleteBookmarkMutation,
  useGetAllBookmarkQuery
} from "@/redux/api/bookmarkApi";
import { ErrorModal, SuccessModal } from "@/utils/customModal";
import { useEffect, useState } from "react";

export default function DynamicPropertyContainer() {
  const { propertyType } = useParams();
  const { id } = useParams();
  const [bookmarked, setBookmarked] = useState(null);

  const [createBookmark, { isError, error, isLoading }] =
    useCreateBookmarkMutation();
  const [deleteBookmark, { isDeleteError, deleteError, isDeleteLoading }] =
    useDeleteBookmarkMutation();

  const modelType = propertyType === "hotels" ? "Property" : "Apartment";

  const {
    data: bookmarks,
    isError: isBookmarkError,
    error: bookmarkError,
    refetch
  } = useGetAllBookmarkQuery({ modelType });

  useEffect(() => {
    if (isBookmarkError) {
      console.error("Error fetching bookmarks: ", bookmarkError);
      // ErrorModal(bookmarkError?.data?.message || "Failed to fetch bookmarks");
    }
  }, [isBookmarkError, bookmarkError]);

  // Create Bookmark
  const handleCreateBookmark = async (_id) => {
    // console.log("_id: ", _id);

    // Bookmark the data
    const data = await createBookmark({ reference: _id, modelType }).unwrap();
    // console.log("create Bookmark response: ", data);
    if (data?.success) {
      SuccessModal(data?.message);
      refetch();
    }
  };

  useEffect(() => {
    if (isError) {
      console.error("Error while creating bookmark: ", error);
      if (error?.status === 401 || error?.status === 403) {
        ErrorModal("You need to login to bookmark properties.");
      } else ErrorModal(error?.data?.message);
    }
  }, [isError, error]);

  // Delete Bookmark
  const handleDeleteBookmark = async (_id) => {
    // console.log("_id: ", _id);

    const res = await deleteBookmark(_id);
    // console.log("Delete bookmark response: ", res);
    if (res?.data?.success) {
      SuccessModal(res?.data?.message);
      refetch();
    }
  };

  useEffect(() => {
    if (isDeleteError) {
      console.error("Error while deleting bookmark: ", deleteError);
      if (deleteError?.status === 401 || deleteError?.status === 403) {
        ErrorModal("You need to login to bookmark properties.");
      } else ErrorModal(deleteError?.data?.message);
    }
  }, [isDeleteError, deleteError]);

  // Match Bookmark with Property
  useEffect(() => {
    const foundData = bookmarks?.find(
      (bookmark) => bookmark?.reference?._id === id
    );
    // console.log("Is foundData: ", foundData);
    if (foundData) setBookmarked(foundData);
    else setBookmarked(null);
  }, [bookmarks]);

  // Final Return from the component
  // Check propertyType and return respective component
  if (propertyType === "hotels") {
    return (
      <DynamicHotel
        id={id}
        bookmarks={bookmarks}
        bookmarked={bookmarked}
        setBookmarked={setBookmarked}
        handleCreateBookmark={handleCreateBookmark}
        handleDeleteBookmark={handleDeleteBookmark}
      />
    );
  }

  if (propertyType === "apartments") {
    return (
      <DynamicApartment
        id={id}
        bookmarks={bookmarks}
        bookmarked={bookmarked}
        setBookmarked={setBookmarked}
        handleCreateBookmark={handleCreateBookmark}
        handleDeleteBookmark={handleDeleteBookmark}
      />
    );
  }

  return notFound();
}

// Dynamic Hotel
const DynamicHotel = ({
  id,
  bookmarked,
  handleCreateBookmark,
  handleDeleteBookmark
}) => {
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
          <p className="max-w-[90%] text-h6 text-gray-500">
            {hotelData?.shortDescription || hotelData?.description?.length > 300
              ? hotelData?.description?.slice(0, 100) + "..."
              : hotelData?.description}
          </p>
        </div>

        <div className="flex-center-start gap-x-4">
          <CustomTooltip title="Save for Later">
            <BgIcon
              className={`size-12 bg-p1/10 text-p1`}
              as="button"
              onClick={() => {
                if (bookmarked) {
                  return handleDeleteBookmark(bookmarked?._id);
                } else {
                  return handleCreateBookmark(id);
                }
              }}
            >
              {bookmarked ? (
                <Icon icon="solar:bookmark-bold" width="24" height="24" />
              ) : (
                <Icon icon="solar:bookmark-linear" width="24" height="24" />
              )}
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
const DynamicApartment = ({
  id,
  bookmarked,
  handleCreateBookmark,
  handleDeleteBookmark
}) => {
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
    <ResponsiveContainer className="py-10">
      <section className="flex-center-between">
        <div className="w-3/4 space-y-1">
          <h2 className="font-quicksand text-h3 font-bold">
            {apartment?.name}
          </h2>
          <p className="max-w-[90%] text-h6 text-gray-500">
            {apartment?.shortDescription}
          </p>
        </div>

        <div className="flex-center-start gap-x-4">
          <CustomTooltip title="Save for Later">
            <BgIcon
              className="size-12 bg-p1/10 text-p1"
              as="button"
              onClick={() => {
                if (bookmarked) {
                  return handleDeleteBookmark(bookmarked?._id);
                } else {
                  return handleCreateBookmark(id);
                }
              }}
            >
              {bookmarked ? (
                <Icon icon="solar:bookmark-bold" width="24" height="24" />
              ) : (
                <Icon icon="solar:bookmark-linear" width="24" height="24" />
              )}
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
            onClick={() => sectionScrollWithOffset("availability", 120)}
          >
            Reserve <AnimatedArrow />
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

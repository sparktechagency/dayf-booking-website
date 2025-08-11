"use client";

import ResponsiveContainer from "@/components/ResponsiveContainer/ResponsiveContainer";
import PropertiesCarousel from "./PropertiesCarousel";
import {
  useGetPropertiesQuery,
  useGetTopPropertiesQuery
} from "@/redux/api/propertyApi";
import { useState } from "react";
import {
  useCreateBookmarkMutation,
  useDeleteBookmarkMutation,
  useGetAllBookmarkQuery
} from "@/redux/api/bookmarkApi";
import { useEffect } from "react";
import { ErrorModal, SuccessModal } from "@/utils/customModal";

export default function TopPicks() {
  const [bookmarks, setBookmarks] = useState([]);
  const { data: properties } = useGetTopPropertiesQuery({
    limit: 10
  });

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
    console.log("Bookmark data: ", bookmarkData);

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
  const handleCreateBookmark = async (_id, isProperty) => {
    // console.log("_id: ", _id);
    const modelType = isProperty ? "Property" : "Apartment";

    // Bookmark the data
    const data = await createBookmark({ reference: _id, modelType }).unwrap();
    console.log("create Bookmark response: ", data);
    if (data?.success) {
      SuccessModal(data?.message);
      bookingRefetch();
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

  // Create Bookmark
  const handleDeleteBookmark = async (_id) => {
    // console.log("_id: ", _id);

    const res = await deleteBookmark(_id);
    console.log("Delete bookmark response: ", res);
    if (res?.data?.success) {
      SuccessModal(res?.data?.message);
      bookingRefetch();
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

  return (
    <section className="min-h-screen rounded-[2.8rem] bg-white py-16">
      <ResponsiveContainer>
        <div className="flex-center-between mb-12 flex-col lg:flex-row">
          <h1 className="heading xl:w-1/3">Top Picks for Your Next Stay</h1>

          <p className="description mt-3 xl:w-1/3">
            Not sure where to go? Let us guide you! From cultural landmarks to
            natural wonders, explore our curated list of must-visit locations
            across Algeria.
          </p>
        </div>

        <PropertiesCarousel
          properties={properties}
          bookmarks={bookmarks}
          handleCreateBookmark={handleCreateBookmark}
          handleDeleteBookmark={handleDeleteBookmark}
        />
      </ResponsiveContainer>
    </section>
  );
}

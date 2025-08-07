"use client";

import EmptyContainer from "@/components/EmptyContainer/EmptyContainer";
import PropertiesCarousel from "@/components/HomePageSections/TopPicks/PropertiesCarousel";
import PropertyCard from "@/components/PropertyCard/PropertyCard";
import {
  useCreateBookmarkMutation,
  useDeleteBookmarkMutation,
  useGetAllBookmarkQuery
} from "@/redux/api/bookmarkApi";
import React, { useEffect, useState } from "react";

export default function BookmarksContainer() {
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
  console.log("Bookmark data: ", bookmarkData);
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
  const handleCreateBookmark = async (_id) => {
    console.log("_id: ", _id);
    const modelType = "Property";

    // Bookmark the data
    const data = await createBookmark({ reference: _id, modelType }).unwrap();
    console.log("create Bookmark response: ", data);
    if (data?.success) {
      SuccessModal(data?.message);
      bookingRefetch();
    }

    if (isError) {
      console.error("Error while creating bookmark: ", error);
      ErrorModal(error?.data?.message);
    }
  };

  // Create Bookmark
  const handleDeleteBookmark = async (_id) => {
    console.log("_id: ", _id);

    const res = await deleteBookmark(_id);
    console.log("Delete bookmark response: ", res);
    if (res?.data?.success) {
      SuccessModal(res?.data?.message);
      bookingRefetch();
    }
    if (isDeleteError) {
      console.error("Error while deleting bookmark: ", deleteError);
    }
  };

  return (
    <div>
      <section className="mt-8 grid grid-cols-2 w-full max-w-5xl gap-8 overflow-hidden">
        {bookmarkData?.length > 0 ? (
          bookmarkData?.map((data) => (
            <div className="w-full" key={data?._id}>
              <PropertyCard
                key={data?._id}
                property={data?.reference}
                variant="grid"
                bookmarks={bookmarks}
                handleCreateBookmark={handleCreateBookmark}
                handleDeleteBookmark={handleDeleteBookmark}
              />
            </div>
          ))
        ) : (
          <EmptyContainer className="h-[50dvh]" message="No bookmarks found" />
        )}

        {/* <CustomPagination currentPage={currentPage} /> */}
        {/* <PaginationWithLinks
          page={pagination?.page}
          pageSize={pagination?.pageSize}
          totalCount={apartmentsMeta?.total}
        /> */}
      </section>
    </div>
  );
}

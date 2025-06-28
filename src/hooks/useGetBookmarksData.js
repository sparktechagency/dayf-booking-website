'use client';

import { useGetAllBookmarkQuery } from "@/redux/api/bookmarkApi";
import { useEffect } from "react";

export const useGetBookmarksData = (modelType, setBookmarks) => {
  const {
    data: bookmarkData,
    isError: isGetError,
    getError,
    getIsLoading
  } = useGetAllBookmarkQuery();

  useEffect(() => {
    if (bookmarkData?.length > 0) {
      const filteredData = bookmarkData.filter(
        (bookmark) => bookmark.modelType === modelType
      );
      setBookmarks(filteredData);
    }
  }, [modelType, setBookmarks, bookmarkData]);

  useEffect(() => {
    if (isGetError) {
      console.error("Error fetching bookmarks:", getError);
    }
  }, [isGetError, getError]);

  return { bookmarkData, isGetError, getError, getIsLoading };
}; 

// export default useGetBookmarksData;
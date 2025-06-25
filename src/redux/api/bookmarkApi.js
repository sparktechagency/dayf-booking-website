import { tagTypes } from "../tagtypes";
import { baseApi } from "./baseApi";

const bookmarkApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBookmark: builder.query({
      query: () => ({
        url: '/bookmark',
        method: "GET"
      }),
      providesTags: [tagTypes.bookmark],
      transformResponse: (res) => res?.data?.data
    }),
    createBookmark: builder.mutation({
      query: (data) => ({
        url: "/bookmark",
        method: "POST",
        body: data
      }),
      invalidatesTags: [tagTypes.bookmark],
      transformResponse: (res) => res?.data?.data
    })
  })
});

export const {
  useGetBookmarkQuery,
  useCreateBookmarkMutation
} = bookmarkApi;

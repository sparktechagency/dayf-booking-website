import { tagTypes } from "../tagtypes";
import { baseApi } from "./baseApi";

const bookmarkApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBookmark: builder.query({
      query: () => ({
        url: '/bookmark',
        method: "GET"
      }),
      providesTags: [tagTypes.bookmark],
      transformResponse: (res) => res?.data?.data
    }),
    getBookmarkById: builder.query({
      query: (_id) => ({
        url: `/bookmark/${_id}`,
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
    }),
    deleteBookmark: builder.mutation({
      query: (_id) => ({
        url: `/bookmark/${_id}`,
        method: "DELETE"
      }),
      invalidatesTags: [tagTypes.bookmark],
      transformResponse: (res) => res?.data?.data
    }),
  })
});

export const {
  useGetAllBookmarkQuery,
  useGetBookmarkByIdQuery,
  useCreateBookmarkMutation,
  useDeleteBookmarkMutation
} = bookmarkApi;

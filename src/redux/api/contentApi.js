import { tagTypes } from "../tagtypes";
import { baseApi } from "./baseApi";

const contentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getContent: builder.query({
      query: () => ({
        url: "/contents",
        method: "GET",
      }),
    }),
    createContent: builder.mutation({
      query: (data) => ({
        url: "/contents/support",
        method: "POST",
        body: data,
      }),

      invalidatesTags: [tagTypes.content],
    }),
  }),
});

export const { useGetContentQuery, useCreateContentMutation } = contentApi;

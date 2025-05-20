import { tagTypes } from "../tagtypes";
import { baseApi } from "./baseApi";

const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTestimonialReviews: builder.query({
      query: () => ({
        url: `/reviews`,
        method: "GET"
      }),
      providesTags: [tagTypes.reviews],
      transformResponse: (res) => res?.data?.data
    })
  })
});

export const { useGetTestimonialReviewsQuery } = reviewApi;

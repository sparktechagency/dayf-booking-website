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
    }),
    createTestimonialReviews: builder.mutation({
      query: (data) => ({ 
        url: "/reviews", 
        method: "POST", 
        body: data 
      }),
      invalidatesTags: [tagTypes.reviews],
      transformResponse: (res) => res?.data?.data
    })
  })
});

export const { useGetTestimonialReviewsQuery, useCreateTestimonialReviewsMutation } = reviewApi;

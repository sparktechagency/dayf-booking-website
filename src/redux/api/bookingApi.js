import { tagTypes } from "../tagtypes";
import { baseApi } from "./baseApi";

const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBookings: builder.query({
      query: (arg) => ({
        url: "/bookings/my-bookings",
        method: "GET",
        params: arg
      }),
      providesTags: [tagTypes.bookingApi]
    }),

    getSingleBooking: builder.query({
      query: (bookingId) => ({
        url: `/bookings/${bookingId}`
      }),
      transformResponse: (res) => res?.data,

      providesTags: [tagTypes.singleBooking]
    }),

    createBooking: builder.mutation({
      query: (payload) => ({ url: "/bookings", method: "POST", body: payload }),
      invalidatesTags: [tagTypes.bookingApi]
    })
  })
});

export const {
  useGetAllBookingsQuery,
  useCreateBookingMutation,
  useGetSingleBookingQuery
} = bookingApi;

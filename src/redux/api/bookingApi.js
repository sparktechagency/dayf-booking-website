import { tagTypes } from "../tagtypes";
import { baseApi } from "./baseApi";

const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBookings: builder.query({
      query: (arg) => ({ url: "/bookings/my-bookings", method: "GET", params: arg }),
      providesTags: [tagTypes.bookingApi],
    //   transformResponse: (res) => ({
    //     data: res?.data?.data || [],
    //     meta: res?.data?.meta || {}
    //   })
    })
  })
});

export const {
    useGetAllBookingsQuery
} = bookingApi;
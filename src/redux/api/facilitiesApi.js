import { tagTypes } from "../tagtypes";
import { baseApi } from "./baseApi";

const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllFacilities: builder.query({
      query: (arg) => ({ url: "/facilities", method: "GET", params: arg }),
      providesTags: [tagTypes.bookingApi],
      transformResponse: (res) => ({
        data: res?.data?.data || [],
        meta: res?.data?.meta || {}
      })
    })
  })
});

export const {
    useGetAllFacilitiesQuery
} = bookingApi;
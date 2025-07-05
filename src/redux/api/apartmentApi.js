import { tagTypes } from "../tagtypes";
import { baseApi } from "./baseApi";

const API_INDEX = "/apartments";

const apartmentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getApartments: builder.query({
      query: (args) => ({
        url: API_INDEX,
        method: "GET",
        params: args
      }),
      providesTags: [tagTypes.apartments],
      transformResponse: (res) => ({
        data: res?.data?.data,
        meta: res?.data?.meta
      })
    }),

    getSingleApartment: builder.query({
      query: (id) => ({
        url: API_INDEX + `/${id}`,
        method: "GET"
      }),
      transformResponse: (res) => res?.data,
      providesTags: [tagTypes.apartment, tagTypes.apartments]
    })
  })
});

export const { useGetApartmentsQuery, useGetSingleApartmentQuery } =
  apartmentApi;

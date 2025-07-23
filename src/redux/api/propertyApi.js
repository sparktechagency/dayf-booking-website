import { tagTypes } from "../tagtypes";
import { baseApi } from "./baseApi";

/**
 ** Note to self:
 ** In backend, developer has defined the hotels as property. So what we mean by hotel in
 ** frontend is basically property in backend (e.g. propertyApi = hotelApi)
 */

const API_INDEX = "/properties";

const propertyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProperties: builder.query({
      query: (args) => {
        return {
          url: API_INDEX,
          method: "GET",
          params: args
        };
      },
      providesTags: [tagTypes.properties],
      transformResponse: (res) => ({
        data: res?.data?.data,
        meta: res?.data?.meta
      })
    }),

    getSingleHotel: builder.query({
      query: (id) => ({
        url: "/properties" + `/${id}`,
        method: "GET"
      }),
      transformResponse: (res) => res?.data,
      providesTags: [tagTypes.property, tagTypes.properties]
    }),

    // This api provides top properties both apartment and hotels
    getTopProperties: builder.query({
      query: () => "/properties/home-page-data",
      providesTags: [tagTypes.properties, tagTypes.apartments],
      transformResponse: (res) => res?.data
    }),

    getRoomCategoriesByPropertyId: builder.query({
      query: ({ propertyId, args }) => ({
        url: `/property-types?property=${propertyId}`,
        method: "GET",
        params: args
      }),

      providesTags: [tagTypes.propertyRoomCategories],
      transformResponse: (res) => res?.data?.data
    }),
    getSingleRoomCategory: builder.query({
      query: (id) => ({
        url: `/property-types/${id}`,
        method: "GET"
      }),
      transformResponse: (res) => res?.data,
      providesTags: [tagTypes.propertyRoomCategory]
    }),

    // Get properties for global search
    getPropertiesByFilters: builder.query({
      query: (args) => ({
        url: `/property-types/global-search`,
        method: "GET",
        params: args
      }),
      providesTags: [tagTypes.globalSearchProperties],
      transformResponse: (res) => ({
        data: res?.data?.data,
        meta: res?.data?.meta
      })
    })
  })
});

export const {
  useGetPropertiesQuery,
  useGetSingleHotelQuery,
  useGetTopPropertiesQuery,
  useGetRoomCategoriesByPropertyIdQuery,
  useGetSingleRoomCategoryQuery,
  useGetPropertiesByFiltersQuery
} = propertyApi;

// function formatPricerRange(range) {
//   return `${range[0]}-${range[1]}`;
// }

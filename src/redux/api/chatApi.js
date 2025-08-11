import { tagTypes } from "../tagtypes";
import { baseApi } from "./baseApi";

const chatApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyChats: builder.query({
      query: (id) => ({
        url: `/chats/my-chats/${id}`,
        method: "GET"
      }),
      providesTags: [tagTypes.chats]
    }),
    getChatById: builder.query({
      query: (id) => ({
        url: `/chats/${id}`,
        method: "GET"
      }),
      providesTags: [tagTypes.chats]
    }),
    createChat: builder.mutation({
      query: (data) => ({
        url: "/chats",
        method: "POST",
        body: data
      }),
      invalidatesTags: [tagTypes.chats]
    }),
    deleteChat: builder.mutation({
      query: (id) => ({
        url: `/chats/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: [tagTypes.chats]
    }),
    updateChat: builder.mutation({
      query: ({ id, data }) => ({
        url: `/chats/${id}`,
        method: "PATCH",
        body: data
      }),
      invalidatesTags: [tagTypes.chats]
    })
  })
});

export const {
  useGetMyChatsQuery,
  useGetChatByIdQuery,
  useCreateChatMutation,
  useDeleteChatMutation,
  useUpdateChatMutation
} = chatApi;
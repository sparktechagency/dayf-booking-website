import { tagTypes } from "../tagtypes";
import { baseApi } from "./baseApi";

const messageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyMessages: builder.query({
      query: (id) => ({
        url: `/messages/my-messages/${id}`,
        method: "GET"
      }),

      invalidatesTags: [tagTypes.messages]
    }),
    sendMessage: builder.mutation({
      query: (payload) => ({
        url: `/messages/send-messages`,
        method: "POST",
        body: payload
      }),
      invalidatesTags: [tagTypes.messages, "chats"]
    }),
    seenMessageByChatId: builder.mutation({
      query: (id) => ({
        url: `/messages/seen/${id}`,
        method: "PATCH"
      }),
      invalidatesTags: [tagTypes.messages, "chats"]
    }),
    deleteChat: builder.mutation({
      query: (chatId) => ({
        url: `/messages/chat/${chatId}`,
        method: "DELETE"
      }),
      invalidatesTags: [tagTypes.messages, "chats"]
    })
  })
});

export const {
  useGetMyMessagesQuery,
  useSendMessageMutation,
  useSeenMessageByChatIdMutation,
  useDeleteChatMutation
} = messageApi;

"use client";

import Image from "next/image";
import { Paperclip } from "lucide-react";
import { Send } from "lucide-react";
import userImg from "/public/images/message/user.png";
import user2Img from "/public/images/message/user2.jpg";
import { CircleOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import UserCard from "./UserCard";
import ReceiverMsgCard from "./ReceiverMsgCard";
import OwnerMsgCard from "./OwnerMsgCard";
import { useSelector } from "react-redux";
import { selectUser } from "@/redux/features/authSlice";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSeenMessageByChatIdMutation } from "@/redux/api/messageApi";
import { useGetMyChatsQuery } from "@/redux/api/chatApi";
import { handleMutation } from "@/utils/handleMutation";
import useSocket from "@/hooks/useSocket";
import { ErrorModal } from "@/utils/customModal";
import MessageForm from "./MessageForm";

const MessageContainer = () => {
  // const user = useSelector(selectUser);
  // const params = useSearchParams();
  // const router = useRouter();
  // const [activeChat, setActiveChat] = useState("");

  // const [
  //   seenMessageByChatId,
  //   { isError: isSeenMessageByIdError, error: seenMessageByIdError }
  // ] = useSeenMessageByChatIdMutation();

  // // Fetch my chats
  // const {
  //   data: myChats,
  //   isLoading: isMyChatsLoading,
  //   isError: isMyChatsError,
  //   error: myChatsError,
  //   refetch: refetchMyChats
  // } = useGetMyChatsQuery(user?._id);

  // const [chatData, setChatData] = useState(myChats);
  // useEffect(() => {
  //   if (!isMyChatsLoading && !isMyChatsError) {
  //     setChatData(myChats);
  //   }
  // }, [isMyChatsLoading, isMyChatsError, myChats]);

  // const handleChangeActiveChat = (chatId) => {
  //   router.push(`/messages?activeChat=${chatId}`);
  //   setActiveChat(chatId);

  //   handleMutation(
  //     chatId,
  //     seenMessageByChatId,
  //     "Loading...",
  //     refetchMyChats(),
  //     (error) => {
  //       console.error("Error seen message by chat ID:", error);
  //     }
  //   );
  // };

  // useEffect(() => {
  //   const activeChat = params.get("activeChat");
  //   if (activeChat) {
  //     setActiveChat(activeChat);
  //   }
  // }, [params]);

  // // If no chat is selected, redirect to the first chat
  // useEffect(() => {
  //   if (chatData && chatData.length > 0 && !activeChat) {
  //     const firstChat = chatData[0]._id;
  //     router.push(`/messages?activeChat=${firstChat}`);
  //     setActiveChat(firstChat);
  //   }
  // }, [chatData, activeChat, router]);

  // // Use socket.io to listen for new messages and update the chat list
  // const socket = useSocket();
  // useEffect(() => {
  //   if (socket) {
  //     if (!socket.connected) {
  //       socket.connect();
  //     }
  //     socket.on("newMessage", (newMessage) => {
  //       // Update chat list or perform any action when a new message is received
  //       refetchMyChats();
  //     });

  //     socket.on("messageSeen", (data) => {
  //       // Handle message seen event
  //       refetchMyChats();
  //     });
  //   }

  //   return () => {
  //     if (socket) {
  //       socket.off("newMessage");
  //       socket.off("messageSeen");
  //       socket.disconnect();
  //     }
  //   };
  // }, [socket, refetchMyChats]);

  // if( isMyChatsLoading) {
  //   return <div className="text-center text-gray-500">Loading chats...</div>;
  // }

  // if (isMyChatsError) {
  //   return <ErrorModal text={myChatsError?.data?.message} />
  // }

  // const activeChatData = chatData.find(chat => chat._id === activeChat);
  // if (!activeChatData) {
  //   return <div className="text-center text-gray-500">No active chat selected.</div>;
  // }

  return (
    <div className="lg:mx-auto">
      <div className="relative z-10 flex flex-col rounded-xl rounded-t-xl border border-t-8 border-t-p1 px-10 py-8 shadow-md lg:flex-row">
        {/* left */}
        <div className="border-opacity-[40%] pr-2 lg:w-[30%] lg:border-r lg:border-gray-300">
          <div className="flex items-end gap-x-5 border-b border-t-black border-opacity-[40%] py-4 text-black">
            <h4 className="text-2xl font-bold">Messages</h4>
            <p className="pb-1 font-semibold">12</p>
          </div>

          <div className="mx-auto mb-10 mt-4 w-[95%]">
            {/* Search box */}
            <div className="relative w-[85%] lg:w-full">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2"
                size={20}
              />
              <Input
                className="w-full rounded-xl border px-10 py-6"
                placeholder="Search messages"
              />
            </div>

            {/* users list - TODO: Use dynamic data */}
            <div className="scroll-hide mt-8 max-h-[80vh] space-y-5 overflow-auto">
              {Array.from({ length: 6 }).map((_, idx) => (
                <UserCard
                  key={idx}
                  user={{
                    img: userImg,
                    name: "Elmer Laverty",
                    latestMsg: "omg, this is amazing 🔥"
                  }}
                  active={idx === 1 ? true : false}
                />
              ))}
            </div>
          </div>
        </div>

        {/* right */}
        <MessageForm />
      </div>
    </div>
  );
};

export default MessageContainer;

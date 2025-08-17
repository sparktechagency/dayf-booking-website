"use client";

import { CirclePlus, Loader2, PlusCircleIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import UserCard from "./UserCard";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "@/redux/features/authSlice";
import MessageForm from "./MessageForm";
import { useSearchParams } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { useGetUserByIdQuery } from "@/redux/api/userApi";
import CustomAvatar from "@/components/CustomAvatar/CustomAvatar";
import { cn } from "@/lib/utils";
import { useSocket } from "@/context/SocketCOntextApi";
import MessageCard from "./MessageCard";
import { Form } from "antd";
import { ErrorModal } from "@/utils/customModal";
import CustomLoader from "@/components/CustomLoader/CustomLoader";

const MessageContainer = () => {
  const [chatListLoading, setChatListLoading] = useState(false);
  const userId = useSelector(selectUser)?.userId;
  const { socket } = useSocket();
  const [chatData, setChatData] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});
  const [activeUsers, setActiveUsers] = useState([]);
  const [isMessageSending, setIsMessageSending] = useState(false);
  const [form] = Form.useForm();
  const [messages, setMessages] = useState([]);
  const chatBoxRef = useRef(null);
  const params = useSearchParams();
  const receiverId = params.get("reciverId");

  const handleChatRes = (res) => {
    setChatData(res?.message);
    setChatListLoading(false);
  };

  // ================= Scroll to bottom of chat box ================
  useEffect(() => {
    if (messages && chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  // ============== Emit `my-chat-list` =============
  useEffect(() => {
    if (!socket || !userId) return;
    socket.emit("my-chat-list", {}, handleChatRes);
  }, [socket, userId]);

  // ================== Listen to `chat-list` for chat list ================
  useEffect(() => {
    if (!socket || !userId) return;

    const handleChatList = async (res) => {
      setChatData(res?.message);
    };

    socket.on("chat-list", handleChatList);
    return () => {
      socket.off("chat-list", handleChatList);
    };
  }, [socket, userId]);

  /**
   * Emit `message-page` to get:
   *  1. Previous messages
   *  2. Active users
   */
  useEffect(() => {
    if (!socket || !selectedUser?._id) return;
    socket.emit("message-page", selectedUser._id, (res) => {
      // setMessages(res?.data?.getPreMessage);
    });
  }, [socket, selectedUser?._id]);

  // Listen to "message"
  useEffect(() => {
    if (!socket) return;

    const handleMessage = (res) => setMessages(res);

    socket.on("message", handleMessage);
    return () => {
      socket.off("message", handleMessage);
    };
  }, [socket]);

  // Listen to "user-details"
  useEffect(() => {
    if (!socket) return;

    const handleUserDetails = (res) => {
      console.log(">>>>>>>>>>>>>>>>>", res);
    };

    socket.on("user-details", handleUserDetails);
    return () => {
      socket.off("user-details", handleUserDetails);
    };
  }, [socket]);

  // Listen to "onlineUser" for active users
  useEffect(() => {
    if (!socket || !userId) return;

    const handleOnlineUser = (res) => setActiveUsers(res);

    socket.on("onlineUser", handleOnlineUser);
    return () => {
      socket.off("onlineUser", handleOnlineUser);
    };
  }, [socket, userId]);

  // Listen to "new-message"
  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (res) => {
      setMessages((prevMessages) => {
        if (prevMessages.findIndex((msg) => msg._id === res._id) !== -1) {
          return prevMessages;
        }
        return [...prevMessages, res];
      });
      form.resetFields();
      setIsMessageSending(false);
    };

    socket.on("new-message", handleNewMessage);
    return () => {
      socket.off("new-message", handleNewMessage);
    };
  }, [socket]);

  // Another `chat-list` with loading state
  useEffect(() => {
    if (!socket || !userId) return;

    setChatListLoading(true);

    const handleChatListLoading = async (res) => {
      setChatData(res);
      setChatListLoading(false);
    };

    socket.on("chat-list", handleChatListLoading);
    return () => {
      socket.off("chat-list", handleChatListLoading);
    };
  }, [socket, userId]);

  // Change seen status
  useEffect(() => {
    if (!socket || !selectedUser?.chatId) return;

    socket.emit("seen", { chatId: selectedUser.chatId }, (res) => {
      if (!res?.success)
        return ErrorModal(res?.message || "Something went wrong!");
    });
  }, [socket, selectedUser?.chatId]);

  // Listen to "io-error"
  useEffect(() => {
    if (!socket) return;

    const handleIoError = (res) => {
      console.log("error res----------", res);
    };

    socket.on("io-error", handleIoError);
    return () => {
      socket.off("io-error", handleIoError);
    };
  }, [socket]);

  // Check if user id is present in search params
  // If present, fetch user info and show input box on the right to send message

  const { data: userRes, isLoading: isUserLoading } = useGetUserByIdQuery(
    receiverId,
    { skip: !receiverId }
  );
  const userFromSearchParam = userRes?.data || {};

  useEffect(() => {
    if (receiverId && !selectedUser?._id) {
      setSelectedUser(userFromSearchParam);
    }
  }, [receiverId, isUserLoading]);

  // ==================== Show loading while getting chat list =================
  // if (chatListLoading) {
  //   return (
  //     <div className="flex h-[80vh] w-full items-center justify-center">
  //       <CustomLoader color="var(--primary-blue)" size={35} stroke={4} />
  //     </div>
  //   );
  // }

  // console.log(
  //   "chatData:----------------------------------...............>>>>>> ",
  //   chatData
  // );

  return (
    <div className="lg:mx-auto">
      <div className="relative z-10 flex flex-col rounded-xl rounded-t-xl border border-t-8 border-t-p1 px-10 py-8 shadow-md lg:flex-row">
        {/* left */}
        <div className="border-opacity-[40%] pr-2 lg:w-[30%] lg:border-r lg:border-gray-300">
          <div className="flex items-end gap-x-5 border-b border-t-black border-opacity-[40%] py-4 text-black">
            <h4 className="text-2xl font-bold">Messages</h4>
            {/* <p className="pb-1 font-semibold">12</p> */}
          </div>

          <div className="mx-auto mb-10 mt-4 w-[95%]">
            {/* Search box */}
            {/* <div className="relative w-[85%] lg:w-full">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2"
                size={20}
              />
              <Input
                className="w-full rounded-xl border px-10 py-6"
                placeholder="Search messages"
              />
            </div> */}

            {/* ================== users list - ============= */}
            <div
              id="scrollableDiv"
              className="scroll-hide mt-8 max-h-[80vh] space-y-5 overflow-auto"
            >
              {chatData?.map((chat, idx) => (
                <>
                  <UserCard
                    key={chat?.chat?._id}
                    user={chat?.chat}
                    message={chat?.message}
                    unreadMessageCount={chat?.unreadMessageCount}
                    selectedUser={selectedUser}
                    setSelectedUser={setSelectedUser}
                    activeUsers={activeUsers}
                    loggedInUserId={userId}
                  />
                  {idx !== chatData?.length - 1 && (
                    <Separator className="!my-0 w-full py-0" />
                  )}
                </>
              ))}
            </div>
          </div>
        </div>

        {/* right */}
        <div className="flex flex-col justify-between lg:flex-grow lg:px-8">
          {!selectedUser?._id ? (
            <div className="flex h-[75vh] items-center justify-center">
              <div className="font-dm-sans flex items-center gap-x-3 text-2xl">
                <PlusCircleIcon size={28} /> Start a conversation
              </div>
            </div>
          ) : (
            <div className="flex flex-col justify-between lg:flex-grow lg:px-8">
              <div className="flex-center-between border-b-primary-black/20 border-b py-3">
                <div className="flex-center-start gap-x-4">
                  <CustomAvatar
                    img={selectedUser?.profile}
                    name={selectedUser?.name}
                    className="border-primary-blue size-12 border"
                  />
                  <div className="lg:flex-grow">
                    <h3 className="text-primary-black text-lg font-bold">
                      {selectedUser?.name}
                    </h3>

                    <div className="flex-center-start gap-x-3">
                      <div className="flex-center-start gap-x-1">
                        {/* Active/Online Indicator */}
                        <div
                          className={cn(
                            "h-2 w-2 rounded-full",
                            activeUsers?.includes(selectedUser?._id)
                              ? "bg-green-500"
                              : "bg-yellow-500"
                          )}
                        />
                        <p className="text-muted-foreground text-xs font-medium">
                          {activeUsers?.includes(selectedUser?._id)
                            ? "Online"
                            : "Offline"}
                        </p>
                      </div>

                      {/* {isReceiverTyping && (
                        <span className="flex-center-start text-primary-black/50 text-sm font-semibold">
                          Typing... <Pencil size={13} className="ml-2" />
                        </span>
                      )} */}
                    </div>
                  </div>
                </div>
              </div>

              {/*==================== Chat messages=================== */}
              <div
                className="hide-scroll max-h-[65vh] min-h-[65vh] overflow-auto py-10"
                ref={chatBoxRef}
              >
                <div>
                  {messages === undefined ? (
                    <div className="flex-center min-h-[65vh] w-full gap-x-2 text-2xl font-bold">
                      <Loader2
                        size={50}
                        className="animate-spin"
                        color="#6b7280"
                      />
                    </div>
                  ) : (
                    <>
                      {messages?.length > 0 ? (
                        <>
                          {messages?.map((msg, index) => (
                            <MessageCard
                              key={msg?._id}
                              message={msg}
                              userId={userId}
                              selectedUser={selectedUser}
                              previousMessage={
                                index > 0 ? messages[index - 1] : null
                              }
                            />
                          ))}
                        </>
                      ) : (
                        <div className="flex-center min-h-[65vh] w-full gap-x-2 text-2xl font-bold">
                          <CirclePlus />
                          <p>Start a conversation</p>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {selectedUser?._id || receiverId ? (
            <MessageForm
              receiverId={selectedUser?._id}
              isMessageSending={isMessageSending}
              setIsMessageSending={setIsMessageSending}
              form={form}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageContainer;

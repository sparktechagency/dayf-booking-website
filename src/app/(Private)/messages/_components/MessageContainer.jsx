import Image from "next/image";
import { Paperclip } from "lucide-react";
import { Send } from "lucide-react";
import userImg from "/public/images/message/user.png";
import user2Img from "/public/images/message/user2.jpg";
import user3Img from "/public/images/message/user3.png";
import { CircleOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import UserCard from "./UserCard";
import ReceiverMsgCard from "./ReceiverMsgCard";
import OwnerMsgCard from "./OwnerMsgCard";

const MessageContainer = () => {
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
                    latestMsg: "omg, this is amazing 🔥",
                  }}
                  active={idx === 1 ? true : false}
                />
              ))}
            </div>
          </div>
        </div>

        {/* right */}
        <div className="flex flex-col justify-between lg:flex-grow lg:px-8">
          <div className="flex items-center justify-between border-b border-opacity-[40%] pb-1">
            <div className="flex items-center gap-x-3">
              <div className="w-[60px]">
                <Image
                  src={userImg}
                  alt="user image"
                  className="aspect-square w-full rounded-full"
                />
              </div>

              <div className="lg:flex-grow">
                <h3 className="text-xl font-semibold text-black">
                  Elmer Laverty
                </h3>

                <div className="mt-1 flex items-center gap-x-2">
                  {/* Active/Online Indicator */}
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  <p className="border-t-black text-black">Online</p>
                </div>
              </div>
            </div>

            <button className="flex items-center gap-x-2">
              <CircleOff size={20} color="#d55758" />
              <p className="text-xl text-black">Block</p>
            </button>
          </div>

          <div className="max-h-full space-y-8 overflow-hidden pt-8">
            <div className="flex items-start gap-x-4">
              <Image
                src={userImg}
                alt="user's image"
                className="h-[50px] w-[50px] rounded-full"
              />
              <div className="max-w-[50%] space-y-3 overflow-hidden">
                <ReceiverMsgCard message={"omg, this is amazing"} />
                <ReceiverMsgCard message={"Lorem ipsum dolor sit amet"} />
                <ReceiverMsgCard
                  message={
                    "omg, thi perspiciatis consectetur mollitia laboriosam itaque enim officia aut nemo quibusdam?"
                  }
                />
              </div>
            </div>

            <div className="flex flex-row-reverse items-start gap-x-4">
              <Image
                src={user2Img}
                alt="user's image"
                className="h-[50px] w-[50px] rounded-full"
              />
              <div className="flex max-w-[50%] flex-col items-end space-y-3">
                <OwnerMsgCard message={"How are you?"} />
                <OwnerMsgCard
                  message={
                    "Lorem ipsum dolor sit... I'll be there in 2 mins ⏰ "
                  }
                />
              </div>
            </div>

            <div className="flex items-start gap-x-4">
              <Image
                src={userImg}
                alt="user's image"
                className="h-[50px] w-[50px] rounded-full"
              />
              <div className="max-w-[50%] space-y-3">
                <ReceiverMsgCard message={"omg, this is amazing"} />
                <ReceiverMsgCard message={"Lorem ipsum dolor sit amet"} />
                <ReceiverMsgCard
                  message={
                    "omg, thi perspiciatis consectetur mollitia laboriosam itaque enim officia aut nemo quibusdam?"
                  }
                />
              </div>
            </div>
          </div>

          <div className="mt-10 flex w-full items-center gap-x-4">
            <Paperclip role="button" size={18} />

            <div className="flex w-full items-center gap-x-4">
              <Input
                size="large"
                placeholder="Type a message"
                type="text"
                className="w-full rounded-3xl border px-4 py-6"
              />

              <Button
                variant="primary"
                className="aspect-square h-10 rounded-full"
              >
                <Send />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageContainer;

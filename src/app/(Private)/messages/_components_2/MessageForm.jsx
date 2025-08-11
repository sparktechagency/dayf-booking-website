"use client";

import { Images, Loader, X, Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "@/redux/features/authSlice";
import { useSocket } from "@/context/SocketCOntextApi";
import { ErrorModal } from "@/utils/customModal";
import { useUploadImageMutation } from "@/redux/api/messageApi";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function MessageForm({
  receiverId,
  isMessageSending,
  setIsMessageSending
}) {
  const [messageText, setMessageText] = useState("");
  const [images, setImages] = useState([]);
  const [imgPreviews, setImgPreviews] = useState([]);
  const user = useSelector(selectUser);
  const { socket } = useSocket();
  const fileInputRef = useRef(null);
  const messageInputRef = useRef(null);
  const [fileUploadFn] = useUploadImageMutation();

  // Handle file selection and preview generation
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files || []);
    setImages(files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setImgPreviews(previews);
  };

  // Clean up object URLs to prevent memory leaks
  useEffect(() => {
    return () => {
      imgPreviews.forEach((preview) => URL.revokeObjectURL(preview));
    };
  }, [imgPreviews]);

  // Handle file input click
  const handleFileInputClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Handle message sending
  const handleSendMessage = async (e) => {
    e.preventDefault();
    setIsMessageSending(true);
    const text = messageText.trim();

    if (!text && !images.length) {
      setIsMessageSending(false);
      return;
    }

    const payload = {
      text,
      imageUrl: [],
      receiver: receiverId,
      sender: user?.userId || ""
    };

    try {
      if (images.length > 0) {
        const formData = new FormData();
        images.forEach((image) => {
          formData.append("images", image);
        });
        const res = await fileUploadFn(formData).unwrap();
        // ==========Only extract image URLs
        const extractedUrls = res?.data?.images?.map((img) => img.url) || [];

        payload.imageUrl = extractedUrls;
      }

      console.log("🚀 ~ handleSendMessage ~ payload:", payload);

      if (!socket) {
        ErrorModal("Socket not connected");
        setIsMessageSending(false);
        return;
      }

      socket.emit("send-message", payload, (res) => {
        console.log("🚀 ~ handleSendMessage ~ res:", res);
        if (!res?.success) {
          ErrorModal(res?.message || "Something went wrong!");
        }
        setMessageText("");
        setIsMessageSending(false);
        setImgPreviews([]);
        setImages([]);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      });
    } catch (error) {
      ErrorModal(error?.data?.message || "Failed to send message");
      setIsMessageSending(false);
    }
  };

  // Handle image removal
  const handleRemoveImages = () => {
    imgPreviews.forEach((preview) => URL.revokeObjectURL(preview));
    setImages([]);
    setImgPreviews([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const isSendButtonDisabled =
    isMessageSending || (!messageText.trim() && !images.length);

  return (
    <div className="relative w-full">
      {imgPreviews?.length > 0 && (
        <div className="absolute bottom-full left-0 right-0 mb-2 rounded-2xl border border-gray-200 bg-white p-2 shadow-sm">
          <button
            className="absolute -right-2 -top-2 z-10 rounded-full bg-red-500 p-1 text-white shadow-md transition-colors hover:bg-red-600"
            onClick={handleRemoveImages}
            aria-label="Remove all images"
          >
            <X size={16} />
          </button>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {imgPreviews?.map((imgPreview, index) => (
              <div
                key={`preview-${index}`}
                className="relative w-full overflow-hidden rounded-lg border border-gray-200 p-1"
              >
                <Image
                  src={imgPreview || "/placeholder.svg"}
                  alt={`image preview ${index}`}
                  height={120}
                  width={120}
                  className="mx-auto block h-[120px] w-full rounded-md object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      <form
        onSubmit={handleSendMessage}
        className="flex w-full items-center gap-x-2 border-t border-gray-200 bg-white p-2"
      >
        <input
          ref={messageInputRef}
          type="text"
          placeholder="Type a message"
          autoComplete="off"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          className="flex-grow rounded-full border border-gray-300 px-4 py-2 focus-visible:ring-transparent focus-visible:ring-offset-0"
          disabled={isMessageSending}
        />

        <input
          type="file"
          ref={fileInputRef}
          multiple={true}
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          disabled={isMessageSending}
          onClick={handleFileInputClick}
          className="rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-700 disabled:pointer-events-none disabled:opacity-50"
          aria-label="Attach images"
        >
          <Images size={20} />
        </Button>

        <Button
          type="submit"
          size="icon"
          disabled={isSendButtonDisabled}
          className="aspect-square rounded-full bg-blue-500 text-white shadow-none hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-gray-400 disabled:opacity-60"
          aria-label="Send message"
        >
          {isMessageSending ? (
            <Loader className="h-5 w-5 animate-spin" />
          ) : (
            <Send className="h-5 w-5" />
          )}
        </Button>
      </form>
    </div>
  );
}

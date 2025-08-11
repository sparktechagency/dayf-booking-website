"use client";

import { Image } from "antd";

const ReceiverMsgCard = ({ message }) => {
  console.log("🚀 ~ ReceiverMsgCard ~ message:", message);
  return (
    <div className="my-2 rounded-lg border bg-p1 px-3 py-2 text-white max-w-max">
      {/* Display text if it exists */}
      {message?.text && <p className="text-primary-black">{message.text}</p>}
      {/* Display images if they exist */}
      {message?.imageUrl && message.imageUrl.length > 0 && (
        <div className="flex flex-col gap-2">
          {message.imageUrl.map((url, index) => (
            <Image
              key={index}
              src={url}
              alt={`Message image ${index + 1}`}
              className="max-w-xs rounded-lg"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ReceiverMsgCard;
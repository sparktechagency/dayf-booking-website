import { Image } from "antd";
import { CheckCheck } from "lucide-react";

const OwnerMsgCard = ({ message }) => {
  console.log("🚀 ~ OwnerMsgCard ~ message:", message);
  return (
    <div className="my-2 flex justify-end">
      <div className="max-w-[70%] rounded-lg bg-gray-200 p-1 px-3 text-white">
        {message?.text && (
          <p className="min-w-[100px] text-sm text-gray-900">{message.text}</p>
        )}
        {message?.imageUrl && message.imageUrl.length > 0 && (
          <div className="mt-2">
            {message.imageUrl.map((url, index) => (
              <Image
                key={index}
                src={url}
                alt={`Message image ${index + 1}`}
                className="mt-1 max-h-40 w-auto rounded-lg object-cover"
              />
            ))}
          </div>
        )}
        <div className="flex items-center justify-end text-xs opacity-80">
          {message?.seen ? (
            <span className="text-green-500">
              <CheckCheck color="green" size={14} />
            </span>
          ) : (
            <span className="text-gray-500">
              <CheckCheck size={14} />
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default OwnerMsgCard;

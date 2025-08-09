import textTruncate from "@/utils/textTruncate";
import calculateTimeAgo from "@/utils/calculateTimeAgo";
import CustomAvatar from "@/components/CustomAvatar/CustomAvatar";

const UserCard = ({
  user,
  message,
  selectedUser,
  setSelectedUser,
  activeUsers,
  loggedInUserId,
  unreadMessageCount
}) => {
  const userData = { ...user?.participants[0], chatId: user?._id };

  const isActive = activeUsers?.includes(userData?._id);

  return (
    <div
      role="button"
      onClick={() => setSelectedUser(userData)}
      className={`flex cursor-pointer items-center gap-x-3 rounded-lg px-2 py-3 transition-all duration-300 ease-in-out hover:bg-blue-200 ${
        selectedUser?._id === userData?._id && "bg-blue-200 !font-bold"
      }`}
    >
      <div className="relative">
        <CustomAvatar
          img={userData?.profile}
          name={userData?.name}
          className={`size-[50px] border-2 border-white ${selectedUser?._id === userData?._id && "border-p1"}`}
        />

        {isActive && (
          <div className="absolute bottom-0.5 right-1 size-2.5 rounded-full bg-green-500" />
        )}
      </div>

      <div className="flex-grow">
        <div className="mb-0.5 flex items-center justify-between">
          <h4 className="text-lg font-medium capitalize text-black">
            {userData?.name}
          </h4>
          {selectedUser?._id !== userData?._id && (
            <p className="text-secondary-2 text-xs text-gray-500">
              {calculateTimeAgo(message?.createdAt)}
            </p>
          )}
          {unreadMessageCount > 0 && selectedUser?._id !== userData?._id && (
            <span className="flex size-5 items-center justify-center rounded-full bg-blue-500 text-xs font-semibold text-white">
              {unreadMessageCount}
            </span>
          )}
        </div>

        {!message?.seen &&
          userData?._id !== selectedUser?._id &&
          message?.sender !== loggedInUserId && (
            <p className="text-xs font-semibold">
              {textTruncate(message?.text, 40)}
            </p>
          )}
      </div>
    </div>
  );
};

export default UserCard;

import Image from "next/image";

const UserCard = ({ user, active }) => {
  const { img, name, latestMsg } = user;

  return (
    <div
      className={`flex gap-x-4 px-2 py-3 ${active ? "rounded-xl bg-p1 text-white" : ""}`}
    >
      <div className="w-[16%]">
        <Image src={img} alt={name} className="w-full rounded-full" />
      </div>

      <div className="flex-grow space-y-1">
        <div className="flex items-center justify-between">
          <h4 className="text-primary-black text-xl font-medium">{name}</h4>
          {!active && (
            <p className="text-sm font-medium text-gray-500">12m ago</p>
          )}
        </div>
        <p className="text-ellipsis">{latestMsg}</p>
      </div>
    </div>
  );
};

export default UserCard;

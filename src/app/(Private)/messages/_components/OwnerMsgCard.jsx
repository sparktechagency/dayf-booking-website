const OwnerMsgCard = ({ message }) => {
  return (
    <div className="max-w-max rounded-3xl border bg-gray-200 px-3 py-2">
      <p className="text-primaryWhite">{message}</p>
    </div>
  );
};

export default OwnerMsgCard;

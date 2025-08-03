const ReceiverMsgCard = ({ message }) => {
  return (
    <div className="rounded-3xl border bg-p1 px-3 py-2 text-white first-letter:max-w-max">
      <p className="text-primary-black">{message}</p>
    </div>
  );
};

export default ReceiverMsgCard;

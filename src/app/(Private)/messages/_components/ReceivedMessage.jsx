const ReceivedMessage = ({ message }) => {
  return (
    <div className="max-w-max rounded-md bg-[#3d3737] px-3 py-2">
      <p className="text-primaryWhite">{message}</p>
    </div>
  );
};

export default ReceivedMessage;

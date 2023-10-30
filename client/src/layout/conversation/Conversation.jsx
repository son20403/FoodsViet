const Conversation = () => {
  return (
    <div className="flex items-center p-2.5 cursor-pointer hover:bg-gray-200">
      <img
        src="https://source.unsplash.com/random"
        alt=""
        className="w-10 h-10 rounded-[50%] mr-5"
      />
      <span className="font-medium">Chương</span>
    </div>
  );
};

export default Conversation;

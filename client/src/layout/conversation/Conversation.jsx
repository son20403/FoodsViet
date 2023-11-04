import { useSelector } from "react-redux";

const Conversation = ({ conversation }) => {
  const { infoAuth } = useSelector((state) => state.auth);
  const { customers } = useSelector((state) => state.customers);
  const friendId = conversation?.members.find((m) => m !== infoAuth._id);
  const friend = customers.find((f) => f._id === friendId);

  return (
    <div className="flex items-center p-2.5 cursor-pointer hover:bg-gray-200">
      <img src={friend.image} alt="" className="w-10 h-10 rounded-[50%] mr-5" />
      <div className="flex flex-col">
        <span className="font-bold">{friend.full_name}</span>
        <p className="line-clamp-1">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Provident
          aut eaque magni omnis, voluptates a numquam ratione enim hic! Odit
          dolor cumque eos? Aperiam magnam delectus atque est id vel.
        </p>
      </div>
    </div>
  );
};

export default Conversation;

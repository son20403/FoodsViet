import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Conversation = ({ conversation, messages, online, children, unRead }) => {
  const { infoAuth } = useSelector((state) => state.auth);
  const { customers } = useSelector((state) => state.customers);
  const [lastestMessage, setLastestMessage] = useState(null);
  const friendId = conversation?.members?.find((m) => m !== infoAuth._id);
  const friend = customers.find((f) => f._id === friendId);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8989/messages/" + conversation?._id
        );
        const lastIndex = res.data.length - 1;

        setLastestMessage(res.data[lastIndex]);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [messages]);

  return (
    <div className="flex items-center p-2.5 cursor-pointer hover:bg-gray-200">
      <img
        src={friend?.image}
        alt=""
        className="w-10 h-10 rounded-[50%] mr-5"
      />
      <div className="relative flex flex-col w-full">
        <span className="font-bold">{friend?.full_name}</span>
        {children && <p className="line-clamp-1">{children}</p>}
        {!children && (
          <p className="line-clamp-1">
            {lastestMessage?.sender === infoAuth?._id ? "Bạn: " : ""}
            {lastestMessage?.text}
          </p>
        )}
        {online && (
          <div className="absolute w-3 h-3 bg-green-600 rounded-full bottom-1 -left-8"></div>
        )}
        {unRead && (
          <div className="absolute right-0 w-3 h-3 -translate-y-1/2 bg-blue-600 rounded-full top-1/2"></div>
        )}
      </div>
    </div>
  );
};

export default Conversation;

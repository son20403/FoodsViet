import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Conversation = ({
  conversation,
  messages,
  online,
  children,
  unRead,
  userId,
}) => {
  const { infoAuth } = useSelector((state) => state.auth);
  const { customers } = useSelector((state) => state.customers);
  const [lastestMessage, setLastestMessage] = useState(null);
  const friendId = conversation?.members?.find((m) => m !== infoAuth._id);
  let friend = {};
  friendId
    ? (friend = customers.find((f) => f._id === friendId))
    : (friend = customers.find((f) => f._id === userId));

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

  if (children) {
    return (
      <NavLink
        className={
          "flex items-center p-2.5 cursor-pointer transition-all duration-300"
        }
      >
        <img
          src={friend?.image}
          alt=""
          className="w-10 h-10 rounded-[50%] mr-5"
        />
        <div className="relative flex flex-col w-full flex-1">
          <span className="font-bold ">{friend?.full_name}</span>
          {children && <p className="line-clamp-1">{children}</p>}
          {!children && (
            <p className="line-clamp-1 ">
              {lastestMessage?.sender === infoAuth?._id ? "Bạn: " : null}
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
      </NavLink>
    );
  }

  return (
    <NavLink
      to={`/message/${conversation.members.find((m) => m !== infoAuth._id)}`}
      className={({ isActive }) =>
        isActive
          ? "bg-[#EBF5FF] flex items-center md:justify-start justify-center py-2.5 md:p-2.5 cursor-pointer  transition-all duration-300 rounded"
          : "hover:bg-gray-200 flex items-center md:justify-start justify-center py-2.5 md:p-2.5 cursor-pointer transition-all duration-300 rounded"
      }
    >
      <div className="flex-shrink-0 w-10 h-10 md:mr-5">
        <img
          src={friend?.image}
          alt=""
          className="object-cover rounded-[50%]  w-full h-full"
        />
      </div>
      <div className="relative flex-col hidden w-full md:flex">
        <span className="hidden font-bold sm:block whitespace-nowrap">
          {friend?.full_name}
        </span>
        {children && <p className="line-clamp-1">{children}</p>}
        {!children && (
          <p className="hidden md:line-clamp-1 md:block">
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
    </NavLink>
  );
};

export default Conversation;

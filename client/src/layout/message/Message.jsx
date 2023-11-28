import React from "react";
import { useSelector } from "react-redux";
import { format } from "timeago.js";

const Message = ({ own, message }) => {
  const { customers } = useSelector((state) => state.customers);
  const user = customers.find((u) => u._id === message.sender);
  return (
    <div className={`flex flex-col  ${own ? "items-end" : ""} `}>
      <div
        className={`flex ${own ? "flex-row-reverse" : ""} items-center gap-x-3`}
      >
        <img
          src={user?.image}
          className="object-cover w-8 h-8 rounded-full"
          alt=""
        />
        <div
          className={`p-2.5 text-white md:max-w-[350px] max-w-[300px] my-2.5 ${
            own
              ? "bg-[#1877f2] rounded-tl-xl rounded-tr-xl rounded-bl-xl"
              : "bg-gray-500 rounded-tl-xl rounded-tr-xl rounded-br-xl"
          }`}
        >
          <p className="pb-2 text-base break-words">{message?.text}</p>

          <div className="text-xs">{format(message.createdAt)}</div>
        </div>
      </div>
    </div>
  );
};

export default Message;

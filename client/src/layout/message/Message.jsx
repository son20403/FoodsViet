import React from "react";
import { useSelector } from "react-redux";
import { format } from "timeago.js";

const Message = ({ own, message }) => {
  const { customers } = useSelector((state) => state.customers);
  const user = customers.find((u) => u._id === message.sender);
  return (
    <div className={`flex flex-col ${own ? "items-end" : ""}`}>
      <div
        className={`flex ${own ? "flex-row-reverse" : ""} items-center gap-x-3`}
      >
        <img
          src={user?.image}
          className="object-cover w-8 h-8 rounded-full"
          alt=""
        />
        <p
          className={`p-2.5 rounded-2xl text-white md:max-w-[350px] max-w-[300px] ${own ? "bg-[#1877f2]" : "bg-gray-500"
            }`}
        >
          {message?.text}
        </p>
      </div>
      <div className="text-xs my-2.5 text-black">
        {format(message.createdAt)}
      </div>
    </div>
  );
};

export default Message;

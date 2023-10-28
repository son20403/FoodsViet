import React from "react";

const Message = ({ own }) => {
  return (
    <div className={`flex flex-col ${own ? "items-end" : ""}`}>
      <div
        className={`flex ${own ? "flex-row-reverse" : ""} items-center gap-x-3`}
      >
        <img
          src="https://source.unsplash.com/random"
          className="object-cover w-8 h-8 rounded-full"
          alt=""
        />
        <p
          className={`p-2.5 rounded-2xl text-white md:max-w-[350px] max-w-[300px] ${
            own ? "bg-gray-500" : "bg-[#1877f2]"
          }`}
        >
          Hello this is a message Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Accusamus inventore dolorum natus voluptatem
          consequuntur ipsam aliquam ducimus id aperiam, magni aliquid velit,
          officia rerum quo molestiae nobis? Velit, vitae molestiae.
        </p>
      </div>
      <div className="text-xs my-2.5 text-black">1 hour ago</div>
    </div>
  );
};

export default Message;

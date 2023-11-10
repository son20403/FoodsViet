import { useEffect, useRef, useState } from "react";
import ChatOnline from "../layout/chatOnline/ChatOnline";
import Conversation from "../layout/conversation/Conversation";
import Message from "../layout/message/Message";
import axios from "axios";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  InformationCircleIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/solid";

const MessagePage = () => {
  const { infoAuth } = useSelector((state) => state.auth);
  const { customers } = useSelector((state) => state.customers);
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  console.log("🚀 --> MessagePage --> arrivalMessage:", arrivalMessage);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useRef();
  const scrollRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  let chatted = {};
  const user = customers.find((c) => c._id === id);

  useEffect(() => {
    chatted = conversations?.filter((conversation) =>
      conversation.members.find((m) => m === id)
    );
    console.log("🚀 --> useEffect --> chatted:", chatted);
    if (chatted.length > 0) {
      setCurrentChat(chatted[0]);
    }
  }, [id, conversations]);
  useEffect(() => {
    socket.current = io("http://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat._id]);

  useEffect(() => {
    socket.current.emit("addUser", infoAuth._id);
    socket.current.on("getUsers", (users) => {
      // setOnlineUsers(
      //   infoAuth.followings.filter((f) => users.some((u) => u.userId === f))
      // );
    });
  }, [infoAuth]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8989/conversations/" + infoAuth._id
        );
        setConversations(res.data);
        console.log("object");
        // setCurrentChat(res.data[0]);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [newMessage, arrivalMessage]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8989/messages/" + currentChat?._id
        );
        setMessages(res.data);

        if (currentChat?._id) {
          navigate(
            `/message/${currentChat?.members?.find((c) => c !== infoAuth._id)}`
          );
        } else {
          navigate(`/message/${id}`);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat._id, newMessage, arrivalMessage]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let message = {};

    if (currentChat._id) {
      message = {
        sender: infoAuth._id,
        text: newMessage,
        conversationId: currentChat._id,
      };

      const receiverId = currentChat.members.find(
        (member) => member !== infoAuth._id
      );

      socket.current.emit("sendMessage", {
        senderId: infoAuth._id,
        receiverId,
        text: newMessage,
      });
    } else {
      const createConversation = {
        senderId: infoAuth._id,
        receiverId: id,
      };
      const res = await axios.post(
        "http://localhost:8989/conversations/",
        createConversation
      );
      // console.log("🚀 --> handleSubmit --> res:", res.data);
      message = {
        sender: infoAuth._id,
        text: newMessage,
        conversationId: res.data[0]._id,
      };
      // setCurrentChat(res.data[0]);
    }

    try {
      const res = await axios.post("http://localhost:8989/messages", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    <div className="min-h-screen mt-[56px] flex">
      <div className="md:w-3/12 menu p-2.5 border-r">
        <div className="h-16">
          <h1 className="text-2xl font-bold">Chat</h1>
        </div>

        <div className="h-full chatmenuwrap">
          <input
            type="text"
            placeholder="search ..."
            className="chatmenu mb-5 w-[90%] py-2.5 border-b border-b-gray-500"
          />
          <div className="overflow-y-auto h-[550px]">
            {conversations.map((c, index) => (
              <Conversation
                key={index}
                conversation={c}
                online={true}
                messages={messages}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="md:w-7/12 box">
        {currentChat._id ? (
          <div className="boxwrapper p-2.5 text-white">
            <div className="flex items-center justify-between h-16 text-black border-b-[1px] px-2.5">
              <div className="">
                <Conversation conversation={currentChat} online={true}>
                  Đang hoạt động
                </Conversation>
              </div>
              <div className="p-2 rounded-full cursor-pointer hover:bg-blue-gray-200">
                <InformationCircleIcon className="w-6 h-6 text-blue-700" />
              </div>
            </div>
            <div className="h-[506px] overflow-y-auto pr-2.5">
              {messages.map((m, index) => (
                <div ref={scrollRef} key={index}>
                  <Message message={m} own={m.sender === infoAuth._id} />
                </div>
              ))}
            </div>
            {/* <div className="flex items-center mt-5 chatBottom gap-x-3">
              <textarea
                name=""
                placeholder="nhập tin nhắn..."
                className="text-black"
                id=""
                cols="90"
                onChange={(e) => setNewMessage(e.target.value)}
                value={newMessage}
                // rows="10"
              ></textarea>
              <button
                className="py-5 bg-blue-600 rounded-lg px-9"
                onClick={handleSubmit}
              >
                Send
              </button>
            </div> */}
          </div>
        ) : (
          <div>
            {chatted[0]?._id ? null : (
              <div className="flex flex-col items-center justify-center text-center">
                <div className="w-10 h-10 overflow-hidden rounded-full">
                  <img
                    src={user?.image}
                    alt=""
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="">{user?.full_name}</div>
              </div>
            )}
          </div>
        )}
        <div className="flex items-center mt-5 chatBottom gap-x-3 p-2.5">
          <textarea
            name=""
            placeholder="nhập tin nhắn..."
            className="p-3 text-black border outline-none md:w-full rounded-3xl"
            id=""
            onChange={(e) => setNewMessage(e.target.value)}
            value={newMessage}
            rows="1"
          ></textarea>
          <button
            className="px-3 py-2 bg-blue-600 rounded-lg"
            onClick={handleSubmit}
          >
            <PaperAirplaneIcon className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>
      <div className="hidden md:w-3/12 onlien md:block">
        <div className="chatonlienwrapper p-2.5  h-full">
          <ChatOnline />
          <ChatOnline />
          <ChatOnline />
        </div>
      </div>
    </div>
  );
};

export default MessagePage;

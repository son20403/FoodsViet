import { useEffect, useRef, useState } from "react";
import ChatOnline from "../layout/chatOnline/ChatOnline";
import Conversation from "../layout/conversation/Conversation";
import Message from "../layout/message/Message";
import axios from "axios";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";

const MessagePage = () => {
  const { infoAuth } = useSelector((state) => state.auth);
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useRef();
  const scrollRef = useRef();

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
  }, [arrivalMessage, currentChat]);

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
        setCurrentChat(res.data[0]);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [infoAuth._id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8989/messages/" + currentChat?._id
        );
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
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
      <div className="md:w-3/12 menu">
        <div className="chatmenuwrap p-2.5 h-full">
          <input
            type="text"
            placeholder="search ..."
            className="chatmenu mb-5 w-[90%] py-2.5 border-b border-b-gray-500"
          />
          <div className="overflow-y-auto h-[550px]">
            {conversations.map((c, index) => (
              <div onClick={() => setCurrentChat(c)} key={index}>
                <Conversation conversation={c} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="md:w-7/12 box">
        <div className="boxwrapper p-2.5 text-white">
          <div className="h-[560px] overflow-y-auto pr-2.5">
            {messages.map((m) => (
              <div ref={scrollRef} key={m._id}>
                <Message message={m} own={m.sender === infoAuth._id} />
              </div>
            ))}
          </div>
          <div className="flex items-center mt-5 chatBottom gap-x-3">
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
          </div>
        </div>
      </div>
      <div className="md:w-3/12 onlien">
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

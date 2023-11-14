import { useEffect, useRef, useState } from "react";
import Conversation from "../layout/conversation/Conversation";
import Message from "../layout/message/Message";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  useNavigate,
  useParams,
} from "react-router-dom";
import {
  InformationCircleIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/solid";
import Logo from "../components/logo/Logo";

const MessagePage = () => {
  const { infoAuth } = useSelector((state) => state.auth);
  const { customers } = useSelector((state) => state.customers);
  const { socket } = useSelector((state) => state.global);
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  // console.log("🚀 --> MessagePage --> arrivalMessage:", arrivalMessage);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const scrollRef = useRef();
  const navigate = useNavigate();
  let { id } = useParams();
  if (!id) {
    id = "";
  }

  console.log("🚀 ~ file: MessagePage.jsx:34 ~ MessagePage ~ conversations:", conversations[0])
  let chatted = {};
  const user = customers.find((c) => c._id === id);

  useEffect(() => {
    chatted = conversations?.filter((conversation) =>
      conversation.members.find((m) => m === id)
    );
    if (chatted.length > 0) {
      setCurrentChat(chatted[0]);
    }
  }, [id, conversations]);
  useEffect(() => {
    socket?.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, [socket]);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members?.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat._id]);

  useEffect(() => {
    socket?.emit("addUser", infoAuth._id);
    socket?.on("getUsers", (users) => {
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
        // console.log("object");
        // setCurrentChat(res.data[0]);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [arrivalMessage, currentChat._id]);

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
  }, [currentChat._id, arrivalMessage]);

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

      socket?.emit("sendMessage", {
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
    <div className="flex min-h-screen ">
      <div className="w-2/12 md:w-3/12 menu p-2.5 border-r">
        <div className="">
          <h1 className="text-2xl font-bold">
            <Logo>FOOSVIET</Logo>
          </h1>
        </div>
        <div className="">
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
      <section className="relative w-10/12 md:w-9/12">
        {id ? (
          <div className="flex items-center justify-between h-16 text-black border-b-[1px] px-2.5">
            <div className="flex-1">
              <Conversation
                conversation={currentChat}
                online={true}
                userId={id}
              >
                Đang hoạt động
              </Conversation>
            </div>
            <div className="p-2 rounded-full cursor-pointer hover:bg-blue-gray-200">
              <InformationCircleIcon className="w-6 h-6 text-blue-700" />
            </div>
          </div>
        ) : (
          <div className="grid h-full place-content-center place-items-center">
            <div className="h-[180px] w-[244px] bg-[length:248px_390px] bg-[url('https://static.xx.fbcdn.net/rsrc.php/v3/yI/r/rT65reXCYoG.png')]"></div>
            <h1 className="text-2xl font-bold">Chưa chọn đoạn chat nào</h1>
          </div>
        )}

        {currentChat._id ? (
          <div className="boxwrapper p-2.5 text-white">
            <div className="h-[530px] md:h-[550px] overflow-y-auto overflow-x-hidden pr-5">
              {messages.map((m, index) => (
                <div ref={scrollRef} key={index}>
                  <Message message={m} own={m.sender === infoAuth._id} />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            {chatted[0]?._id || !id ? null : (
              <div className="flex flex-col items-center justify-center pt-10 text-center">
                <div className="w-[60px] h-[60px] overflow-hidden rounded-full">
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
        {id ? (
          <form
            onSubmit={handleSubmit}
            className="flex items-center mt-5 chatBottom gap-x-3 p-2.5 absolute bottom-0 w-full"
          >
            <input
              name=""
              placeholder="nhập tin nhắn..."
              className="w-full p-3 text-black border outline-none rounded-3xl"
              id=""
              cols="85"
              onChange={(e) => setNewMessage(e.target.value)}
              value={newMessage}
              rows="1"
            ></input>
            <button
              className="px-3 py-2 bg-blue-600 rounded-lg"
              disabled={newMessage.length > 0 ? false : true}
              type="submit"
            >
              <PaperAirplaneIcon className="w-6 h-6 text-white" />
            </button>
          </form>
        ) : null}
      </section>
    </div>
  );
};

export default MessagePage;

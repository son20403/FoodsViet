import { useEffect, useRef, useState } from "react";
import Conversation from "../layout/conversation/Conversation";
import Message from "../layout/message/Message";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  InformationCircleIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/solid";
import Logo from "../components/logo/Logo";
import { query } from "../axios-interceptor/query-api";

const MessagePage = () => {
  const { infoAuth } = useSelector((state) => state.auth);
  const { customers } = useSelector((state) => state.customers);
  const { socket } = useSelector((state) => state.global);
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [unRead, setUnRead] = useState([]);
  const scrollRef = useRef();
  const socket2 = useRef();

  const navigate = useNavigate();
  let { id } = useParams();
  if (!id) {
    id = "";
  }

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
    socket?.on("getNotification", (data) => {
      const isChatOpen = currentChat?.members?.some(
        (id) => id === data.senderId
      );
      if (isChatOpen) {
        setNotifications((prev) => [{ ...data, isRead: true }, ...prev]);
      } else {
        setNotifications((prev) => [data, ...prev]);
      }
    });
    return () => {
      socket?.off("getMessage");
      socket?.off("getNotification");
    };
  }, [socket, currentChat]);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members?.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat._id]);

  // useEffect(() => {
  //   // socket?.emit("addUser", infoAuth._id);
  //   socket?.on("getUsers", (users) => {
  //     // setOnlineUsers(
  //     //   infoAuth.followings.filter((f) => users.some((u) => u.userId === f))
  //     // );
  //   });
  // }, [infoAuth]);
  const getConversations = async () => {
    try {
      const res = await query().messenger.getConversations(infoAuth._id);
      setConversations(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getConversations();
  }, [arrivalMessage, currentChat._id, newMessage]); //newMessage

  useEffect(() => {
    setTimeout(() => {
      const getMessages = async () => {
        try {
          const res = await query().messenger.getMessages(currentChat?._id);
          setMessages(res.data);
          if (currentChat?._id) {
            navigate(
              `/message/${currentChat?.members?.find(
                (c) => c !== infoAuth._id
              )}`
            );
            // const r = await axios.put(
            //   "http://localhost:8989/messages/" + currentChat?._id
            // );
          } else {
            navigate(`/message/${id}`);
          }
        } catch (err) {
          console.log(err);
        }
      };
      getMessages();
    }, 500);
  }, [currentChat._id, newMessage, arrivalMessage]); //newMessage,

  const handleSubmit = async (e) => {
    e.preventDefault();
    let message = {};

    if (currentChat._id) {
      message = {
        sender: infoAuth._id,
        text: newMessage,
        conversationId: currentChat._id,
        isRead: infoAuth._id,
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
      const res = await query().messenger.creteConversation(createConversation);
      message = {
        sender: infoAuth._id,
        text: newMessage,
        conversationId: res.data[0]._id,
        isRead: infoAuth._id,
      };
    }

    try {
      const res = await query().messenger.createMessage(message);
      // const res = await axios.post("http://localhost:8989/messages", message);
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
          <div className="overflow-y-auto overflow-x-hidden h-[550px]">
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
            <div className="h-[180px] w-[244px] bg-[length:248px_390px] bg-[url('https://static.xx.fbcdn.net/rsrc.php/v3/yI/r/rT65reXCYoG.png')] "></div>
            <h1 className="text-2xl font-bold">Chưa chọn đoạn chat nào</h1>
          </div>
        )}

        {currentChat._id ? (
          <div className="boxwrapper p-2.5 text-white bg-[url('https://svgshare.com/i/jyv.svg')] bg-no-repeat bg-cover">
            <div className="h-[530px] md:h-[590px] overflow-y-auto overflow-x-hidden pr-5">
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

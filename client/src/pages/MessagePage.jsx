import ChatOnline from "../layout/chatOnline/ChatOnline";
import Conversation from "../layout/conversation/Conversation";
import Message from "../layout/message/Message";

const MessagePage = () => {
  return (
    <div className="min-h-screen mt-[56px] flex">
      <div className="flex-[3.5] menu">
        <div className="chatmenuwrap p-2.5 h-full">
          <input
            type="text"
            placeholder="search ..."
            className="chatmenu mb-5 w-[90%] py-2.5 border-b border-b-gray-500"
          />
          <Conversation></Conversation>
          <Conversation></Conversation>
          <Conversation></Conversation>
          <Conversation></Conversation>
        </div>
      </div>
      <div className="flex-[5.5] box">
        <div className="boxwrapper p-2.5 text-white">
          <div className="h-[100vh] overflow-y-auto pr-2.5">
            <Message />
            <Message own={true} />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
          </div>
          <div className="flex items-center mt-5 chatBottom gap-x-3">
            <textarea
              name=""
              placeholder="nhập tin nhắn..."
              className="text-black"
              id=""
              cols="90"
              // rows="10"
            ></textarea>
            <button className="py-5 bg-blue-600 rounded-lg px-9">Send</button>
          </div>
        </div>
      </div>
      <div className="flex-[3] onlien">
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

import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import { useChatStore } from "../store/useChatStore";

import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";

const ChatPage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="h-screen bg-base-200 relative">
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            <Sidebar />

            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>

      {/* Left-Pointing Arrow Container */}
      <Link
        to="/"
        className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition duration-300"
      >
        <div className="arrow"></div>
      </Link>
    </div>
  );
};

export default ChatPage;

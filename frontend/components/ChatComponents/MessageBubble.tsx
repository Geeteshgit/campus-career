import React from "react";
import { Message } from "./ChatContainer";

const MessageBubble = ({ msg }: { msg: Message }): React.JSX.Element => {
  const isUser = msg.senderId === "676f3d92c15e212bd836aa12"; // Replace with actual user ID

  return (
    <div className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}>
      <div
        className={`px-4 py-2 rounded-2xl max-w-[70%] lg:max-w-[50%] shadow-sm ${
          isUser
            ? "bg-blue-500 text-white rounded-tr-none"
            : "bg-blue-50 text-neutral-900 border border-neutral-300 rounded-tl-none"
        }`}
      >
        <p>{msg.message}</p>
      </div>

      <span
        className={`text-xs mt-1 ${
          isUser ? "text-blue-500 text-right" : "text-neutral-600 text-left"
        }`}
      >
        {new Date(msg.createdAt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </span>
    </div>
  );
};

export default MessageBubble;

import React from "react";
import { Message } from "./ChatContainer";

const MessageBubble = ({ msg }: { msg: Message }): React.JSX.Element => {
  const isUser = msg.user === "You";

  return (
    <div className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}>
      <div
        className={`px-4 py-2 rounded-2xl text-[14px] leading-snug max-w-[70%] lg:max-w-[50%] shadow-sm ${
          isUser
            ? "bg-blue-500 text-white rounded-tr-none"
            : "bg-blue-50 text-neutral-900 border border-neutral-300 rounded-tl-none"
        }`}
      >
        <p>{msg.text}</p>
      </div>

      <span
        className={`text-[11px] sm:text-xs font-medium mt-1 ${
          isUser ? "text-blue-500 text-right" : "text-neutral-600 text-left"
        }`}
      >
        {msg.user} • {msg.timestamp}
      </span>
    </div>
  );
};

export default MessageBubble;

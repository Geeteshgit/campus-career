import React from "react";
import { Message } from "./ChatContainer";

interface MessageBubbleProps {
  msg: Message;
  userId: string;
}

const MessageBubble = ({
  msg,
  userId,
}: MessageBubbleProps): React.JSX.Element => {
  const isUser = msg.userId === userId;

  return (
    <div className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}>
      <div
        className={`px-4 py-2 rounded-xl max-w-[70%] lg:max-w-[50%] shadow-sm text-sm ${
          isUser
            ? "bg-blue-500 text-white rounded-tr-none"
            : "bg-blue-50 text-neutral-900 border border-neutral-300 rounded-tl-none"
        }`}
      >
        <p>{msg.message}</p>
      </div>

      <div
        className={`flex items-center gap-1 text-xs mt-1 ${
          isUser
            ? "text-blue-500 justify-end"
            : "text-neutral-600 justify-start"
        }`}
      >
        <span>{isUser ? "You" : msg.username}</span>
        <span>•</span>
        <span>
          {new Date(msg.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
    </div>
  );
};

export default MessageBubble;

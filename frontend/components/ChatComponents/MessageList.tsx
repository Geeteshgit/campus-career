import React from "react";
import { Message } from "./ChatContainer";
import MessageBubble from "./MessageBubble";

interface MessageListProps {
  messages: Message[];
  chatEndRef: React.RefObject<HTMLDivElement | null>;
}

const MessageList = ({ messages, chatEndRef }: MessageListProps): React.JSX.Element => {
  return (
    <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
      {messages.map((msg) => (
        <MessageBubble key={msg._id} msg={msg} />
      ))}
      <div ref={chatEndRef} />
    </div>
  );
};

export default MessageList;

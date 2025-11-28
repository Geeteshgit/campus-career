import React from "react";
import { Message } from "./ChatContainer";
import MessageBubble from "./MessageBubble";

interface MessageListProps {
  messages: Message[];
  userId: string;
  chatEndRef: React.RefObject<HTMLDivElement | null>;
}

const MessageList = ({
  messages,
  userId,
  chatEndRef,
}: MessageListProps): React.JSX.Element => {
  return (
    <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-3">
      {messages.map((msg) => (
        <MessageBubble key={msg._id} msg={msg} userId={userId} />
      ))}
      <div ref={chatEndRef} />
    </div>
  );
};

export default MessageList;

"use client";

import MessageList from "./MessageList";
import ChatInput from "./ChatInput";
import React, { useEffect, useRef, useState } from "react";

export interface Message {
  id: number;
  user: string;
  text: string;
  timestamp: string;
}

const ChatContainer = (): React.JSX.Element => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      user: "Aarav",
      text: "Hey everyone! Has anyone started prep for the Tech Mahindra test?",
      timestamp: "10:05 AM",
    },
    {
      id: 2,
      user: "Sneha",
      text: "Yes! I’m revising aptitude and DSA 😅",
      timestamp: "10:07 AM",
    },
    {
      id: 3,
      user: "Rohit",
      text: "Let's make a small study group!",
      timestamp: "10:09 AM",
    },
  ]);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (text: string) => {
    const newMessage: Message = {
      id: messages.length + 1,
      user: "You",
      text,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, newMessage]);
  };
  return (
    <div className="flex flex-col border border-neutral-300 rounded-lg overflow-hidden shadow-sm h-[70vh] bg-neutral-50/50">
      <MessageList messages={messages} chatEndRef={chatEndRef} />
      <ChatInput onSend={handleSend} />
    </div>
  );
};

export default ChatContainer;

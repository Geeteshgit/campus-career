"use client";

import MessageList from "./MessageList";
import ChatInput from "./ChatInput";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { socket } from "@/lib/socket";

export interface Message {
  _id: string;
  senderId: string;
  message: string;
  createdAt: string;
}

const ChatContainer = (): React.JSX.Element => {
  const [messages, setMessages] = useState<Message[]>([]);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll when new messages come
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const loadMessages = async () => {
    const response = await axios.get("http://localhost:5003/api/message");
    setMessages(response.data.messages);
  };

  useEffect(() => {
    loadMessages();

    socket.on("receiveMessage", (msg: Message) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  const handleSend = (text: string) => {
    socket.emit("sendMessage", {
      senderId: "676f3d92c15e212bd836aa12", // replace with real logged-in user ID
      message: text,
    });
  };

  return (
    <div className="flex flex-col border border-neutral-300 rounded-lg overflow-hidden shadow-sm h-[70vh] bg-neutral-50/50">
      <MessageList messages={messages} chatEndRef={chatEndRef} />
      <ChatInput onSend={handleSend} />
    </div>
  );
};

export default ChatContainer;

"use client";

import MessageList from "./MessageList";
import ChatInput from "./ChatInput";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { env } from "@/config/env";
import { useAppSelector } from "@/redux/hooks";
import { connectSocket, getSocket, initSocket } from "@/lib/socket";

export interface Message {
  _id: string;
  userId: string;
  username: string;
  message: string;
  createdAt: string;
}

const ChatContainer = (): React.JSX.Element => {
  const [messages, setMessages] = useState<Message[]>([]);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const user = useAppSelector((state) => state.user.user);
  const userId = user?._id;
  const username = user?.name;

  const loadMessages = async () => {
    try {
      const response = await axios.get(`${env.MESSAGE_SERVICE}/api/message`);
      setMessages(response.data.messages);
    } catch (err) {
      console.error("Error loading messages:", err);
    }
  };
  useEffect(() => {
    loadMessages();
  }, []);

  useEffect(() => {
    if (!userId || !username) return;

    const socket = getSocket();
    if (!socket) return;
    socket.emit("join", userId);

    socket.on("receiveMessage", (msg: Message) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [userId, username]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (message: string) => {
    if (!message.trim()) return;
    if (!userId || !username) return;

    const socket = getSocket();
    if (!socket) return;

    socket.emit("sendMessage", {
      userId,
      username,
      message,
    });
  };

  return (
    <div className="flex flex-col border border-neutral-300 rounded-lg overflow-hidden shadow-sm h-[70vh] bg-neutral-50/50">
      <MessageList
        messages={messages}
        chatEndRef={chatEndRef}
        userId={userId || ""}
      />
      <ChatInput onSend={handleSend} />
    </div>
  );
};

export default ChatContainer;

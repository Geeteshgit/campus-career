"use client";

// React
import { useEffect, useRef } from "react";

// External Libraries
import { useQueryClient } from "@tanstack/react-query";

// Lib
import { connectSocket, getSocket, initSocket } from "@/lib/socket";

// Local Imports
import { useMessages } from "../hooks/useMessages";
import { Message } from "../types/message.types";
import ChatInput from "./ChatInput";
import MessageList from "./MessageList";
import { useAuthStore } from "@/features/auth";

const ChatContainer = () => {
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const queryClient = useQueryClient();
  const {
    messages,
    messagesLoading,
    messagesError,
    messagesErrorObj,
  } = useMessages();

  const user = useAuthStore((state) => state.user);
  const userId = user?.id;
  const username = user?.name;

  useEffect(() => {
    if (!userId || !username) return;
    initSocket();
    connectSocket();
    const socket = getSocket();
    if (!socket) return;

    socket.on("receiveMessage", (msg: Message) => {
      queryClient.setQueryData<{ messages: Message[] }>(["messages"], (old) => {
        if (!old) return old;

        return {
          ...old,
          messages: [...old.messages, msg],
        };
      });
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [userId, username, queryClient]);

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
        messages={messages ?? []}
        chatEndRef={chatEndRef}
        userId={userId || ""}
        messagesLoading={messagesLoading}
        messagesError={messagesError}
        messagesErrorObj={messagesErrorObj}
      />
      <ChatInput onSend={handleSend} />
    </div>
  );
};

export default ChatContainer;

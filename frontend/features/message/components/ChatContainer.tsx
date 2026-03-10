"use client";

import MessageList from "./MessageList";
import ChatInput from "./ChatInput";
import React, { useEffect, useRef } from "react";
import { useAppSelector } from "@/redux/hooks";
import { connectSocket, getSocket, initSocket } from "@/lib/socket";
import { Message } from "../types/message";
import { useQueryClient } from "@tanstack/react-query";
import { useMessages } from "../hooks/useMessages";
import Loader from "@/shared/ui/Loader";

const ChatContainer = (): React.JSX.Element => {
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const queryClient = useQueryClient();
  const { data, isPending, isError, error } = useMessages();
  const messages = data?.messages ?? [];

  const user = useAppSelector((state) => state.user.user);
  const userId = user?._id;
  const username = user?.name;

  useEffect(() => {
    if (!userId || !username) return;
    initSocket();
    connectSocket();
    const socket = getSocket();
    if (!socket) return;

    socket.on("receiveMessage", (msg: Message) => {
      queryClient.setQueryData(["messages"], (old: any) => {
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

  if (isPending) return <Loader />;

  if (isError) {
  return (
    <div className="text-red-500 text-center p-4">
      {(error as any)?.response?.data?.message || "Failed to load messages"}
    </div>
  );
}

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

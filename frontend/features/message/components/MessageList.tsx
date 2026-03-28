"use client";

// React
import React from "react";

// Shared UI Components
import AsyncState from "@/shared/ui/AsyncState";

// Local Imports
import { Message } from "../types/message.types";
import MessageBubble from "./MessageBubble";

type MessageListProps = {
  messages: Message[];
  userId: string;
  chatEndRef: React.RefObject<HTMLDivElement | null>;
  messagesLoading: boolean;
  messagesError: boolean;
  messagesErrorObj: unknown;
}

const formatDateLabel = (dateStr: string): string => {
  const date = new Date(dateStr);
  const today = new Date();
  const yesterday = new Date();

  yesterday.setDate(today.getDate() - 1);

  const isSameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  if (isSameDay(date, today)) return "Today";
  if (isSameDay(date, yesterday)) return "Yesterday";

  return date.toLocaleDateString(undefined, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const MessageList = ({
  messages,
  userId,
  chatEndRef,
  messagesLoading,
  messagesError,
  messagesErrorObj,
}: MessageListProps) => {
  return (
    <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-3">
      <AsyncState
        isLoading={messagesLoading}
        isError={messagesError}
        error={messagesErrorObj}
        isEmpty={!messages?.length}
        loadingText="Loading messages..."
        errorText="Failed to load messages"
        emptyText="No messages yet."
      >
        {messages.map((msg, index) => {
          const currentDate = formatDateLabel(msg.createdAt);
          const prevDate =
            index > 0 ? formatDateLabel(messages[index - 1].createdAt) : null;

          const showDateHeader = currentDate !== prevDate;

          return (
            <React.Fragment key={msg._id}>
              {showDateHeader && (
                <div className="flex justify-center my-2">
                  <span className="px-3 py-1 text-xs font-medium rounded-lg bg-neutral-200 text-neutral-700">
                    {currentDate}
                  </span>
                </div>
              )}

              <MessageBubble msg={msg} userId={userId} />
            </React.Fragment>
          );
        })}
        <div ref={chatEndRef} />
      </AsyncState>
    </div>
  );
};

export default MessageList;

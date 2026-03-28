"use client";

// React
import React from "react";

// External Libraries
import clsx from "clsx";

// Local Imports
import { Message } from "../types/message.types";

type MessageBubbleProps = {
  msg: Message;
  userId: string;
};

const MessageBubble = ({
  msg,
  userId,
}: MessageBubbleProps): React.JSX.Element => {
  const isUser: boolean = msg.userId === userId;

  return (
    <div
      className={clsx("flex flex-col", {
        "items-end": isUser,
        "items-start": !isUser,
      })}
    >
      <div
        className={clsx("px-4 py-2 rounded-xl max-w-[70%] lg:max-w-[50%] shadow-sm text-sm", {
          "bg-blue-500 text-white rounded-tr-none": isUser,
          "bg-blue-50 text-neutral-900 border border-neutral-300 rounded-tl-none": !isUser,
        })}
      >
        <p>{msg.message}</p>
      </div>

      <div
        className={clsx("flex items-center gap-1 text-xs mt-1", {
          "text-blue-500 justify-end": isUser,
          "text-neutral-600 justify-start": !isUser,
        })}
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

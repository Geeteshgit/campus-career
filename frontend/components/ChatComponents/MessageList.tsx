import React from "react";
import { Message } from "./ChatContainer";
import MessageBubble from "./MessageBubble";

interface MessageListProps {
  messages: Message[];
  userId: string;
  chatEndRef: React.RefObject<HTMLDivElement | null>;
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
}: MessageListProps): React.JSX.Element => {
  let lastRenderedDate = "";

  return (
    <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-3">
      {messages.map((msg) => {
        const currentDate = formatDateLabel(msg.createdAt);
        const showDateHeader = currentDate !== lastRenderedDate;
        lastRenderedDate = currentDate;

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
    </div>
  );
};

export default MessageList;

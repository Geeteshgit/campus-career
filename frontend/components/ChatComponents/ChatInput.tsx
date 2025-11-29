"use client";

import React, { useState } from "react";
import PrimaryButton from "../ui/PrimaryButton";

const ChatInput = ({
  onSend,
}: {
  onSend: (text: string) => void;
}): React.JSX.Element => {
  const [input, setInput] = useState<string>("");

  const handleSend = () => {
    if (!input.trim()) return;
    onSend(input.trim());
    setInput("");
  };

  return (
    <div className="border-t border-neutral-300 bg-white p-3 flex items-center gap-3">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        placeholder="Type a message..."
        className="flex-1 px-4 py-2 border border-neutral-300 rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <PrimaryButton onClick={handleSend} className="px-6">Send</PrimaryButton>
    </div>
  );
};

export default ChatInput;

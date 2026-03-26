"use client";

import { useMessagesQuery } from "../api/messages.queries";

export const useMessages = () => {
  return useMessagesQuery();
};

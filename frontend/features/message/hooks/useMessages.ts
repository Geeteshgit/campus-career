import { useMessagesQuery } from "../hooks/queries";
import { Message } from "../types/message.types";

export const useMessages = () => {
  const {
    data: messagesData,
    isPending: messagesLoading,
    isError: messagesError,
    error: messagesErrorObj,
  } = useMessagesQuery();
  const messages: Message[] = messagesData?.messages;

  return { messages, messagesLoading, messagesError, messagesErrorObj };
};

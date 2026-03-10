import { useQuery } from "@tanstack/react-query";
import { getMessages } from "../api/messages.api";

export const useMessages = () => {
  return useQuery({
    queryKey: ["messages"],
    queryFn: getMessages,
    refetchOnWindowFocus: false,
  });
};

import { useQuery } from "@tanstack/react-query";
import { getMessages } from "@/services/message.service";

export const useMessages = () => {
  return useQuery({
    queryKey: ["messages"],
    queryFn: getMessages,
    refetchOnWindowFocus: false,
  });
};

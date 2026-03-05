import { messagesApi } from "@/lib/axios";

export const getMessages = async () => {
    const { data } = await messagesApi.get("/api/messages");
    return data;
}
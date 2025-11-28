import { Server, Socket } from "socket.io";
import { Message } from "../models/message.model.js";

export const socketHandler = (io: Server) => {
  const onlineUsers: Map<string, string> = new Map();

  io.on("connection", (socket: Socket) => {
    console.log("User connected:", socket.id);

    socket.on("join", (userId: string) => {
      if (!userId) return;
      onlineUsers.set(userId, socket.id);
    });

    socket.on("sendMessage", async ({
        userId,
        username,
        message,
      }: {
        userId: string;
        username: string;
        message: string;
      }) => {
        try {
          if (!userId || !message || !username) {
            console.log("Missing fields in message");
            return;
          }

          const newMessage = await Message.create({
            userId,
            username,
            message,
          });

          io.emit("receiveMessage", newMessage);
        } catch (err) {
          console.error("Error saving message:", err);
        }
      }
    );

    socket.on("disconnect", (reason) => {
      for (let [userId, socketId] of onlineUsers.entries()) {
        if (socketId === socket.id) {
          onlineUsers.delete(userId);
          break;
        }
      }

      io.emit("onlineUsers", Array.from(onlineUsers.keys()));
      console.log("User disconnected:", socket.id, reason);
    });
  });
};

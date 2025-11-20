import { io } from "socket.io-client";

export const socket = io("http://localhost:5003", {
  transports: ["websocket"],
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 3000,
});

import express, { Request, Response } from "express";
import http from "http";
import { env } from "./config/env.js";
import { connectToDB } from "./config/db.js";
import { connectRabbitMQ } from "./utils/rabbitmq.js";
import cors from "cors";
import messageRoutes from "./routes/message.route.js";
import { Server } from "socket.io";
import { Message } from "./models/message.model.js";

const app = express();
connectToDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/message", messageRoutes);

app.get("/api", (req: Request, res: Response) => {
  return res.send("Message Server Running");
});

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
  pingInterval: 25000,
  pingTimeout: 5000,
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on(
    "sendMessage",
    async (data: { senderId: string; message: string }) => {
      try {
        if (!data.senderId || !data.message) return;

        const newMessage = await Message.create({
          senderId: data.senderId,
          message: data.message,
        });

        io.emit("receiveMessage", newMessage);
      } catch (err) {
        console.error("Chat error:", err);
      }
    }
  );

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

async () => {
  await connectRabbitMQ();
};

server.listen(env.PORT, () => {
  console.log(`Message Server running on port: ${env.PORT}`);
});

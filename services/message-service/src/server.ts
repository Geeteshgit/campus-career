import express, { Request, Response } from "express";
import http from "http";
import { env } from "./config/env.js";
import { connectToDB } from "./config/db.js";
import { connectRabbitMQ } from "./utils/rabbitmq.js";
import cors from "cors";
import messageRoutes from "./routes/message.route.js";
import { Server } from "socket.io";
import { socketHandler } from "./config/socket.js";

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

socketHandler(io);

async () => {
  await connectRabbitMQ();
};

server.listen(env.PORT, () => {
  console.log(`Message Server running on port: ${env.PORT}`);
});

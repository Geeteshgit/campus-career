import http from "http";
import { Server } from "socket.io";

import app from "./src/app.js";
import { env } from "./src/config/env.js";
import { connectToDB } from "./src/config/db.js";
import { connectRabbitMQ } from "./src/utils/rabbitmq.js";
import { socketHandler } from "./src/config/socket.js";

await connectToDB();
await connectRabbitMQ();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
  pingInterval: 25000,
  pingTimeout: 5000,
});

socketHandler(io);

server.listen(env.PORT, () => {
  console.log(`Message Server running on port: ${env.PORT}`);
});

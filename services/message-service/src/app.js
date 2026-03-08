import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import messageRoutes from "./routes/message.route.js";

const app = express();

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/messages", messageRoutes);

app.get("/api", (req, res) => {
  return res.send("Message Server Running");
});

export default app;
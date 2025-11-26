import express, { Request, Response } from "express";
import { env } from "./config/env.js";
import { connectToDB } from "./config/db.js";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import studentRoutes from "./routes/student.route.js";
import adminRoutes from "./routes/admin.route.js";
import { connectRabbitMQ } from "./utils/rabbitmq.js";

const app = express();
connectToDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/admin", adminRoutes);

app.get("/api", (req: Request, res: Response) => {
    return res.send("User Server Running");
});

(async () => {
    await connectRabbitMQ();
})

app.listen(env.PORT, () => {
    console.log(`User Server running on port: ${env.PORT}`);
});
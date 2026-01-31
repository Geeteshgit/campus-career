import express from "express";
import cors from "cors";
import { env } from "./config/env.js";
import { connectToDB } from "./config/db.js";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import studentRoutes from "./routes/student.route.js";
import adminRoutes from "./routes/admin.route.js";
import { connectRabbitMQ } from "./utils/rabbitmq.js";
import { createSuperAdminIfNotExists } from "./bootstrap/superAdmin.bootstrap.js";

const app = express();

await connectToDB();
await createSuperAdminIfNotExists();
await connectRabbitMQ();

app.use(cors({
    origin: "*"
}));

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/admin", adminRoutes);

app.get("/api", (req, res) => {
    return res.send("User Server Running");
});

app.listen(env.PORT, () => {
    console.log(`User Server running on port: ${env.PORT}`);
});
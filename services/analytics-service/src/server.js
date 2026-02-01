import express from "express";
import cors from "cors";
import { env } from "./config/env.js";
import { connectRabbitMQ } from "./utils/rabbitmq.js";
import analyticsRoutes from "./routes/analytics.route.js";

const app = express();

await connectRabbitMQ();

app.use(cors({
    origin: "*",
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/analytics", analyticsRoutes);

app.get("/api", (req, res) => {
    return res.send("Analytics Server Running");
});

app.listen(env.PORT, () => {
    console.log(`Analytics Server running on port: ${env.PORT}`);
});
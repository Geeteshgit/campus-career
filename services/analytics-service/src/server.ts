import express, { Request, Response } from "express";
import cors from "cors";
import { env } from "./config/env.js";
import { connectToDB } from "./config/db.js";
import { connectRabbitMQ } from "./utils/rabbitmq.js";
import analyticsRoutes from "./routes/analytics.route.js";

const app = express();
connectToDB();

app.use(cors({
    origin: "*",
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/analytics", analyticsRoutes);

app.get("/api", (req: Request, res: Response) => {
    return res.send("Analytics Server Running");
});

(async () => {
    await connectRabbitMQ();
})

app.listen(env.PORT, () => {
    console.log(`Analytics Server running on port: ${env.PORT}`);
});
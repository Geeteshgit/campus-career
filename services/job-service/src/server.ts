import express, { Request, Response } from "express";
import { env } from "./config/env.js";
import { connectToDB } from "./config/db.js";
import { connectRabbitMQ } from "./utils/rabbitmq.js";
import jobsRoute from "./routes/job.route.js";
import applicationsRoute from "./routes/application.route.js";

const app = express();
connectToDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/jobs", jobsRoute);
app.use("/api/applications", applicationsRoute);

app.get("/api", (req: Request, res: Response) => {
    return res.send("Job Server Running");
});

(async () => {
    await connectRabbitMQ();
})

app.listen(env.PORT, () => {
    console.log(`Job Server running on port: ${env.PORT}`);
});
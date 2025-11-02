import express, { Request, Response } from "express";
import { env } from "./config/env.js";
import { connectToDB } from "./config/db.js";
import { connectRabbitMQ } from "./utils/rabbitmq.js";

const app = express();
connectToDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/api", (req: Request, res: Response) => {
    return res.send("Student Server Running");
});

(async () => {
    await connectRabbitMQ();
})

app.listen(env.PORT, () => {
    console.log(`Student Server running on port: ${env.PORT}`);
});
import express, { Request, Response } from "express";
import { env } from "./config/env.js";
import { connectToDB } from "./config/db.js";
import authRoutes from "./routes/auth.route.js";

const app = express();
connectToDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);

app.get("/api", (req: Request, res: Response) => {
    return res.send("Server running");
});

app.listen(env.PORT, () => {
    console.log(`Server running on port: ${env.PORT}`);
});
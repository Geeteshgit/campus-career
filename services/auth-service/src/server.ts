import express, { Request, Response } from "express";
import { env } from "./config/env.js";
import { connectToDB } from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();
connectToDB();

app.use("/api/auth", authRoutes);

app.get("/api", (req: Request, res: Response) => {
    return res.send("Server running");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.listen(env.PORT, () => {
    console.log(`Server running on port: ${env.PORT}`);
});
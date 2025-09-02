import express, { Request, Response } from "express";
import { env } from "./config/env.js";
import { connectToDB } from "./config/db.js";

const app = express();
connectToDB();


app.get("/", (req: Request, res: Response) => {
    return res.send("Server running");
});

app.listen(env.PORT, () => {
    console.log(`Server running on port: ${env.PORT}`);
});
import express, { Request, Response } from "express";
import { env } from "./config/env.js";
import userRoutes from "./routes/user.route.js"
import { connectToDB } from "./config/db.js";

const app = express();
connectToDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRoutes);

app.get("/api", (req: Request, res: Response) => {
    return res.send("User Server Running");
});

app.listen(env.PORT, () => {
    console.log(`User Server running on port: ${env.PORT}`);
});
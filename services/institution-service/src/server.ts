import express, { Request, Response } from "express";
import { env } from "./config/env.js";
import { connectToDB } from "./config/db.js";
import institutionRoutes from "./routes/institution.route.js";

const app = express();
connectToDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/insitutions", institutionRoutes);

app.get("/api", (req: Request, res: Response) => {
    return res.send("Institution Server Running");
});

app.listen(env.PORT, () => {
    console.log(`Institution Server running on port: ${env.PORT}`);
});
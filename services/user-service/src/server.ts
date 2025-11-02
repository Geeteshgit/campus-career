import express, { Request, Response } from "express";
import { env } from "./config/env.js";
import userRoutes from "./routes/user.route.js";
import studentRoutes from "./routes/student.route.js";
import adminRoutes from "./routes/admin.route.js";
import superAdminRoutes from "./routes/superAdmin.route.js";
import { connectToDB } from "./config/db.js";

const app = express();
connectToDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/super-admin", superAdminRoutes);

app.get("/api", (req: Request, res: Response) => {
    return res.send("User Server Running");
});

app.listen(env.PORT, () => {
    console.log(`User Server running on port: ${env.PORT}`);
});
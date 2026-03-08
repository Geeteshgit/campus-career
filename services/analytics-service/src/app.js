import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import analyticsRoutes from "./routes/analytics.route.js";

const app = express();

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/analytics", analyticsRoutes);

app.get("/api", (req, res) => {
    return res.send("Analytics Server Running");
});

export default app;
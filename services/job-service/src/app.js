import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import jobsRoute from "./routes/job.route.js";
import applicationsRoute from "./routes/application.route.js";

const app = express();

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/jobs", jobsRoute);
app.use("/api/applications", applicationsRoute);

app.get("/api", (req, res) => {
    return res.send("Job Server Running");
});

export default app;
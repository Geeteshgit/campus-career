import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import academicRoutes from "./routes/academic.route.js";
import resourceRoutes from "./routes/resource.route.js";

const app = express();

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/academics", academicRoutes);
app.use("/api/resources", resourceRoutes);

app.get("/api", (req, res) => {
  return res.send("Academic Configuration Server Running");
});

export default app;
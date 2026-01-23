import express from "express";
import cors from "cors";
import { env } from "./config/env.js";
import { connectToDB } from "./config/db.js";
import { connectRabbitMQ } from "./utils/rabbitmq.js";
import academicRoutes from "./routes/academic.route.js";
import resourceRoutes from "./routes/resource.route.js";

const app = express();

await connectToDB();
await connectRabbitMQ();

app.use(cors({
    origin: "*",
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/academics", academicRoutes);
app.use("/api/resources", resourceRoutes);

app.get("/api", (req, res) => {
  return res.send("Academic Configuration Server Running");
});

app.listen(env.PORT, () => {
  console.log(`Academic Configuration Server running on port: ${env.PORT}`);
});

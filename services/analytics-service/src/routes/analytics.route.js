import express from "express";
import { checkAuth } from "../middlewares/checkAuth.middleware.js";
import { restrictTo } from "../middlewares/restrictTo.middleware.js";
import { getPlatformAnalytics } from "../controllers/analytics.controller.js";
const router = express.Router();

router.get("/", checkAuth, restrictTo("admin", "super_admin"), getPlatformAnalytics);

export default router;
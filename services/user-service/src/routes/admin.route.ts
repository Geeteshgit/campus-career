import express from "express";
import { checkAuth } from "../middlewares/checkAuth.middleware.js";
import { restrictTo } from "../middlewares/restrictTo.middleware.js";
import { getAdmins } from "../controllers/admin.controller.js";
const router = express.Router();

router.use(checkAuth);

router.get("/", restrictTo("admin", "super_admin"), getAdmins);

export default router;
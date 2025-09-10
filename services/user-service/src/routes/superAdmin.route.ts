import express from "express";
import { checkAuth } from "../middlewares/checkAuth.middleware.js";
import { restrictTo } from "../middlewares/restrictTo.middleware.js";
import { getSuperAdmin } from "../controllers/superAdmin.controller.js";
const router = express.Router();

router.use(checkAuth);

router.get("/", restrictTo("super_admin"), getSuperAdmin);

export default router;
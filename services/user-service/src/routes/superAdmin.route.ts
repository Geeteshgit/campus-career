import express from "express";
import { checkAuth } from "../middlewares/checkAuth.middleware.js";
import { restrictTo } from "../middlewares/restrictTo.middleware.js";
import { deleteSuperAdmin, getSuperAdmin } from "../controllers/superAdmin.controller.js";
const router = express.Router();

router.use(checkAuth);
router.use(restrictTo("super_admin"));

router.get("/", getSuperAdmin);
router.delete("/", deleteSuperAdmin);

export default router;
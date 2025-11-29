import express from "express";
import { getMyAccount, getUserStats, updateMyAccount } from "../controllers/user.controller.js";
import { checkAuth } from "../middlewares/checkAuth.middleware.js";
import { restrictTo } from "../middlewares/restrictTo.middleware.js";
const router = express.Router();

router.get("/", checkAuth, getMyAccount);
router.get("/stats", checkAuth, restrictTo("admin", "super_admin"), getUserStats);
router.put("/", checkAuth, updateMyAccount);

export default router;
import express from "express";
import { createNewUser, getMe, getUserById } from "../controllers/user.controller.js";
import { checkAuth } from "../middlewares/checkAuth.middleware.js";
import { restrictTo } from "../middlewares/restrictTo.middleware.js";
const router = express.Router();

router.post("/new", createNewUser);
router.get("/me", checkAuth, getMe);
router.get("/:userId", checkAuth, restrictTo("institution_admin", "super_admin"), getUserById);

export default router;
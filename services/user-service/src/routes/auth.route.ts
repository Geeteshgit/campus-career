import express from "express";
import { loginUser, getMe, changePassword } from "../controllers/auth.controller.js";
import { checkAuth } from "../middlewares/checkAuth.middleware.js";
const router = express.Router();

router.post("/login", loginUser);
router.put("/change-password", checkAuth, changePassword);
router.get("/me", checkAuth, getMe);

export default router;
import express from "express";
import {
  loginUser,
  getMe,
  changePassword,
  forgotPassword,
  verifyResetOtp,
  resetPassword,
  logoutUser,
} from "../controllers/auth.controller.js";
import { checkAuth } from "../middlewares/checkAuth.middleware.js";
const router = express.Router();

router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/forgot-password", forgotPassword);
router.post("/verify-reset-otp", verifyResetOtp);
router.post("/reset-password", resetPassword);
router.put("/change-password", checkAuth, changePassword);
router.get("/me", checkAuth, getMe);

export default router;

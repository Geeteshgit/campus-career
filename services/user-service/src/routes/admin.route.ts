import express from "express";
import { checkAuth } from "../middlewares/checkAuth.middleware.js";
import { restrictTo } from "../middlewares/restrictTo.middleware.js";
import { createAdmin, deleteUserById, getAllAdmins, getUserById, updateUserById } from "../controllers/admin.controller.js";
const router = express.Router();

router.get("/", checkAuth, restrictTo("admin", "super_admin"), getAllAdmins);
router.get("/:id", checkAuth, restrictTo("admin", "super_admin"), getUserById);
router.post("/", checkAuth, restrictTo("admin", "super_admin"), createAdmin);
router.put("/:id", checkAuth, restrictTo("admin", "super_admin"), updateUserById);
router.delete("/:id", checkAuth, restrictTo("super_admin"), deleteUserById);

export default router;
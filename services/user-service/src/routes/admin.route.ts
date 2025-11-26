import express from "express";
import { checkAuth } from "../middlewares/checkAuth.middleware.js";
import { restrictTo } from "../middlewares/restrictTo.middleware.js";
import { createAdmin, deleteUserById, getUserById, updateUserById } from "../controllers/admin.controller.js";
const router = express.Router();

router.get("/:id", checkAuth, restrictTo("admin", "super_admin"), getUserById);
router.put("/:id", checkAuth, restrictTo("admin", "super_admin"), updateUserById);
router.delete("/:id", checkAuth, restrictTo("super_admin"), deleteUserById);
router.put("/", checkAuth, restrictTo("admin", "super_admin"), createAdmin);

export default router;
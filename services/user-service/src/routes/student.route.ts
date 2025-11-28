import express from "express";
import { checkAuth } from "../middlewares/checkAuth.middleware.js";
import { restrictTo } from "../middlewares/restrictTo.middleware.js";
import {
  createStudent,
  deleteStudent,
  getAllStudents,
  getMyStudentProfile,
  getStudentByUserId,
  updateMyStudentProfile,
  updateStudent,
} from "../controllers/student.controller.js";
const router = express.Router();

router.get("/me", checkAuth, restrictTo("student"), getMyStudentProfile);
router.put("/me", checkAuth, restrictTo("student"), updateMyStudentProfile);
router.get("/", checkAuth, restrictTo("admin", "super_admin"), getAllStudents);
router.get("/:userId", checkAuth, restrictTo("admin", "super_admin"), getStudentByUserId);
router.post("/", checkAuth, restrictTo("admin", "super_admin"), createStudent);
router.put("/:id", checkAuth, restrictTo("admin", "super_admin"), updateStudent);
router.delete("/:id", checkAuth, restrictTo("admin", "super_admin"), deleteStudent);

export default router;

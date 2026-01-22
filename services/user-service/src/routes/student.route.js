import express from "express";
import multer from "multer";
import { checkAuth } from "../middlewares/checkAuth.middleware.js";
import { restrictTo } from "../middlewares/restrictTo.middleware.js";
import {
  createStudent,
  deleteStudent,
  getAllStudents,
  getMyStudentProfile,
  getStudentByUserId,
  getStudentStats,
  updateMyStudentProfile,
  updateStudent,
  uploadResumeAndExtractSkills,
} from "../controllers/student.controller.js";
const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 8 * 1024 * 1024 }, 
});

router.get("/me", checkAuth, restrictTo("student"), getMyStudentProfile);
router.put("/me", checkAuth, restrictTo("student"), updateMyStudentProfile);
router.post(
  "/me/resume",
  checkAuth,
  restrictTo("student"),
  upload.single("resume"),
  uploadResumeAndExtractSkills
);
router.get("/", checkAuth, restrictTo("admin", "super_admin"), getAllStudents);
router.get("/stats", checkAuth, restrictTo("admin", "super_admin"), getStudentStats);
router.get("/:userId", checkAuth, restrictTo("admin", "super_admin"), getStudentByUserId);
router.post("/", checkAuth, restrictTo("admin", "super_admin"), createStudent);
router.put("/:id", checkAuth, restrictTo("admin", "super_admin"), updateStudent);
router.delete("/:id", checkAuth, restrictTo("admin", "super_admin"), deleteStudent);

export default router;

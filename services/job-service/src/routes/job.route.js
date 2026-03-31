import { Router } from "express";
import {
  createJob,
  getAllJobs,
  updateJob,
  deleteJob,
  getJobStats,
  getRecommendedJobs,
  getActiveJobs,
  getInactiveJobs,
} from "../controllers/job.controller.js";
import { checkAuth } from "../middlewares/checkAuth.middleware.js";
import { restrictTo } from "../middlewares/restrictTo.middleware.js";
const router = Router();

router.get("/", checkAuth, getAllJobs);
router.get("/stats", checkAuth, restrictTo("admin", "super_admin"), getJobStats);
router.post("/", checkAuth, restrictTo("admin", "super_admin"), createJob);
router.get("/active", checkAuth, restrictTo("student", "admin", "super_admin"), getActiveJobs);
router.get("/inactive", checkAuth, restrictTo("student", "admin", "super_admin"), getInactiveJobs);
router.post("/recommendations", checkAuth, restrictTo("student"), getRecommendedJobs);
router.put("/:id", checkAuth, restrictTo("admin", "super_admin"), updateJob);
router.delete("/:id", checkAuth, restrictTo("admin", "super_admin"), deleteJob);

export default router;

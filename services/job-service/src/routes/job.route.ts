import { Router } from "express";
import {
  createJob,
  getAllJobs,
  updateJob,
  deleteJob,
  getJobStats,
} from "../controllers/job.controller.js";
import { checkAuth } from "../middlewares/checkAuth.middleware.js";
import { restrictTo } from "../middlewares/restrictTo.middleware.js";
const router = Router();

router.get("/", checkAuth, getAllJobs);
router.get("/stats", checkAuth, restrictTo("admin", "super_admin"), getJobStats);
router.post("/", checkAuth, restrictTo("admin", "super_admin"), createJob);
router.put("/:id", checkAuth, restrictTo("admin", "super_admin"), updateJob);
router.delete("/:id", checkAuth, restrictTo("admin", "super_admin"), deleteJob);

export default router;

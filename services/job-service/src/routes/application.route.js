import { Router } from "express";
import {
  applyToJob,
  getMyApplications,
  getApplicantsForJob,
  getApplicationStats,
} from "../controllers/application.controller.js";
import { checkAuth } from "../middlewares/checkAuth.middleware.js";
import { restrictTo } from "../middlewares/restrictTo.middleware.js";

const router = Router();

router.get("/my", checkAuth, restrictTo("student"), getMyApplications);
router.get("/stats", checkAuth, restrictTo("admin", "super_admin"), getApplicationStats);
router.get("/:jobId", checkAuth, restrictTo("admin", "super_admin"), getApplicantsForJob);
router.post("/:jobId", checkAuth, restrictTo("student"), applyToJob);

export default router;

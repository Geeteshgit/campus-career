import { Router } from "express";
import {
  getResources,
  getResourcesByProgram,
  createResource,
  updateResource,
  deleteResource,
} from "../controllers/resource.controller.js";
import { checkAuth } from "../middlewares/checkAuth.middleware.js";
import { restrictTo } from "../middlewares/restrictTo.middleware.js";

const router = Router();

router.get("/admin", checkAuth, restrictTo("admin", "super_admin"), getResources);
router.get("/student", checkAuth, restrictTo("student"), getResourcesByProgram);
router.post("/", checkAuth, restrictTo("admin", "super_admin"), createResource);
router.put("/:id", checkAuth, restrictTo("admin", "super_admin"), updateResource);
router.delete("/:id", checkAuth, restrictTo("admin", "super_admin"), deleteResource);

export default router;

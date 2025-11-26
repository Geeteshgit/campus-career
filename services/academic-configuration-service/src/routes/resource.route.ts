import { Router } from "express";
import {
  getResources,
  createResource,
  updateResource,
  deleteResource,
} from "../controllers/resource.controller.js";
import { checkAuth } from "../middlewares/checkAuth.middleware.js";
import { restrictTo } from "../middlewares/restrictTo.middleware.js";

const router = Router();

router.get("/resources", getResources);
router.post("/resources", checkAuth, restrictTo("admin", "super_admin"), createResource);
router.put("/resources/:id", checkAuth, restrictTo("admin", "super_admin"), updateResource);
router.delete("/resources/:id", checkAuth, restrictTo("admin", "super_admin"), deleteResource);

export default router;

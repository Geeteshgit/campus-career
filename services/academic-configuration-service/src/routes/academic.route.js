import { Router } from "express";
import {
  getPrograms,
  createProgram,
  deleteProgram,
} from "../controllers/academic.controller.js";
import { checkAuth } from "../middlewares/checkAuth.middleware.js";
import { restrictTo } from "../middlewares/restrictTo.middleware.js";

const router = Router();

router.get("/programs", checkAuth, getPrograms);
router.post("/programs", checkAuth, restrictTo("admin", "super_admin"), createProgram);
router.delete("/programs/:id", checkAuth, restrictTo("admin", "super_admin"), deleteProgram);

export default router;

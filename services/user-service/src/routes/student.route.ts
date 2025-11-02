import express from "express";
import { checkAuth } from "../middlewares/checkAuth.middleware.js";
import { restrictTo } from "../middlewares/restrictTo.middleware.js";
import { getStudents } from "../controllers/student.controller.js";
const router = express.Router();

router.use(checkAuth);

router.get("/", restrictTo("admin", "super_admin"), getStudents);

export default router;
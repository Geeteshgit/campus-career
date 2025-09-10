import express from "express";
import { checkAuth } from "../middlewares/checkAuth.middleware.js";
import { restrictTo } from "../middlewares/restrictTo.middleware.js";
import { getInstitutionAdmins } from "../controllers/insitutionAdmin.controller.js";
const router = express.Router();

router.use(checkAuth);

router.get("/", restrictTo("institution_admin", "super_admin"), getInstitutionAdmins);

export default router;
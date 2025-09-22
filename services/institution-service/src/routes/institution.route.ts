import express from "express";
import { deleteInstitution, getAllInstitutions, getInstitutionById } from "../controllers/institution.controller.js";
import { checkAuth } from "../middlewares/checkAuth.middleware.js";
import { restrictTo } from "../middlewares/restrictTo.middleware.js";
const router = express.Router();

router.use(checkAuth);

router.get("/", restrictTo("super_admin"), getAllInstitutions);
router.get("/:institutionId", restrictTo("super_admin"), getInstitutionById);
router.delete("/", deleteInstitution);

export default router;
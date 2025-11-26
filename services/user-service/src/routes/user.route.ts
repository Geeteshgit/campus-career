import express from "express";
import { getMyAccount, updateMyAccount } from "../controllers/user.controller.js";
import { checkAuth } from "../middlewares/checkAuth.middleware.js";
const router = express.Router();

router.get("/", checkAuth, getMyAccount);
router.put("/update-profile", checkAuth, updateMyAccount);

export default router;
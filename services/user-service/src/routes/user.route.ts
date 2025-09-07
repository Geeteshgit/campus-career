import express from "express";
import { createNewProfile } from "../controllers/user.controller.js";
const router = express.Router();

router.post("/new", createNewProfile);

export default router;
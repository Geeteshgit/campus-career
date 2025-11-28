import express from "express";
import { getMessages } from "../controllers/message.controller.js";
import { checkAuth } from "../middlewares/checkAuth.middleware.js";
const router = express.Router();

router.get("/", checkAuth, getMessages);

export default router;
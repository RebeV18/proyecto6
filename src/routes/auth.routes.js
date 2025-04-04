import { Router } from "express";

import {
  getAllUsers,
  login,
  register,
} from "../controllers/auth.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";
import { verifyAdmin } from "../middlewares/verifyAdmin.middleware.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);

router.get("/", authMiddleware, verifyAdmin, getAllUsers);

export default router;

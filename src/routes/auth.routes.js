import { Router } from "express";

import {
  getAllUsers,
  login,
  register,
} from "../controllers/auth.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";
import { verifyAdmin } from "../middlewares/verifyAdmin.middleware.js";

const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", login);

authRouter.get("/", authMiddleware, verifyAdmin, getAllUsers);

export default authRouter;

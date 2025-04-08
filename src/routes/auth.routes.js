import { Router } from "express";

import {
  getAllUsers,
  updateUserById,
  login,
  register,
  verifyToken
} from "../controllers/auth.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";
import { verifyAdmin } from "../middlewares/verifyAdmin.middleware.js";

const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", login);

authRouter.put("/update/:id", authMiddleware, updateUserById);
authRouter.post("/verifytoken", authMiddleware, verifyToken);

authRouter.get("/", authMiddleware, verifyAdmin, getAllUsers);

export default authRouter;

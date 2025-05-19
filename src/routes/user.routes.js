import { Router } from "express";

import {
  getAllUsers,
  updateUserById,
  login,
  register,
  verifyToken
} from "../controllers/user.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";
import { verifyAdmin } from "../middlewares/verifyAdmin.middleware.js";

const userRouter = Router();

userRouter.post("/register", register);
userRouter.post("/login", login);

userRouter.put("/update/:id", authMiddleware, updateUserById);
userRouter.get("/verifytoken", authMiddleware, verifyAdmin, verifyToken);

userRouter.get("/", authMiddleware, verifyAdmin, getAllUsers);

export default userRouter;

import { Router } from "express";
import {
  register,
  login,
  getAllUsers,
  getUserById,
  updateUserById,
} from "../controllers/user.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";
import { verifyAdmin } from "../middlewares/verifyAdmin.middleware.js";

const userRouter = Router();

// Rutas públicas
userRouter.post("/register", register);
userRouter.post("/login", login);

userRouter.get("/", authMiddleware, verifyAdmin, getAllUsers);
userRouter.get("/:id", authMiddleware, verifyAdmin, getUserById);
userRouter.put("/:id", authMiddleware, verifyAdmin, updateUserById);

userRouter.get("/verify-token", authMiddleware, (req, res) => {
  res.json({
    success: true,
    message: "Token válido",
    user: {
      uid: req.user.uid,
      nombre: req.user.nombre,
      email: req.user.email,
      isAdmin: req.user.isAdmin,
    },
  });
});

export default userRouter;

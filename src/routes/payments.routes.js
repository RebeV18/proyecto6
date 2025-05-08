import { Router } from "express";
import { createPayment } from "../controllers/payment.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/mercadopago", authMiddleware, createPayment);

export default router;

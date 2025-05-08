import { Router } from "express";
import { createPayment } from "../controllers/payment.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";
import { verifyAdmin } from "../middlewares/verifyAdmin.middleware.js";

const router = Router();

router.post("/mercadopago", authMiddleware, verifyAdmin, createPayment);

export default router;

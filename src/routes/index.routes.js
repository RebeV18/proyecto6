import { Router } from "express";
import productRouter from "./products.routes.js";
import authRouter from "./auth.routes.js";

const router = Router();

router.use("/product", productRouter);
router.use("/auth", authRouter);

export default router;

import { Router } from "express";
import productRouter from "./products.routes.js";
import userRouter from "./user.routes.js";
import paymentRouter from "./payments.routes.js";

const router = Router();

router.use("/product", productRouter);
router.use("/user", userRouter);
router.use("/payments", paymentRouter);

export default router;

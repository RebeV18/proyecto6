import { Router } from "express";
import productRouter from "./product.routes.js";
import userRouter from "./user.routes.js";
import paymentRouter from "./payments.routes.js";

const router = Router();

router.use("/products", productRouter);
router.use("/users", userRouter);
router.use("/payment", paymentRouter);

export default router;

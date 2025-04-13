import { Router } from "express";
import productRouter from "./products.routes.js";
import userRouter from "./user.routes.js";

const router = Router();

router.use("/product", productRouter);
router.use("/user", userRouter);

export default router;

import { Router } from "express";
import productRouter from "./products.routes.js";
import userRouter from "./user.routes.js";
import swaggerRouter from "./swagger.routes.js";

const router = Router();

router.use("/product", productRouter);
router.use("/user", userRouter);
router.use("/swagger", swaggerRouter);

export default router;

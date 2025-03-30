import { Router } from "express";
import routerAuth from "./auth.routes.js";
import routerProduct from "./product.routes.js";

const router = Router();

router.use("/auth", routerAuth);
router.use("/products", routerProduct);

export default router;
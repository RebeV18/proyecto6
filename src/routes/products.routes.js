import { Router } from "express";

import {
  createProduct,
  deleteProductById,
  getAllProducts,
  getProductById,
  restoreProductById,
  updateProductById,
} from "../controllers/products.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";
import { verifyAdmin } from "../middlewares/verifyAdmin.middleware.js";

const productRouter = Router();

productRouter.get("/", getAllProducts);
productRouter.post("/", authMiddleware, verifyAdmin, createProduct);
productRouter.patch("/admin/restore/:id", authMiddleware, verifyAdmin, restoreProductById);
productRouter.get("/:id", getProductById);
productRouter.put("/:id", authMiddleware, verifyAdmin, updateProductById);
productRouter.delete("/:id", authMiddleware, verifyAdmin, deleteProductById);


export default productRouter;

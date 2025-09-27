import { Router } from "express";
import {
  createProduct,
  deleteProductById,
  getAllProducts,
  getProductById,
  restoreProductById,
  updateProductById,
  searchProducts,
} from "../controllers/product.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";
import { verifyAdmin } from "../middlewares/verifyAdmin.middleware.js";

const productRouter = Router();

// Rutas públicas
productRouter.get("/search", searchProducts);
productRouter.get("/", getAllProducts);
productRouter.get("/:id", getProductById);

// Rutas protegidas (requieren autenticación + admin)
productRouter.post("/", authMiddleware, verifyAdmin, createProduct);
productRouter.put("/:id", authMiddleware, verifyAdmin, updateProductById);
productRouter.delete("/:id", authMiddleware, verifyAdmin, deleteProductById);
productRouter.patch(
  "/restore/:id",
  authMiddleware,
  verifyAdmin,
  restoreProductById
);

export default productRouter;

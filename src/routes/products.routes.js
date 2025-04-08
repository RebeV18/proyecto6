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

productRouter.post("/create", authMiddleware, verifyAdmin, createProduct);
productRouter.get("/readall", getAllProducts);
productRouter.get("/readone/:id", getProductById);
productRouter.put("/update/:id", authMiddleware, verifyAdmin, updateProductById);
productRouter.delete("/delete/:id", authMiddleware, verifyAdmin, deleteProductById);
productRouter.patch("/restore/:id", authMiddleware, verifyAdmin, restoreProductById);


export default productRouter;

import { Router } from "express";
import {
  createProduct,
  deleteProductById,
  getAllProducts,
  getDeletedAllProducts,
  getDeletedProductById,
  getProductById,
  restoreProductById,
  updateProductById,
} from "../controllers/products.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { verifyAdmin } from "../middlewares/verifyAdmin.middleware.js";

const productRouter = Router();

productRouter.get("/", getAllProducts);
productRouter.get("/:id", getProductById);
productRouter.post("/", authMiddleware, createProduct);
productRouter.put("/:id", authMiddleware, updateProductById);
productRouter.delete("/:id", deleteProductById);
productRouter.patch(
  "/admin/restore/:id",
  authMiddleware,
  verifyAdmin,
  restoreProductById
);

productRouter.get("/admin/erased", authMiddleware, verifyAdmin, getDeletedAllProducts);
productRouter.get(
  "/admin/erased/:id",
  authMiddleware,
  verifyAdmin,
  getDeletedProductById
);

export default productRouter;

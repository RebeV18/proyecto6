import { Router } from "express";
import {
  createProduct,
  deleteProductById,
  getAllProducts,
  getDeleteAllProducts,
  getDeletedProductById,
  getProductById,
  restoreProductById,
  updateProductById,
} from "../controllers/products.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { verifyAdmin } from "../middlewares/verifyAdmin.middleware.js";

const router = Router();

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/", authMiddleware, createProduct);
router.put("/:id", authMiddleware, updateProductById);
router.delete(
  "/admin/perma/:id",
  authMiddleware,
  verifyAdmin,
  permaDeleteProductById
);
router.delete("/:id", deleteProductById);
router.patch(
  "/admin/restore/:id",
  authMiddleware,
  verifyAdmin,
  restoreProductById
);

router.get("/admin/erased", authMiddleware, verifyAdmin, getDeleteAllProducts);
router.get(
  "/admin/erased/:id",
  authMiddleware,
  verifyAdmin,
  getDeletedProductById
);

export default router;

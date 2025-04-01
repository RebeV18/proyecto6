import { Router } from 'express';
import { createProduct, deleteProductById, getAllProducts, getDeleteAllProducts, getDeleteProductById, getProductById, permaDeleteProductById, restoreProductById, updateProductById } from '../controllers/product.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { verifyAdmin } from '../middlewares/verifyAdmin.middleware.js';

const routerProduct = Router();

routerProduct.get('/', getAllProducts);
routerProduct.get('/:id', authMiddleware, getProductById);
routerProduct.post('/', authMiddleware, verifyAdmin, createProduct);
routerProduct.put('/:id', authMiddleware, verifyAdmin, updateProductById);
routerProduct.delete('/admin/perma/:id', authMiddleware, verifyAdmin, permaDeleteProductById);
routerProduct.delete('/:id', authMiddleware, verifyAdmin, deleteProductById);
routerProduct.patch('/admin/restore/:id', authMiddleware, verifyAdmin, restoreProductById);


routerProduct.get('/admin/erased', authMiddleware, verifyAdmin, getDeleteAllProducts);
routerProduct.get('/admin/erased/:id', authMiddleware, verifyAdmin, getDeleteProductById);

export default routerProduct;
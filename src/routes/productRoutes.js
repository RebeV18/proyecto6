import { Router } from 'express';
import { createProducts, deleteProductById, getAllProducts, getDeleteAllProducts, getDeleteProductsById, getProductsById, permaDeleteProductById, restoreProductById, updateProductById } from '../controllers/products.controller.js';

const router = Router();

router.get('/products', getAllProducts);
router.get('/products/:id', getProductsById);
router.post('/products', createProducts);
router.put('/products/:id', updateProductById);
router.delete('/products/admin/perma/:id', permaDeleteProductById);
router.delete('/products/:id', deleteProductById);
router.patch('/products/admin/restore/:id', restoreProductById);


router.get('/products/admin/erased', getDeleteAllProducts);
router.get('/products/admin/erased/:id', getDeleteProductsById);

export default router;
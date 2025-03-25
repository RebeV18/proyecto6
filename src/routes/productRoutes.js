import { Router } from 'express';
import { createProducts, deleteProductById, getAllProducts, getDeleteAllProducts, getDeleteProductsById, getProductsById, permaDeleteProductById, restoreProductById, updateProductById } from '../controllers/productController.js';

const routerProduct = Router();

routerProduct.get('/products', getAllProducts);
routerProduct.get('/products/:id', getProductsById);
routerProduct.post('/products', createProducts);
routerProduct.put('/products/:id', updateProductById);
routerProduct.delete('/products/admin/perma/:id', permaDeleteProductById);
routerProduct.delete('/products/:id', deleteProductById);
routerProduct.patch('/products/admin/restore/:id', restoreProductById);


routerProduct.get('/products/admin/erased', getDeleteAllProducts);
routerProduct.get('/products/admin/erased/:id', getDeleteProductsById);

export default routerProduct;
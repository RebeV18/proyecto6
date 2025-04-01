import { 
    createProductService, 
    deleteProductByIdService, 
    getAllDeleteProductsService, 
    getAllProductsService, 
    getDeleteProductByIdService, 
    getProductByIdService, 
    permaDeleteProductByIdService, 
    restoreProductByIdService, 
    updateProductByIdService 
} from '../services/products.service.js';

import { response } from '../utils/templates/response.template.js';

export const getAllProducts = async(req, res, next) => {
    try {
        const products = await getAllProductsService();
        response(res, products, 200, 'Productos encontrados con éxito');
    } catch (error) {
        next(error);
    }
};

export const getProductById = async(req, res, next) => {
    try {
        const { id } = req.params;
        const products = await getProductByIdService(id);
        response(
            res,
            products,
            200,
            `Usuarios con el id: ${id} encontrada con éxito`,
        );
    } catch (error) {
        next(error);
    }
};

export const createProduct = async(req, res, next) => {
    try {
        const dataProduct = req.body;
        const products = await createProductService(dataProduct);

        response(res, products, 201, 'Usuario creada con éxito');
    } catch (error) {
        next(error);
    }
};


export const updateProductById = async(req, res, next) => {
    try {
        const { id } = req.params;
        const dataProduct = req.body;

        const [ productOld, productUpdated ] = await updateProductByIdService(id, dataProduct);

        const custom = {
            oldData: productOld
        };
        
        response(res, productUpdated, 201, `Usuario con el id: ${id} actualizada con éxito`, custom);
    } catch (error) {
        next(error);
    }
};


/* ESTO NO SE TIENE QUE HACER*/
export const permaDeleteProductById = async(req, res, next) => {
    try {
        const { id } = req.params;
        const product = await permaDeleteProductByIdService(id);
        response(res, product, 200, `Usuario con el id: ${id} eliminada con éxito`);
    } catch (error) {
        next(error);
    }
};

/*SOFT DELETE*/

export const deleteProductById = async(req, res, next) => {
    try {
        const { id } = req.params;
        const product = await deleteProductByIdService(id);

        response(res, product, 200, `Usuario con el id: ${id} eliminada con éxito`);
    } catch (error) {
        next(error);
    }
};

export const restoreProductById = async(req, res, next) => {
    try {
        const { id } = req.params;
        const product = await restoreProductByIdService(id);
        response(res, product, 200, `Usuario con el id: ${id} restaurada con éxito`);
    } catch (error) {
        next(error);
    }
};


export const getDeleteAllProducts = async(req, res, next) => {
    try {
        const products = await getAllDeleteProductsService();
        response(res, products, 200, 'Usuarios encontrada con éxito');
    } catch (error) {
        next(error);
    }
};

export const getDeleteProductById = async(req, res, next) => {
    try {
        const { id } = req.params;
        const products = await getDeleteProductByIdService(id);
        response(
            res,
            products,
            200,
            `Usuarios con el id: ${id} encontrada con éxito`,
        );
    } catch (error) {
        next(error);
    }
};
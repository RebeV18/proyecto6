import { 
    createProductService, 
    deleteProductsByIdService, 
    getAllDeleteProductsService, 
    getAllProductsService, 
    getDeleteProductsByIdService, 
    getProductsByIdService, 
    permaDeleteProductByIdService, 
    restoreProductByIdService, 
    updateProductByIdService 
} from '../services/products.service.js';

import { response } from '../utils/templates/response.template.js';

export const getAllProducts = async(req, res, next) => {
    try {
        const products = await getAllProductsService();
        response(res, products, 200, 'Usuarios encontrados con éxito');
    } catch (error) {
        next(error);
    }
};

export const getProductsById = async(req, res, next) => {
    try {
        const { id } = req.params;
        const products = await getProductsByIdService(id);
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

export const createProducts = async(req, res, next) => {
    try {
        const dataProduct = req.body;
        const products = await createProductsService(dataProduct);

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
        const product = await deleteProductsByIdService(id);

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

export const getDeleteProductsById = async(req, res, next) => {
    try {
        const { id } = req.params;
        const products = await getDeleteProductsByIdService(id);
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
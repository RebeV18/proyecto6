import {
  createProductService,
  deleteProductByIdService,
  getAllDeleteProductsService,
  getAllProductsService,
  getDeleteProductByIdService,
  getProductByIdService,
  restoreProductByIdService,
  updateProductByIdService,
} from "../services/products.service.js";

import { response } from "../utils/templates/response.template.js";

export const getAllProducts = async (req, res, next) => {
  try {
    const products = await getAllProductsService();
    response(res, products, 200, "Productos encontrada con éxito");
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const products = await getProductByIdService(id);
    response(
      res,
      products,
      200,
      `Productos con el id: ${id} encontrada con éxito`
    );
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const dataProduct = req.body;
    const products = await createProductService(dataProduct);

    response(res, products, 201, "Producto creado con éxito");
  } catch (error) {
    next(error);
  }
};

export const updateProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const dataProduct = req.body;

    const [productOld, productUpdated] = await updateProductByIdService(
      id,
      dataProduct
    );

    const custom = {
      oldData: productOld,
    };

    response(
      res,
      productUpdated,
      201,
      `Producto con el id: ${id} actualizado con éxito`,
      custom
    );
  } catch (error) {
    next(error);
  }
};

/*SOFT DELETE*/
export const deleteProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await deleteProductByIdService(id);

    response(
      res,
      product,
      200,
      `Producto con el id: ${id} eliminado con éxito`
    );
  } catch (error) {
    next(error);
  }
};

export const restoreProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await restoreProductByIdService(id);
    response(
      res,
      product,
      200,
      `Producto con el id: ${id} restaurado con éxito`
    );
  } catch (error) {
    next(error);
  }
};

export const getDeleteAllProducts = async (req, res, next) => {
  try {
    const products = await getAllDeleteProductsService();
    response(
      res,
      products,
      200,
      "Productos eliminados fueron encontrados con éxito"
    );
  } catch (error) {
    next(error);
  }
};

export const getDeleteProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const products = await getDeleteProductByIdService(id);
    response(
      res,
      products,
      200,
      `Producto con el id: ${id} encontrado con éxito`
    );
  } catch (error) {
    next(error);
  }
};

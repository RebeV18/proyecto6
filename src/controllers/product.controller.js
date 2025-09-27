import { response } from "../helpers/response.helper.js";
import {
  createProductService,
  getAllProductsService,
  getProductByIdService,
  updateProductByIdService,
  deleteProductByIdService,
  restoreProductByIdService,
  searchProductsService,
} from "../services/product.service.js";

export const createProduct = async (req, res, next) => {
  try {
    const product = await createProductService(req.body);
    response(res, product, 201, "Producto creado con éxito");
  } catch (error) {
    next(error);
  }
};

export const getAllProducts = async (req, res, next) => {
  try {
    const products = await getAllProductsService();
    response(res, products, 200, "Productos encontrados con éxito");
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await getProductByIdService(id);
    response(res, product, 200, "Producto encontrado con éxito");
  } catch (error) {
    next(error);
  }
};

export const updateProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [oldProduct, updatedProduct] = await updateProductByIdService(
      id,
      req.body
    );

    const custom = {
      oldData: oldProduct,
    };

    response(
      res,
      updatedProduct,
      200,
      "Producto actualizado con éxito",
      custom
    );
  } catch (error) {
    next(error);
  }
};

export const deleteProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await deleteProductByIdService(id);
    response(res, product, 200, "Producto eliminado con éxito");
  } catch (error) {
    next(error);
  }
};

export const restoreProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await restoreProductByIdService(id);
    response(res, product, 200, "Producto restaurado con éxito");
  } catch (error) {
    next(error);
  }
};

export const searchProducts = async (req, res, next) => {
  try {
    const { q } = req.query;
    const products = await searchProductsService(q);
    response(res, products, 200, "Búsqueda completada con éxito");
  } catch (error) {
    next(error);
  }
};

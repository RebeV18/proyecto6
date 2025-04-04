import { ProductsError } from "../errors/TypeError.js";
import { Product } from "../model/Product.model.js";
import { notFoundActiveData, notFoundData } from "../utils/validate.js";

export const getAllProductsService = async () => {
  try {
    const products = await Product.find({ isActive: true });
    console.log(products);

    notFoundActiveData(
      products,
      "No pudimos encontrar los productos",
      "No pudimos encontrar productos en la colección de productos de la base de datos"
    );

    return products;
  } catch (error) {
    throw new ProductsError(
      "Error al intentar obtener todos los productos",
      500,
      error
    );
  }
};

export const getProductByIdService = async (id) => {
  try {
    const product = await Product.findById(id, { isActive: true });

    notFoundActiveData(
      product,
      `No pudimos encontrar el producto con el id: ${id}`,
      `No pudimos encontrar el producto con id: ${id} en la colección de productos de la base de datos`
    );

    return product;
  } catch (error) {
    throw new ProductsError(
      "Error al intentar obtener un producto por ID",
      500,
      error
    );
  }
};

export const createProductService = async (dataProduct) => {
  try {
    //TENEMOS QUE VALIDAR DATOS!!!!
    const product = await Product.create(dataProduct);

    return product;
  } catch (error) {
    throw new ProductsError("Error al intentar crear un producto", 500, error);
  }
};

export const updateProductByIdService = async (id, dataProduct) => {
  try {
    //TENEMOS QUE VALIDAR DATOS!!!!
    const productOld = await Product.findOneAndUpdate(
      { _id: id, isActive: true },
      dataProduct
    );

    const productUpdated = await Product.findById(id, { isActive: true });

    notFoundActiveData(
      productOld,
      `No pudimos encontrar el producto con el id: ${id}`,
      `No pudimos encontrar el producto con id: ${id} en la colección de productos de la base de datos`
    );

    return [productOld, productUpdated];
  } catch (error) {
    throw new ProductsError(
      "Error al intentar actualizar el producto con el ID",
      500,
      error
    );
  }
};

export const deleteProductByIdService = async (id) => {
  try {
    const product = await Product.findByIdAndUpdate(id, { isActive: false });

    notFoundActiveData(
      product,
      `No pudimos encontrar el producto con el id: ${id}`,
      `No pudimos encontrar el producto con id: ${id} en la colección de productos de la base de datos`
    );

    return product;
  } catch (error) {
    throw new ProductsError(
      `Error al intentar eliminar el producto con el ID: ${id}`,
      500,
      error
    );
  }
};

export const restoreProductByIdService = async (id) => {
  try {
    const product = await Product.findByIdAndUpdate(id, { isActive: true });

    notFoundData(
      product,
      `No pudimos encontrar el producto con el id: ${id}`,
      `No pudimos encontrar el producto con id: ${id} en la colección de productos de la base de datos`
    );

    return product;
  } catch (error) {
    throw new ProductsError(
      `Error al intentar restaurar el producto con el ID: ${id}`,
      500,
      error
    );
  }
};

export const getAllDeletedProductsService = async () => {
  try {
    const products = await Product.find({ isActive: false });
    console.log(products);

    notFoundData(
      products,
      "No pudimos encontrar los productos",
      "No pudimos encontrar productos en la colección de productos de la base de datos"
    );

    return products;
  } catch (error) {
    throw new ProductsError(
      "Error al intentar obtener todos los productos",
      500,
      error
    );
  }
};

export const getDeletedProductByIdService = async (id) => {
  try {
    const product = await Product.findById(id, { isActive: false });

    notFoundData(
      product,
      `No pudimos encontrar el producto con el id: ${id}`,
      `No pudimos encontrar el producto con id: ${id} en la colección de productos de la base de datos`
    );

    return product;
  } catch (error) {
    throw new ProductsError(
      "Error al intentar obtener un producto por ID",
      500,
      error
    );
  }
};

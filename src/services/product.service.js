import { db } from "../config/firebase.config.js";
import { AuthError } from "../errors/TypeError.js";
import {
  validateProductData,
  sanitizeProductData,
  prepareProductForSave,
  prepareProductForUpdate,
  buildSearchQuery,
} from "../helpers/product.helpers.js";

// Crear producto
export const createProductService = async (productData) => {
  try {
    validateProductData(productData);
    const newProduct = prepareProductForSave(productData);
    const docRef = await db.runTransaction(async (transaction) => {
      const productRef = db.collection("products").doc();
      transaction.set(productRef, newProduct);
      return productRef;
    });

    const createdProduct = await docRef.get();
    const productWithId = {
      id: docRef.id,
      ...createdProduct.data(),
    };

    return sanitizeProductData(productWithId);
  } catch (error) {
    if (error instanceof AuthError) {
      throw error;
    }
    console.error("Error en createProductService:", error);
    throw new Error("Error al crear producto: " + error.message);
  }
};

export const getAllProductsService = async (limit = 50, offset = 0) => {
  try {
    let query = db
      .collection("products")
      .where("isActive", "==", true)
      .orderBy("createdAt", "desc");

    if (limit) {
      query = query.limit(limit);
    }

    if (offset) {
      query = query.offset(offset);
    }

    const snapshot = await query.get();

    const products = [];
    snapshot.forEach((doc) => {
      const productData = { id: doc.id, ...doc.data() };
      products.push(sanitizeProductData(productData));
    });

    return products;
  } catch (error) {
    console.error("Error en getAllProductsService:", error);
    throw new Error("Error al obtener productos: " + error.message);
  }
};

export const getProductByIdService = async (productId) => {
  try {
    const productDoc = await db.collection("products").doc(productId).get();

    if (!productDoc.exists) {
      throw new AuthError("Producto no encontrado", 404);
    }

    const product = productDoc.data();

    if (!product.isActive) {
      throw new AuthError("Producto no disponible", 403);
    }

    const productWithId = { id: productDoc.id, ...product };
    return sanitizeProductData(productWithId);
  } catch (error) {
    if (error instanceof AuthError) {
      throw error;
    }
    console.error("Error en getProductByIdService:", error);
    throw new Error("Error al obtener producto: " + error.message);
  }
};

export const updateProductByIdService = async (productId, updateData) => {
  try {
    const result = await db.runTransaction(async (transaction) => {
      const productRef = db.collection("products").doc(productId);
      const productDoc = await transaction.get(productRef);

      if (!productDoc.exists) {
        throw new AuthError("Producto no encontrado", 404);
      }

      const oldProduct = productDoc.data();

      if (!oldProduct.isActive) {
        throw new AuthError("No se puede actualizar un producto inactivo", 403);
      }

      const updatedData = prepareProductForUpdate(updateData);

      if (Object.keys(updateData).some((key) => key !== "updatedAt")) {
        validateProductData({ ...oldProduct, ...updatedData });
      }

      transaction.update(productRef, updatedData);

      return {
        oldProduct: { id: productDoc.id, ...oldProduct },
        updatedProduct: { id: productDoc.id, ...oldProduct, ...updatedData },
      };
    });

    return [
      sanitizeProductData(result.oldProduct),
      sanitizeProductData(result.updatedProduct),
    ];
  } catch (error) {
    if (error instanceof AuthError) {
      throw error;
    }
    console.error("Error en updateProductByIdService:", error);
    throw new Error("Error al actualizar producto: " + error.message);
  }
};

export const deleteProductByIdService = async (productId) => {
  try {
    const result = await db.runTransaction(async (transaction) => {
      const productRef = db.collection("products").doc(productId);
      const productDoc = await transaction.get(productRef);

      if (!productDoc.exists) {
        throw new AuthError("Producto no encontrado", 404);
      }

      const product = productDoc.data();

      if (!product.isActive) {
        throw new AuthError("El producto ya está inactivo", 403);
      }

      transaction.update(productRef, {
        isActive: false,
        updatedAt: new Date().toISOString(),
      });

      return { id: productDoc.id, ...product };
    });

    return sanitizeProductData(result);
  } catch (error) {
    if (error instanceof AuthError) {
      throw error;
    }
    console.error("Error en deleteProductByIdService:", error);
    throw new Error("Error al eliminar producto: " + error.message);
  }
};

export const restoreProductByIdService = async (productId) => {
  try {
    const result = await db.runTransaction(async (transaction) => {
      const productRef = db.collection("products").doc(productId);
      const productDoc = await transaction.get(productRef);

      if (!productDoc.exists) {
        throw new AuthError("Producto no encontrado", 404);
      }

      const product = productDoc.data();

      if (product.isActive) {
        throw new AuthError("El producto ya está activo", 403);
      }

      const updatedData = {
        isActive: true,
        updatedAt: new Date().toISOString(),
      };

      transaction.update(productRef, updatedData);

      return { id: productDoc.id, ...product, ...updatedData };
    });

    return sanitizeProductData(result);
  } catch (error) {
    if (error instanceof AuthError) {
      throw error;
    }
    console.error("Error en restoreProductByIdService:", error);
    throw new Error("Error al restaurar producto: " + error.message);
  }
};

export const searchProductsService = async (searchTerm, limit = 20) => {
  try {
    const query = buildSearchQuery(searchTerm);

    if (!query) {
      return getAllProductsService(limit);
    }

    const snapshot = await db
      .collection("products")
      .where("isActive", "==", true)
      .limit(limit * 3)
      .get();

    const products = [];
    const searchTermLower = query;

    snapshot.forEach((doc) => {
      const product = doc.data();
      const productWithId = { id: doc.id, ...product };

      const searchableText = [product.cancion, product.autores, product.cd]
        .join(" ")
        .toLowerCase();

      if (searchableText.includes(searchTermLower)) {
        products.push(sanitizeProductData(productWithId));
      }
    });

    return products.slice(0, limit);
  } catch (error) {
    console.error("Error en searchProductsService:", error);
    throw new Error("Error al buscar productos: " + error.message);
  }
};

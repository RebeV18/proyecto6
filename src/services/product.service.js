import { db } from "../config/firebase.config.js";
import { AuthError } from "../errors/TypeError.js";
import {
  sanitizeProductData,
  prepareProductForSave,
  prepareProductForUpdate,
  buildSearchQuery,
  validateCompleteProduct,
  getNextAvailableTrack,
} from "../helpers/product.helpers.js";

export const createProductService = async (productData) => {
  try {
    if (!productData.track) {
      productData.track = await getNextAvailableTrack(productData.cd, db);
      console.log(`🔢 Track asignado automáticamente: ${productData.track}`);
    }

    await validateCompleteProduct(productData, db);

    const newProduct = prepareProductForSave(productData);

    const docRef = await db.runTransaction(async (transaction) => {
      const productRef = db.collection("products").doc();

      await validateCompleteProduct(productData, db);

      transaction.set(productRef, newProduct);
      return productRef;
    });

    const createdProduct = await docRef.get();
    const productWithId = {
      id: docRef.id,
      ...createdProduct.data(),
    };

    console.log("✅ Producto creado exitosamente:", docRef.id);
    return sanitizeProductData(productWithId);
  } catch (error) {
    if (error instanceof AuthError) {
      throw error;
    }
    console.error("❌ Error en createProductService:", error);
    throw new Error("Error al crear producto: " + error.message);
  }
};

export const getAllProductsService = async (limit = 50, offset = 0) => {
  try {
    let query = db
      .collection("products")
      .where("isActive", "==", true)
      .orderBy("cd")
      .orderBy("track");

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

      const completeData = { ...oldProduct, ...updateData };

      if (Object.keys(updateData).some((key) => key !== "updatedAt")) {
        await validateCompleteProduct(completeData, db, productId);
      }

      const updatedData = prepareProductForUpdate(updateData);
      transaction.update(productRef, updatedData);

      return {
        oldProduct: { id: productDoc.id, ...oldProduct },
        updatedProduct: { id: productDoc.id, ...oldProduct, ...updatedData },
      };
    });

    console.log("✅ Producto actualizado exitosamente:", productId);
    return [
      sanitizeProductData(result.oldProduct),
      sanitizeProductData(result.updatedProduct),
    ];
  } catch (error) {
    if (error instanceof AuthError) {
      throw error;
    }
    console.error("❌ Error en updateProductByIdService:", error);
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

    console.log("✅ Producto eliminado (soft delete):", productId);
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

      await validateCompleteProduct(product, db, productId);

      const updatedData = {
        isActive: true,
        updatedAt: new Date().toISOString(),
      };

      transaction.update(productRef, updatedData);

      return { id: productDoc.id, ...product, ...updatedData };
    });

    console.log("✅ Producto restaurado exitosamente:", productId);
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

export const getProductsByCdService = async (cdName, limit = 50) => {
  try {
    const snapshot = await db
      .collection("products")
      .where("isActive", "==", true)
      .where("cd", "==", cdName)
      .orderBy("track")
      .limit(limit)
      .get();

    if (snapshot.empty) {
      throw new AuthError(
        `No se encontraron canciones en el CD "${cdName}"`,
        404
      );
    }

    const products = [];
    snapshot.forEach((doc) => {
      const productData = { id: doc.id, ...doc.data() };
      products.push(sanitizeProductData(productData));
    });

    console.log(
      `✅ Encontradas ${products.length} canciones en CD "${cdName}"`
    );
    return products;
  } catch (error) {
    if (error instanceof AuthError) {
      throw error;
    }
    console.error("Error en getProductsByCdService:", error);
    throw new Error("Error al obtener productos por CD: " + error.message);
  }
};

export const getProductByCancionService = async (cancionName) => {
  try {
    const snapshot = await db
      .collection("products")
      .where("isActive", "==", true)
      .where("cancion", "==", cancionName)
      .limit(1)
      .get();

    if (snapshot.empty) {
      throw new AuthError(`No se encontró la canción "${cancionName}"`, 404);
    }

    const doc = snapshot.docs[0];
    const productData = { id: doc.id, ...doc.data() };

    console.log(`✅ Canción encontrada: "${cancionName}"`);
    return sanitizeProductData(productData);
  } catch (error) {
    if (error instanceof AuthError) {
      throw error;
    }
    console.error("Error en getProductByCancionService:", error);
    throw new Error("Error al obtener producto por canción: " + error.message);
  }
};

export const getAvailableTracksForCdService = async (cdName) => {
  try {
    const snapshot = await db
      .collection("products")
      .where("isActive", "==", true)
      .where("cd", "==", cdName)
      .orderBy("track")
      .get();

    const usedTracks = [];
    snapshot.forEach((doc) => {
      usedTracks.push(doc.data().track);
    });

    const availableTracks = [];
    for (let i = 1; i <= 999; i++) {
      if (!usedTracks.includes(i)) {
        availableTracks.push(i);
      }
    }

    return {
      cd: cdName,
      usedTracks: usedTracks.sort((a, b) => a - b),
      availableTracks: availableTracks.slice(0, 20),
      totalSongs: usedTracks.length,
      nextAvailable: availableTracks[0] || null,
    };
  } catch (error) {
    console.error("Error en getAvailableTracksForCdService:", error);
    throw new Error("Error al obtener tracks disponibles: " + error.message);
  }
};

import { AuthError } from "../errors/TypeError.js";

// Validación
const URL_REGEX = /^https?:\/\/.+/;

export const validateProductData = (productData) => {
  const errors = [];
  const currentYear = new Date().getFullYear();

  // Validar campos requeridos con trim
  const requiredFields = {
    cancion: "La canción es requerida",
    autores: "Los autores son requeridos",
    cd: "El CD es requerido",
    imagen: "La imagen es requerida",
    apple: "El enlace de Apple Music es requerido",
    spotify: "El enlace de Spotify es requerido",
    youtube: "El enlace de YouTube es requerido",
    track: "El número de track es requerido",
  };

  Object.entries(requiredFields).forEach(([field, message]) => {
    if (!productData[field] || String(productData[field]).trim() === "") {
      errors.push(message);
    }
  });

  // Validar precio
  if (productData.precio === undefined || productData.precio === null) {
    errors.push("El precio es requerido");
  } else {
    const precio = Number(productData.precio);
    if (isNaN(precio) || precio <= 0 || precio > 1000000) {
      errors.push("El precio debe ser un número entre 1 y 1,000,000");
    }
  }

  // Validar año
  if (
    productData.anho_lanzamiento === undefined ||
    productData.anho_lanzamiento === null
  ) {
    errors.push("El año de lanzamiento es requerido");
  } else {
    const anho = Number(productData.anho_lanzamiento);
    if (isNaN(anho) || anho < 1900 || anho > currentYear) {
      errors.push(`El año debe estar entre 1900 y ${currentYear}`);
    }
  }

  // Validar track
  if (productData.track === undefined || productData.track === null) {
    errors.push("El número de track es requerido");
  } else {
    const trackNum = Number(productData.track);
    if (isNaN(trackNum) || trackNum < 1 || trackNum > 999) {
      errors.push("El número de track debe estar entre 1 y 999");
    }
  }

  // Validar URLs
  const urlFields = {
    imagen: "La imagen debe ser una URL válida",
    apple: "El enlace de Apple Music debe ser una URL válida",
    spotify: "El enlace de Spotify debe ser una URL válida",
    youtube: "El enlace de YouTube debe ser una URL válida",
  };

  Object.entries(urlFields).forEach(([field, message]) => {
    if (productData[field] && !URL_REGEX.test(productData[field])) {
      errors.push(message);
    }
  });

  if (errors.length > 0) {
    throw new AuthError(`Errores de validación: ${errors.join(", ")}`, 400);
  }

  return true;
};

// ✅ FUNCIONES DE VALIDACIÓN DE UNICIDAD (FUERA DE validateProductData)
export const validateUniqueTrackInCD = async (
  cd,
  track,
  productId = null,
  firestore
) => {
  try {
    console.log(
      `🔍 Validando track único: CD="${cd}", Track=${track}, ProductID=${productId}`
    );

    // Busca productos activos con el mismo CD y track
    const query = firestore
      .collection("products")
      .where("cd", "==", cd)
      .where("track", "==", Number(track))
      .where("isActive", "==", true);

    const snapshot = await query.get();

    // Si es actualización, excluir el producto actual
    if (productId && !snapshot.empty) {
      const conflictingDocs = snapshot.docs.filter(
        (doc) => doc.id !== productId
      );
      if (conflictingDocs.length > 0) {
        const conflictingProduct = conflictingDocs[0].data();
        throw new AuthError(
          `El track ${track} ya existe en el CD "${cd}" (Canción: "${conflictingProduct.cancion}")`,
          409
        );
      }
    } else if (!productId && !snapshot.empty) {
      // Si es creación y ya existe
      const conflictingProduct = snapshot.docs[0].data();
      throw new AuthError(
        `El track ${track} ya existe en el CD "${cd}" (Canción: "${conflictingProduct.cancion}")`,
        409
      );
    }

    console.log("✅ Track único validado correctamente");
    return true;
  } catch (error) {
    console.error("❌ Error validando track único:", error.message);
    throw error;
  }
};

export const validateUniqueSongInCD = async (
  cd,
  cancion,
  productId = null,
  firestore
) => {
  try {
    console.log(
      `🔍 Validando canción única: CD="${cd}", Canción="${cancion}", ProductID=${productId}`
    );

    const query = firestore
      .collection("products")
      .where("cd", "==", cd)
      .where("cancion", "==", cancion)
      .where("isActive", "==", true);

    const snapshot = await query.get();

    if (productId && !snapshot.empty) {
      const conflictingDocs = snapshot.docs.filter(
        (doc) => doc.id !== productId
      );
      if (conflictingDocs.length > 0) {
        throw new AuthError(
          `La canción "${cancion}" ya existe en el CD "${cd}"`,
          409
        );
      }
    } else if (!productId && !snapshot.empty) {
      throw new AuthError(
        `La canción "${cancion}" ya existe en el CD "${cd}"`,
        409
      );
    }

    console.log("✅ Canción única validada correctamente");
    return true;
  } catch (error) {
    console.error("❌ Error validando canción única:", error.message);
    throw error;
  }
};

// ✅ FUNCIÓN DE VALIDACIÓN COMPLETA
export const validateCompleteProduct = async (
  productData,
  firestore,
  productId = null
) => {
  try {
    console.log("🔍 Iniciando validación completa de producto...");

    // 1. Validaciones básicas de formato
    validateProductData(productData);

    // 2. Validar unicidad de track en CD
    await validateUniqueTrackInCD(
      productData.cd,
      productData.track,
      productId,
      firestore
    );

    // 3. Validar unicidad de canción en CD
    await validateUniqueSongInCD(
      productData.cd,
      productData.cancion,
      productId,
      firestore
    );

    console.log("✅ Validación completa exitosa");
    return true;
  } catch (error) {
    console.error("❌ Error en validación completa:", error.message);
    throw error;
  }
};

// ✅ FUNCIÓN PARA OBTENER SIGUIENTE TRACK DISPONIBLE
export const getNextAvailableTrack = async (cd, firestore) => {
  try {
    console.log(`🔍 Buscando siguiente track disponible para CD: "${cd}"`);

    const query = firestore
      .collection("products")
      .where("cd", "==", cd)
      .where("isActive", "==", true)
      .orderBy("track");

    const snapshot = await query.get();

    if (snapshot.empty) {
      console.log("✅ Primer track del CD, retornando 1");
      return 1;
    }

    const usedTracks = snapshot.docs.map((doc) => doc.data().track);

    // Buscar el primer número disponible
    for (let i = 1; i <= 999; i++) {
      if (!usedTracks.includes(i)) {
        console.log(`✅ Siguiente track disponible: ${i}`);
        return i;
      }
    }

    throw new AuthError(
      `No hay tracks disponibles en el CD "${cd}" (máximo 999 tracks)`,
      400
    );
  } catch (error) {
    console.error("❌ Error obteniendo siguiente track:", error.message);
    throw error;
  }
};

// Sanitización
export const sanitizeProductData = (productData) => {
  // eslint-disable-next-line no-unused-vars
  const { isActive, password, ...cleanData } = productData;
  return cleanData;
};

// Preparación para guardar
export const prepareProductForSave = (productData) => {
  const timestamp = new Date().toISOString();

  return {
    cancion: String(productData.cancion).trim(),
    autores: String(productData.autores).trim(),
    cd: String(productData.cd).trim(),
    precio: Number(productData.precio),
    imagen: String(productData.imagen).trim(),
    anho_lanzamiento: Number(productData.anho_lanzamiento),
    track: Number(productData.track),
    apple: String(productData.apple).trim(),
    spotify: String(productData.spotify).trim(),
    youtube: String(productData.youtube).trim(),
    isActive:
      productData.isActive !== undefined ? Boolean(productData.isActive) : true,
    createdAt: timestamp,
    updatedAt: timestamp,
  };
};

// Preparación para actualizar
export const prepareProductForUpdate = (updateData) => {
  const cleanData = {};

  const stringFields = [
    "cancion",
    "autores",
    "cd",
    "imagen",
    "apple",
    "spotify",
    "youtube",
  ];
  stringFields.forEach((field) => {
    if (updateData[field] !== undefined) {
      cleanData[field] = String(updateData[field]).trim();
    }
  });

  const numberFields = ["precio", "anho_lanzamiento", "track"];
  numberFields.forEach((field) => {
    if (updateData[field] !== undefined) {
      cleanData[field] = Number(updateData[field]);
    }
  });

  if (updateData.isActive !== undefined) {
    cleanData.isActive = Boolean(updateData.isActive);
  }

  cleanData.updatedAt = new Date().toISOString();
  return cleanData;
};

// Función de búsqueda optimizada
export const buildSearchQuery = (searchTerm) => {
  if (!searchTerm || searchTerm.trim().length === 0) {
    return null;
  }

  return searchTerm.toLowerCase().trim();
};

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

  if (
    productData.track === undefined ||
    productData.track === null
  ) {
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

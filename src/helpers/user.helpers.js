import { AuthError } from "../errors/TypeError.js";

// Validar estructura del usuario
export const validateUserData = (userData, isUpdate = false) => {
  const errors = [];

  if (!isUpdate || userData.nombre !== undefined) {
    if (!userData.nombre || userData.nombre.trim() === "") {
      errors.push("El nombre es requerido");
    }
  }

  if (!isUpdate || userData.apellido !== undefined) {
    if (!userData.apellido || userData.apellido.trim() === "") {
      errors.push("El apellido es requerido");
    }
  }

  if (!isUpdate || userData.pais !== undefined) {
    if (!userData.pais || userData.pais.trim() === "") {
      errors.push("El país es requerido");
    }
  }

  if (!isUpdate || userData.email !== undefined) {
    if (!userData.email || userData.email.trim() === "") {
      errors.push("El email es requerido");
    } else {
      const emailRegex = /.+@.+\..+/;
      if (!emailRegex.test(userData.email)) {
        errors.push("El correo no es válido");
      }
    }
  }

  if (!isUpdate || userData.telefono !== undefined) {
    if (!userData.telefono || userData.telefono.trim() === "") {
      errors.push("El teléfono es requerido");
    } else {
      const telefonoRegex = /^\+[0-9]{11}$/;
      if (!telefonoRegex.test(userData.telefono)) {
        errors.push("El teléfono debe tener formato +56999999999");
      }
    }
  }

  if (!isUpdate || userData.password !== undefined) {
    if (!userData.password || userData.password.trim() === "") {
      errors.push("La contraseña es requerida");
    } else if (userData.password.length < 6) {
      errors.push("La contraseña debe tener al menos 6 caracteres");
    }
  }

  if (errors.length > 0) {
    throw new AuthError(`Errores de validación: ${errors.join(", ")}`, 400);
  }

  return true;
};

// Limpiar y normalizar datos del usuario
export const sanitizeUserData = (userData) => {
  const cleanData = { ...userData };
  delete cleanData.password;
  return cleanData;
};

// Preparar datos para guardar en Firebase
export const prepareUserForSave = (userData) => {
  return {
    uid: userData.uid,
    nombre: userData.nombre.trim(),
    apellido: userData.apellido.trim(),
    pais: userData.pais.trim(),
    email: userData.email.toLowerCase().trim(),
    telefono: userData.telefono.trim(),
    password: userData.password, // Ya viene hasheado del service
    isActive: userData.isActive !== undefined ? userData.isActive : true,
    isAdmin: userData.isAdmin !== undefined ? userData.isAdmin : false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
};

// Preparar datos para actualizar
export const prepareUserForUpdate = (updateData) => {
  const cleanData = { ...updateData };

  if (cleanData.nombre) cleanData.nombre = cleanData.nombre.trim();
  if (cleanData.apellido) cleanData.apellido = cleanData.apellido.trim();
  if (cleanData.pais) cleanData.pais = cleanData.pais.trim();
  if (cleanData.email) cleanData.email = cleanData.email.toLowerCase().trim();
  if (cleanData.telefono) cleanData.telefono = cleanData.telefono.trim();

  cleanData.updatedAt = new Date().toISOString();

  return cleanData;
};

// Validar datos específicos para registro
export const validateRegistrationData = (userData) => {
  validateUserData(userData, false);
  return true;
};

// Validar datos específicos para login
export const validateLoginData = (loginData) => {
  const errors = [];

  if (!loginData.email || loginData.email.trim() === "") {
    errors.push("El email es requerido");
  } else {
    const emailRegex = /.+@.+\..+/;
    if (!emailRegex.test(loginData.email)) {
      errors.push("El correo no es válido");
    }
  }

  if (!loginData.password || loginData.password.trim() === "") {
    errors.push("La contraseña es requerida");
  }

  if (errors.length > 0) {
    throw new AuthError(`Errores de validación: ${errors.join(", ")}`, 400);
  }

  return true;
};

import { ValidationError } from "../errors/TypeError.js";

export const formatUserData = (hashedPassword, ...rest) => {
  const [nombre, apellido, pais, email, telefono, isAdmin = false] = rest;

  if (!nombre) {
    throw new ValidationError(
      "Faltan nombre obligatorios para crear el usuario"
    );
  }
  if (!apellido) {
    throw new ValidationError(
      "Faltan apellido obligatorios para crear el usuario"
    );
  }
  if (!pais) {
    throw new ValidationError(
      "Falta datos de su país obligatorio para crear el usuario"
    );
  }
  if (!email) {
    throw new ValidationError(
      "Faltan correo obligatorios para crear el usuario"
    );
  }
  if (!telefono) {
    throw new ValidationError(
      "Faltan telefono obligatorios para crear el usuario"
    );
  }
  if (!hashedPassword) {
    throw new ValidationError(
      "Faltan password obligatorios para crear el usuario"
    );
  }

  return {
    nombre,
    apellido,
    pais,
    email,
    telefono,
    password: hashedPassword,
    isAdmin,
  };
};

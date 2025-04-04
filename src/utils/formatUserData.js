import { ValidationError } from "../errors/TypeError.js";

export const formatUserData = (hashedPassword, ...rest) => {
  const [nombre, apellido, pais, email, telefono, isAdmin = false] = rest;

  if (!nombre) {
    throw new ValidationError("Favor ingresar su nombre crear el usuario");
  }
  if (!apellido) {
    throw new ValidationError(
      "Favor ingresar su apellido para crear el usuario"
    );
  }
  if (!pais) {
    throw new ValidationError("Favor ingresar su país para crear el usuario");
  }
  if (!email) {
    throw new ValidationError(
      "Favor ingresar su correo electrónico para crear el usuario"
    );
  }
  if (!telefono) {
    throw new ValidationError(
      "Favor ingresar su teléfono para crear el usuario"
    );
  }
  if (!hashedPassword) {
    throw new ValidationError(
      "Favor ingresar su contraseña para crear el usuario"
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

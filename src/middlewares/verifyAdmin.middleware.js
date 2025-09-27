import { AuthError } from "../errors/TypeError.js";

export const verifyAdmin = (req, res, next) => {
  try {
    if (!req.user) {
      throw new AuthError("Usuario no autenticado", 401);
    }

    if (!req.user.isAdmin) {
      throw new AuthError(
        "Acceso denegado. Se requieren permisos de administrador",
        403
      );
    }

    next();
  } catch (error) {
    next(error);
  }
};

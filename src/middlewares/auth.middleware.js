import jwt from "jsonwebtoken";
import { envs } from "../config/envs.config.js";
import { AuthError } from "../errors/TypeError.js";

const { secretKey } = envs.auth;

export const authMiddleware = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const token = authorization?.startsWith("Bearer ")
      ? authorization.slice(7)
      : null;

    if (!token) throw new AuthError("Token no proporcionado", 401);

    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      throw new AuthError(
        "El token ha expirado. Por favor, renueva tu sesión.",
        401
      );
    }
    throw new AuthError("Token inválido o inesperado", 500, error);
  }
};
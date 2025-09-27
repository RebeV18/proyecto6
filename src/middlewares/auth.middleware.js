import jwt from "jsonwebtoken";
import { envs } from "../config/envs.config.js";
import { AuthError } from "../errors/TypeError.js";

const { secretKey } = envs.auth;

export const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new AuthError("Token de acceso requerido", 401);
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      throw new AuthError("Token de acceso requerido", 401);
    }

    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;

    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      next(new AuthError("Token inválido", 401));
    } else if (error.name === "TokenExpiredError") {
      next(new AuthError("Token expirado", 401));
    } else {
      next(error);
    }
  }
};

export const verifyTokenMiddleware = (req, res, next) => {
  return authMiddleware(req, res, next);
};

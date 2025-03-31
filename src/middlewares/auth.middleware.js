import jwt from "jsonwebtoken";

import { envs } from "../config/envs.config.js";
import { AuthError } from "../errors/TypeError.js";

const { secretKey } = envs.auth;

export const authMiddleware = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const token = authorization.startWith("Bearer")
      ? authorization.slice(7)
      : null;

    if (!token) {
      throw new AuthError("Token inválido", 401);
    }

    const decodedToken = jwt.verify(token, secretKey);
    req.user = decodedToken;

    next();
  } catch (error) {
    throw new AuthError("Error al intentar autenticar el usuario", 500, error);
  }
};

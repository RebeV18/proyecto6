import jwt from "jsonwebtoken";

import { AuthError } from "../errors/TypeError.js";
import { User } from "../models/User.model.js";
import { formatUserData } from "../utils/formatUserData.js";
import { comparePassword, hashPassword } from "../utils/hashPassword.js";

import { envs } from "../config/envs.config.js";

const { secretKey, jwtExpiration } = envs.auth;

export const registerService = async ({
  nombre,
  apellido,
  pais,
  email,
  telefono,
  password,
  isAdmin = false,
}) => {
  try {
    const hashedPassword = await hashPassword(password);

    console.log(hashedPassword);

    const userData = formatUserData(
      hashedPassword,
      nombre,
      apellido,
      pais,
      email,
      telefono,
      isAdmin
    );
    console.log(userData);

    const user = await User.create(userData);

    return user;
  } catch (error) {
    console.error(error);
    throw new Error("Error al intentar registrar el usuario", 500, error);
  }
};

export const loginService = async ({ email, password }) => {
  try {
    const user = await User.findOne({ email });

    const passwordMatch = await comparePassword(password, user.password);

    if (!user || !passwordMatch) {
      throw new AuthError("Credenciales incorrectas", 401);
    }

    const token = jwt.sign(
      {
        uid: user._id,
        nombre: user.nombre,
        email: user.email,
        isAdmin: user.isAdmin,
      },
      secretKey,
      {
        expiresIn: jwtExpiration,
      }
    );

    return [user, token];
  } catch (error) {
    throw new AuthError("Error al intentar iniciar sesión", 500, error);
  }
};

export const getAllUsersService = async () => {
  try {
    const users = await User.find({ isActive: true });
    console.log(users);
    return users;
  } catch (error) {
    throw new Error("Error al intentar obtener todos los usuarios", 500, error);
  }
};

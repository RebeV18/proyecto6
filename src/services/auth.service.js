import jwt from "jsonwebtoken";

import { AuthError, UserError } from "../errors/TypeError.js";
import { User } from "../models/User.model.js";
import { formatUserData } from "../utils/formatUserData.js";
import { comparePassword, hashPassword } from "../utils/hashPassword.js";
import { notFoundActiveData } from "../utils/validate.js";

import { envs } from "../config/envs.config.js";

const { secretKey, refreshSecretKey, jwtExpiration } = envs.auth;

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

    const userData = formatUserData(
      hashedPassword,
      nombre,
      apellido,
      pais,
      email,
      telefono,
      isAdmin
    );

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
    return users;
  } catch (error) {
    throw new Error("Error al intentar obtener todos los usuarios", 500, error);
  }
};

export const updateUserByIdService = async (id, dataUser) => {
  try {
    const oldUser = await User.findOneAndUpdate(
      { _id: id, isActive: true },
      dataUser
    );

    const updatedUser = await User.findById(id, { isActive: true });

    notFoundActiveData(
      oldUser,
      `No pudimos encontrar el usuario con el id: ${id}`,
      `No pudimos encontrar el usuario con id: ${id} en la colección de usuarios de la base de datos`
    );

    return [oldUser, updatedUser];
  } catch (error) {
    throw new UserError(
      "Error al intentar actualizar el usuario con el ID",
      500,
      error
    );
  }
};

export const refreshTokenService = async (refreshToken) => {
  try {
    if (!refreshToken)
      throw new AuthError("Refresh token no proporcionado", 401);

    const decoded = jwt.verify(refreshToken, refreshSecretKey);

    const newAccessToken = jwt.sign({ uid: decoded.uid }, secretKey, {
      expiresIn: envs.auth.jwtExpiration,
    });

    return newAccessToken;
  } catch (error) {
    throw new AuthError("Refresh token inválido o expirado", 401, error);
  }
};

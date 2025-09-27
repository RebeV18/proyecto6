import bcrypt from "bcryptjs";
import { envs } from "../config/envs.config.js";

const { saltRounds } = envs.auth;

export const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(parseInt(saltRounds));
    return await bcrypt.hash(password, salt);
  } catch (error) {
    throw new Error("Error al hashear la contraseña: " + error.message);
  }
};

export const comparePassword = async (password, hashedPassword) => {
  try {
    return await bcrypt.compare(password, hashedPassword);
  } catch (error) {
    throw new Error("Error al comparar contraseñas: " + error.message);
  }
};

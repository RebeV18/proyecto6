import bcrypt from "bcrypt";
import { envs } from "../config/envs.config.js";
import { AuthError } from "../errors/TypeError.js";
 
const { saltRounds } = envs.auth;
 
export const hashPassword = async (password) => {
  try {
    const rounds = Number(saltRounds);
    if (isNaN(rounds) || rounds <= 0) {
      throw new AuthError("El valor de saltRounds no es válido", 500);
    }
    const hashedPassword = await bcrypt.hash(password, rounds);
    return hashedPassword;
  } catch (error) {
    throw new AuthError("Error al intentar hashear la contraseña", 500, error);
  }
};
 
export const comparePassword = async (plainPassword, hashedPassword) => {
  try {
    return await bcrypt.compare(plainPassword, hashedPassword);
  } catch (error) {
    throw new AuthError("Error al intentar comparar la contraseña", 500, error);
  }
};
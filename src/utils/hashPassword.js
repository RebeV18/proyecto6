import bccrypt from 'bcryptjs';
import { AuthError } from '../errors/TypeError.js';
import { envs } from "../config/envs.config.js";

const { saltRounds } = envs.auth;

export const hashPassword = async (password) => {
    try {
        const hashedPassword = await bccrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        throw new AuthError('Error al encriptar la contraseña', 500, error);
    }
};


export const comparePassword = async (plainPassword, hashedPassword) => {
    try {
        const isMatch = await bccrypt.compare(plainPassword, hashedPassword);
        return isMatch;
    } catch (error) {
        throw new AuthError('Error al intentar comparar la contraseña', 500, error);
    }
};


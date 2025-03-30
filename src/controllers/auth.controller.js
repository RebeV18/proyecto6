import { registerService } from '../services/auth.service.js';

export const register = async(req, res, next) => {
    try {
        const userData = req.body;
        const user = await registerService(userData);
        response(res, user, 201, 'Usuario creado con éxito');
    } catch (error) {
        next(error);
    }
};

export const login = async(req, res, next) => {
    try {
        const [user, token] = await loginService(req.body);
        const custom = {
            token
        };
        response(res, user, 200, 'Usuario logueado con éxito', custom);
    } catch (error) {
        next(error);
    }
}

export const getAllUsers = async(req, res, next) => {
    try {
        const users = await getAllUsersService();
        response(res, users, 200, 'Usuarios encontrados con éxito');
    } catch (error) {
        next(error);
    }
};
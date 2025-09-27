import { response } from "../helpers/response.helper.js";
import {
  registerService,
  loginService,
  getAllUsersService,
  getUserByIdService,
  updateUserByIdService,
} from "../services/user.service.js";

export const register = async (req, res, next) => {
  try {
    const user = await registerService(req.body);
    response(res, user, 201, "Usuario registrado con éxito");
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const [user, token] = await loginService(req.body);

    const custom = {
      token,
    };

    response(res, user, 200, "Inicio de sesión exitoso", custom);
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await getAllUsersService();
    response(res, users, 200, "Usuarios encontrados con éxito");
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await getUserByIdService(id);
    response(res, user, 200, "Usuario encontrado con éxito");
  } catch (error) {
    next(error);
  }
};

export const updateUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [oldUser, updatedUser] = await updateUserByIdService(id, req.body);

    const custom = {
      oldData: oldUser,
    };

    response(res, updatedUser, 200, "Usuario actualizado con éxito", custom);
  } catch (error) {
    next(error);
  }
};

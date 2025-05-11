import {
  getAllUsersService,
  updateUserByIdService,
  loginService,
  registerService,
} from "../services/user.service.js";

import { response } from "../utils/templates/response.template.js";
import { AuthError } from "../errors/TypeError.js";

export const register = async (req, res, next) => {
  try {
    const userData = req.body;
    const user = await registerService(userData);
    response(res, user, 201, "Usuario creado con éxito");
  } catch (error) {
    next(error);
    console.error(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const [user, token] = await loginService(req.body);
    const custom = {
      token,
    };
    response(res, user, 200, "Usuario logueado con éxito", custom);
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

export const updateUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const dataUser = req.body;

    if (req.user.uid !== id) {
      throw new AuthError(
        "No tienes permiso para editar este usuario",
        403
      );
    }

    const [oldUser, updatedUser] = await updateUserByIdService(id, dataUser);

    const custom = {
      oldData: oldUser,
    };

    response(
      res,
      updatedUser,
      201,
      `El usuario con el id: ${id} fue actualizado con éxito`,
      custom
    );
  } catch (error) {
    next(error);
  }
};

export const verifyToken = (req, res, next) => {
  try {
    res.status(200).json({
      message: "Token válido",
      user: req.user,
    });
  } catch (error) {
    next(error);
  }
};
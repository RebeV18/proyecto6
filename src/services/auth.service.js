import { User } from "../models/User.model.js";
import { hashPassword } from "../utils/hashPassword.js";
import { formatUserData } from "../utils/formatUserData.js";
import { envs } from "../config/envs.config.js";
import { notFoundData, notFoundActiveData } from "../utils/validate.js";
import { AuthError } from "../errors/TypeError.js";

const { secretKey, jwtExpiration } = envs.auth;

export const registerService = async ({
  nombre,
  apellido,
  pais,
  email,
  fono,
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
      fono,
      isAdmin
    );

    const user = await User.create(userData);
    return user;
  } catch (error) {
    throw new Error(`Error al intentar registrar el usuario`, 500, error);
  }
};

export const getAllUsersService = async () => {
  try {
    const users = await User.find({ isActive: true });
    notFoundActiveData(
      users,
      "No pudimos encontrar los usuarios",
      "No pudimos encontrar usuarios en la base de datos en la colección de usuarios"
    );

    return users;
  } catch (error) {
    throw new UsersError(
      "Error al intentar obtener todas los usuarios",
      500,
      error
    );
  }
};

export const loginService = async (email, password) => {
  try {
    const user = await Usuario.findOne({ email });
    notFoundData(user);

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
      { expiresIn: jwtExpiration }
    );

    return [user, token];
  } catch (error) {
    throw new AuthError(`Error al intentar autenticar el usuario`, 500, error);
  }
};
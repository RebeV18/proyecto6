import { db, auth } from "../config/firebase.config.js";
import { hashPassword, comparePassword } from "../helpers/auth.helpers.js";
import { AuthError } from "../errors/TypeError.js";
import jwt from "jsonwebtoken";
import { envs } from "../config/envs.config.js";
import {
  validateUserData,
  validateRegistrationData,
  validateLoginData,
  sanitizeUserData,
  prepareUserForSave,
  prepareUserForUpdate,
} from "../helpers/user.helpers.js";

const { secretKey, jwtExpiration } = envs.auth;

export const registerService = async ({
  nombre,
  apellido,
  pais,
  email,
  telefono,
  password: _password,
  isAdmin = false,
}) => {
  try {
    const userData = {
      nombre,
      apellido,
      pais,
      email,
      telefono,
      password: _password,
      isAdmin,
    };

    // Validar datos
    validateRegistrationData(userData);

    // Verificar si el email ya existe
    const existingUser = await db
      .collection("users")
      .where("email", "==", email.toLowerCase().trim())
      .limit(1)
      .get();

    if (!existingUser.empty) {
      throw new AuthError("El email ya está registrado", 409);
    }

    // Hashear contraseña
    const hashedPassword = await hashPassword(_password);

    // Crear usuario en Firebase Auth
    const userAuth = await auth.createUser({
      email: email.toLowerCase().trim(),
      password: _password,
      displayName: `${nombre} ${apellido}`,
    });

    // Preparar datos para guardar
    const newUserData = prepareUserForSave({
      ...userData,
      password: hashedPassword,
      uid: userAuth.uid,
    });

    // Guardar en Firestore
    await db.collection("users").doc(userAuth.uid).set(newUserData);

    // Asignar custom claims
    await auth.setCustomUserClaims(userAuth.uid, {
      isAdmin,
      role: isAdmin ? "admin" : "user",
    });

    return sanitizeUserData(newUserData);
  } catch (error) {
    console.error(error);
    if (error instanceof AuthError) {
      throw error;
    }
    throw new Error("Error al intentar registrar el usuario: " + error.message);
  }
};

export const loginService = async ({ email, password }) => {
  try {
    const loginData = { email, password };

    // Validar datos de login
    validateLoginData(loginData);

    // Buscar usuario en Firestore por email
    const userQuery = await db
      .collection("users")
      .where("email", "==", email.toLowerCase().trim())
      .where("isActive", "==", true)
      .limit(1)
      .get();

    if (userQuery.empty) {
      throw new AuthError("Credenciales incorrectas", 401);
    }

    const userDoc = userQuery.docs[0];
    const user = userDoc.data();

    const passwordMatch = await comparePassword(password, user.password);

    if (!passwordMatch) {
      throw new AuthError("Credenciales incorrectas", 401);
    }

    const token = jwt.sign(
      {
        uid: user.uid,
        nombre: user.nombre,
        email: user.email,
        isAdmin: user.isAdmin,
      },
      secretKey,
      {
        expiresIn: jwtExpiration,
      }
    );

    return [sanitizeUserData(user), token];
  } catch (error) {
    if (error instanceof AuthError) {
      throw error;
    }
    throw new AuthError(
      "Error al intentar iniciar sesión: " + error.message,
      500
    );
  }
};

export const getAllUsersService = async () => {
  try {
    const snapshot = await db
      .collection("users")
      .where("isActive", "==", true)
      .orderBy("createdAt", "desc")
      .get();

    return snapshot.docs.map(doc => {
      const userData = {
        id: doc.id,
        ...doc.data()
      };
      return sanitizeUserData(userData);
    });
  } catch (error) {
    throw new Error("Error al obtener usuarios: " + error.message);
  }
};

export const getUserByIdService = async (uid) => {
  try {
    const userDoc = await db.collection("users").doc(uid).get();

    if (!userDoc.exists) {
      throw new AuthError("Usuario no encontrado", 404);
    }

    const user = userDoc.data();

    if (!user.isActive) {
      throw new AuthError("Usuario inactivo", 403);
    }

    const userWithId = {
      id: userDoc.id,
      ...user
    };

    return sanitizeUserData(userWithId);
  } catch (error) {
    if (error instanceof AuthError) {
      throw error;
    }
    throw new Error("Error al obtener usuario: " + error.message);
  }
};

export const updateUserByIdService = async (uid, updateData) => {
  try {
    const userRef = db.collection("users").doc(uid);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      throw new AuthError("Usuario no encontrado", 404);
    }

    const oldUser = userDoc.data();

    if (!oldUser.isActive) {
      throw new AuthError("No se puede actualizar un usuario inactivo", 403);
    }

    // Preparar datos de actualización
    const updatedData = prepareUserForUpdate(updateData);

    // Si hay password, hashearlo
    if (updatedData.password) {
      updatedData.password = await hashPassword(updatedData.password);
    }

    // Validar datos actualizados
    if (Object.keys(updateData).length > 0) {
      validateUserData({ ...oldUser, ...updatedData }, true);
    }

    // Actualizar en Firestore
    await userRef.update(updatedData);

    // Obtener usuario actualizado
    const updatedDoc = await userRef.get();
    const updatedUser = {
      id: userDoc.id,
      ...updatedDoc.data()
    };

    const oldUserWithId = {
      id: userDoc.id,
      ...oldUser
    };

    return [
      sanitizeUserData(oldUserWithId),
      sanitizeUserData(updatedUser)
    ];
  } catch (error) {
    if (error instanceof AuthError) {
      throw error;
    }
    throw new Error("Error al actualizar usuario: " + error.message);
  }
};
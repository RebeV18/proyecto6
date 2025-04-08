import { CustomError } from "./CustomError.js";

export class ValidationError extends CustomError {
  constructor(message, details) {
    super(message || "Error de validación", 400, details);
  }
}

export class NotFoundError extends CustomError {
  constructor(message, details) {
    super(message || "No encontramos el elemento", 404, details);
  }
}

export class DataBaseError extends CustomError {
  constructor(message, statusCode, details) {
    super(message || "Error en la base de datos", statusCode || 500, details);
  }
}

export class ProductsError extends CustomError {
  constructor(message, statusCode, details) {
    super(
      message || "Error en la colección de productos",
      statusCode || 500,
      details
    );
  }
}

export class UserError extends CustomError {
  constructor(message, statusCode, details) {
    super(
      message || "Error en la colección de usuarios",
      statusCode || 500,
      details
    );
  }
}

export class AuthError extends CustomError {
  constructor(message, statusCode, details) {
    super(message || "Error de autenticación", statusCode || 401, details);
  }
}

export class InternalServerError extends CustomError {
  constructor(message, statusCode, details) {
    super(
      message || "Error interno en el servidor",
      statusCode || 500,
      details
    );
  }
}

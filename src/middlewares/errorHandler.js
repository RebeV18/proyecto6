import { CustomError } from "../errors/CustomError.js";
import { InternalServerError } from "../errors/TypeError.js";

export const errorHandler = (err, req, res, _next) => {
  if (!(err instanceof CustomError)) {
    err = new InternalServerError(
      err.message || "¡Error Inesperado!",
      err.statusCode || 500,
      err.details ||
        "Tenemos un error imprevisto, contacta a nuestro equipo de soporte, por favor"
    );
  }

  const errorResponse = {
    status: "ERROR",
    message: err.message,
    statusCode: err.statusCode,
    details: err.details,
  };

  console.error(
    `ERROR: ${errorResponse.message} ----- Details: ${errorResponse.details} ----- Status: ${errorResponse.statusCode}`
  );

  res.status(err.statusCode).json(errorResponse);
};

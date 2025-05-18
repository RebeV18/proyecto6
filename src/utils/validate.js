import { NotFoundError } from "../errors/TypeError.js";

export const notFoundData = (data, message, datails) => {
  if (!data)
    throw new NotFoundError(
      message || "No se encontraron los datos",
      datails || "No se econtraron los datos solicitados"
    );

  if (Array.isArray(data) && data.length === 0)
    throw new NotFoundError(
      message || "No se encontraron los datos",
      datails || "No se econtraron los datos solicitados"
    );
};

export const notActive = (data, message, datails) => {
  if (Array.isArray(data) && data.length > 0) {
    data.forEach((item) => {
      if (!item.isActive)
        throw new NotFoundError(
          message || "No se encontraron los datos activos",
          datails || "No se econtraron los datos activos solicitados"
        );
    });
  }

  if (!Array.isArray(data) && !data.isActive)
    throw new NotFoundError(
      message || "No se encontraron los datos activos",
      datails || "No se econtraron los datos activos solicitados"
    );
};

export const notFoundActiveData = (data, message, details) => {
  notFoundData(data, message, details);
  notActive(data, message, details);
};

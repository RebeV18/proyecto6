import { FileServiceError } from "../../errors/TypeError.js";

/**
 * Construye  la URL del archivo subido para almacenar en la Base de Datos
 * @param {object} req - Objeto de solicitud de Express
 * @param {string} filename - Nombre del archivo
 * @param {string} folder - Nombre de la carpeta donde se guardará el archivo
 * @returns - URL del archivo construido
 */
export const buildFileUrl = (req, filename, folder) => {
  try {
    if (!filename)
      throw new FileServiceError(
        "No se ha proporcionado un nombre de archivo",
        400
      );
    if (!folder)
      throw new FileServiceError("No se ha proporcionado una carpeta", 400);

    const domain = `${req.protocol}://${req.get("host")}`;

    return `${domain}/uploads/${folder}/${filename}`;
  } catch (error) {
    throw new FileServiceError(
      "Error al construir la URL del archivo",
      500,
      error
    );
  }
};

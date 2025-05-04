import { v4 as uuidv4 } from "uuid";
import path from "path";
import { FileServiceError } from "../../errors/TypeError.js";

export const generateFileName = (file) => {
  try {
    const extension = path.extname(file);
    const idName = uuidv4().split("-")[0];

    return `${idName}${extension}`;
  } catch (error) {
    throw new FileServiceError(
      "Error al generar el nombre del archivo",
      500,
      error
    );
  }
};

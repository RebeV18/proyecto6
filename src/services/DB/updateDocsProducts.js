import { DataBaseError } from "../../errors/TypeError.js";
import { Product } from "../../models/Product.model.js";

export const updateDocsProducts = async () => {
  try {
    await Product.updateMany(
      { isActive: { $exists: false } },
      { $set: { isActive: true } }
    );
  } catch (error) {
    throw new DataBaseError(
      "No pudimos actualizar los documentos en la base de datos",
      500,
      error
    );
  }
};

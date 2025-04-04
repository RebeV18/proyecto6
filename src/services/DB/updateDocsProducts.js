import { DataBaseError } from "../../errors/TypeError.js";
import { Products } from "../../model/Product.model.js";

export const updateDocsDB = async () => {
  try {
    await Products.updateMany(
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

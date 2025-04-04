import mongoose from "mongoose";
import { envs } from "./envs.config.js";
import { DataBaseError } from "../errors/TypeError.js";
import { updateDocsProducts } from "../services/DB/updateDocsProducts.js";

const { db } = envs;

export const dbConnect = async ({
  updateDocs = false,
  showModels = false,
} = {}) => {
  try {
    await mongoose.connect(db.uri);
    console.log("Nos conectamos con MongoDB!! :D 🛸");

    if (updateDocs) {
      await updateDocsProducts();
      console.log("Documentos actualizados con éxito");
    }

    if (showModels) {
      console.log("Modelos de la base de datos:");
      const collections = await mongoose.connection.db
        .listCollections()
        .toArray();
      console.log(collections);
      collections.forEach((collection) => console.log(`${collection.name}`));
    }
  } catch (error) {
    throw new DataBaseError(
      "No nos pudimos conectar a la base de datos de Mongo :c",
      500,
      error
    );
  }
};

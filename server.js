import express from "express";

import { envs } from "./src/config/envs.config.js";
import { dbConnect } from "./src/config/db.config.js";

import routerUser from "./src/routes/userRoutes.js";
import routerProduct from "./src/routes/productRoutes.js";
import { errorHandler } from "./src/middlewares/errorhandler.js";

import dotenv from "dotenv";

dotenv.config();

const app = express();

dbConnect();

const PORT = process.env.PORT || 5000;

//Middlewares de CORS

//Middlewares para parsear el body a JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Middlewares de rutas
app.use("/api/v1", routerProduct);

//Middlewares de errores
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});

app.listen(envs.port, () => {
});

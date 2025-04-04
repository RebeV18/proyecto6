import express from "express";
import { envs } from "./src/config/envs.config.js";
import { dbConnect } from "./src/config/db.config.js";
import apiRouter from "./src/routes/index.routes.js";
import { errorHandler } from "./src/middlewares/errorHandler.js";

//dotenv.config();

const app = express();

dbConnect();

const PORT = envs.port || 3000;

//Middlewares para parsear el body a JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Middlewares de rutas
app.use("/api/v1", apiRouter);

//Middlewares de errores
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});

// app.listen(envs.port, () => {
// });

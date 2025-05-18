import express from "express";
import { envs } from "./src/config/envs.config.js";
import { dbConnect } from "./src/config/db.config.js";
import apiRouter from "./src/routes/index.routes.js";
import { errorHandler } from "./src/middlewares/errorHandler.js";

import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

import cors from "cors";

const app = express();

dbConnect();

const PORT = envs.port || 3000;

//Middlewares para parsear el body a JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// const corsOptions = {
//   origin: "https://proyecto6-sgv2.onrender.com",
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   credentials: true,
// };

app.use(cors());

//Middlewares de rutas
app.use("/api/v1", apiRouter);

//Middlewares de errores
app.use(errorHandler);

//Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Swagger Demo",
      version: "1.0.0",
      description: "Documentación auto-generada con Swagger",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./src/routes/swagger.routes.js"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en el puerto: ${PORT}`);
  console.log(`Documentación Swagger en el puerto: ${PORT}`);
});

import express from "express";
import cors from "cors";
import { envs } from "./src/config/envs.config.js";

// Rutas
import userRoutes from "./src/routes/user.routes.js";
import productRoutes from "./src/routes/product.routes.js";

const app = express();

// Middlewares
app.use(
  cors({
    origin: envs.frontendUrl,
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

app.use(
  express.json({
    limit: "10mb",
    strict: true,
  })
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "10mb",
  })
);

if (process.env.NODE_ENV !== "production") {
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
  });
}

app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || "development",
  });
});

// Rutas
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: `Ruta ${req.originalUrl} no encontrada`,
    statusCode: 404,
  });
});

// Middleware de manejo de errores
app.use((error, req, res) => {
  console.error("Error:", {
    message: error.message,
    stack: error.stack,
    url: req.url,
    method: req.method,
    timestamp: new Date().toISOString(),
  });

  const statusCode = error.statusCode || 500;
  const message = error.message || "Error interno del servidor";

  res.status(statusCode).json({
    success: false,
    message,
    statusCode,
    ...(process.env.NODE_ENV === "development" && { stack: error.stack }),
  });
});

// Manejo de errores no capturados
process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  process.exit(1);
});

app.listen(envs.port, () => {
  console.log(`🚀 Servidor corriendo en puerto ${envs.port}`);
  console.log(`🔗 Frontend URL: ${envs.frontendUrl}`);
  console.log(`🌍 Ambiente: ${process.env.NODE_ENV || "development"}`);
  console.log("💾 Base de datos: Firebase Firestore");
});

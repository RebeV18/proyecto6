import express from "express";
import cors from "cors";
import { envs } from "./src/config/envs.config.js";

// Importar rutas
import apiRoutes from "./src/routes/index.routes.js";

const app = express();

app.set("trust proxy", 1);

// CORS optimizado
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? [envs.frontendUrl]
        : [
            "http://localhost:3000",
            "http://localhost:5173",
            "http://127.0.0.1:5173",
          ],
    credentials: true,
    optionsSuccessStatus: 200,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "x-api-key"],
  })
);

// Parseo de JSON optimizado
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
    parameterLimit: 20,
  })
);

// Middleware de logging simplificado
app.use((req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(
      `${req.method} ${req.originalUrl} - ${res.statusCode} - ${duration}ms`
    );
  });

  next();
});

// Health check mejorado
app.get("/health", (req, res) => {
  const healthCheck = {
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || "development",
    version: "1.0.0",
    service: "LG Songs Backend",
    database: "Firebase Firestore",
    memory: {
      used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024) + " MB",
      total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024) + " MB",
    },
  };

  console.log("Health check accessed from:", req.ip);
  res.json(healthCheck);
});

// Rutas principales
app.use("/api", apiRoutes);

// ✅ SWAGGER DOCUMENTATION (MOVIDO AQUÍ - DESPUÉS DE LAS RUTAS)
if (process.env.NODE_ENV !== "production") {
  try {
    const { default: swaggerUi } = await import("swagger-ui-express");
    const { default: swaggerJsdoc } = await import("swagger-jsdoc");

    console.log("🔧 Configurando Swagger...");

    const swaggerOptions = {
      definition: {
        openapi: "3.0.0",
        info: {
          title: "LG Songs API",
          version: "1.0.0",
          description: "API para tienda de música con Firebase y MercadoPago",
          contact: {
            name: "Chile UDD",
            email: "support@lgsongs.com",
          },
        },
        servers: [
          {
            url: `http://localhost:${envs.port}`,
            description: "Servidor de desarrollo",
          },
        ],
        components: {
          securitySchemes: {
            bearerAuth: {
              type: "http",
              scheme: "bearer",
              bearerFormat: "JWT",
            },
          },
        },
      },
      apis: ["./src/routes/*.js", "./src/routes/swagger.routes.js"],
    };

    const specs = swaggerJsdoc(swaggerOptions);

    console.log("📋 Generando documentación Swagger...");
    console.log("Paths encontrados:", Object.keys(specs.paths || {}));

    app.use(
      "/api-docs",
      swaggerUi.serve,
      swaggerUi.setup(specs, {
        explorer: true,
        customCss: ".swagger-ui .topbar { display: none }",
        customSiteTitle: "LG Songs API Documentation",
        swaggerOptions: {
          persistAuthorization: true,
        },
      })
    );

    console.log(
      `📚 Swagger disponible en: http://localhost:${envs.port}/api-docs`
    );
  } catch (error) {
    console.error("❌ Error configurando Swagger:", error.message);

    // Endpoint de fallback con documentación básica
    app.get("/api-docs", (req, res) => {
      res.json({
        title: "LG Songs API - Documentación",
        message:
          "Swagger UI no está disponible, pero aquí tienes los endpoints principales:",
        error: error.message,
        endpoints: {
          health: "GET /health",
          products: {
            getAll: "GET /api/products",
            getById: "GET /api/products/{id}",
            getByCd: "GET /api/products/cd/{cdName}",
            create: "POST /api/products (requiere admin)",
          },
          users: {
            register: "POST /api/users/register",
            login: "POST /api/users/login",
          },
          payment: {
            createPreference: "POST /api/payment/create-preference",
            webhook: "POST /api/payment/webhook",
          },
        },
        examples: {
          register: {
            url: `http://localhost:${envs.port}/api/users/register`,
            method: "POST",
            body: {
              nombre: "Juan",
              apellido: "Pérez",
              email: "juan@email.com",
              password: "123456",
              telefono: "+56912345678",
              pais: "Chile",
            },
          },
          login: {
            url: `http://localhost:${envs.port}/api/users/login`,
            method: "POST",
            body: {
              email: "juan@email.com",
              password: "123456",
            },
          },
        },
      });
    });
  }
}

// Ruta 404
app.use("*", (req, res) => {
  console.warn("404 Not Found:", req.originalUrl, "from", req.ip);
  res.status(404).json({
    success: false,
    message: `Ruta ${req.originalUrl} no encontrada`,
    statusCode: 404,
    service: "LG Songs API",
  });
});

// Middleware de manejo de errores optimizado
app.use((error, req, res, next) => {
  console.error("Application Error:", {
    message: error.message,
    url: req.url,
    method: req.method,
    ip: req.ip,
  });

  const statusCode = error.statusCode || 500;
  const message = error.message || "Error interno del servidor";

  res.status(statusCode).json({
    success: false,
    message:
      process.env.NODE_ENV === "production"
        ? statusCode === 500
          ? "Error interno del servidor"
          : message
        : message,
    statusCode,
    ...(process.env.NODE_ENV === "development" && {
      stack: error.stack,
    }),
  });
});

// Manejo de procesos no capturados
process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error.message);
  if (process.env.NODE_ENV === "production") {
    process.exit(1);
  }
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection:", reason);
  if (process.env.NODE_ENV === "production") {
    process.exit(1);
  }
});

// Graceful shutdown
const gracefulShutdown = (signal) => {
  console.log(`${signal} received, shutting down gracefully`);
  process.exit(0);
};

process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));

const server = app.listen(envs.port, () => {
  console.log(`🚀 LG Songs Backend iniciado`);
  console.log(`📡 Puerto: ${envs.port}`);
  console.log(`🌍 Ambiente: ${process.env.NODE_ENV || "development"}`);
  console.log(`🔗 Frontend: ${envs.frontendUrl}`);
  console.log(`💾 Base de datos: Firebase Firestore`);
  console.log(`🔑 Auth: JWT + Firebase Admin`);
  console.log(
    `💰 Pagos: MercadoPago ${
      process.env.MERCADOPAGO_SANDBOX === "true" ? "(Sandbox)" : "(Producción)"
    }`
  );

  // Log adicional para Swagger
  if (process.env.NODE_ENV !== "production") {
    console.log(`📚 Documentación: http://localhost:${envs.port}/api-docs`);
  }
});

// Configurar timeout para producción
if (process.env.NODE_ENV === "production") {
  server.timeout = 30000;
  server.keepAliveTimeout = 5000;
  server.headersTimeout = 6000;
}

export default app;

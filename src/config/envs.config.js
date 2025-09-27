import dotenv from "dotenv";

dotenv.config();

export const envs = {
  port: process.env.PORT || 3000,
  frontendUrl: process.env.URL_FRONTEND || "http://localhost:5173",
  firebase: {
    projectId: process.env.FIREBASE_PROJECT_ID,
    privateKeyId: process.env.FIREBASE_PRIVATE_KEY_ID,
    privateKey: process.env.FIREBASE_PRIVATE_KEY,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    clientId: process.env.FIREBASE_CLIENT_ID,
    certUrl: process.env.FIREBASE_CERT_URL,
  },
  auth: {
    saltRounds: process.env.SALT_ROUNDS || 10,
    secretKey: process.env.SECRET_KEY,
    refreshSecretKey: process.env.REFRESH_SECRET_KEY,
    jwtExpiration: process.env.JWT_EXPIRE || "1h",
  },
  mercadoPago: {
    mercadoPagoToken: process.env.MERCADOPAGO_ACCESS_TOKEN,
    sandbox: process.env.MERCADOPAGO_SANDBOX || false,
  },
};

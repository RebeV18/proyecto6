import dotenv from "dotenv";

dotenv.config();

export const envs = {
  port: process.env.PORT || 3000,
  db: {
    uri: process.env.MONGO_ATLAS || "mongodb://localhost:27017/mi_base_de_datos",
  },
  auth: {
    saltRounds: process.env.SALT_ROUNDS || 10,
    secretKey: process.env.SECRET_KEY,
    refreshSecretKey: process.env.REFRESH_SECRET_KEY,
    jwtExpiration: process.env.JWT_EXPIRATION || "1h",
  },
};

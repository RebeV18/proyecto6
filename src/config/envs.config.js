import dotenv from "dotenv";

dotenv.config();

export const envs = {
  port: process.env.PORT || 3000,
  db: {
    uri: process.env.MONGO_URI,
  },
  auth: {
    saltRounds: process.env.SALT_ROUNDS || 10,
    secretKey: process.env.SECRET_KEY,
    jwtExpiration: process.env.JWT_EXPIRATION || "1h",
  },
};

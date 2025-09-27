import fs from "fs";
import path from "path";

const logsDir = path.join(process.cwd(), "logs");

// Crear directorio de logs si no existe
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

const logLevels = {
  ERROR: "ERROR",
  WARN: "WARN",
  INFO: "INFO",
  DEBUG: "DEBUG",
};

class Logger {
  static info(message, data = null) {
    console.log(`[INFO] ${message}`, data || "");
  }

  static warn(message, data = null) {
    console.warn(`[WARN] ${message}`, data || "");
  }

  static error(message, data = null) {
    console.error(`[ERROR] ${message}`, data || "");
  }
}

export default Logger;

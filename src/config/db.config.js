import { db } from "./firebase.config.js";

export const dbConnect = async () => {
  try {
    console.log("🔄 Conectando a Firebase...");

    await db.collection("test").limit(1).get();

    console.log("✅ Conectado a Firebase Firestore!! :D 🔥");
  } catch (error) {
    console.error("❌ Error conectando a Firebase:", error);
    throw new Error("No se pudo conectar a Firebase", error);
  }
};

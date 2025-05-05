import mongoose from "mongoose";
import { config } from "../config/config.js";

export const connectDB = async () => {
  try {
    await mongoose.connect(config.db.connectionString);
    console.log("✅ Conexión a MongoDB exitosa");
  } catch {
    console.error("❌ Error al conectar a MongoDB");
    process.exit(1);
  }
};

// Manejar eventos de conexión
mongoose.connection.on("disconnected", () => console.warn("⚠️ Conexión a MongoDB perdida"));
mongoose.connection.on("connected", () => console.log("🔄 Reconexión a MongoDB exitosa"));
mongoose.connection.on("error", () => console.error("❌ Error en la conexión a MongoDB"));

// Manejar desconexión limpia al detener el proceso
process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("🔌 Conexión a MongoDB cerrada debido a la terminación del proceso");
  process.exit(0);
});
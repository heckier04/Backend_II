import mongoose from "mongoose";
import { config } from "../config/config.js";

export const connectDB = async () => {
    try {
        // Conectar a MongoDB usando la cadena de conexión desde config.js
        await mongoose.connect(config.db.connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("✅ Conexión a MongoDB exitosa");
    } catch (error) {
        console.error("❌ Error al conectar a MongoDB:", error.message);
        process.exit(1); // Finaliza el proceso si no se puede conectar
    }
};

// Evento para manejar desconexiones
mongoose.connection.on("disconnected", () => {
    console.warn("⚠️ Conexión a MongoDB perdida");
});

// Evento para manejar reconexiones
mongoose.connection.on("connected", () => {
    console.log("🔄 Reconexión a MongoDB exitosa");
});
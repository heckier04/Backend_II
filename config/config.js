import dotenv from 'dotenv';

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

if (!process.env.USER_MONGODB || !process.env.PASSWORD) {
  console.error('❌ Error: Faltan variables de entorno críticas (USER_MONGODB, PASSWORD)');
  process.exit(1);
}

const userName = process.env.USER_MONGODB;// Usuario de MongoDB
const password = process.env.PASSWORD; // Contraseña de MongoDB

export const config = {
  PORT: process.env.PORT || 8081, // Puerto del servidor
  db: {
    connectionString: `mongodb+srv://${userName}:${password}@callCoder.1tibfdt.mongodb.net/backend_II=true&w=majority` // Cadena de conexión para MongoDB Atlas
  }
};


// Mostrar información de configuración (opcional, solo para depuración)
console.log(`Conexión a MongoDB: ${config.db.connectionString}`);
console.log(`Servidor corriendo en el puerto: ${config.PORT}`);
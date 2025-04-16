import dotenv from 'dotenv';

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

const userName = process.env.USER_MONGODB || 'default_user'; // Usuario de MongoDB
const password = process.env.PASSWORD || 'default_password'; // Contraseña de MongoDB

export const config = {
  PORT: process.env.PORT || 8081, // Puerto del servidor
  db: {
    connectionString: `mongodb+srv://${userName}:${password}@callcoder.1tibfdt.mongodb.net/` // Cadena de conexión para MongoDB Atlas
  }
};

// Mostrar información de configuración (opcional, solo para depuración)
console.log(`Conexión a MongoDB: ${config.db.connectionString}`);
console.log(`Servidor corriendo en el puerto: ${config.PORT}`);
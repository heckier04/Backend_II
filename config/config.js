import dotenv from 'dotenv';

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

const userName = process.env.USER_MONGODB || 'default_user'; // Usuario de MongoDB
const password = process.env.PASSWORD || 'default_password'; // Contraseña de MongoDB
const dbName = process.env.DB_NAME || 'default_db'; // Nombre de la base de datos
const cluster = process.env.CLUSTER || 'default_cluster'; // Nombre del cluster de MongoDB

export const config = {
  PORT: process.env.PORT || 8081, // Puerto del servidor
  db: {
    connectionString: `mongodb+srv://${userName}:${password}@${cluster}.mongodb.net/${dbName}?retryWrites=true&w=majority`
  }
};

// Mostrar información de configuración (opcional, solo para depuración)
console.log(config.db.connectionString); // Muestra la cadena de conexión a MongoDB
console.log(`Servidor corriendo en el puerto ${config.PORT}`);
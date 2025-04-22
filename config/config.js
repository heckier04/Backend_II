import dotenv from 'dotenv';

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

// Validar variables de entorno críticas
const requiredEnvVars = ['USER_MONGODB', 'PASSWORD', 'DB_NAME', 'JWT_SECRET'];
requiredEnvVars.forEach((varName) => {
  if (!process.env[varName]) {
    console.error(`❌ Error: Falta la variable de entorno ${varName}`);
    process.exit(1);
  }
});

// Configuración
export const config = {
  PORT: process.env.PORT || 8081, // Puerto del servidor
  db: {
    connectionString: `mongodb+srv://${process.env.USER_MONGODB}:${process.env.PASSWORD}@callCoder.1tibfdt.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`, // Cadena de conexión para MongoDB Atlas
  },
  jwtSecret: process.env.JWT_SECRET, // Clave secreta para JWT
};

// Mostrar información de configuración (solo para depuración)
if (process.env.NODE_ENV !== 'production') {
  console.log(`Conexión a MongoDB: ${config.db.connectionString}`);
  console.log(`Servidor corriendo en el puerto: ${config.PORT}`);
}
import dotenv from 'dotenv';

dotenv.config();

// Validar variables de entorno críticas
['USER_MONGODB', 'PASSWORD', 'DB_NAME', 'JWT_SECRET'].forEach((varName) => {
  if (!process.env[varName]) {
    console.error(`❌ Error: Falta la variable de entorno ${varName}`);
    process.exit(1);
  }
});

// Configuración
export const config = {
  PORT: process.env.PORT || 8081,
  db: {
    connectionString: `mongodb+srv://${process.env.USER_MONGODB}:${process.env.PASSWORD}@callCoder.1tibfdt.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
  },
  jwtSecret: process.env.JWT_SECRET,
};

// Mostrar información de configuración (solo para depuración)
if (process.env.NODE_ENV !== 'production') {
  console.log(`Conexión a MongoDB: ${config.db.connectionString}`);
  console.log(`Servidor corriendo en el puerto: ${config.PORT}`);
}
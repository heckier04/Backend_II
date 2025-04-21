import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from '../mongo/conecter.js';
import { __dirname } from './dirname.js';
import path from 'path';
import cookieParser from 'cookie-parser';
import mainRouter from '../routers/index.js';
import passport from '../middlewares/passport.js';
import { config } from '../config/config.js';

// Cargar variables de entorno
dotenv.config();

// Verificar variables de entorno críticas
if (!process.env.JWT_SECRET || !process.env.MONGO_URI) {
  console.error('❌ Error: Faltan variables de entorno críticas (JWT_SECRET, MONGO_URI)');
  process.exit(1);
}

// Conectar a MongoDB
connectDB();

const app = express();

// Middlewares
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize());

// Servir archivos estáticos
app.use('/public', express.static(path.join(__dirname, 'public')));

// Rutas principales
app.use('/api', mainRouter);

// Manejo de rutas no encontradas
app.use('*', (_, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Manejo de errores global
app.use((err, _, res, __) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || 'Error interno del servidor',
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

// Iniciar el servidor
const PORT = config.PORT;
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en el puerto ${PORT} en modo ${process.env.NODE_ENV || 'desarrollo'}`);
});
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from '../mongo/conecter.js';
import { config } from '../config/config.js';
import { __dirname } from './dirname.js'; // Importar __dirname para manejar rutas
import path from 'path';

// Cargar variables de entorno
dotenv.config();

// Conectar a MongoDB
connectDB();

const app = express();

// Middlewares
app.use(cors()); // Habilitar CORS
app.use(express.json()); // Parsear JSON
app.use(express.urlencoded({ extended: true })); // Parsear datos de formularios

// Servir archivos estáticos (por ejemplo, imágenes o frontend)
app.use('/public', express.static(path.join(__dirname, 'public')));

// Rutas de ejemplo
app.get('/', (req, res) => {
    res.send('¡Bienvenido al backend de tu aplicación!');
});

// Manejo de rutas no encontradas
app.use((req, res, next) => {
    res.status(404).json({ message: 'Ruta no encontrada' });
});

// Manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Error interno del servidor' });
});

// Iniciar el servidor
const PORT = config.PORT || 8081;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
import express from 'express';
import userRouter from './user.routers.js';
import productRouter from './products.js';
import cartRouter from './carts.js';

const router = express.Router();

// Middleware para registrar las solicitudes entrantes (opcional, útil para depuración)
router.use((req, __, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// Rutas principales
router.use('/users', userRouter);
router.use('/products', productRouter);
router.use('/carts', cartRouter);

export default router;
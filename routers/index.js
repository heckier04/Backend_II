import express from 'express';
import userRouter from './user.routers.js';
import productRouter from './products.js';
import cartRouter from './carts.js';

const router = express.Router();

// Rutas principales
router.use('/users', userRouter); // Rutas relacionadas con usuarios
router.use('/products', productRouter); // Rutas relacionadas con productos
router.use('/carts', cartRouter); // Rutas relacionadas con carritos

export default router;
import { Router } from 'express';
import {createCart,getCart,addProductToCart,removeProductFromCart,} from '../controllers/cart.controller.js';
import { validateCartParams, validateCartProduct } from '../middlewares/validation.js';

const router = Router();

// Rutas para carritos
router.post('/', createCart); // Crear un nuevo carrito
router.get('/:cid', validateCartParams, getCart); // Obtener un carrito por ID
router.post('/:cid/products/:pid', validateCartParams, validateCartProduct, addProductToCart); // Agregar un producto al carrito
router.delete('/:cid/products/:pid', validateCartParams, removeProductFromCart); // Eliminar un producto del carrito

export default router;

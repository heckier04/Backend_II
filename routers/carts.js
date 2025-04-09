import express from 'express';
import { cartServices } from '../service/service.js';

const router = express.Router();

// Crear un nuevo carrito
router.post('/', async (req, res) => {
    try {
        const newCart = await cartServices.createCart();
        res.status(201).json(newCart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Obtener un carrito por ID
router.get('/:cid', async (req, res) => {
    try {
        const cart = await cartServices.getCartById(req.params.cid);
        res.json(cart);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

export default router;
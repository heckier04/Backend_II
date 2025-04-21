import { CartDAO } from '../persistencia/dao/cart.dao.js';
import { validationResult } from 'express-validator';

const cartDAO = new CartDAO();

// Crear un nuevo carrito
export const createCart = async (req, res) => {
  try {
    const cart = await cartDAO.createCart();
    res.status(201).json(cart);
  } catch (error) {
    res.status(500).json({ error: `Error al crear el carrito: ${error.message}` });
  }
};

// Obtener un carrito por ID
export const getCart = async (req, res) => {
  try {
    const cart = await cartDAO.getCartById(req.params.cid);
    if (!cart) {
      return res.status(404).json({ error: `El carrito con ID ${req.params.cid} no fue encontrado` });
    }
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: `Error al obtener el carrito: ${error.message}` });
  }
};

// Agregar un producto al carrito
export const addProductToCart = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { cid, pid } = req.params;
    const { quantity } = req.body;

    const updatedCart = await cartDAO.addProductToCart(cid, pid, quantity || 1);
    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json({ error: `Error al agregar el producto al carrito: ${error.message}` });
  }
};

// Eliminar un producto del carrito
export const removeProductFromCart = async (req, res) => {
  try {
    const { cid, pid } = req.params;

    const updatedCart = await cartDAO.removeProductFromCart(cid, pid);
    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json({ error: `Error al eliminar el producto del carrito: ${error.message}` });
  }
};
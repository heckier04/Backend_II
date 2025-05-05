import { CartDAO } from '../persistencia/dao/cart.dao.js';

const cartDAO = new CartDAO();

// Crear un nuevo carrito
export const createCart = async (req, res, next) => {
  try {
    const cart = await cartDAO.createCart();
    res.status(201).json(cart);
  } catch (error) {
    next(error); // Delega el manejo del error al middleware global
  }
};

// Obtener un carrito por ID
export const getCart = async (req, res, next) => {
  try {
    const cart = await cartDAO.getCartById(req.params.cid);
    if (!cart) {
      return res.status(404).json({ error: 'Carrito no encontrado' });
    }
    res.status(200).json(cart);
  } catch (error) {
    next(error); // Delega el manejo del error al middleware global
  }
};

// Agregar un producto al carrito
export const addProductToCart = async (req, res, next) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    const updatedCart = await cartDAO.addProductToCart(cid, pid, quantity || 1);
    res.status(200).json(updatedCart);
  } catch (error) {
    next(error); // Delega el manejo del error al middleware global
  }
};

// Eliminar un producto del carrito
export const removeProductFromCart = async (req, res, next) => {
  try {
    const { cid, pid } = req.params;

    const updatedCart = await cartDAO.removeProductFromCart(cid, pid);
    res.status(200).json(updatedCart);
  } catch (error) {
    next(error); // Delega el manejo del error al middleware global
  }
};

// Eliminar un carrito
export const deleteCart = async (req, res, next) => {
  try {
    const { cid } = req.params;
    const result = await cartDAO.deleteCart(cid);
    if (!result) {
      return res.status(404).json({ error: 'Carrito no encontrado' });
    }
    res.status(200).json({ message: 'Carrito eliminado exitosamente' });
  } catch (error) {
    next(error); // Delega el manejo del error al middleware global
  }
};

// Actualizar un carrito
export const updateCart = async (req, res, next) => {
  try {
    const { cid } = req.params;
    const updatedCart = await cartDAO.updateCart(cid, req.body);
    if (!updatedCart) {
      return res.status(404).json({ error: 'Carrito no encontrado' });
    }
    res.status(200).json(updatedCart);
  } catch (error) {
    next(error); // Delega el manejo del error al middleware global
  }
};

// Actualizar la cantidad de un producto en el carrito
export const updateProductQuantity = async (req, res, next) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    if (quantity <= 0) {
      return res.status(400).json({ error: 'La cantidad debe ser mayor a 0' });
    }

    const updatedCart = await cartDAO.updateProductQuantity(cid, pid, quantity);
    if (!updatedCart) {
      return res.status(404).json({ error: 'Carrito o producto no encontrado' });
    }

    res.status(200).json(updatedCart);
  } catch (error) {
    next(error); // Delega el manejo del error al middleware global
  }
};
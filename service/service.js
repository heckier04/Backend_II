import { CartDAO } from '../persistencia/dao/cart.dao.js';
import { ProductDAO } from '../persistencia/dao/product.dao.js';

// Instancias de los DAOs
const cartDAO = new CartDAO();
const productDAO = new ProductDAO();

// Clase de error personalizada
class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
    this.statusCode = 404;
  }
}

// Servicio para obtener un carrito por ID
export const getCartService = async (cartId) => {
  if (!cartId) {
    throw new Error('El ID del carrito es requerido');
  }

  const cart = await cartDAO.getCartById(cartId);
  if (!cart) {
    throw new NotFoundError('Carrito no encontrado');
  }
  return cart;
};

// Servicio para agregar un producto al carrito
export const addProductToCartService = async (cartId, productId, quantity = 1) => {
  if (!cartId || !productId) {
    throw new Error('El ID del carrito y el ID del producto son requeridos');
  }

  if (quantity <= 0) {
    throw new Error('La cantidad debe ser un número positivo');
  }

  const cart = await cartDAO.getCartById(cartId);
  if (!cart) {
    throw new NotFoundError('Carrito no encontrado');
  }

  const product = await productDAO.getProductById(productId);
  if (!product) {
    throw new NotFoundError('Producto no encontrado');
  }

  return await cartDAO.addProductToCart(cartId, productId, quantity);
};
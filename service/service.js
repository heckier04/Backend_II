import CartManager from '../persistencia/dao/cart.dao.js';
import ProductManager from '../persistencia/dao/product.dao.js';

const cartManager = new CartManager();
const productManager = new ProductManager();

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
  const cart = await cartManager.getCartById(cartId);
  if (!cart) {
    throw new NotFoundError('Carrito no encontrado');
  }
  return cart;
};

// Servicio para agregar un producto al carrito
export const addProductToCartService = async (cartId, productId, quantity = 1) => {
  if (quantity <= 0) {
    throw new Error('La cantidad debe ser un número positivo');
  }

  const cart = await cartManager.getCartById(cartId);
  if (!cart) {
    throw new NotFoundError('Carrito no encontrado');
  }

  const product = await productManager.getProductById(productId);
  if (!product) {
    throw new NotFoundError('Producto no encontrado');
  }

  return await cartManager.addProductToCart(cartId, productId, quantity);
};
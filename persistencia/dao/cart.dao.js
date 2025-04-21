import CartModel from '../models/cart.models.js';

export class CartDAO {
  async createCart() {
    try {
      const cart = new CartModel({ products: [] });
      return await cart.save();
    } catch (error) {
      throw new Error(`Error al crear el carrito: ${error.message}`);
    }
  }

  async getCartById(cartId) {
    try {
      return await CartModel.findById(cartId).populate('products.product');
    } catch (error) {
      throw new Error(`Error al obtener el carrito con ID ${cartId}: ${error.message}`);
    }
  }

  async addProductToCart(cartId, productId, quantity) {
    try {
      const cart = await CartModel.findById(cartId);
      if (!cart) throw new Error('Carrito no encontrado');

      const productIndex = cart.products.findIndex((p) => p.product.toString() === productId);
      if (productIndex !== -1) {
        cart.products[productIndex].quantity += quantity;
      } else {
        cart.products.push({ product: productId, quantity });
      }

      return await cart.save();
    } catch (error) {
      throw new Error(`Error al agregar el producto al carrito: ${error.message}`);
    }
  }

  async removeProductFromCart(cartId, productId) {
    try {
      const cart = await CartModel.findById(cartId);
      if (!cart) throw new Error('Carrito no encontrado');

      cart.products = cart.products.filter((p) => p.product.toString() !== productId);
      return await cart.save();
    } catch (error) {
      throw new Error(`Error al eliminar el producto del carrito: ${error.message}`);
    }
  }
}

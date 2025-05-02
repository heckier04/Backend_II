import mongoose from 'mongoose';
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
    if (!mongoose.Types.ObjectId.isValid(cartId)) {
      throw new Error('ID de carrito inválido');
    }
    try {
      return await CartModel.findById(cartId).populate('products.product');
    } catch (error) {
      throw new Error(`Error al obtener carrito por ID: ${error.message}`);
    }
  }

  async addProductToCart(cartId, productId, quantity) {
    if (!mongoose.Types.ObjectId.isValid(cartId) || !mongoose.Types.ObjectId.isValid(productId)) {
      throw new Error('ID de carrito o producto inválido');
    }
    try {
      const cart = await CartModel.findById(cartId);
      if (!cart) throw new Error('Carrito no encontrado');

      const existingProduct = cart.products.find((p) => p.product.toString() === productId);
      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        cart.products.push({ product: productId, quantity });
      }
      return await cart.save();
    } catch (error) {
      throw new Error(`Error al agregar producto al carrito: ${error.message}`);
    }
  }

  async removeProductFromCart(cartId, productId) {
    if (!mongoose.Types.ObjectId.isValid(cartId) || !mongoose.Types.ObjectId.isValid(productId)) {
      throw new Error('ID de carrito o producto inválido');
    }
    try {
      const cart = await CartModel.findById(cartId);
      if (!cart) throw new Error('Carrito no encontrado');

      cart.products = cart.products.filter((p) => p.product.toString() !== productId);
      return await cart.save();
    } catch (error) {
      throw new Error(`Error al eliminar producto del carrito: ${error.message}`);
    }
  }
}

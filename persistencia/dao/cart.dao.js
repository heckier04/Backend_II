import mongoose from 'mongoose';
import CartModel from '../models/cart.models.js';

export class CartDAO {
  // Crear un nuevo carrito
  async createCart() {
    try {
      const cart = new CartModel({ products: [] });
      return await cart.save();
    } catch (error) {
      throw new Error(`Error al crear el carrito: ${error.message}`);
    }
  }

  // Obtener un carrito por ID
  async getCartById(cartId) {
    if (!mongoose.Types.ObjectId.isValid(cartId)) {
      throw new Error('El ID del carrito no es válido');
    }

    try {
      return await CartModel.findById(cartId).populate('products.product');
    } catch (error) {
      throw new Error(`Error al obtener el carrito con ID ${cartId}: ${error.message}`);
    }
  }

  // Agregar un producto al carrito
  async addProductToCart(cartId, productId, quantity) {
    if (!mongoose.Types.ObjectId.isValid(cartId)) {
      throw new Error('El ID del carrito no es válido');
    }

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      throw new Error('El ID del producto no es válido');
    }

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

  // Eliminar un producto del carrito
  async removeProductFromCart(cartId, productId) {
    if (!mongoose.Types.ObjectId.isValid(cartId)) {
      throw new Error('El ID del carrito no es válido');
    }

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      throw new Error('El ID del producto no es válido');
    }

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

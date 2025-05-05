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
    try {
      return await CartModel.findById(cartId).populate('products.product');
    } catch {
      throw new Error('Error al obtener carrito por ID');
    }
  }

  async addProductToCart(cartId, productId, quantity) {
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
    } catch {
      throw new Error('Error al agregar producto al carrito');
    }
  }

  async removeProductFromCart(cartId, productId) {
    try {
      const cart = await CartModel.findById(cartId);
      if (!cart) throw new Error('Carrito no encontrado');

      cart.products = cart.products.filter((p) => p.product.toString() !== productId);
      return await cart.save();
    } catch {
      throw new Error('Error al eliminar producto del carrito');
    }
  }

  async deleteCart(cartId) {
    try {
      return await CartModel.findByIdAndDelete(cartId);
    } catch (error) {
      throw new Error(`Error al eliminar el carrito: ${error.message}`);
    }
  }

  async updateCart(cartId, updateData) {
    try {
      return await CartModel.findByIdAndUpdate(cartId, updateData, { new: true });
    } catch (error) {
      throw new Error(`Error al actualizar el carrito: ${error.message}`);
    }
  }

  async updateProductQuantity(cartId, productId, quantity) {
    try {
      const cart = await CartModel.findById(cartId);
      if (!cart) throw new Error('Carrito no encontrado');

      const product = cart.products.find((p) => p.product.toString() === productId);
      if (!product) throw new Error('Producto no encontrado en el carrito');

      product.quantity = quantity;
      return await cart.save();
    } catch (error) {
      throw new Error(`Error al actualizar la cantidad del producto: ${error.message}`);
    }
  }
}

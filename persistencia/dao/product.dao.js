import mongoose from 'mongoose';
import ProductModel from '../models/product.model.js';

export class ProductDAO {
  // Crear un nuevo producto
  async createProduct(productData) {
    try {
      const product = new ProductModel(productData);
      return await product.save();
    } catch (error) {
      throw new Error(`Error al crear el producto: ${error.message}`);
    }
  }

  // Obtener todos los productos con filtros, opciones y paginación
  async getProducts(filter = {}, options = {}) {
    try {
      const { page = 1, limit = 10 } = options;
      const skip = (page - 1) * limit;

      const products = await ProductModel.find(filter).skip(skip).limit(limit);
      const total = await ProductModel.countDocuments(filter);

      return { products, total, page, pages: Math.ceil(total / limit) };
    } catch (error) {
      throw new Error(`Error al obtener los productos: ${error.message}`);
    }
  }

  // Obtener un producto por ID
  async getProductById(productId) {
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      throw new Error('El ID del producto no es válido');
    }

    try {
      return await ProductModel.findById(productId);
    } catch (error) {
      throw new Error(`Error al obtener el producto con ID ${productId}: ${error.message}`);
    }
  }

  // Actualizar un producto por ID
  async updateProduct(productId, updateData) {
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      throw new Error('El ID del producto no es válido');
    }

    try {
      return await ProductModel.findByIdAndUpdate(productId, updateData, { new: true });
    } catch (error) {
      throw new Error(`Error al actualizar el producto con ID ${productId}: ${error.message}`);
    }
  }

  // Eliminar un producto por ID
  async deleteProduct(productId) {
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      throw new Error('El ID del producto no es válido');
    }

    try {
      return await ProductModel.findByIdAndDelete(productId);
    } catch (error) {
      throw new Error(`Error al eliminar el producto con ID ${productId}: ${error.message}`);
    }
  }
}
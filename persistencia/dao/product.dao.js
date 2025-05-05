import mongoose from 'mongoose';
import ProductModel from '../models/product.model.js';

export class ProductDAO {
  async createProduct(productData) {
    try {
      const product = new ProductModel(productData);
      return await product.save();
    } catch (error) {
      throw new Error(`Error al crear producto: ${error.message}`);
    }
  }

  async getProducts(filter = {}, options = {}) {
    try {
      const { page = 1, limit = 10 } = options;
      const skip = (page - 1) * limit;

      const products = await ProductModel.find(filter).skip(skip).limit(limit);
      const total = await ProductModel.countDocuments(filter);

      return {
        products,
        pagination: {
          total,
          page,
          pages: Math.ceil(total / limit),
          limit
        }
      };
    } catch (error) {
      throw new Error(`Error al obtener productos: ${error.message}`);
    }
  }

  async getProductById(productId) {
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      throw new Error('ID de producto inválido');
    }
    try {
      return await ProductModel.findById(productId);
    } catch (error) {
      throw new Error(`Error al obtener producto por ID: ${error.message}`);
    }
  }

  async updateProduct(productId, updateData) {
    try {
      return await ProductModel.findByIdAndUpdate(productId, updateData, { new: true });
    } catch {
      throw new Error('Error al actualizar producto');
    }
  }

  async deleteProduct(productId) {
    try {
      return await ProductModel.findByIdAndDelete(productId);
    } catch {
      throw new Error('Error al eliminar producto');
    }
  }
}
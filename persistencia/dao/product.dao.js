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

  // Obtener todos los productos con filtros y opciones
  async getProducts(filter = {}, options = {}) {
    try {
      const products = await ProductModel.find(filter, null, options);
      const total = await ProductModel.countDocuments(filter);
      return { products, total };
    } catch (error) {
      throw new Error(`Error al obtener los productos: ${error.message}`);
    }
  }

  // Obtener un producto por ID
  async getProductById(productId) {
    try {
      return await ProductModel.findById(productId);
    } catch (error) {
      throw new Error(`Error al obtener el producto con ID ${productId}: ${error.message}`);
    }
  }

  // Actualizar un producto por ID
  async updateProduct(productId, updateData) {
    try {
      return await ProductModel.findByIdAndUpdate(productId, updateData, { new: true });
    } catch (error) {
      throw new Error(`Error al actualizar el producto con ID ${productId}: ${error.message}`);
    }
  }

  // Eliminar un producto por ID
  async deleteProduct(productId) {
    try {
      return await ProductModel.findByIdAndDelete(productId);
    } catch (error) {
      throw new Error(`Error al eliminar el producto con ID ${productId}: ${error.message}`);
    }
  }
}
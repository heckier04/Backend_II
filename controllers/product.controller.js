import { ProductDAO } from '../persistencia/dao/product.dao.js';
import { validationResult } from 'express-validator';

const productDAO = new ProductDAO();

// Crear un nuevo producto
export const createProduct = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const product = await productDAO.createProduct(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: `Error al crear el producto: ${error.message}` });
  }
};

// Obtener todos los productos con filtros y paginación
export const getProducts = async (req, res) => {
  try {
    const { page = 1, limit = 10, category } = req.query;
    const filter = category ? { category } : {};
    const options = {
      skip: (page - 1) * limit,
      limit: parseInt(limit, 10),
    };
    const products = await productDAO.getProducts(filter, options);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: `Error al obtener los productos: ${error.message}` });
  }
};

// Obtener un producto por ID
export const getProductById = async (req, res) => {
  try {
    const product = await productDAO.getProductById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: `El producto con ID ${req.params.id} no fue encontrado` });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: `Error al obtener el producto: ${error.message}` });
  }
};

// Actualizar un producto
export const updateProduct = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const updatedProduct = await productDAO.updateProduct(req.params.id, req.body);
    if (!updatedProduct) {
      return res.status(404).json({ error: `El producto con ID ${req.params.id} no fue encontrado` });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: `Error al actualizar el producto: ${error.message}` });
  }
};

// Eliminar un producto
export const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await productDAO.deleteProduct(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ error: `El producto con ID ${req.params.id} no fue encontrado` });
    }
    res.status(200).json({ message: `Producto con ID ${req.params.id} eliminado` });
  } catch (error) {
    res.status(500).json({ error: `Error al eliminar el producto: ${error.message}` });
  }
};
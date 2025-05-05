import { ProductDAO } from '../persistencia/dao/product.dao.js';

const productDAO = new ProductDAO();

// Crear un nuevo producto
export const createProduct = async (req, res) => {
  try {
    const product = await productDAO.createProduct(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: `Error al crear el producto` });
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
    res.status(500).json({ error: `Error al obtener los productos` });
  }
};

// Obtener un producto por ID
export const getProductById = async (req, res) => {
  try {
    const product = await productDAO.getProductById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: `Producto no encontrado` });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: `Error al obtener el producto` });
  }
};

// Actualizar un producto
export const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await productDAO.updateProduct(req.params.id, req.body);
    if (!updatedProduct) {
      return res.status(404).json({ error: `Producto no encontrado` });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: `Error al actualizar el producto` });
  }
};

// Eliminar un producto
export const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await productDAO.deleteProduct(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ error: `Producto no encontrado` });
    }
    res.status(200).json({ message: `Producto eliminado` });
  } catch (error) {
    res.status(500).json({ error: `Error al eliminar el producto` });
  }
};
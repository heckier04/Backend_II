import express from 'express';
import Product from '../models/Product.js';
import authorizeRole from '../middlewares/authorizeRole.js';

const router = express.Router();

// Obtener todos los productos (con paginación y filtros)
router.get('/', async (req, res) => {
  const { page = 1, limit = 10, search = '' } = req.query;
  try {
    const products = await Product.find({ name: new RegExp(search, 'i') })
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Crear un nuevo producto (solo admin)
router.post('/', authorizeRole(['admin']), async (req, res) => {
  const { name, price, description } = req.body;
  try {
    const newProduct = new Product({ name, price, description });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Actualizar un producto (solo admin)
router.put('/:id', authorizeRole(['admin']), async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Eliminar un producto (solo admin)
router.delete('/:id', authorizeRole(['admin']), async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Producto eliminado' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;

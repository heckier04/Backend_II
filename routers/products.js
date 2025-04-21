import { Router } from 'express';
import {createProduct,getProducts,getProductById,updateProduct,deleteProduct,} from '../controllers/product.controller.js';
import authorizeRole from '../middlewares/autoritaion.js';
import { validateProduct } from '../middlewares/validation.js';

const router = Router();

// Rutas para productos
router.get('/', getProducts); // Obtener todos los productos con filtros y paginación
router.get('/:id', getProductById); // Obtener un producto por ID
router.post('/', authorizeRole('admin'), validateProduct, createProduct); // Crear un nuevo producto (solo admin)
router.put('/:id', authorizeRole('admin'), validateProduct, updateProduct); // Actualizar un producto (solo admin)
router.delete('/:id', authorizeRole('admin'), deleteProduct); // Eliminar un producto (solo admin)


export default router;

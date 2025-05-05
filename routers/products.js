import { Router } from 'express';
import { createProduct, getProducts, getProductById, updateProduct, deleteProduct } from '../controllers/product.controller.js';
import { authorizeRole } from '../middlewares/authorization.js';
import { validateProduct } from '../middlewares/validation.js';

const router = Router();

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', authorizeRole('admin'), validateProduct, createProduct);
router.put('/:id', authorizeRole('admin'), validateProduct, updateProduct);
router.delete('/:id', authorizeRole('admin'), deleteProduct);

export default router;

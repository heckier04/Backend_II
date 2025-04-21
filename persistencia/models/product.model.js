import mongoose from 'mongoose';
import { productSchema } from '../schema/product.schema.js';

const productCollection = 'products';

// Agregar índices para mejorar el rendimiento en consultas frecuentes
productSchema.index({ code: 1 }, { unique: true }); // Índice único para el código del producto
productSchema.index({ category: 1 }); // Índice para la categoría

const ProductModel = mongoose.model(productCollection, productSchema);

export default ProductModel;

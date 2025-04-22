import mongoose from 'mongoose';
import { productSchema } from '../schema/product.schema.js';

const productCollection = 'products';

productSchema.index({ category: 1 });

const ProductModel = mongoose.model(productCollection, productSchema);

export default ProductModel;
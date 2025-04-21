import mongoose from 'mongoose';
import { cartSchema } from '../schema/cart.schema.js';

const cartCollection = 'carts';

// Agregar índices si es necesario (por ejemplo, para buscar carritos por usuario)
cartSchema.index({ user: 1 });

const CartModel = mongoose.model(cartCollection, cartSchema);

export default CartModel;


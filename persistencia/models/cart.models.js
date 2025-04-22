import mongoose from 'mongoose';
import { cartSchema } from '../schema/cart.schema.js';

const cartCollection = 'carts';

const CartModel = mongoose.model(cartCollection, cartSchema);

export default CartModel;

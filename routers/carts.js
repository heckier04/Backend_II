import { Router } from 'express';
import {createCart,getCart,addProductToCart,removeProductFromCart,updateProductQuantity,updateCart,deleteCart} from '../controllers/cart.controller.js';
import { validateCartParams, validateCartProduct } from '../middlewares/validation.js';
import { authorizeRole } from '../middlewares/authorization.js';
import { purchaseCart } from '../controllers/purchase.controller.js';
import passport from 'passport';

const router = Router();

router.post('/', createCart);

router.get('/:cid', validateCartParams, getCart);

router.post('/:cid/products/:pid',authorizeRole('user'),validateCartParams,validateCartProduct,addProductToCart);

router.delete('/:cid/products/:pid', validateCartParams, removeProductFromCart);

router.put('/:cid/products/:pid', validateCartParams, validateCartProduct, updateProductQuantity);

router.put('/:cid', validateCartParams, updateCart);

router.delete('/:cid', validateCartParams, deleteCart);

router.post('/:cid/purchase',passport.authenticate('jwt', { session: false }),validateCartParams,purchaseCart);

export default router;

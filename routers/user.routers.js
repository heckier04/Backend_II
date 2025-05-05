import { Router } from 'express';
import passport from 'passport';
import { registerUser, loginUser, getCurrentUser } from '../controllers/user.controll.js';
import { validateRegister, validateLogin } from '../middlewares/validation.js';

const router = Router();

router.post('/register', validateRegister, registerUser);
router.post('/login', validateLogin, loginUser);
router.get('/current', passport.authenticate('jwt', { session: false }), getCurrentUser);

export default router;

import { Router } from 'express';
import passport from 'passport';
import { registerUser, loginUser, getCurrentUser } from '../controllers/user.controll.js';
import { validateRegister, validateLogin } from '../middlewares/validation.js';

const router = Router();

// Ruta para registrar un usuario con validación
router.post('/register', validateRegister, registerUser);

// Ruta para iniciar sesión con validación
router.post('/login', validateLogin, loginUser);

// Ruta para obtener el usuario actual (requiere autenticación JWT)
router.get('/current', passport.authenticate('jwt', { session: false }), getCurrentUser);

export default router;

import { Router } from 'express';
import passport from 'passport';
import { UserDAO } from '../persistencia/dao/user.dao.js';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import { UserDTO } from '../dtos/users.dto.js';
const router = Router();
const userDAO = new UserDAO();

// Registrar un nuevo usuario
export const registerUser = async (req, res) => {
  try {
    const { email, password, ...rest } = req.body;

    // Verificar si el usuario ya existe
    if (await userDAO.getUserByEmail(email)) {
      return res.status(400).json({ error: 'El email ya está registrado' });
    }

    // Crear el usuario
    const newUser = await userDAO.createUser({ email, password, ...rest });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar el usuario' });
  }
};

// Iniciar sesión
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verificar si el usuario existe y la contraseña es válida
    const user = await userDAO.getUserByEmail(email);
    if (!user || !user.isValidPassword(password)) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // Generar un token JWT
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '24h',
    });

    res.status(200).json({ message: 'Inicio de sesión exitoso', token });
  } catch (error) {
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
};

// Obtener el usuario actual
export const getCurrentUser = (req, res) => {
  try {
    const safeUser = new UserDTO(req.user);
    res.json({ status: 'success', user: safeUser });
  } catch {
    res.status(500).json({ status: 'error', message: 'No se pudo procesar el usuario actual' });
  }
};

// Rutas
router.post('/register', registerUser); // Ruta para registrar un usuario
router.post('/login', loginUser); // Ruta para iniciar sesión
router.get('/current', passport.authenticate('jwt', { session: false }), getCurrentUser); // Ruta para obtener el usuario actual

export default router;
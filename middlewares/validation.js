import { param, body, validationResult } from 'express-validator';

// Validaciones comunes
const validateEmail = body('email').isEmail().withMessage('El email no es válido');
const validatePassword = body('password')
  .isLength({ min: 6 })
  .withMessage('La contraseña debe tener al menos 6 caracteres');

// Validación para registro
export const validateRegister = [
  validateEmail,
  validatePassword,
  body('first_name').notEmpty().withMessage('El nombre es obligatorio'),
  body('last_name').notEmpty().withMessage('El apellido es obligatorio'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

// Validación para login
export const validateLogin = [
  validateEmail,
  validatePassword,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

// Validación para productos
export const validateProduct = [
  body('title').notEmpty().withMessage('El título es obligatorio'),
  body('price')
    .isFloat({ gt: 0 })
    .withMessage('El precio debe ser un número mayor a 0'),
  body('stock')
    .isInt({ min: 0 })
    .withMessage('El stock debe ser un número entero mayor o igual a 0'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

// Validación para parámetros de carrito (por ejemplo, ID del carrito)
export const validateCartParams = [
  param('cartId').isMongoId().withMessage('El ID del carrito no es válido'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

// Validación para productos en el carrito
export const validateCartProduct = [
  body('productId').isMongoId().withMessage('El ID del producto no es válido'),
  body('quantity')
    .isInt({ min: 1 })
    .withMessage('La cantidad debe ser un número entero mayor o igual a 1'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
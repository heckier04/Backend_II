import { body, param, validationResult } from 'express-validator';

// Middleware genérico para manejar errores
export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Validación para registro
export const validateRegister = [
  body('email').isEmail().withMessage('El email no es válido'),
  body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
  body('first_name').notEmpty().withMessage('El nombre es obligatorio'),
  body('last_name').notEmpty().withMessage('El apellido es obligatorio'),
  handleValidationErrors,
];

// Validación para login
export const validateLogin = [
  body('email').isEmail().withMessage('El email no es válido'),
  body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
  handleValidationErrors,
];

// Validación para productos
export const validateProduct = [
  body('title').notEmpty().withMessage('El título es obligatorio'),
  body('price').isFloat({ gt: 0 }).withMessage('El precio debe ser un número mayor a 0'),
  body('stock').isInt({ min: 0 }).withMessage('El stock debe ser un número entero mayor o igual a 0'),
  handleValidationErrors,
];

// Validación para parámetros de carrito
export const validateCartParams = [
  param('cartId').isMongoId().withMessage('El ID del carrito no es válido'),
  handleValidationErrors,
];

// Validación para productos en el carrito
export const validateCartProduct = [
  body('productId').isMongoId().withMessage('El ID del producto no es válido'),
  body('quantity').isInt({ min: 1 }).withMessage('La cantidad debe ser un número entero mayor o igual a 1'),
  handleValidationErrors,
];
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET;
const EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h';

// Verificar que la clave secreta esté definida
if (!SECRET) {
  console.error('❌ Error: JWT_SECRET no está definido en las variables de entorno');
  process.exit(1);
}

// Generar un token JWT
export const generateToken = (user) => {
  return jwt.sign(
    { _id: user._id, email: user.email, role: user.role },
    SECRET,
    { expiresIn: EXPIRES_IN }
  );
};

// Verificar un token JWT
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, SECRET);
  } catch (error) {
    const errorMessage =
      error.name === 'TokenExpiredError'
        ? 'El token ha expirado'
        : error.name === 'JsonWebTokenError'
        ? 'El token es inválido'
        : 'Error al verificar el token';
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};
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
  try {
    return jwt.sign(
      { _id: user._id, email: user.email, role: user.role },
      SECRET,
      { expiresIn: EXPIRES_IN }
    );
  } catch (error) {
    console.error('Error al generar el token:', error.message);
    throw new Error('No se pudo generar el token');
  }
};

// Verificar un token JWT
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, SECRET);
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      console.error('El token ha expirado');
      throw new Error('El token ha expirado');
    } else if (error.name === 'JsonWebTokenError') {
      console.error('El token es inválido');
      throw new Error('El token es inválido');
    } else {
      console.error('Error al verificar el token:', error.message);
      throw new Error('Error al verificar el token');
    }
  }
};
import bcrypt from 'bcryptjs';

// Número de rondas para generar el salt (configurable)
const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS, 10) || 10;

// Crear un hash para una contraseña
export const createHash = async (password) => {
  if (!password) {
    throw new Error('La contraseña no puede estar vacía');
  }
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  return bcrypt.hash(password, salt);
};

// Validar si una contraseña es válida
export const isValidPassword = async (password, hashedPassword) => {
  if (!password || !hashedPassword) {
    throw new Error('La contraseña y el hash son requeridos');
  }
  return bcrypt.compare(password, hashedPassword);
};

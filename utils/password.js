import bcrypt from 'bcryptjs';

// Número de rondas para generar el salt (configurable)
const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS, 10) || 10;

// Crear un hash para una contraseña
export const createHash = async (password) => {
  if (!password) {
    throw new Error('La contraseña no puede estar vacía');
  }
  try {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    return await bcrypt.hash(password, salt);
  } catch (error) {
    console.error('Error al generar el hash:', error);
    throw new Error('No se pudo generar el hash de la contraseña');
  }
};

// Validar si una contraseña es válida
export const isValidPassword = async (password, hashedPassword) => {
  if (!password || !hashedPassword) {
    throw new Error('La contraseña y el hash son requeridos');
  }
  try {
    return await bcrypt.compare(password, hashedPassword);
  } catch (error) {
    console.error('Error al validar la contraseña:', error);
    return false;
  }
};

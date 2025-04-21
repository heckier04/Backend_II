import bcrypt from 'bcrypt';

// Número de rondas para generar el salt (configurable)
const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS, 10) || 10;

// Crear un hash para una contraseña
export const createHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(SALT_ROUNDS));
};

// Validar si una contraseña es válida
export const isValidPassword = (password, hashedPassword) => {
  return bcrypt.compareSync(password, hashedPassword);
};

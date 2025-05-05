// Nombre de la cookie configurable
const COOKIE_NAME = process.env.COOKIE_NAME || 'token';

export const cookieExtractor = (req) => {
  if (!req?.cookies) {
    console.warn('No se encontraron cookies en la solicitud');
    return null;
  }

  const token = req.cookies[COOKIE_NAME];
  if (!token) {
    console.warn(`La cookie "${COOKIE_NAME}" no está presente`);
  }
  return token || null;
};

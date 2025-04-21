// Nombre de la cookie configurable
const COOKIE_NAME = process.env.COOKIE_NAME || 'token';

export const cookieExtractor = (req) => {
  try {
    // Validar que req y req.cookies existan
    if (!req || !req.cookies) {
      console.warn('No se encontraron cookies en la solicitud');
      return null;
    }

    // Extraer el token de la cookie
    const token = req.cookies[COOKIE_NAME];
    if (!token) {
      console.warn(`La cookie "${COOKIE_NAME}" no está presente`);
    }
    return token || null;
  } catch (error) {
    console.error('Error al extraer la cookie:', error.message);
    return null;
  }
};

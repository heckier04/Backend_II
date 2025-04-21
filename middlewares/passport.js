import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import UserModel from '../persistencia/models/user.models.js';
import { cookieExtractor } from '../utils/cookie.js';

const SECRET = process.env.JWT_SECRET || 'mama234';

if (!SECRET) {
  console.error('❌ Error: JWT_SECRET no está definido en las variables de entorno');
  process.exit(1);
}

// Opciones para la estrategia JWT
const opts = {
  jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
  secretOrKey: SECRET,
};

// Estrategia JWT
passport.use(
  'jwt',
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      // Buscar el usuario en la base de datos
      const user = await UserModel.findById(jwt_payload._id);
      if (!user) {
        return done(null, false, { message: 'Usuario no encontrado' });
      }

      // Validar si el usuario está activo (opcional)
      if (!user.isActive) {
        return done(null, false, { message: 'Usuario inactivo' });
      }

      return done(null, user);
    } catch (err) {
      return done(err, false, { message: 'Error en la autenticación' });
    }
  })
);

// Inicializar Passport
export const initializePassport = () => {
  console.log('✅ Passport inicializado con estrategia JWT');
};

export default passport;
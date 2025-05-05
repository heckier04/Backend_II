import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import UserModel from '../persistencia/models/user.models.js';
import { cookieExtractor } from '../utils/cookie.js';

// Opciones para la estrategia JWT
const opts = {
  jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
  secretOrKey: process.env.JWT_SECRET || 'mama234',
};

// Estrategia JWT
passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      // Buscar el usuario en la base de datos
      const user = await UserModel.findById(jwt_payload._id);
      if (!user) {
        return done(null, false);
      }
      return done(null, user);
    } catch (err) {
      return done(err, false);
    }
  })
);

export default passport;
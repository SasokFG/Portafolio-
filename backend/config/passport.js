const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport');
const Keys = require('./keys');
const User = require('../models/user');

/*
  CONFIGURACIÓN DE ESTRATEGIA JWT PARA PASSPORT

  Se define cómo Passport debe leer y validar el token JWT
*/
const opts = {

  // Indica de dónde se extrae el token (header Authorization: Bearer token)
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

  // Clave secreta usada para verificar el token
  secretOrKey: Keys.secretOrKey
};

/*
  ESTRATEGIA JWT

  Se ejecuta cada vez que se protege una ruta con Passport
*/
passport.use(new JwtStrategy(opts, (jwt_payload, done) => {

  // Se busca el usuario en la base de datos usando el id del token
  User.findById(jwt_payload.id, (err, user) => {

    // Si ocurre un error en la consulta
    if (err) {
      return done(err, false);
    }

    // Si el usuario existe, se autoriza el acceso
    if (user) {
      return done(null, user);
    } 
    else {
      // Si no existe el usuario, se rechaza el token
      return done(null, false);
    }
  });
}));

/*
  EXPORTACIÓN DE PASSPORT

  Permite usar la autenticación en rutas protegidas
*/
module.exports = passport;
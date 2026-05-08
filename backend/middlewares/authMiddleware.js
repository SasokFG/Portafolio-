const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

/*
  MIDDLEWARE: verifyToken

  Se encarga de verificar que el usuario envíe un token válido
  en el header Authorization.
*/
function verifyToken(req, res, next) {
  
  // Se obtiene el header Authorization
  const authHeader = req.headers["authorization"];

  // Si no existe el header, se rechaza la petición
  if (!authHeader) {
    return res.status(403).json({
      success: false,
      message: "No se proporcionó un token",
    });
  }

  // Se separa el token del formato "Bearer token"
  const token = authHeader.split(" ")[1];

  // Si no hay token después de separar, es inválido
  if (!token) {
    return res.status(403).json({
      success: false,
      message: "Formato de token inválido",
    });
  }

  // Verificación del token con JWT
  jwt.verify(token, keys.secretOrKey, (err, decoded) => {

    // Si el token es inválido o expiró
    if (err) {
      return res.status(401).json({
        success: false,
        message: "Token inválido o expirado",
        error: err,
      });
    }

    // Si el token es válido, se guarda la información del usuario
    req.user = decoded;

    // Se continúa con la siguiente función o ruta
    next();
  });
}

/*
  MIDDLEWARE: authorizeRoles

  Permite restringir acceso según roles de usuario
*/
function authorizeRoles(roles) {

  // Retorna un middleware personalizado
  return (req, res, next) => {

    // Verifica que exista el usuario y que su rol esté permitido
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Acceso denegado: se requiere rol ${roles.join(" o ")}`,
      });
    }

    // Si el rol es válido, continúa
    next();
  };
}

// Exporta los middlewares para usarlos en rutas
module.exports = {
  verifyToken,
  authorizeRoles,
};
require('dotenv').config();

const mysql = require('mysql');

/*
  CREACIÓN DE LA CONEXIÓN A MYSQL

  Se usa mysql.createConnection para establecer conexión directa
  con la base de datos usando las variables del archivo .env
*/
const db = mysql.createConnection({
  host: process.env.DB_HOST,        // Dirección del servidor MySQL (localhost o IP)
  user: process.env.DB_USER,        // Usuario de MySQL (ej: root)
  password: process.env.DB_PASSWORD,// Contraseña del usuario
  database: process.env.DB_NAME,    // Nombre de la base de datos
  port: process.env.DB_PORT         // Puerto de MySQL (3306 por defecto)
});

/*
  CONEXIÓN A LA BASE DE DATOS

  Se intenta conectar a MySQL.
  Si hay error, se lanza excepción.
  Si todo está bien, se confirma conexión.
*/
db.connect(function(err) {
  if (err) throw err; // Detiene el servidor si falla la conexión

  console.log('Base de datos conectada'); // Mensaje de éxito
});

/*
  EXPORTACIÓN DE LA CONEXIÓN

  Permite usar la conexión db en otros archivos del proyecto
  (modelos, controladores, etc.)
*/
module.exports = db;
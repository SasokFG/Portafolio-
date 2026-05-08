const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

// Exporta todas las funciones del controlador
module.exports = {

  // =========================
  // LOGIN DE USUARIO
  // =========================
  login(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    // Buscar usuario por email
    User.findByEmail(email, async (err, myUser) => {

      if (err) {
        return res.status(501).json({
          success: false,
          message: "Error al consultar el usuario",
          error: err,
        });
      }

      // Si no existe usuario
      if (!myUser) {
        return res.status(401).json({
          success: false,
          message: "El email no existe en la base de datos",
        });
      }

      // Comparar contraseña ingresada con la encriptada
      const isPasswordValid = await bcrypt.compare(password, myUser.password);

      if (isPasswordValid) {

        // Generar token JWT
        const token = jwt.sign(
          { id: myUser.id, email: myUser.email, role: myUser.role },
          keys.secretOrKey,
          { expiresIn: "1h" }
        );

        // Datos que se envían al frontend
        const data = {
          id: myUser.id,
          email: myUser.email,
          name: myUser.name,
          lastname: myUser.lastname,
          image: myUser.image,
          phone: myUser.phone,
          role: myUser.role,
          session_token: `JWT ${token}`,
        };

        return res.status(201).json({
          success: true,
          message: "Usuario autenticado",
          data: data,
        });

      } else {
        return res.status(401).json({
          success: false,
          message: "Contraseña o correo incorrecto",
        });
      }
    });
  },

  // =========================
  // LISTAR TODOS LOS USUARIOS
  // =========================
  getAllUsers(req, res) {
    User.findAll((err, users) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Error al listar usuarios",
          error: err,
        });
      }

      return res.status(200).json({
        success: true,
        message: "Lista de usuarios",
        data: users,
      });
    });
  },

  // =========================
  // BUSCAR USUARIO POR ID
  // =========================
  getUserById(req, res) {
    const id = req.params.id;

    User.findById(id, (err, user) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Error al consultar el usuario",
          error: err,
        });
      }

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "Usuario no encontrado",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Usuario encontrado",
        data: user,
      });
    });
  },

  // =========================
  // REGISTRAR USUARIO
  // =========================
  register(req, res) {
    const user = req.body;

    // Si no envía rol, se asigna por defecto
    if (!user.role) {
      user.role = "user";
    }

    User.create(user, (err, data) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Error al crear al usuario",
          error: err,
        });
      }

      return res.status(201).json({
        success: true,
        message: "Usuario creado correctamente",
        data: data,
      });
    });
  },

  // =========================
  // ACTUALIZAR USUARIO
  // =========================
  getUserUpdate(req, res) {
    const user = req.body;

    User.update(user, (err, data) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Error al actualizar el usuario",
          error: err,
        });
      }

      return res.status(200).json({
        success: true,
        message: "Usuario actualizado",
        data: data,
      });
    });
  },

  // =========================
  // ELIMINAR USUARIO
  // =========================
  getUserDelete(req, res) {
    const id = req.params.id;

    User.delete(id, (err, data) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Error al eliminar el usuario",
          error: err,
        });
      }

      return res.status(200).json({
        success: true,
        message: "Usuario eliminado",
        data: data,
      });
    });
  },
};
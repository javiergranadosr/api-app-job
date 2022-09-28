const bcryptjs = require("bcryptjs");
const User = require("../models/user.model");
const { generateJwt } = require("../helpers/generate.jwt");
const jwt = require("jsonwebtoken");

/**
 * Inicio de sesion con email y password
 * @param {*} req
 * @param {*} res
 * @returns
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).populate("roleId", "name");
    if (!user) {
      return res
        .status(400)
        .json({ message: "Usuario / Password incorrectos." });
    }

    if (!user.status) {
      return res.status(400).json({ message: "Usuario dado de baja." });
    }

    const validatePassword = bcryptjs.compareSync(password, user.password);
    if (!validatePassword) {
      return res
        .status(400)
        .json({ message: "Usuario / Password incorrectos." });
    }

    const token = await generateJwt(user._id, user.name);

    res.json({ token, data: user });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message:
        "Hubo un error al iniciar sesión. Favor de hablar con un administrador.",
    });
  }
};

const authToken = async (req, res) => {
  try {
    const token = req.header("token");
    console.log("TOKEN: ", token);

    if (!token) {
      return res.status(401).json({
        hasToken: false,
        message: "No hay token de usuario en la petición.",
      });
    }

    const { uid } = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findById(uid);

    if (!user) {
      return res
        .status(401)
        .json({ hasToken: false, message: "Usuario / password incorrectos." });
    }

    if (!user.status) {
      return res
        .status(401)
        .json({ hasToken: false, message: "Usuario dado de baja." });
    }

    return res.status(200).json({ hasToken: true, message: "Token valido." });
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Token invalido." });
  }
};

/**
 * Verifica rol de usuario de acuerdo al permiso requerido, para realizar alguna accion en especifico.
 * @param {*} req
 * @param {*} res
 * @returns
 */
const authRole = async (req, res) => {
  try {
    const { userId, roleRequired } = req.body;
    const user = await User.findById(userId).populate("roleId", "name");
    console.log(userId, roleRequired);
    if (!user || !roleRequired) {
      return res.status(401).json({
        hasRole: false,
        message: "No tiene los permisos para continuar con este proceso.",
      });
    }

    if (!roleRequired.includes(user.roleId.name.trim().toUpperCase())) {
      return res.status(401).json({
        hasRole: false,
        message: "No tiene los permisos para continuar con este proceso. ",
      });
    }

    res.status(200).json({ hasRole: true, message: "Permiso correcto." });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message:
        "Hubo un error al verificar rol de usuario. Favor de hablar con un administrador.",
    });
  }
};

module.exports = { login, authToken, authRole };

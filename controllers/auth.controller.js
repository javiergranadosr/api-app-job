const bcryptjs = require("bcryptjs");
const User = require("../models/user.model");
const { generateJwt } = require("../helpers/generate.jwt");

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
    res.status(500).json({ message: "Hubo un error al iniciar sesión. Favor de hablar con un administrador." });
  }
};

module.exports = { login };

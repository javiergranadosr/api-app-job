const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

/**
 * Valida token de usuario, al realizar una accion.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const validateJwt = async (req, res, next) => {
  try {
    const token = req.header("token");

    if (!token) {
      return res
        .status(401)
        .json({ message: "No hay token de usuario en la petición." });
    }

    const { uid, name} = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findById(uid);

    if (!user) {
      return res
        .status(401)
        .json({ message: "Usuario / password incorrectos." });
    }

    if (!user.status) {
      return res.status(401).json({ message: "Usuario dado de baja." });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Token invalido." });
  }
};

module.exports = { validateJwt };

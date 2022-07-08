const User = require("../models/user.model");
const bcryptjs = require("bcryptjs");

/**
 * Crea un nuevo usuario
 * @param {*} req 
 * @param {*} res 
 */
const createUser = async (req, res) => {
  try {
    const { name, email, roleId, password } = req.body;
    const user = new User({
      name,
      email,
      roleId,
      password,
    });
    const saltPassword = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, saltPassword);
    await user.save();

    res.status(201).json({ message: "Cuenta creada con éxito.", user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating user." });
  }
};

module.exports = {
  createUser,
};

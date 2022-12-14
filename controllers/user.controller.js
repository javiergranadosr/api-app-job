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
    res.status(500).json({
      message:
        "Hubo un error al crear cuenta. Favor de hablar con un administrador.",
    });
  }
};

/**
 * Actualizar informacion de usuario
 * @param {*} req
 * @param {*} res
 */
const updateUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { name, email, phone, city, password, newPassword } = req.body;

    let data = { name, phone, city, updatedAt: new Date() };

    if (email) {
      data.email = email;
    }

    if (password && newPassword) {
      const user = await User.findById(userId);
      if (!user) {
        return res
          .status(400)
          .json({ message: "Usuario / Password incorrectos." });
      }

      const validatePassword = bcryptjs.compareSync(password, user.password);
      if (!validatePassword) {
        return res
          .status(400)
          .json({ message: "Usuario / Password incorrectos." });
      }

      const salt = bcryptjs.genSaltSync();
      data.password = bcryptjs.hashSync(newPassword, salt);
    }

    const user = await User.findByIdAndUpdate(userId, data, { new: true });

    res.json({ message: "Cuenta actualizada con éxito.", data: user });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message:
        "Hubo un error al actualizar cuenta. Favor de hablar con un administrador.",
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    let data = await User.findById(id);
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message:
        "Hubo un error al obtener perfil de usuario. Favor de hablar con un administrador.",
    });
  }
};

module.exports = {
  createUser,
  updateUser,
  getUserById,
};

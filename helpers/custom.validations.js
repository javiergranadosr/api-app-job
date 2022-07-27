const User = require("../models/user.model");
const Role = require("../models/role.model");

/**
 * Valida usuario por id
 * @param {*} id 
 */
const existUserById = async (id) => {
  const exists = await User.findById(id);
  if (!exists) {
    throw new Error(
      `El usuario ingresado es invalido, favor de contactar a un administrador.`
    );
  }
};

/**
 * Valida que exista el email
 * @param {*} email
 */
const existEmail = async (email) => {
  const exists = await User.findOne({ email });
  if (exists) {
    throw new Error(
      `El correo electrónico ${email} ya se encuentra registrado. Favor de ingresar uno nuevo.`
    );
  }
};

/**
 * Valida que exista el rol
 * @param {*} roleId
 */
const existRole = async (roleId) => {
  const exists = await Role.findById(roleId);
  if (!exists) {
    throw new Error(`El rol seleccionado no es válido.`);
  }
};

module.exports = {
  existUserById,
  existEmail,
  existRole,
};

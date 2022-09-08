const User = require("../models/user.model");
const Role = require("../models/role.model");
const Category = require("../models/category.model");
const Vacant = require("../models/vacant.model");
const Salary = require("../models/salary.model");
const Candidate = require("../models/candidate.model");

const mongoose = require("mongoose");

/**
 * Valida usuario por id
 * @param {*} id
 */
const existUserById = async (id) => {
  if (mongoose.isValidObjectId(id)) {
    const exists = await User.findById(id);
    if (!exists) {
      throw new Error(
        `El usuario ingresado es invalido, favor de contactar a un administrador.`
      );
    }
  } else {
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
  if (roleId) {
    const exists = await Role.findById(roleId);
    if (!exists) {
      throw new Error(`El rol seleccionado no es válido.`);
    }
  }
};

/**
 * Valida categoria por id
 * @param {*} id
 */
const existCategoryById = async (id) => {
  if (mongoose.isValidObjectId(id)) {
    const exists = await Category.findById(id);
    if (!exists) {
      throw new Error(
        `La categoría seleccionada es invalida, favor de contactar a un administrador.`
      );
    }
  } else {
    throw new Error(
      `La categoría seleccionada es invalida, favor de contactar a un administrador.`
    );
  }
};

/**
 * Valida vacante por id
 * @param {*} id
 */
const existVacantById = async (id) => {
  if (mongoose.isValidObjectId(id)) {
    const exists = await Vacant.findById(id);
    if (!exists) {
      throw new Error(
        `La vacante es invalida, favor de contactar a un administrador.`
      );
    }
  } else {
    throw new Error(
      `La vacante es invalida, favor de contactar a un administrador.`
    );
  }
};

/**
 * Valida salario por id
 * @param {*} id
 */
const existSalaryById = async (id) => {
  if (mongoose.isValidObjectId(id)) {
    const exists = await Salary.findById(id);
    if (!exists) {
      throw new Error(
        `La salario seleccionado es invalido, favor de contactar a un administrador.`
      );
    }
  } else {
    throw new Error(
      `El salario seleccionado es invalido, favor de contactar a un administrador.`
    );
  }
};

/**
 * Valida si un candidato o candidata ya aplico en la vacante
 * @param {*} id
 */
const existCandidate = async (id) => {
  if (mongoose.isValidObjectId(id)) {
    const exists = await Candidate.find({ candidate: id });
    if (exists.length > 0) {
      throw new Error(
        `No es posible aplicar en esta vacante, ya ha aplicado anteriormente.`
      );
    }
  } else {
    throw new Error(`"El candidato o candidata que desea aplicar es invalido.`);
  }
};

module.exports = {
  existUserById,
  existEmail,
  existRole,
  existCategoryById,
  existVacantById,
  existSalaryById,
  existCandidate,
};

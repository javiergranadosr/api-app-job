const { validationResult } = require("express-validator");

/**
 * Validaciones del express valdidator
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }
  next();
};

module.exports = validate;

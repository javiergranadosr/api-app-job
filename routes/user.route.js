const { Router } = require("express");
const { check } = require("express-validator");

const validate = require("../middlewares/validate");
const { existEmail, existRole } = require("../helpers/custom.validations");
const { createUser } = require("../controllers/index.controller");

const router = Router();

router.post(
  "/create",
  [
    check("name", "El nombre es requerido.").not().isEmpty(),
    check("email", "El correo electrónico es requerido.").isEmail(),
    check("email").custom(existEmail),
    check("roleId", "El rol de usuario es requerido.").not().isEmpty(),
    check("roleId").isMongoId(),
    check("roleId").custom(existRole),
    check("password", "La contraseña es requerida.").not().isEmpty(),
    validate,
  ],
  createUser
);

module.exports = router;

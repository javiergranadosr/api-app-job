const { Router } = require("express");
const { check } = require("express-validator");
const validate = require("../middlewares/validate");
const { login } = require("../controllers/index.controller");

const router = Router();

router.post(
  "/login",
  [
    check("email", "El correo electrónico es requerido.").isEmail(),
    check("password", "La contraseña es requerida.").not().isEmpty(),
    validate,
  ],
  login
);

module.exports = router;

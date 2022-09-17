const { Router } = require("express");
const { check } = require("express-validator");

const validate = require("../middlewares/validate");
const {
  existEmail,
  existRole,
  existUserById,
} = require("../helpers/custom.validations");
const {
  createUser,
  updateUser,
  getUserById,
} = require("../controllers/index.controller");
const { validateJwt } = require("../middlewares/validate.jwt");

const router = Router();

router.post(
  "/create",
  [
    check("name", "El nombre es requerido.").not().isEmpty(),
    check("email", "El correo electrónico es requerido.").isEmail(),
    check("email").custom(existEmail),
    check("roleId", "El rol de usuario es requerido.").not().isEmpty(),
    check("roleId", "Rol de usuario invalido.").isMongoId(),
    check("roleId").custom(existRole),
    check("password", "La contraseña es requerida.").not().isEmpty(),
    validate,
  ],
  createUser
);

router.get(
  "/profile/:id",
  [
    validateJwt,
    check("id", "El identificador del usuario es invalido.").isMongoId(),
    check("id").custom(existUserById),
    validate,
  ],
  getUserById
);

router.put(
  "/update/:userId",
  [
    validateJwt,
    check("userId", "El identificador de usuario es requerido.")
      .not()
      .isEmpty(),
    check("userId").isMongoId(),
    check("userId").custom(existUserById),
    check("name", "El nombre es requerido.").not().isEmpty(),
    check("email", "El correo electrónico es requerido.")
      .isEmail()
      .optional({ nullable: true, checkFalsy: true }),
    check("email")
      .custom(existEmail)
      .optional({ nullable: true, checkFalsy: true }),
    check("phone", "El número de teléfono es requerido.").not().isEmpty(),
    check("city", "La ciudad es requerida.").not().isEmpty(),
    check("password", "La contraseña actual es requerida.")
      .not()
      .isEmpty()
      .optional({ nullable: true, checkFalsy: true }),
    check("newPassword", "La nueva contraseña es requerida.")
      .not()
      .isEmpty()
      .optional({ nullable: true, checkFalsy: true }),
    validate,
  ],
  updateUser
);

module.exports = router;

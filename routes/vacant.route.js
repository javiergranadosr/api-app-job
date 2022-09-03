const { Router } = require("express");
const { check } = require("express-validator");
const {
  create,
  getVacantByRecruiter,
  deleteVacant,
  getVacantById,
} = require("../controllers/index.controller");
const { validateJwt } = require("../middlewares/validate.jwt");
const { hasRole } = require("../middlewares/validate.role");
const validate = require("../middlewares/validate");
const {
  existUserById,
  existCategoryById,
  existVacantById,
} = require("../helpers/custom.validations");

const router = Router();

router.post(
  "/create",
  [
    validateJwt,
    hasRole("RECRUITER"),
    check("author", "El identificador de usuario es requerido.")
      .not()
      .isEmpty(),
    check("author", "Identificador de usuario invalido.").isMongoId(),
    check("author").custom(existUserById),
    check("title", "El título de la vacante es requerido.").not().isEmpty(),
    check("salary", "El salario de la vacante es requerido.").not().isEmpty(),
    check("salary", "El formato del salario es invalido.").isNumeric(),
    check("category", "La categoría de la vacante es requerida.")
      .not()
      .isEmpty(),
    check(
      "category",
      "El identificador de la categoría es invalido."
    ).isMongoId(),
    check("category").custom(existCategoryById),
    check("company", "El nombre de la empresa es requerido.").not().isEmpty(),
    check("lastDate", "La fecha para postularse es requerida.").not().isEmpty(),
    check("description", "La descripción de la vacante es requerida.")
      .not()
      .isEmpty(),
    check("image", "La imagen de la vacante es requerida.").not().isEmpty(),
    validate,
  ],
  create
);

router.get(
  "/detailVacant/:id",
  [
    validateJwt,
    hasRole("RECRUITER"),
    check("id", "El identificador de la vacante es invalido.").isMongoId(),
    check("id").custom(existVacantById),
    validate,
  ],
  getVacantById
);

router.get(
  "/vacantsRecruiter",
  [validateJwt, hasRole("RECRUITER"), validate],
  getVacantByRecruiter
);

router.delete(
  "/delete/:id",
  [
    validateJwt,
    hasRole("RECRUITER"),
    check("id", "El identificador de la vacante es invalido.").isMongoId(),
    check("id").custom(existVacantById),
    validate,
  ],
  deleteVacant
);

module.exports = router;

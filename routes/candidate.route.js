const { Router } = require("express");
const { check } = require("express-validator");
const { validateJwt } = require("../middlewares/validate.jwt");
const {
  existVacantById,
  existUserById,
  existCandidate,
} = require("../helpers/custom.validations");
const validate = require("../middlewares/validate");
const { hasRole } = require("../middlewares/validate.role");
const {
  getCandidates,
  applyCandidate,
  getTotalCandidates,
  getVacantByCandidate,
} = require("../controllers/index.controller");

const router = Router();

router.post(
  "/apply",
  [
    validateJwt,
    hasRole("DEVELOPER"),
    check(
      "candidate",
      "El candidato o candidata que desea aplicar es requerido."
    )
      .not()
      .isEmpty(),
    check(
      "candidate",
      "El candidato o candidata que desea aplicar es invalido."
    ).isMongoId(),
    check("candidate").custom(existUserById),
    check("vacant", "La vacante de la vacante es requerida.").not().isEmpty(),
    check("vacant", "El identificador de la vacante es invalido.").isMongoId(),
    check("vacant").custom(existVacantById),
    validate,
  ],
  applyCandidate
);

router.get(
  "/candidatesByVacant",
  [
    validateJwt,
    hasRole("RECRUITER"),
    check("id", "El identificador de la vacante es invalido.").isMongoId(),
    check("id").custom(existVacantById),
    validate,
  ],
  getCandidates
);

router.get(
  "/total/:id",
  [
    validateJwt,
    hasRole("RECRUITER"),
    check("id", "El identificador de la vacante es invalido.").isMongoId(),
    check("id").custom(existVacantById),
    validate,
  ],
  getTotalCandidates
);

router.get(
  "/vacantsCandidate",
  [validateJwt, hasRole("DEVELOPER"), validate],
  getVacantByCandidate
);

module.exports = router;

const { Router } = require("express");
const { validateJwt } = require("../middlewares/validate.jwt");
const { hasRole } = require("../middlewares/validate.role");
const validate = require("../middlewares/validate");
const { getCategories } = require("../controllers/index.controller");

const router = Router();

router.get(
  "/",
  [validateJwt, hasRole("RECRUITER"), validate],
  getCategories
);

module.exports = router;

const { Router } = require("express");
const { validateFile } = require("../middlewares/validate.file");
const { updateFile } = require("../controllers/index.controller");
const { validateJwt } = require("../middlewares/validate.jwt");
const validate = require("../middlewares/validate");

const router = Router();

router.put(
  "/uploadFile/:collection/:id",
  [validateJwt, validate, validateFile],
  updateFile
);

module.exports = router;

const { Router } = require("express");
const { getCategories } = require("../controllers/index.controller");

const router = Router();

router.get(
  "/",
  getCategories
);

module.exports = router;

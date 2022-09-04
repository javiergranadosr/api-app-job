const { Router } = require("express");
const router = Router();
const { getSalaries } = require("../controllers/index.controller");

router.get("/", getSalaries);

module.exports = router;

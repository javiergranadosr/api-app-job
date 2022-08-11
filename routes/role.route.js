const { Router } = require("express");
const router = Router();
const { getRoles } = require("../controllers/index.controller");

router.get("/", getRoles);

module.exports = router;

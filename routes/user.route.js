const { Router } = require("express");
const { createUser } = require("../controllers/index.controller");

const router = Router();

router.get("/create", createUser);

module.exports = router;

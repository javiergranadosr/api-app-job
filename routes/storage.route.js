const { Router } = require("express");
const { validateFile } = require("../middlewares/validate.file");
const { uploadProfileImage } = require("../controllers/index.controller");

const router = Router();

router.post("/uploadProfileImage", validateFile, uploadProfileImage);

module.exports = router;

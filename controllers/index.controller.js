const UserController = require("../controllers/user.controller");
const AuthController = require("../controllers/auth.controller");
const StorageController = require("../controllers/storage.controller");

module.exports = {
  ...UserController,
  ...AuthController,
  ...StorageController,
};

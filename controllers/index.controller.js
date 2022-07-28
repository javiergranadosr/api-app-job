const UserController = require("../controllers/user.controller");
const AuthController = require("../controllers/auth.controller");
const StorageController = require("../controllers/storage.controller");
const CategoryController = require("../controllers/category.controller");

module.exports = {
  ...UserController,
  ...AuthController,
  ...StorageController,
  ...CategoryController
};

const UserController = require("../controllers/user.controller");
const AuthController = require("../controllers/auth.controller");
const StorageController = require("../controllers/storage.controller");
const CategoryController = require("../controllers/category.controller");
const RoleController = require("../controllers/role.controller");

module.exports = {
  ...UserController,
  ...AuthController,
  ...StorageController,
  ...CategoryController,
  ...RoleController,
};

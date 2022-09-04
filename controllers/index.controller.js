const UserController = require("../controllers/user.controller");
const AuthController = require("../controllers/auth.controller");
const StorageController = require("../controllers/storage.controller");
const CategoryController = require("../controllers/category.controller");
const RoleController = require("../controllers/role.controller");
const VacantController = require("../controllers/vacant.controller");
const SalaryController = require("../controllers/salary.controller");

module.exports = {
  ...UserController,
  ...AuthController,
  ...StorageController,
  ...CategoryController,
  ...RoleController,
  ...VacantController,
  ...SalaryController,
};

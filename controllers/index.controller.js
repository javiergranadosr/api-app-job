const UserController = require("../controllers/user.controller");
const StorageController = require("../controllers/storage.controller");

module.exports = {
  ...UserController,
  ...StorageController,
};

const Role = require("../models/role.model");

const hasRole = (...roles) => {
  return async (req, res, next) => {
    if (!req.user) {
      return res.status(500).json({
        ok: false,
        message:
          "No se puede continuar con el proceso, usuario invalido. Favor de contactar a un administrador.",
      });
    }
    const role = await Role.findById(req.user.roleId);
    if (!roles.includes(role.name)) {
      return res.status(401).json({
        ok: false,
        message: "No tiene los permisos para continuar con este proceso. ",
      });
    }
    next();
  };
};

module.exports = { hasRole };

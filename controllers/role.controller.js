const Role = require("../models/role.model");

const getRoles = async (req, res) => {
  try {
    const { limit = 5, from = 0 } = req.query;
    const [total, roles] = await Promise.all([
      Role.countDocuments(),
      Role.find().skip(from).limit(limit),
    ]);
    res.json({ total, roles });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message:
        "Hubo un error al obtener roles. Favor de hablar con un administrador.",
    });
  }
};

module.exports = { getRoles };

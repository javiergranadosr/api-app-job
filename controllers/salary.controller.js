const Salary = require("../models/salary.model");

const getSalaries = async (req, res) => {
  try {
    const { limit = 20, page = 0 } = req.query;
    const [total, salaries] = await Promise.all([
      Salary.countDocuments(),
      Salary.find().skip(page).limit(limit),
    ]);
    res.json({ total, salaries });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message:
        "Hubo un error al obtener salarios. Favor de hablar con un administrador.",
    });
  }
};

module.exports = {
  getSalaries,
};

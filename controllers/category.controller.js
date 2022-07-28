const Category = require("../models/category.model");

const getCategories = async (req, res) => {
  try {
    const { limit = 20, from = 0 } = req.query;

    const [total, categories] = await Promise.all([
      Category.countDocuments(),
      Category.find().skip(from).limit(limit),
    ]);

    res.json({ total, categories });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message:
        "Hubo un error al obtener categorías. Favor de hablar con un administrador.",
    });
  }
};

module.exports = { getCategories };

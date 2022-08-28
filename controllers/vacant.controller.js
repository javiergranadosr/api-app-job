const Vacant = require("../models/vacant.model");

const create = async (req, res) => {
  try {
    const {
      author,
      title,
      salary,
      category,
      company,
      lastDate,
      description,
      image,
    } = req.body;

    const vacant = new Vacant({
      title,
      salary,
      category,
      company,
      lastDate,
      description,
      image,
      author,
    });

    await vacant.save();
    res.status(201).json({ message: "Vacante creada con éxito.", vacant });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating vacant." });
  }
};

const getVacantByRecruiter = async (req, res) => {
  try {
    const { author, limit = 5, page = 0 } = req.query;
    const [total, vacants] = await Promise.all([
      Vacant.countDocuments({author}),
      Vacant.find({author})
        .skip(page)
        .limit(limit)
        .populate("author", "name")
        .populate("category", "name"),
    ]);
    res.json({ total, vacants });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message:
        "Hubo un error al obtener vacantes. Favor de hablar con un administrador.",
    });
  }
};

module.exports = { create, getVacantByRecruiter };

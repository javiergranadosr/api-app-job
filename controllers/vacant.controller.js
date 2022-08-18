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

module.exports = { create };

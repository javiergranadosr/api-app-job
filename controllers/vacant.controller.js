const Vacant = require("../models/vacant.model");
const { ObjectId } = require("mongoose").Types;


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
    res.status(500).json({
      message:
        "Hubo un error al crear vacante. Favor de hablar con un administrador.",
    });
  }
};

const getVacantById = async (req, res) => {
  try {
    const id = req.params.id;
    let data = await Vacant.findById(id)
      .populate("category", "name")
      .populate("salary", "name");
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message:
        "Hubo un error al obtener vacante. Favor de hablar con un administrador.",
    });
  }
};

const getVacantByRecruiter = async (req, res) => {
  try {
    const { author, limit = 5, page = 0 } = req.query;
    const conditions = { status: true, $and: [{ author }] };
    const [total, vacants] = await Promise.all([
      Vacant.countDocuments(conditions),
      Vacant.find(conditions)
        .skip(page)
        .limit(limit)
        .populate("author", "name")
        .populate("category", "name")
        .populate("salary", "name"),
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

const getVacants = async (req, res) => {
  try {
    const { term, category, salary, limit = 10, page = 0 } = req.query;
    let and = [{ status: true }];
    const regex = new RegExp(term, "i");

    if (category && ObjectId.isValid(category)) {
      and.push({ category });
    }

    if (salary && ObjectId.isValid(salary)) {
      and.push({ salary });
    }

    const conditions = {
      $or: [{ title: regex }, { company: regex }],
      $and: and,
    };

    const [total, vacants] = await Promise.all([
      Vacant.countDocuments(conditions),
      Vacant.find(conditions)
        .skip(page)
        .limit(limit)
        .populate("author", "name")
        .populate("category", "name")
        .populate("salary", "name"),
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

const deleteVacant = async (req, res) => {
  try {
    const id = req.params.id;
    const vacant = await Vacant.findByIdAndUpdate(id, {
      status: false,
      new: true,
    });
    res.json({
      delete: true,
      message: `Vacante ${vacant.title} eliminada con éxito.`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message:
        "Hubo un error al eliminar vacante. Favor de hablar con un administrador.",
    });
  }
};

const updateVacant = async (req, res) => {
  try {
    const vacantId = req.params.id;
    const { title, salary, category, company, lastDate, description, image } =
      req.body;

    const data = {
      title,
      salary,
      category,
      company,
      lastDate,
      description,
      updatedAt: new Date(),
    };

    if (image) {
      data.image = image;
    }

    const vacant = await Vacant.findByIdAndUpdate(vacantId, data, {
      new: true,
    });

    res.status(200).json({ message: "Vacante actualizada con éxito.", vacant });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message:
        "Hubo un error al actualizar vacante. Favor de hablar con un administrador.",
    });
  }
};

module.exports = {
  create,
  getVacantByRecruiter,
  deleteVacant,
  getVacantById,
  updateVacant,
  getVacants,
};

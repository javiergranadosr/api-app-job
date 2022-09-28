const Candidate = require("../models/candidate.model");
const Vacant = require("../models/vacant.model");

const applyCandidate = async (req, res) => {
  try {
    const { candidate, vacant } = req.body;
    const existCandidate = await Candidate.findOne({ candidate, vacant });
    const todayDate = new Date();

    if (existCandidate) {
      return res.status(400).json({
        message:
          "No es posible aplicar en esta vacante, ya ha aplicado anteriormente.",
      });
    }

    const dataVacant = await Vacant.findById(vacant);

    if (!dataVacant) {
      return res.status(400).json({
        message:
          "La vacante es invalida, favor de contactar a un administrador.",
      });
    }
    
    if (todayDate.getTime() > dataVacant.lastDate.getTime()) {
      return res.json({
        message:
          "Su postulación no fue realizada con éxito la fecha para postulaciones ha finalizado.",
      });
    }

    const data = new Candidate({ candidate, vacant });
    await data.save();
    res.status(201).json({ message: "Su postulación ha sido un éxito.", data });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message:
        "Hubo un error al aplicar a la vacante. Favor de hablar con un administrador.",
    });
  }
};

const getCandidates = async (req, res) => {
  try {
    const { id, limit = 10, page = 0 } = req.query;

    const [total, candidates] = await Promise.all([
      Candidate.countDocuments({ vacant: id }),
      Candidate.find({ vacant: id })
        .skip(page)
        .limit(limit)
        .populate("candidate", ["name", "email", "image"])
        .populate("vacant", "title"),
    ]);

    res.json({ total, candidates });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message:
        "Hubo un error al obtener candidatos. Favor de hablar con un administrador.",
    });
  }
};

const getTotalCandidates = async (req, res) => {
  try {
    const id = req.params.id;
    const total = await Candidate.countDocuments({ vacant: id });
    res.json({ total });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message:
        "Hubo un error al obtener total de candidatos. Favor de hablar con un administrador.",
    });
  }
};

const getVacantByCandidate = async (req, res) => {
  try {
    const { candidate, limit = 5, page = 0 } = req.query;
    const [total, vacants] = await Promise.all([
      Candidate.countDocuments({ candidate }),
      Candidate.find({ candidate })
        .skip(page)
        .limit(limit)
        .populate("candidate", "name")
        .populate("vacant", [
          "title",
          "salary",
          "category",
          "company",
          "lastDate",
          "description",
          "image",
          "_id",
        ]),
    ]);
    res.json({ total, vacants });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message:
        "Hubo un error al obtener postulaciones. Favor de hablar con un administrador.",
    });
  }
};

module.exports = {
  getCandidates,
  applyCandidate,
  getTotalCandidates,
  getVacantByCandidate,
};

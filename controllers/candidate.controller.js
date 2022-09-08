const Candidate = require("../models/candidate.model");

const applyCandidate = async (req, res) => {
  try {
    const { candidate, vacant } = req.body;
    const data = new Candidate({ candidate, vacant });
    await data.save();
    res.status(201).json({ message: "Su postulación ha sido un éxito.", data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error in applying in the vacant." });
  }
};

const getCandidates = async (req, res) => {
  try {
    const id = req.params.id;
    const { limit = 10, from = 0 } = req.query;

    const [total, candidates] = await Promise.all([
      Candidate.countDocuments({ vacant: id }),
      Candidate.find({ vacant: id })
        .skip(from)
        .limit(limit)
        .populate("candidate", "name")
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

module.exports = { getCandidates, applyCandidate };

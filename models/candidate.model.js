const { Schema, model } = require("mongoose");
const formatDate = require("../utils/format.date");

const CandidateSchema = Schema({
  candidate: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "El candidato o candidata para la vacante es requerido."],
  },
  vacant: {
    type: Schema.Types.ObjectId,
    ref: "Vacant",
    required: [true, "La vacante es requerida."],
  },
  applyDate: {
    type: Date,
    default: new Date()
  },
});

CandidateSchema.methods.toJSON = function () {
  const { __v, _id, applyDate, ...candidate } = this.toObject();
  candidate.uid = _id;
  candidate.applyDate = formatDate(applyDate);
  return candidate;
};

module.exports = model("Candidate", CandidateSchema);

const { Schema, model } = require("mongoose");
const formatDate = require("../utils/format.date");

const VacantSchema = Schema({
  title: {
    type: String,
    required: [true, "El título de la vacante es requerido."],
  },
  salary: {
    type: Schema.Types.ObjectId,
    ref: "Salary",
    required: [true, "El salario de la vacante es requerido."],
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: [true, "La categoría de la vacante es requerida."],
  },
  company: {
    type: String,
    required: [true, "El nombre de la empresa es requerido."],
  },
  lastDate: {
    type: Date,
    required: [true, "La fecha para postularse es requerida."],
  },
  description: {
    type: String,
    required: [true, "La descripción de la vacante es requerida."],
  },
  image: {
    type: String,
    required: [true, "La imagen de la vacante es requerida."],
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "El autor o autora de la vacante es requerido."],
  },
  status: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    required: false,
  },
});

VacantSchema.methods.toJSON = function () {
  const { __v, _id, status, createdAt, updatedAt, lastDate, ...vacant } = this.toObject();
  vacant.uid = _id;
  vacant.lastDate = formatDate(lastDate);
  return vacant;
};

module.exports = model("Vacant", VacantSchema);

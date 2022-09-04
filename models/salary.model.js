const { Schema, model } = require("mongoose");

const SalarySchema = Schema({
  name: {
    type: String,
    required: [true, "El salario de la vacante es requerido."],
  },
});

SalarySchema.methods.toJSON = function () {
  const { __v, _id, ...salary } = this.toObject();
  salary.uid = _id;
  return salary;
};

module.exports = model("Salary", SalarySchema);

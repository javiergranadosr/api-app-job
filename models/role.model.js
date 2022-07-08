const { Schema, model } = require("mongoose");

const RoleSchema = Schema({
  name: {
    type: String,
    required: [true, "El nombre del rol es requerido."],
    unique: true,
  },
  description: {
    type: String,
    required: [true, "La descripción del rol es requerida."],
  },
});

RoleSchema.methods.toJSON = function () {
  const { __v, _id, ...role } = this.toObject();
  role.uid = _id;
  return role;
};

module.exports = model("Role", RoleSchema);

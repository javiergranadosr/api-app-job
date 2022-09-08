const { Schema, model } = require("mongoose");

const UserSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "El nombre es requerido."],
    },
    email: {
      type: String,
      required: [true, "El correo electrónico es requerido."],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "La contraseña es requerida."],
    },
    image: {
      type: String,
      required: false,
    },
    roleId: {
      type: Schema.Types.ObjectId,
      ref: "Role",
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
    google: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: new Date(),
    },
    updatedAt: {
      type: Date,
      required: false,
    }
  },
);

UserSchema.methods.toJSON = function () {
  const { __v, password, _id, createdAt, updatedAt, status, google, ...user } =
    this.toObject();
  user.uid = _id;
  return user;
};

module.exports = model("User", UserSchema);

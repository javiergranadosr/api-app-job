const cloudinary = require("cloudinary").v2;
cloudinary.config(process.env.CLOUDINARY_URL);
const { uploadFile, deleteFile } = require("../helpers/upload.file");
const User = require("../models/user.model");
const Vacant = require("../models/vacant.model");

/**
 * Actualizar archivos, imagenes de perfil, CV e imagen de vacante
 * @param {*} req
 * @param {*} res
 * @returns
 */
const updateFile = async (req, res) => {
  try {
    const { collection, id } = req.params;
    let model = {};
    let secure_url = "";
    let path = "";
    let update = false;

    switch (collection) {
      case "users":
        model = await User.findById(id);
        if (!model) {
          return res.status(400).json({
            message:
              "No se puede actualizar la imagen de perfil, usuario invalido.",
          });
        }

        path = `devjobs/profile_images/${id}`;

        // Eliminar imagen de perfil anterior del usuario
        if (model.image) {
          deleteFile(model.image.split("/"), path);
        }

        // Guardar nueva imagen de perfil
        secure_url = await uploadFile(req.files.file, path);
        model.image = secure_url;
        update = true;
        break;

      case "vacants":
        model = await Vacant.findById(id);
        if (!model) {
          return res.status(400).json({
            message:
              "No se puede actualizar la imagen de la vacante, vacante invalida.",
          });
        }
        path = `devjobs/vacant_images/${id}`;
        // Eliminar imagen anterior de la vacante
        if (model.image) {
          deleteFile(model.image.split("/"), path);
        }

        // Guardar nueva imagen de vacante
        secure_url = await uploadFile(req.files.file, path);
        model.image = secure_url;
        update = true;
        break;
    }
    model.save();
    res.json({ update, message: "Archivo actualizado con éxito." });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message:
        "Hubo un error al agregar o actualizar archivo. Favor de hablar con un administrador.",
    });
  }
};

module.exports = {
  updateFile,
};

const cloudinary = require("cloudinary").v2;
cloudinary.config(process.env.CLOUDINARY_URL);
const { uploadFile, deleteFile } = require("../helpers/upload.file");
const User = require("../models/user.model");

//TODO: Cargar CV, Imagenes de perfil e Imagenes de la vacante

/**
 * Actualizar archivos, imagenes de perfil, CV e imagen de vacante
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const updateFile = async (req, res) => {
  const { collection, userId } = req.params;
  let model = {};
  let actualizada = false;

  switch (collection) {
    case "users":
      model = await User.findById(userId);
      if (!model) {
        return res.status(400).json({
          message:
            "No se puede actualizar la imagen de perfil, usuario invalido.",
        });
      }

      // Eliminar imagen de perfil anterior del usuario
      if (model.image) {
        deleteFile(model.image.split("/"), "devjobs/profile_images");
      }

      // Guardar nueva imagen de perfil
      const secure_url = await uploadFile(
        req.files.file,
        "devjobs/profile_images"
      );

      model.image = secure_url;
      actualizada = true;
      break;
  }
  model.save();
  res.json({ actualizada, message: "Archivo actualizado con éxito." });
};

module.exports = {
  updateFile,
};

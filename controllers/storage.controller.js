const { uploadFile } = require("../helpers/upload.file");

//TODO: Cargar CV, Imagenes de perfil e Imagenes de la vacante

/**
 * Cargar foto de perfil de usuarios
 * @param {*} req 
 * @param {*} res 
 */
const uploadProfileImage = async (req, res) => {
  try {
    const secure_url = await uploadFile(
      req.files.file,
      "devjobs/profile_images"
    );
    res.json({ message: "OK", secure_url });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error uploading file in cloudinary in controller." });
  }
};

module.exports = {
  uploadProfileImage,
};

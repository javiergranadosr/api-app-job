const cloudinary = require("cloudinary").v2;
cloudinary.config(process.env.CLOUDINARY_URL);

/**
 * Cargar de archivos
 * @param {*} file 
 * @param {*} folder 
 * @returns 
 */
const uploadFile = async (file, folder) => {
  try {
    const { tempFilePath } = file;
    const { secure_url } = await cloudinary.uploader.upload(tempFilePath, {
      folder,
    });
    return secure_url;
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error uploading file in cloudinary." });
  }
};

/**
 * Elimina el archivo de acuerdo a la ruta ingresada
 * @param {*} shortName 
 * @param {*} pathFolder 
 */
const deleteFile = async (shortName, pathFolder) => {
  const name = shortName[shortName.length - 1];
  const [public_id] = name.split(".");
  cloudinary.uploader.destroy(`${pathFolder}/${public_id}`);
}

module.exports = { uploadFile, deleteFile };

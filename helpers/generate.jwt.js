const jwt = require("jsonwebtoken");

/**
 * Genera token de usuario, con una duracion de 4hr
 * @param {*} uid 
 * @param {*} name 
 * @param {*} surname 
 * @returns 
 */
const generateJwt = (uid = "", name = "", surname = "") => {
  return new Promise((resolve, reject) => {
    const payload = { uid, name, surname };
    jwt.sign(
      payload,
      process.env.SECRET_KEY,
      {
        expiresIn: "4h",
      },
      (error, token) => {
        if (error) {
          console.log(error);
          reject("Error al generar token de usuario.");
        } else {
          resolve(token);
        }
      }
    );
  });
};

module.exports = { generateJwt };

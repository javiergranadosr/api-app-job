const mongoose = require("mongoose");

/**
 * Conexion a base de datos 
 */

const connection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
    throw new Error("Couldn't connect to MongoDB'");
  }
};

module.exports = {
  connection,
};

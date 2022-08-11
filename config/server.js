const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const fileUpload = require("express-fileupload");
const { connection } = require("./connection.db");

/**
 * Configuracion del servidor express
 */

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 8080;
    this.enpoints = {
      users: "/api/v1/users",
      auth: "/api/v1/auth",
      storages: "/api/v1/storages",
      categories: "/api/v1/categories",
      roles: "/api/v1/roles",
    };

    this.connection();
    this.middlewares();
    this.routes();
  }

  async connection() {
    await connection();
  }

  middlewares() {
    // CORS
    const corsOptions = {
      origin: process.env.ORIGIN_URL,
      optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
      methods: "GET,POST,PUT,DELETE",
    };
    this.app.use(cors(corsOptions));
    // LECTURA Y PARSEO EN EL BODY
    this.app.use(express.json());
    // CONFIGURACION DE MORGAN
    this.app.use(morgan("dev"));
    // Fileupload - Carga de archivos
    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
        createParentPath: true,
      })
    );
  }

  routes() {
    this.app.use(this.enpoints.users, require("../routes/user.route"));
    this.app.use(this.enpoints.auth, require("../routes/auth.route"));
    this.app.use(this.enpoints.storages, require("../routes/storage.route"));
    this.app.use(this.enpoints.categories, require("../routes/category.route"));
    this.app.use(this.enpoints.roles, require("../routes/role.route"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`listening on port ${this.port}`);
    });
  }
}
module.exports = Server;

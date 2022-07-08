const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
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
  }

  routes() {
    this.app.use(this.enpoints.users, require("../routes/user.route"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`listening on port ${this.port}`);
    });
  }
}
module.exports = Server;

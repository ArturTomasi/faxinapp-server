require("dotenv/config");

const express = require("express");
const routes = require("./routes");
const database = require("./app/database");

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
    //this.server.use(express.static("public"));
    this.server.use(express.static(__dirname + "/public"));
    //this.server.use("/public", express.static(__dirname, "public"));
  }

  routes() {
    this.server.use(routes);
    this.server.get("/*", (req, res) => res.render("404"));
  }
}

module.exports = new App().server;

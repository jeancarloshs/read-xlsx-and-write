const db = require("../models/index.js");
const routes = require("./routes/routes.js")
const express = require("express");
require('dotenv').config()

async function connectToDatabase() {
  try {
    await db.authenticate;
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

const app = express();

// app.use(cors());

// é um recurso do Express que vai conseguir fazer interpretar o que está chegando via post ou via put
// e transformar aquilo em um objeto para eu poder armazenar, visualizar e manipular.
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// routes(app);

app.use("/", routes);

module.exports = app;

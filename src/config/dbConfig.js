require('dotenv').config();
const Sequelize = require('sequelize');

const DB_NAME = process.env.DB_NAME;
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST
const DB_DIALECT = process.env.DB_DIALECT
const DB_PORT = process.env.DB_PORT

const sequelizeDb = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  dialect: "mysql",
  port: DB_PORT,
  dialectOptions: {
      options: {
        requestTimeout: 600000
      }
    },
  pool: {
      max: 20,
      min: 0,
      acquire: 600000,
      idle: 20000
    }
})

module.exports = sequelizeDb;
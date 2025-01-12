const { Sequelize } = require("sequelize");

const config = require("./database/config.js");

const sequelize = new Sequelize(
  config.development.database,
  config.development.username,
  config.development.password,
  config.development
);

const connect = () => sequelize.authenticate();

module.exports = { sequelize, connect };

const dotenv = require("dotenv");

dotenv.config();

const config = {
  development: {
    username: process.env.POSTGRES_DB_USERNAME,
    password: process.env.POSTGRES_DB_PASSWORD,
    database: process.env.POSTGRES_DB_DATABASE,
    host: process.env.POSTGRES_DB_HOST,
    port: process.env.POSTGRES_DB_PORT,

    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    dialectOptions: {
      useUTC: false,
      useSasl: false,
    },
    dialect: "postgres",
    timezone: "Asia/Kolkata",
    seederStorage: "sequelize",
  },
};

module.exports = config;

const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  development: {
    dialect: process.env.DB_DIALECT,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: process.env.POSTGRES_HOST,
    port: 5432,
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
  test: {
    username: process.env.TEST_DB_USERNAME,
    password: process.env.TEST_DB_PASSWORD,
    database: process.env.TEST_DB_NAME,
    dialect: process.env.DB_DIALECT,
    host: process.env.TEST_DB_HOSTNAME,
    port: 5432,
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
  production: {
    username: process.env.PROD_DB_USERNAME,
    password: process.env.PROD_DB_PASSWORD,
    database: process.env.PROD_DB_NAME,
    host: process.env.PROD_DB_HOSTNAME,
    port: process.env.PROD_DB_PORT,
    dialect: process.env.DB_DIALECT,
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
};

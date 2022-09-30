require("dotenv").config();

module.exports = 
{
  development: {
    username: process.env.Test_DB_USER,
    password: process.env.Test_DB_PASSWORD,
    database: process.env.Test_DB_NAME,
    host: process.env.Test_DB_HOST,
    dialect: process.env.Test_DB_DIALECT
  },
  test: {
    username: process.env.Test_DB_USER,
    password: process.env.Test_DB_PASSWORD,
    database: process.env.Test_DB_NAME,
    host: process.env.Test_DB_HOST,
    dialect: process.env.Test_DB_DIALECT
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT
  }
}


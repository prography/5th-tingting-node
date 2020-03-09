const dotenv = require('dotenv')
dotenv.config()

module.exports = {
  NODE_ENV: process.env.NODE_ENV,
  APP: {
    HOST: process.env.HOST,
    PORT: process.env.PORT
  },
  DB: {
    USERNAME: process.env.DB_USERNAME,
    PASSWORD: process.env.DB_PASSWORD,
    DATABASE: process.env.DATABASE,
    DB_HOST: process.env.DB_HOST,
    DIALECT: process.env.DIALECT,
    OPERATION_ALIAS: false
  }
}

const dotenv = require('dotenv')
dotenv.config()

module.exports = {
  NODE_ENV: process.env.NODE_ENV,
  APP: {
    HOST: process.env.HOST,
    PORT: process.env.PORT
  },
  SENTRY_DSN: process.env.SENTRY_DSN,
  DB: {
    USERNAME: process.env.DB_USERNAME,
    PASSWORD: process.env.DB_PASSWORD,
    DATABASE: process.env.DATABASE,
    HOST: process.env.DB_HOST,
    DIALECT: process.env.DIALECT,
    OPERATION_ALIAS: false
  }
}

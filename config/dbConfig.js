const dotenv = require('dotenv')
dotenv.config()

const dbConfig = {
  development: {
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
    host: process.env.DB_HOST,
    dialect: process.env.DIALECT,
    operatorsAliases: false
  }
  // TO DO : test, production DB 추후에 추가
}

module.exports = dbConfig

const dotenv = require('dotenv')
let path = `${__dirname}/../../.env/dev.env`
if(process.env.NODE_ENV === 'production') path = `${__dirname}/../../.env/prod.env` 
dotenv.config({ path })

module.exports = {
  ENV: process.env.ENV,
  APP: {
    HOST: process.env.HOST,
    PORT: process.env.PORT
  },
  DB: {
    USERNAME: process.env.DB_USERNAME,
    PASSWORD: process.env.DB_PASSWORD,
    DATABASE: process.env.DATABASE,
    HOST: process.env.DB_HOST,
    DIALECT: process.env.DIALECT,
    OPERATION_ALIAS: false
  }
}

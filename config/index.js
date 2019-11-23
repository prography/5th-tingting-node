const dbConfig = require("./dbConfig");
const dotenv = require("dotenv");
dotenv.config();

module.exports = {
    PORT: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV,
    DB_CONFIG: dbConfig,
    SECRET_KEY: process.env.SECRET_KEY
};
const sequelizeConfig = require("./sequelizeConfig");
const dotenv = require("dotenv");
dotenv.config();

module.exports = {
    PORT: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV,
    SEQUELIZE_CONFIG: sequelizeConfig
};

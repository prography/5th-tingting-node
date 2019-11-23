const Sequelize = require("sequelize");
const config = require("../config");
const path = require("path");

const env = config.NODE_ENV;
const db_config = config.DB_CONFIG[env] || "development";
const db = new Sequelize(
    db_config.database,
    db_config.username,
    db_config.password,
    {
        host: db_config.localhost,
        dialect: db_config.dialect
    }
);

module.exports = db;
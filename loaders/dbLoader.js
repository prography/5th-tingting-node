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

//Entity Load
// const User = require("../models/entities/User.entity")(db, Sequelize);
// const Team = require("../models/entities/Team.entity")(db, Sequelize);
// const Img = require("../models/entities/Img.entity")(db, Sequelize);
// const Belong = require("../models/entities/Belong.entity")(
//     db,
//     Sequelize
// );
// const Matching = require("../models/entities/Matching.entity")(
//     db,
//     Sequelize
// );

//Test DB Connection

module.exports = db;

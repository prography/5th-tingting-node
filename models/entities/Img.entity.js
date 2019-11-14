const Sequelize = require("sequelize");
const sequelize = require("../../loaders/dbLoader");

const Img = sequelize.define(
    "Img",
    {
        img_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        url: {
            type: Sequelize.STRING(100),
            allowNull: false
        }
    },
    {
        tableName: "imgs",
        freezeTableName: true,
        underscored: true,
        timestamps: false
    }
);

module.exports = Img;

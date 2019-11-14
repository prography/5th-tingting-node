const Sequelize = require("sequelize");
const sequelize = require("../../loaders/dbLoader");

const Belong = sequelize.define(
    "Belong",
    {
        belong_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        team_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    },
    {
        tableName: "belongs",
        freezeTableName: true,
        underscored: true,
        timestamps: false
    }
);

module.exports = Belong;

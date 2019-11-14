const Sequelize = require("sequelize");
const sequelize = require("../../loaders/dbLoader");

const Matching = sequelize.define(
    "Matching",
    {
        matching_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        send_member_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        send_team_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        receive_team_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        send_accept_all: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        receive_accept_all: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        verified_at: {
            type: Sequelize.DATE,
            allowNull: true
        }
    },
    {
        tableName: "matchings",
        freezeTableName: true,
        underscored: true,
        timestamps: false
    }
);

module.exports = Matching;

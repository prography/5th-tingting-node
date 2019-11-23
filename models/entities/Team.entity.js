const Sequelize = require("sequelize");
const db = require("../../loaders/dbLoader");

const Team = db.define(
    "teams",
    {
        team_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        teamname: {
            type: Sequelize.STRING(24),
            allowNull: false,
            unique: true
        },
        chat_address: {
            type: Sequelize.STRING(100),
            allowNull: false
        },
        gender: {
            type: Sequelize.INTEGER(1),
            allowNull: false
        },
        owner_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        team_member_number: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        intro: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        verified_at: {
            type: Sequelize.DATE,
            allowNull: true
        }
    },
    {
        tableName: "teams",
        freezeTableName: true,
        underscored: true,
        timestamps: false
    }
);
module.exports = Team;
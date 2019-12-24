const Sequelize = require("sequelize");
const db = require("../../loaders/dbLoader");

const Matching = db.define(
    "matching",
    {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
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
            type: Sequelize.INTEGER(1),
            allowNull: false,
            defaultValue: 0
        },
        receive_accept_all: {
            type: Sequelize.INTEGER(1),
            allowNull: false,
            defaultValue: 0
        },
        verified_at: {
            type: Sequelize.DATE,
            allowNull: true
        },
        created_at: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: db.literal("CURRENT_TIMESTAMP")
        },
        updated_at: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: db.literal("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP")
        },
        is_deleted: {
            type: Sequelize.INTEGER(1),
            allowNull: false,
            defaultValue: 0
        },
        deleted_at: {
            type: Sequelize.DATE,
            defaultValue: null
        }
    },
    {
        tableName: "matching",
        freezeTableName: true,
        underscored: true,
        timestamps: false
    }
);
module.exports = Matching;

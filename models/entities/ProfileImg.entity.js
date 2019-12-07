const Sequelize = require("sequelize");
const db = require("../../loaders/dbLoader");

const Img = db.define(
    "img",
    {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        url: {
            type: Sequelize.STRING(100),
            allowNull: false
        },
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: false
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
        }
    },
    {
        tableName: "img",
        freezeTableName: true,
        underscored: true,
        timestamps: false
    }
);
module.exports = Img;
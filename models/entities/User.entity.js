const Sequelize = require("sequelize");
const db = require("../../loaders/dbLoader");

const User = db.define(
    "users",
    {
        user_id: {
            type: Sequelize.INTEGER(11),
            allowNull: false,
            primaryKey: true
        },
        id: {
            type: Sequelize.STRING(20),
            allowNull: false,
            unique: true
        },
        password: {
            type: Sequelize.STRING(20),
            allowNull: false
        },
        username: {
            type: Sequelize.STRING(24),
            allowNull: false,
            unique: true
        },
        birth: {
            type: Sequelize.DATEONLY,
            allowNull: false
        },
        height: {
            type: Sequelize.INTEGER(11),
            allowNull: false
        },
        thumbnail: {
            type: Sequelize.STRING(45),
            allowNull: false
        },
        authenticated_address: {
            type: Sequelize.STRING(45),
            allowNull: false
        },
        created_at: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: db.literal("CURRENT_TIMESTAMP")
        },
        gender: {
            type: Sequelize.INTEGER(1),
            allowNull: false
        }
    },
    {
        tableName: "users",
        freezeTableName: true,
        underscored: true,
        timestamps: false
    }
);

module.exports = User;
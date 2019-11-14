const Sequelize = require("sequelize");
const sequelize = require("../../loaders/dbLoader");

const User = sequelize.define(
    "User",
    {
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
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
            type: Sequelize.INTEGER,
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
            defaultValue: Sequelize.NOW
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

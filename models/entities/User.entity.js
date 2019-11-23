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

// module.exports = function(sequelize, DataTypes) {
//     return sequelize.define(
//         "users",
//         {
//             user_id: {
//                 type: DataTypes.INTEGER(11),
//                 allowNull: false,
//                 primaryKey: true
//             },
//             id: {
//                 type: DataTypes.STRING(20),
//                 allowNull: false,
//                 unique: true
//             },
//             password: {
//                 type: DataTypes.STRING(20),
//                 allowNull: false
//             },
//             username: {
//                 type: DataTypes.STRING(24),
//                 allowNull: false,
//                 unique: true
//             },
//             birth: {
//                 type: DataTypes.DATEONLY,
//                 allowNull: false
//             },
//             height: {
//                 type: DataTypes.INTEGER(11),
//                 allowNull: false
//             },
//             thumbnail: {
//                 type: DataTypes.STRING(45),
//                 allowNull: false
//             },
//             authenticated_address: {
//                 type: DataTypes.STRING(45),
//                 allowNull: false
//             },
//             created_at: {
//                 type: DataTypes.DATE,
//                 allowNull: false,
//                 defaultValue: sequelize.literal("CURRENT_TIMESTAMP")
//             },
//             gender: {
//                 type: DataTypes.INTEGER(1),
//                 allowNull: false
//             }
//         },
//         {
//             tableName: "users",
//             freezeTableName: true,
//             underscored: true,
//             timestamps: false
//         }
//     );
// };

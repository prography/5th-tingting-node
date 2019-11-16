module.exports = function(sequelize, DataTypes) {
    return sequelize.define(
        "teams",
        {
            team_id: {
                type: DataTypes.INTEGER(11),
                allowNull: false,
                primaryKey: true
            },
            teamname: {
                type: DataTypes.STRING(24),
                allowNull: false,
                unique: true
            },
            chat_address: {
                type: DataTypes.STRING(100),
                allowNull: false
            },
            owner_id: {
                type: DataTypes.INTEGER(11),
                allowNull: false,
                references: {
                    model: "users",
                    key: "user_id"
                }
            },
            intro: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            gender: {
                type: DataTypes.INTEGER(1),
                allowNull: false
            },
            verified_at: {
                type: DataTypes.DATE,
                allowNull: true
            },
            team_member_number: {
                type: DataTypes.INTEGER(3),
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
};

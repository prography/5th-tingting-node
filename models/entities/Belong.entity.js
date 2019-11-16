module.exports = function(sequelize, DataTypes) {
    return sequelize.define(
        "belongs",
        {
            belong_id: {
                type: DataTypes.INTEGER(11),
                allowNull: false,
                primaryKey: true
            },
            team_id: {
                type: DataTypes.INTEGER(11),
                allowNull: false,
                references: {
                    model: "teams",
                    key: "team_id"
                }
            },
            user_id: {
                type: DataTypes.INTEGER(11),
                allowNull: false,
                references: {
                    model: "users",
                    key: "user_id"
                }
            }
        },
        {
            tableName: "belongs",
            freezeTableName: true,
            underscored: true,
            timestamps: false
        }
    );
};

module.exports = function(sequelize, DataTypes) {
    return sequelize.define(
        "imgs",
        {
            img_id: {
                type: DataTypes.INTEGER(11),
                allowNull: false,
                primaryKey: true
            },
            user_id: {
                type: DataTypes.INTEGER(11),
                allowNull: false,
                references: {
                    model: "users",
                    key: "user_id"
                }
            },
            url: {
                type: DataTypes.STRING(100),
                allowNull: false
            }
        },
        {
            tableName: "imgs",
            freezeTableName: true,
            underscored: true,
            timestamps: false
        }
    );
};

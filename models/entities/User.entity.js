module.exports = function(sequelize, DataTypes) {
    return sequelize.define(
        "users",
        {
            user_id: {
                type: DataTypes.INTEGER(11),
                allowNull: false,
                primaryKey: true
            },
            id: {
                type: DataTypes.STRING(20),
                allowNull: false,
                unique: true
            },
            password: {
                type: DataTypes.STRING(20),
                allowNull: false
            },
            username: {
                type: DataTypes.STRING(24),
                allowNull: false,
                unique: true
            },
            birth: {
                type: DataTypes.DATEONLY,
                allowNull: false
            },
            height: {
                type: DataTypes.INTEGER(11),
                allowNull: false
            },
            thumbnail: {
                type: DataTypes.STRING(45),
                allowNull: false
            },
            authenticated_address: {
                type: DataTypes.STRING(45),
                allowNull: false
            },
            created_at: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: sequelize.literal("CURRENT_TIMESTAMP")
            },
            gender: {
                type: DataTypes.INTEGER(1),
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
};

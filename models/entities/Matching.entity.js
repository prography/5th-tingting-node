module.exports = function(sequelize, DataTypes) {
    return sequelize.define(
        "matchings",
        {
            matching_id: {
                type: DataTypes.INTEGER(11),
                allowNull: false,
                primaryKey: true
            },
            send_member_id: {
                type: DataTypes.INTEGER(11),
                allowNull: false,
                references: {
                    model: "users",
                    key: "user_id"
                }
            },
            send_team_id: {
                type: DataTypes.INTEGER(11),
                allowNull: false,
                references: {
                    model: "teams",
                    key: "team_id"
                }
            },
            receive_team_id: {
                type: DataTypes.INTEGER(11),
                allowNull: false,
                references: {
                    model: "teams",
                    key: "team_id"
                }
            },
            send_accept_all: {
                type: DataTypes.INTEGER(11),
                allowNull: false
            },
            receive_accept_all: {
                type: DataTypes.INTEGER(11),
                allowNull: false
            },
            verified_at: {
                type: DataTypes.DATE,
                allowNull: true
            }
        },
        {
            tableName: "matchings"
        }
    );
};

const Sequelize = require("sequelize");
const config = require("../config");
const path = require("path");

const dbLoader = async () => {
    const connect = async () => {
        const env = config.NODE_ENV || "development";
        const sequelize_config = config.SEQUELIZE_CONFIG[env];
        const sequelize = new Sequelize(
            sequelize_config.database,
            sequelize_config.username,
            sequelize_config.password,
            {
                host: sequelize_config.localhost,
                dialect: sequelize_config.dialect
            }
        );

        //Test DB Connection
        await sequelize
            .authenticate()
            .then(() => {
                console.log("DB 연결 완료");
                return sequelize;
            })
            .catch(err => {
                console.error("DB 연결 실패: ", err);
            });
    };
    await connect();
};

module.exports = dbLoader;

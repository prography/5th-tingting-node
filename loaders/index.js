const dbLoader = require("./dbLoader.js");
const expressLoader = require("./expressLoader");

const loaders = async app => {
    console.log("로더 실행");
    await dbLoader();
    expressLoader(app);
    console.log("로더 완료");
};

module.exports = loaders;

const serMe = require("../services/serMe");

const getMyInfo = async(req, res) =>{
    const myService = new serMe();
    const myInfo = await myService.findMyInfo(1);//req.haders //미들웨어 필요
    res.send({
        status: 200,
        data: {
            myInfo
        }
    });
}

module.exports = {
    getMyInfo,
}
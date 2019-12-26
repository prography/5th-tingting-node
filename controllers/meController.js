const serMe = require("../services/serMe");

const getMyInfo = async (req, res) => {
    const myService = new serMe();
    const myInfo = await myService.findMyInfo(req.token.id);
    //const myInfo = await myService.findMyInfo(1);
    res.json({
        status: 200,
        data: {
            myInfo
        }
    });
};

module.exports = {
    getMyInfo
};

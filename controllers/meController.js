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

const updateMyInfo = async(req, res) =>{
    const myService = new serMe();
    const id = 1;
    const{
        name,
        birth,
        height,
        thumbnail
    } = req.body;
    try{ 
        await myService.updateMyInfo({
        id,
        name,
        birth,
        height,
        thumbnail
        });
        res.send({
            status: 202,
        });
    } catch(error) {
        console.log(error);
        res.json(error);
    }
}

module.exports = {
    getMyInfo,
    updateMyInfo,
}

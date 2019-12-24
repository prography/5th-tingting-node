const serUser = require("../services/serUser");

const getTeamList = async(req, res) => {
    const UserService = new serUser();
    const teamList = await UserService.findMyTeamList(req.params.id).then();
    console.log(teamList);
    console.log(req.params.id);
    res.send({teamList});
};

const getUserInfo = async(req, res) =>{
    const UserService = new serUser();
    const userInfo = await UserService.findUserInfo(req.params.id).then();
    res.send({
        userInfo: userInfo
    });
}

module.exports = {
    getTeamList,
    getUserInfo,
}

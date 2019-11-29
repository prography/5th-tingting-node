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

const getMatchingList = async(req, res) => {
    const UserService = new serUser();
    const matchingList = await UserService.findMatchingList(req.params.id, req.params.team).then();
    console.log(matchingList);
    console.log(req.params.team);
    res.send({matchingList});
};

const updateUserInfo = async(req,res) =>{
    //추후 개발
}

module.exports = {
    getTeamList,
    getUserInfo,
    getMatchingList,
}
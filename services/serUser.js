const ModelTeam= require("../models/modTeam");
const ModelBelong= require("../models/modBelong");
const ModelUser = require("../models/modUser");

class serUser {
    constructor() {
        this.modUser = new ModelUser();
        this.modTeam = new ModelTeam();
        this.modBelong = new ModelBelong();
    }

    async findTeamList(user_id) {
        try {
            const teamList_owner = await this.modTeam.findTeamList_ByTeam(user_id).then();
            const teamList_id = await this.modBelong.findTeamList_ByBelong(user_id).then();
            const teamList = teamList_owner.concat(teamList_id);
            //console.log('teamList', teamList);
            return teamList;
        } catch (error) {
            console.log(error);
        }
    };
    // async findUserInfo(user_id){
    //     try {
    //     const userInfo = await this.modUser.findUserInfo(user_id).then();
    //     console.log('userInfo', userInfo);
    //     return userInfo;
    // } catch (error) {
    //     console.log(error);
    // }
 //};
}
module.exports = serUser;
const ModelTeam= require("../models/modTeam");
const ModelBelong= require("../models/modBelong");
const ModelUser = require("../models/modUser");
const ModelMatching = require("../models/modMatching");

class serUser {
    constructor() {
        this.modUser = new ModelUser();
        this.modTeam = new ModelTeam();
        this.modBelong = new ModelBelong();
        this.modMatching = new ModelMatching();
    }

    //나의 개별 팀 찾기
    async findMyTeamList(user_id) {
        try {
            const teamList_owner = await this.modTeam.findMyTeamList(user_id).then();
            const teamList_id = await this.modBelong.findMyTeamList(user_id).then();
            const teamList = teamList_owner.concat(teamList_id);
            //console.log('teamList', teamList);
            return teamList;
        } catch (error) {
            console.log(error);
        }
    };

    //
    async findUserInfo(user_id){
        try {
        const userInfo = await this.modUser.findUserInfo(user_id).then();
        console.log('userInfo :', userInfo);
        return userInfo;
    } catch (error) {
        console.log(error);
    }
 };

 //이건 망한거
    async findMatchingList(user_id, team_id){
        try{
            const matchingList = await this.modMatching.findMatchingList(user_id, team_id).then();
            console.log('matchingList:', matchingList);
            return matchingList;
        }catch(err){
            console.log(error);
        }
    };



}
module.exports = serUser;
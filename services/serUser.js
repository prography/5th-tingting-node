const ModelTeam = require("../models/modTeam");
const ModelBelong = require("../models/modBelong");
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
            const teamList_owner = await this.modTeam
                .findMyTeamList(user_id)
                .then();
            const teamList_id = await this.modBelong
                .findMyTeamList(user_id)
                .then();
            const teamList = teamList_owner.concat(teamList_id);
            //console.log('teamList', teamList);
            return teamList;
        } catch (error) {
            console.log(error);
        }
    }
    //프로필 찾기
    async findUserInfo(userId) {
        try {
            const userInfo = await this.modUser.findUserInfo(userId);
            console.log("userInfo :", userInfo);
            return userInfo;
        } catch (error) {
            console.log(error);
        }
    }
    async saveUser(data) {
        try {
            await this.modUser.saveUser(data);
        } catch (err) {
            console.log(err);
        }
    }
}
module.exports = serUser;
